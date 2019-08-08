/** @jsx jsx */
import {React, css, jsx, ActionSettingProps, SerializedStyles, DataSource, DataSourceTypes, ImmutableObject, 
  DataSourceSchema, FieldSchema, getAppStore, dataSourceUtils, UseDataSource} from 'jimu-core';
import {Input} from 'jimu-ui';
import {AppDataSourceManager, AllDataSourceTypes} from 'jimu-for-builder';
import { MapViewDataSource, SceneViewDataSource } from 'jimu-arcgis/arcgis-data-source';
import defaultMessages from '../setting/translations/default';

interface States {
  layers: __esri.Collection<__esri.Layer>,
  messageDataSource: DataSource,
  mapViewDatasource: DataSource
}

interface Config {
  layerId: string;
  messageField: FieldSchema;
  layerField: FieldSchema;
}

const SupportSourceTypes = [AllDataSourceTypes.FeatureQuery, AllDataSourceTypes.FeatureLayer];

export type IMConfig = ImmutableObject<Config>;

export default class SelectDataRecordActionSetting extends React.PureComponent<ActionSettingProps<IMConfig>, States>{

  constructor(props){
    super(props);

    this.state = {
      layers: undefined,
      messageDataSource: undefined,
      mapViewDatasource: undefined
    }
  }

  getStyle (): SerializedStyles {

    return css`
      
      .filter-data-setting {

        .filter-field {
          width: 45%;
        }
      }
    `;
  }

  componentDidMount() {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config
    });

    let messageUseDataSource = this.getMessageUseDataSource();
    if (messageUseDataSource) {
      if (messageUseDataSource.rootDataSourceId) {
        AppDataSourceManager.getInstance().createDataSource(messageUseDataSource.rootDataSourceId).then(rootds => {
          let ds = AppDataSourceManager.getInstance().getDataSource(messageUseDataSource.dataSourceId);
          if (SupportSourceTypes.indexOf(ds.type as DataSourceTypes) > -1) {
            this.setState({
              messageDataSource: ds
            })
          }
        })
      } else {
        AppDataSourceManager.getInstance().createDataSource(messageUseDataSource.dataSourceId).then(ds => {
          if (SupportSourceTypes.indexOf(ds.type as DataSourceTypes) > -1) {
            this.setState({
              messageDataSource: ds
            })
          }
        })
      }
    }

    let mapViewDatasourceId = this.getMapViewDataSourceId();
    mapViewDatasourceId && AppDataSourceManager.getInstance().createDataSource(mapViewDatasourceId).then(ds => {
      let layers = this.getLayersInMapViewDataSource(ds as MapViewDataSource | SceneViewDataSource);

      this.setState({
        layers: layers,
        mapViewDatasource: ds
      })
    })
  }

  componentDidUpdate() {
    this.props.onDisableDoneBtn(this.checkIsConfigDisabled(this.props.config));
  }

  layerChange = (e: any) => {
    let layerId = e.target.value;
    if (this.state.messageDataSource && this.state.messageDataSource.getFetchedSchema()) {
      if (this.state.messageDataSource.getFetchedSchema().layerDefinition.id === layerId) {
        let objectIdFieldName = this.state.messageDataSource.getIdField();
        let messageDataSourceSchema = this.getDataSourceSchema();
        let objectIdField = messageDataSourceSchema.fields[objectIdFieldName];
        this.props.onSettingChange({
          actionId: this.props.actionId,
          config: this.props.config.set('layerId', layerId).set('messageField', objectIdField).set('layerField', objectIdField)
        })
      } else {
        this.props.onSettingChange({
          actionId: this.props.actionId,
          config: this.props.config.set('layerId', layerId).set('layerField', undefined).set('messageField', undefined)
        })
      }
    } else {
      this.props.onSettingChange({
        actionId: this.props.actionId,
        config: this.props.config.set('layerId', layerId).set('layerField', undefined).set('messageField', undefined)
      })
    }
  }

  onSelectLayerField = (fieldName: string) => {
    let matchLayerSchema = this.getLayerSchema(this.props.config.layerId);
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('layerField', matchLayerSchema.fields[fieldName])
    })
  }

  onSelectMessageField = (fieldName: string) => {
    let messageDataSourceSchema = this.getDataSourceSchema();

    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('messageField', messageDataSourceSchema.fields[fieldName])
    })
  }

  getLayerSchema = (layerId): DataSourceSchema => {
    let layerSchema: DataSourceSchema = {
      layerDefinition: {},
      fields: {}
    };

    if (this.state.layers && this.state.layers.length > 0) {
      let layer: __esri.FeatureLayer = this.state.layers.find(layer => layer.id === layerId) as __esri.FeatureLayer;
      if (layer) {
        let fields: __esri.Field[] = (layer as __esri.FeatureLayer).fields;
        fields.forEach(field => {
          let fieldInfo = layer.popupTemplate && layer.popupTemplate.fieldInfos && layer.popupTemplate.fieldInfos.find(f => f.fieldName === field.name);
          if(fieldInfo){
            fieldInfo = fieldInfo.toJSON();
          }
          layerSchema.fields[field.name] = dataSourceUtils.convertFieldToJimuField(field.toJSON(), fieldInfo);
        })
      }
    }

    return layerSchema;
  }

  getDataSourceSchema = (): DataSourceSchema => {
    let dataSourceSchema = null;
    if (this.state.messageDataSource) {
      dataSourceSchema = this.state.messageDataSource.getSchema();
    }
    return dataSourceSchema;
  }

  static defaultProps = {
    config: {
      layerId: undefined,
      messageField: undefined,
      layerField: undefined
    }
  }

  getMessageUseDataSource = (): UseDataSource => {
    let messageUseDataSource = null;
    let config = getAppStore().getState().appStateInBuilder.appConfig;
    let messageWidgetJson = config.widgets[this.props.messageWidgetId];
    if (messageWidgetJson && messageWidgetJson.useDataSources && messageWidgetJson.useDataSources[0]) {
      messageUseDataSource = messageWidgetJson.useDataSources[0];
    }
    return messageUseDataSource;
  }

  getMapViewDataSourceId = (): string => {
    let mapViewDataSourceId = null;
    let config = getAppStore().getState().appStateInBuilder.appConfig;
    let mapWidgetJson = config.widgets[this.props.widgetId];
    if (mapWidgetJson && mapWidgetJson.outputDataSources && mapWidgetJson.outputDataSources[0]) {
      mapViewDataSourceId = mapWidgetJson.outputDataSources[0];
    }
    return mapViewDataSourceId;
  }

  getLayersInMapViewDataSource = (datasource: MapViewDataSource | SceneViewDataSource) => {
    let view: __esri.MapView | __esri.SceneView = datasource.view;
    let map: __esri.Map = view && view.map;
    let layers = null;
    if (map && map.layers && map.layers.length > 0) {
      layers = map.layers.filter(function(layer){
        return layer.type === 'feature';
      });
    }
    return layers;
  }

  checkIsConfigDisabled = (config: IMConfig) => {
    let status = config.layerId && config.messageField && config.layerField;
    return status ? false : true
  }

  checkIsSameDatasource = () => {
    if (this.props.config.layerId && this.state.messageDataSource && this.state.messageDataSource.getFetchedSchema()) {
      if (this.props.config.layerId === (this.state.messageDataSource.getFetchedSchema().layerDefinition.id as any)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  render(){
    let matchLayerSchema = this.getLayerSchema(this.props.config.layerId);
    let messageDataSourceSchema = this.getDataSourceSchema();
    let isSameDatasource = this.checkIsSameDatasource();

    return <div css={this.getStyle()}>
      <div className="filter-data-setting">
        <div className="mt-3">{this.props.intl.formatMessage({id: 'chooseALayer', defaultMessage: defaultMessages.chooseALayer})}</div>
        <div className="mt-2 mb-2" style={{overflow: 'hidden'}}>
          {(!this.state.layers || this.state.layers.length === 0) && <Input type="select" 
            value={this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})} className="float-right"><option>
            {this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}</option>
          </Input>}
          {this.state.layers && this.state.layers.length > 0 && <Input type="select" value={this.props.config.layerId} className="float-right" onChange={this.layerChange}>
            <option style={{display: 'none'}} value={undefined}>
              {this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}
            </option>
            {this.state.layers.toArray().map((layer, index) => {
              return <option key={index} value={layer.id} title={(!layer.title || layer.title === '') ? layer.id : layer.title}>{(!layer.title || layer.title === '') ? layer.id : layer.title}</option>
            })}
          </Input>}
        </div>
        {!isSameDatasource && <div>
          <div>{this.props.intl.formatMessage({id: 'dataRelationShip', defaultMessage: defaultMessages.dataRelationShip})}</div>
          <div className="d-flex justify-content-between mt-2 mb-2">
            <div className="filter-field" style={{overflow: 'hidden'}}>
              {(!matchLayerSchema || !matchLayerSchema.fields) && <Input type="select" 
                value={this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})} className="float-right">
                <option>{this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}</option></Input>}
              {matchLayerSchema && matchLayerSchema.fields && !this.props.config.layerField && 
                <Input type="select" title={this.props.config.layerField && this.props.config.layerField.name} value={this.props.config.layerField && this.props.config.layerField.name} 
                onChange={(e) => this.onSelectLayerField(e.target.value)} className="float-right">
                <option style={{display: 'none'}} value={undefined}>
                  {this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}
                </option>
                {Object.keys(matchLayerSchema.fields).map((fieldName, index) => {
                  return <option key={index} value={matchLayerSchema.fields[fieldName].name} title={matchLayerSchema.fields[fieldName].name}>{matchLayerSchema.fields[fieldName].name}</option>
                })}
              </Input>}
              {matchLayerSchema && matchLayerSchema.fields && this.props.config.layerField && <Input type="select" title={this.props.config.layerField && this.props.config.layerField.name} 
                value={this.props.config.layerField && this.props.config.layerField.name} 
                onChange={(e) => this.onSelectLayerField(e.target.value)} className="float-right">
                <option style={{display: 'none'}} value={undefined}>
                  {this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}
                </option>
                {Object.keys(matchLayerSchema.fields).map((fieldName, index) => {
                  return <option key={index} value={matchLayerSchema.fields[fieldName].name} title={matchLayerSchema.fields[fieldName].name}>{matchLayerSchema.fields[fieldName].name}</option>
                })}
              </Input>}
            </div>
            <div className="filter-field d-flex justify-content-center align-items-center border">equals</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="filter-field d-flex justify-content-center align-items-center bg-gray-200 text-gray-700">
              {`${this.props.intl.formatMessage({id: 'messageField', defaultMessage: defaultMessages.messageField})}:`}</div>
            <div className="filter-field" style={{overflow: 'hidden'}}>
              {(!messageDataSourceSchema || !messageDataSourceSchema.fields) && <Input type="select" 
                value={this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})} className="float-right">
                <option>{this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}</option></Input>}
              {messageDataSourceSchema && messageDataSourceSchema.fields && <Input type="select" title={this.props.config.messageField && this.props.config.messageField.name} 
              value={this.props.config.messageField && this.props.config.messageField.name} 
                onChange={(e) => this.onSelectMessageField(e.target.value)} className="float-right">
                <option style={{display: 'none'}} value={undefined}>
                  {this.props.intl.formatMessage({id: 'mapNone', defaultMessage: defaultMessages.mapNone})}
                </option>
                {Object.keys(messageDataSourceSchema.fields).map((fieldName, index) => {
                  return <option key={index} value={fieldName} title={fieldName}>{fieldName}</option>
                })}
              </Input>}
            </div>
          </div>
        </div>}
      </div>
    </div>;
  }
}