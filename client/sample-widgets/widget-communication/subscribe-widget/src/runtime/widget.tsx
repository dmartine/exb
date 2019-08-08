import {React, utils, IMDataSourceInfo, DataSourceComponent} from 'jimu-core';

import {BaseWidget, AllWidgetProps, DataSourceStatus} from 'jimu-core';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source'
import Query = require('esri/tasks/support/Query');

export default class Widget extends BaseWidget<AllWidgetProps<{}>, {query: any}>{
  state = {query: null}
  
  componentDidUpdate(prevProps: AllWidgetProps<{}>){
    if(utils.getValue(this.props, 'stateProps.queryString') !== utils.getValue(prevProps, 'stateProps.queryString')){
      let q = new Query({
        where: this.props.stateProps.queryString,
        outFields: ['name']
      })
      this.setState({query: q.toJSON()}) //if no .toJSON(), the query object is always deepEqual, why??
    }
  }

  componentDidMount(){
    let q = new Query({
      where: this.props.stateProps ? this.props.stateProps.queryString : '1=2',
      outFields: ['name']
    })
    this.setState({query: q.toJSON()})
  }

  render(){
    
    return <div className="widget-subscribe" style={{overflow: 'auto', maxHeight: '700px'}}>
      <h5>This widget will listen <b>STRING_SELECTION_CHANGE</b> and <b>FEATURE_SELECTION_CHANGE</b> message to do query</h5>
      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query}>{
        (ds: FeatureLayerDataSource, dsInfo: IMDataSourceInfo) => {
          let isLoaded = dsInfo.status === DataSourceStatus.Loaded;

          let list = isLoaded ? ds.getRecords().map((r, i) => {
            return <div key={i}>{r.getData()['name']}</div>
          }) : null;
          let content;
          if(!this.props.stateProps){
            content = 'no message';
          }else{
            content = <div>
              <div>The query string: {this.props.stateProps.queryString}</div>
              <div>query state: {dsInfo.status}</div>
              {list}
            </div>;      
          }

          return content;
        }
      }</DataSourceComponent>
    </div>;
  }
}
