import {React, MessageManager, DataSourceComponent, IMDataSourceInfo, IMUseDataSource, SelectDataRecordMessage,
  loadArcGISJSAPIModules, DataSourceManager, Immutable, SpatialDataRecordSetCreateMessage, SpatialDataRecordsSelectionChangeMessage} from 'jimu-core';
import {getAppConfigAction} from 'jimu-for-builder';

import {BaseWidget, AllWidgetProps, FeatureDataRecord, DataSourceStatus} from 'jimu-core';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source';

interface State{
  query: any,
  currentDatasources: Array<IMUseDataSource>
}

export default class Widget extends BaseWidget<AllWidgetProps<{}>, State>{
  Query: typeof __esri.Query;
  FeatureSet: typeof __esri.FeatureSet;

  state = {
    query: null,
    currentDatasources: []
  };

  componentDidMount(){
    loadArcGISJSAPIModules([
      'esri/tasks/support/Query',
      'esri/tasks/support/FeatureSet'
    ]).then(modules => {
      [
        this.Query, this.FeatureSet
      ] = modules;

      let q = new this.Query({
        where: '1 = 1',
        outFields: ['*'],
        returnGeometry: true
      })
      this.setState({query: q})

      let dsManager = DataSourceManager.getInstance();

      let dsjson1 = Immutable({
        id: 'ds-2',
        label: 'ds 2',
        type: 'FEATURE_LAYER',
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CITIES_EastUSA/FeatureServer/0'
      })

      let dsjson2 = Immutable({
        id: 'ds-3',
        label: 'ds 3',
        type: 'FEATURE_LAYER',
        url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3'
      })

      dsManager.createDataSource({
        dataSourceJson: dsjson1
      }).then(ds => {
        getAppConfigAction().addDataSource(dsjson1).exec();

        dsManager.createDataSource({
          dataSourceJson: dsjson2
        }).then(ds => {
          getAppConfigAction().addDataSource(dsjson2).exec();
        })
      });
    });
  }

  showOnMap = (ds: FeatureLayerDataSource) => {
    let recordSet = {
      records: ds.getRecords()
    };
    MessageManager.getInstance().publishMessage(new SpatialDataRecordSetCreateMessage(this.props.id, ds.id, recordSet));
  }

  onFeatureSelectionChanged = (record: FeatureDataRecord) => {
    MessageManager.getInstance().publishMessage(new SpatialDataRecordsSelectionChangeMessage(this.props.id, [record]));
  }

  publishSelectDataRecordMessage = () => {
    MessageManager.getInstance().publishMessage(new SelectDataRecordMessage(this.props.id, 'ds-2', '0'));
  }

  publishEmptyFeatureSelectionChanged = () => {
    MessageManager.getInstance().publishMessage(new SpatialDataRecordsSelectionChangeMessage(this.props.id, []));
  }

  render(){
    
    return <div>
      {this.props.useDataSources && this.props.useDataSources[0] && <DataSourceComponent useDataSource={this.props.useDataSources[0]} defaultQuery={this.state.query}>{
        (ds: FeatureLayerDataSource, dsInfo: IMDataSourceInfo) => {
          let isLoaded = dsInfo.status === DataSourceStatus.Loaded;
          let fileName = ds.getSchema().layerDefinition.displayField;
          if (!fileName || fileName === '') {
            fileName = ds.getSchema().layerDefinition.objectIdField;
          }
          let ids = ds.getSelectedRecordIds();
          let idFiled = ds.getIdField();
          let list = null;
          if (isLoaded) {
            list = ds.getRecords().map((r, i) => {
              if (i < 10) {
                return <div key={i} style={{backgroundColor: `${ids.indexOf(r.getData()[idFiled]) > -1 ? 'gray' : 'white'}`}} onClick={ () => {
                  this.onFeatureSelectionChanged(r as FeatureDataRecord);
                }}>{r.getData()[fileName]}</div>
              } else {
                return null
              }
            })
          } else {
            // ds.load(this.state.query);
            list = null;
          }
          return <div>
            <h5>This widget will publish <b>FEATURE_SET_CREATE</b> message</h5>
            <button onClick={() => this.showOnMap(ds)}>display features</button>
            <button onClick={() => this.publishEmptyFeatureSelectionChanged()}>reset filter</button>
            <button onClick={() => this.publishEmptyFeatureSelectionChanged()}>reset selected</button>
            {/* <button onClick={() => this.clearSeletedFeature()}>clear selected feature</button>
            <button onClick={() => this.publishSelectDataRecordMessage()}>publish selectDataRecord message</button> */}
            <div>query state: {dsInfo.status}</div>
            {list}
          </div>
        }
      }</DataSourceComponent>}
    </div>;
  }
}
