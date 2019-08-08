import {React, DataSourceComponent} from 'jimu-core';

import {BaseWidget, AllWidgetProps} from 'jimu-core';
import {MapViewDataSource} from 'jimu-arcgis/arcgis-data-source'
import { LayerViewDataSource } from 'jimu-arcgis/lib/data-sources/layer-view-data-source';
import { utils } from 'jimu-core';

interface Config{
  fieldName: string;
}

interface State{
  query
}

/**
 * This widget show how to use map view as a data source, and show data from a layer.
 */
export default class Widget extends BaseWidget<AllWidgetProps<Config>, State>{
  extentWatch: __esri.WatchHandle;
  layerViewDS: LayerViewDataSource;
  
  state = {query: null}

  isDsConfigured = () => {
    if(!(this.props.useDataSources && this.props.useDataSources.length === 1)){
      return false;
    }
    return true;
  }

  componentDidUpdate(){
    if(!this.layerViewDS){
      return;
    }

    let mapViewDs = this.layerViewDS.getRootViewDataSource() as MapViewDataSource;

    if(!this.extentWatch){
      this.extentWatch = mapViewDs.view.watch('extent', extent => { 
        this.doQuery(extent);    
      });

      this.doQuery(mapViewDs.view.extent);
    }
  }

  componentWillUnmount(){
    if(this.extentWatch){
      this.extentWatch.remove();
      this.extentWatch = null;
    }
  }

  doQuery = (extent: __esri.Extent) => {
    let q = {
      geometry: {
        type: extent.type,
        ...extent.toJSON()
      },
      spatialRelationship: 'intersects',
      outFields: '*'
    };
    if(!utils.isDeepEqual(q, this.state.query)){
      this.setState({query: q})
    }
  }

  dsRender = (ds) => {
    let list = ds.getRecords().map((r, i) => {
      return <div key={i}>{r.getData()[this.props.config.fieldName]}</div>
    });
    if(list.length === 0){
      list = [<div key={0}>No data</div>];
    }
    return <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
      {list}
    </div>
  }

  onDsInject = ds => {
    this.layerViewDS = ds;
  }

  render(){
    if(!this.isDsConfigured()){
      return 'No data source';
    }
    
    return <div className="widget-use-map-view" style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <h3>
        This widget demostrates how to use map view as the data source, and display data from a layer.
      </h3>

      <DataSourceComponent onDataSourceCreated={this.onDsInject}
        useDataSource={this.props.useDataSources[0]} query={this.state.query}>
        {this.dsRender}
      </DataSourceComponent>
      
    </div>;
  }
}
