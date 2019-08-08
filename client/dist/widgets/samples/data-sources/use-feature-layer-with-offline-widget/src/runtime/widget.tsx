import {React, IMState} from 'jimu-core';

import {BaseWidget, AllWidgetProps} from 'jimu-core';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source';
import Query = require('esri/tasks/support/Query');

interface Config{
  fieldName: string; //this is the jimuFieldName
}
interface ExtraProps{
  isNetworkOffLine: boolean
}

FeatureLayerDataSource;

/**
 * This widget will show features from a configured feature layer
 */
export default class Widget extends BaseWidget<AllWidgetProps<Config> & ExtraProps, {}>{
  cityNameRef: React.RefObject<HTMLInputElement> = React.createRef();

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<{}>): ExtraProps => {
    return {
      isNetworkOffLine: state.appContext.isNetworkOffLine
    };
  }

  componentDidMount(){
    this.query();
  }

  query = () => {
    if(!this.isDsConfigured()){
      return;
    }
    let ds: FeatureLayerDataSource = this.props.dataSources[this.props.useDataSources[0].dataSourceId] as FeatureLayerDataSource;
    if(ds){
      let realFieldName = ds.dataSourceJson.schema.fields[this.props.config.fieldName].name;
      let w = this.cityNameRef.current && this.cityNameRef.current.value ? 
      `${realFieldName} like '%${this.cityNameRef.current.value}%'` : '1=1'

      if(this.props.isNetworkOffLine){
        let q = {
          selector: {
            [realFieldName]: {$regex: new RegExp(this.cityNameRef.current.value)}
          }
        };
        ds.loadFromLocal(q);
      }else{
        let q = new Query({
          where: w,
          outFields: [realFieldName, ds.getIdField()]
        });
        ds.load(q);
      }
    }
  }

  isDsConfigured = () => {
    if(!(this.props.useDataSources && this.props.useDataSources.length === 1)){
      return false;
    }
    return true;
  }

  render(){
    if(!this.isDsConfigured()){
      return 'No data source';
    }

    let dsId = this.props.useDataSources[0].dataSourceId;
    let ds = this.props.dataSources[dsId];
    let list = ds ? ds.getRecords().map((r, i) => {
      return <div key={i}>{r.getData()[this.props.config.fieldName]}</div>
    }) : null;
    return <div className="widget-use-feature-layer" style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <h3>
        This widget show how to use feature layer as a data source, and how to support offline.
      </h3>

      <div>
        <div>
          <input placeholder="City Name" ref={this.cityNameRef}/>
          <button onClick={this.query}>Query</button>
        </div>
        <div>
          Network state: {this.props.isNetworkOffLine ? 'OffLine' : 'Online'}
          <div style={{color: 'red'}}>
            {this.props.isNetworkOffLine ? 'The network is offline, the query is from local cache.' : ''}
          </div>
        </div>
        <div>query state: {this.props.dataSourcesInfo[dsId].status}</div>
      </div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {list}
      </div>
    </div>;
  }
}
