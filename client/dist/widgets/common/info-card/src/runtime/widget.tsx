import { React, IMState, classNames, DataSourceInfo, DataSourceManager, BaseWidget, AllWidgetProps, DataSourceStatus } from 'jimu-core';
import Query = require('esri/tasks/support/Query');
import { List, Card, WidgetPlaceholder } from 'jimu-ui';
import {styleUtils} from 'jimu-for-builder';
import { FeatureLayerViewDataSource, FeatureLayerDataSource, DataSourceTypes } from 'jimu-arcgis';
import Graphic = require('esri/Graphic');
import { IMConfig, DescriptionTypes } from '../config';
import { FeatureDataRecord } from 'jimu-arcgis/lib/data-sources/feature-record';

const CSSClasses = {
  infocard: 'widget-infocard',
  featureInfoFields: 'feature-info--fields'
};

interface ExtraProps{
  layerDs: FeatureLayerDataSource;
  layerDsInfo: DataSourceInfo;
}

function isDataSourceConfigured(props: AllWidgetProps<IMConfig>): boolean{
  return !!props.useDataSources && !!props.useDataSources[0];
}

function isDataSourceInjected(props: AllWidgetProps<IMConfig>): boolean{
  let dsId = props.useDataSources[0].dataSourceId;
  return !!(props.dataSources[dsId] && props.dataSourcesInfo[dsId]);
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, {}>{
  domNode: any;

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>): ExtraProps => {
    if(!isDataSourceConfigured(ownProps) || !isDataSourceInjected(ownProps)){
      return {} as ExtraProps;
    }
    let dsId = ownProps.useDataSources[0].dataSourceId;
    let realDsId;
    if(ownProps.dataSources[dsId].type === DataSourceTypes.FeatureLayerView){
      realDsId = (ownProps.dataSources[dsId] as FeatureLayerViewDataSource).getLayerDataSource().id;
    }else{
      realDsId = dsId;
    }

    return {
      layerDs: DataSourceManager.getInstance().getDataSource(realDsId) as FeatureLayerDataSource,
      layerDsInfo: state.dataSourcesInfo[realDsId]
    }
  };

  //--------------------------------------------------------------------------
  //
  //  Private methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public methods
  //
  //--------------------------------------------------------------------------


  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps: AllWidgetProps<IMConfig>) {
    this.queryAllRecords();
  }

  componentDidMount(){
    this.queryAllRecords();
  }

  queryAllRecords() {
    if(!isDataSourceConfigured(this.props) || !isDataSourceInjected(this.props)){
      return {} as ExtraProps;
    }
    if(!this.props.layerDsInfo || this.props.layerDsInfo.status === DataSourceStatus.Loading
      || this.props.layerDsInfo.status === DataSourceStatus.Loaded){
      return;
    }
    let q = new Query({
      where: '1=1',
      outFields: ['*'],
      returnGeometry: true
    });

    this.props.layerDs.load(q);
  }

  render() {
    const {
      config,
      dataSources
    } = this.props;

    const classes = classNames(
      CSSClasses.infocard,
      config.className //,
      // config.style && `widget-style--${config.style.id}`
    );

    let content, titleContent, descriptionContent, imageContent;

    if(!isDataSourceConfigured(this.props)){
      return <WidgetPlaceholder icon={this.props.icon} message="Please config data source" isSelected={this.props.isSelected}/>;
    }
    if(!this.props.layerDs){
      return <div className='loading'>waiting for data source...</div>;
    }

    if(!this.props.layerDsInfo || this.props.layerDsInfo.status !== DataSourceStatus.Loaded){
      return <div className='loading'>waiting for data to load...</div>;
    }

    let f: Graphic;
    if (this.props.layerDs.getSelectedRecords().length > 0) {
      f = (this.props.layerDs.getSelectedRecords()[0] as FeatureDataRecord).feature as Graphic;

    } else if(this.props.layerDs.getRecords().length > 0) {
      f = (this.props.layerDs.getRecords()[0] as FeatureDataRecord).feature as Graphic;
    }
    if(f) {
      if (config.description) {
        if(config.description.type && config.description.type.toUpperCase() === DescriptionTypes.list) {
          if(Array.isArray(config.description.fields)) {
            const listItems = config.description.fields.map(fieldConfig => {
              return {
                icon: fieldConfig.icon,
                text: f.attributes[fieldConfig.field]
              }
            });
          descriptionContent = <List className={CSSClasses.featureInfoFields} dataSource={listItems}/>;
          } else {
            descriptionContent = "Description configuration error occurred.";
          }
        } else {
          descriptionContent = f.attributes[config.description.field] || '[Empty Description]';
        }
      }
      titleContent = config.title ? f.attributes[config.title.field] || '[Empty Title]' : null;
      if(config.image) {
        imageContent = {
          height: config.image.height,
          width: config.image.width,
          src: f.attributes[config.image.field] || '//via.placeholder.com/240x160?text=Empty+Image',
          cover: true
        };
      } else {
        imageContent = null;
      }
    } else {
      titleContent = <span className={`${CSSClasses.infocard}-title-placeholder`}>No Feature Selected</span>;
      descriptionContent = <span className={`${CSSClasses.infocard}-description-placeholder`}></span>;
      imageContent = {
          height: 120,
          src: '//via.placeholder.com/240x160?text=Image+Placeholder',// TODO: need to use a better image
          cover: true
      }; 
    }

    content = (
      <Card
        title={titleContent}
        description={descriptionContent}
        textLimit={config.description && config.description.limit || null}
        // isRichText={config.description && config.description.richText}
        image={imageContent}
        horizontal={config.horizontal} />
    );

    return <div 
      className={classes}
      ref={ ref => this.domNode = ref}
    >
      {content}
    </div>
  }

}
