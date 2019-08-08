/** @jsx jsx */
import { BaseWidget, React, classNames, DataSourceManager, IMDataSourceInfo, DataSource, DataSourceStatus, DataSourceComponent, SessionManager } from 'jimu-core';
import { AllWidgetProps, css, jsx } from 'jimu-core';
import { WidgetPlaceholder } from 'jimu-ui';
import { IMConfig } from '../config';
import { FeatureLayerViewDataSource, FeatureLayerDataSource, DataSourceTypes, MapViewDataSource } from 'jimu-arcgis/arcgis-data-source';
import { ArcGISDataSourceTypes } from 'jimu-arcgis/arcgis-data-source-type';
import { survey123Service, Survey123Message } from '../service/survey123.service';
import { FeatureDataRecord } from 'jimu-arcgis/lib/data-sources/feature-record';
import Extent = require('esri/geometry/Extent');
import { getStyle } from './css/style';

/**
 * survey123 widget
 */
export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any>{
  /**
   * survey123webform iframe
   */
  public survey123webform: any;
  public iframeContainer: any;
  public iconSurvey123 = require('../../icon-black.svg');
  // showDiffLog = true;

  public state = {
    featureLayerViewDS: null
  };

  private _dsManager = DataSourceManager.getInstance();
  private _isMapViewAddedClickEvent: boolean = false;
  private _mapViewDSFromFeatureLayerView: any;
  private _extentWatch: __esri.WatchHandle;
  private _cachedTimeStamp: number = this.props.config.timestamp;

  constructor(props) {
    super(props);

    /**
     * listen survey123 webform event
     */
    this.listenSurvey123WebformEvent();
  }

  /**
   * component did update handler
   */
  componentDidUpdate() {
    /**
     * get used data source
     */
    let ds = this.getUsedDataSource();

    /**
     * if ds exists and ds is featureLayerView ds
     */
    if (ds && ds.type === DataSourceTypes.FeatureLayerView) {
      let mapViewDs = ds.getMapOrSceneViewDataSource() as MapViewDataSource;
      this._mapViewDSFromFeatureLayerView = mapViewDs;
      if (!this._extentWatch) {
        this._extentWatch = mapViewDs.view.watch('extent', extent => {
          this.doQuery(extent);
        });

        this.doQuery(mapViewDs.view.extent);
      }
    }
  }

  /**
   * get used data source
   */
  getUsedDataSource() {
    let dataSources: any[] = this.props.useDataSources;
    let ds = null;

    if (dataSources && dataSources.length > 0) {
      let dataSourceId = dataSources[0].dataSourceId;
      ds = this._dsManager.getDataSource(dataSourceId);
    }
    return ds;
  }

  /**
   * isDsConfigured
   */
  isDsConfigured = () => {
    if (this.props.useDataSources &&
      this.props.useDataSources.length === 1) {
      return true;
    }
    return false;
  }

  /**
   * do feature layer query to get layer's features in the map extent
   */
  doQuery = (extent: Extent) => {
    let q = {
      geometry: extent,
      spatialRelationship: "intersects",
      returnGeometry: true
    };
    if (this.getUsedDataSource().getStatus() !== DataSourceStatus.Loading) {
      this.getUsedDataSource().load(q);
    }
  }

  /**
   * map view handler
   */
  mapViewHandler(ds: MapViewDataSource) {
    if (ds && ds.view && this._isMapViewAddedClickEvent === false) {
      /**
       * add click event on the map view
       */
      let mapView = ds.view;
      mapView.on('click', (e: any) => {
        let mapPoint = mapView.toMap({ x: e.x, y: e.y });
        if (mapPoint) {
          let lat = mapPoint.latitude;
          let lng = mapPoint.longitude;

          this.postMessageToSurvey123Webform({
            event: 'survey123:onDrawEnd',
            data: {
              x: lng,
              y: lat
            }
          });
        }
      });
      this._isMapViewAddedClickEvent = true;
    }
  }

  /**
   * feature layer view handler
   */
  featureLayerViewHandler(ds: FeatureLayerViewDataSource) {
    let selectedRecords = ds.getSelectedRecords();

    if (selectedRecords.length > 0) {
      let feature = (selectedRecords[0] as FeatureDataRecord).feature;
      let fields = this.props.useDataSources[0].fields;
      let selectedSurveyQuestionFields = this.props.config.selectedSurveyQuestionFields || [];
      let selectedSurveyQuestionField = selectedSurveyQuestionFields[0];

      if (!fields[0] || !selectedSurveyQuestionField) {
        console.error('cannot find selected featureLayerView field or selected survey question field');
        console.error('featureLayerView field = ', fields[0]);
        console.error('selectedSurveyQuestionField = ', selectedSurveyQuestionField);
        return;
      }

      if (feature && fields && fields.length > 0 && selectedSurveyQuestionField) {
        let field = fields[0];
        let value = feature.attributes[field];

        /**
         * post survey123:setParams event
         */
        this.postMessageToSurvey123Webform({
          event: 'survey123:setParams',
          data: [
            `field:${selectedSurveyQuestionField}=${value}`
          ]
        });

        let geometry: any = feature.geometry;
        if (geometry && geometry.latitude && geometry.longitude) {
          /**
           * post survey123:setGeopoint event
           */
          this.postMessageToSurvey123Webform({
            event: 'survey123:setGeopoint',
            data: {
              x: geometry.longitude,
              y: geometry.latitude
            }
          });
        }
      }
    }
  }

  /**
   * listen survey123 webform event by iframe message
   */
  listenSurvey123WebformEvent() {
    const eventHandler = (evt: any) => {
      if (evt && evt.data) {
        let payload;
        try {
          if (typeof evt.data === 'string') {
            payload = JSON.parse(evt.data);
          } else if (evt.data && evt.data.payload){
            if (typeof evt.data.payload === 'string') {
              payload = JSON.parse(evt.data.payload);
            } else {
              payload = evt.data.payload;
            }
          } else {
            payload = evt.data;
          }
          
        } catch (err) {
          console.error(err);
        }
        // console.log(payload)
        let event = payload.event;
        let data = payload.data;

        if (event === 'survey123:onDrawPoint') {
          this.onDrawPoint(data);
        }

        if (event === 'survey123:onFormLoaded') {
          if (event === 'survey123:onFormLoaded' && payload.contentHeight) {
            /**
             * set iframe height
             */
            // this.iframeContainer.style.height = `${payload.contentHeight - 50}px`;
            // this.iframeContainer.style['padding-bottom'] = 'auto';
          }
        }

        if (event === 'survey123:onSubmitted') {
          console.log('survey123:onSubmitted!', data);
        }
      }
    };

    if (window.addEventListener) {
      window.addEventListener('message', eventHandler, false);
    } else {
      window['attachEvent']('onmessage', eventHandler);
    }
  }

  /**
   * on draw point
   */
  onDrawPoint(data?: any) {
    console.log('start draw point');

    if (this._mapViewDSFromFeatureLayerView) {
      this.mapViewHandler(this._mapViewDSFromFeatureLayerView);
    }
  }

  /**
   * post message to survey123 webform
   */
  postMessageToSurvey123Webform(payload: Survey123Message) {
    if (this.survey123webform && this.survey123webform.contentWindow) {
      this.survey123webform.contentWindow.postMessage(JSON.stringify(payload), '*')
    } else {
      console.log('cannot find survey123webform iframe contentWindow!');
    }
  }

  /**
   * get webform url
   */
  getWebformUrl(): string {
    /**
    * config
    */
    const config = this.props.config;

    /**
     * params
     */
    let surveyItemId = config.surveyItemId;
    let portalUrl = config.portalUrl || this.props.portalUrl || 'https://www.arcgis.com';
    let webformUrl: string = null;

    if (surveyItemId) {
      /**
     * url params
     */
      let urlParams: string[] = [];

      /**
       * portalUrl
       */
      if (portalUrl !== 'https://www.arcgis.com') {
        urlParams.push(`portalUrl=${portalUrl}`);
      }

      /**
       * embed url params
       */
      let embeds = config.embeds || []; // || ['fullScreen', 'onSubmitted', 'associatedMap'];
      if (embeds.indexOf('onSubmitted') === -1) {
        embeds = embeds.concat(['onSubmitted']);
      }
      if (embeds.length > 0) {
        urlParams.push(`embed=${embeds.join(',')}`);
      }

      /**
       * hide url params
       */
      let hides = config.hides || ["navbar", "header", "description", "footer", "theme"];
      if (hides.length > 0) {
        urlParams.push(`hide=${hides.join(',')}`);
      }

      /**
       * default value
       */
      let defaultValue = config.defaultValue;
      if (defaultValue && typeof defaultValue === 'object' && defaultValue !== null && defaultValue !== undefined) {
        Object.keys(defaultValue).forEach((key) => {
          urlParams.push(`field:${key}=${defaultValue[key]}`);
        });
      }

      /**
       * open mode
       */
      let open = config.open || 'web';
      let openWhiteLists = ['web', 'menu', 'native'];
      if (open && open !== 'web' && openWhiteLists.indexOf(open) !== -1) {
        urlParams.push(`open=${open}`);
      }

      /**
       * token
       * we can add token in url params to avoid login in survey123 webform
       * TODO:
       * need to ask Junshan how to get user token in the widget
       */
      let token = this.props.token;
      if (token) {
        urlParams.push(`token=${token}`);
      }

      /**
       * need to set version >=3.2 to use hide and embed params
       */
      urlParams.push('version=latest');

      /**
       * add autoRefresh=3
       * to auto refresh in 3s after submit
       */
      urlParams.push('autoRefresh=3');

      /**
       * add timestamp randon params to ensure the iframe can refresh correctly
       * only when timestamp is different
       */
      let configTimestamp = config.timestamp;
      if (configTimestamp && this._cachedTimeStamp !== configTimestamp) {
        this._cachedTimeStamp = configTimestamp;
      }
      urlParams.push(`timestamp=${this._cachedTimeStamp}`);
      
      /**
       * webform url
       */
      webformUrl = survey123Service.getSurvey123WebformUrl(surveyItemId, {
        queryParams: urlParams
      });
    }

    return webformUrl;
  }

  /**
   * data source renderer
   */
  dataRender = (ds: DataSource) => {
    /**
     * if mapView datasource
     */
    if (ds.type === DataSourceTypes.MapView) {
      this.mapViewHandler(ds as MapViewDataSource);
    }

    /**
     * if featurelayerView datasource
     */
    if (ds.type === DataSourceTypes.FeatureLayerView) {
      this.featureLayerViewHandler(ds as FeatureLayerViewDataSource);
    }

    return <div></div>
  }

  /**
   * render ds
   */
  renderDS() {
    let dsId = null;
    let rootDsId = null;

    if (this.isDsConfigured()) {
      /**
       * get used data source
       */
      dsId = this.props.useDataSources[0].dataSourceId;
      rootDsId = this.props.useDataSources[0].rootDataSourceId;
    }

    if (dsId && rootDsId) {
      return <DataSourceComponent useDataSource={this.props.useDataSources[0]}>
        {
          this.dataRender
        }
      </DataSourceComponent>
    }

    return <div></div>
  }

  /**
   * render
   */
  render() {
    let webformUrl = this.getWebformUrl();
    let result;

    /**
     * if no webformUrl
     */
    if (!webformUrl) {
      result = <div className="survey123__noSurvey">
        <WidgetPlaceholder icon={this.iconSurvey123} message="Survey" />
      </div>
    } else {
      result = <div className="survey123__webform">
        <div className="embed-container" ref={(f) => this.iframeContainer = f}>
          <iframe name="survey123webform" width="500" height="400" src={webformUrl} ref={(f) => this.survey123webform = f}></iframe>
        </div>
        {
          //<iframe src={webformUrl} name="survey123webform" ref={(f) => this.survey123webform = f}></iframe>
        }
      </div>
    }

    /**
     * html
     */
    return <div css={getStyle(this.props.theme)} className="survey123">
      {
        result
      }
      {
        /*
         * render ds
         */
        this.renderDS()
      }
    </div>

  }
}

