import {React, DataSourceComponent, IMDataSourceInfo, DataSourceSchema} from 'jimu-core';

import {BaseWidget, AllWidgetProps} from 'jimu-core';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source'

interface Config{
  fieldName: string; //this is the jimuFieldName
}

interface State{
  query: any;
}

/**
 * This widget will show features from a configured feature layer
 */
export default class Widget extends BaseWidget<AllWidgetProps<Config>, State>{
  cityNameRef: React.RefObject<HTMLInputElement> = React.createRef();
  ds: FeatureLayerDataSource;

  componentDidMount(){
    this.query();
  }

  constructor(props){
    super(props);
    this.state = {query: null};
  }

  query = () => {
    if(!this.ds){
      return;
    }
    let realFieldName = (this.ds.dataSourceJson.schema as DataSourceSchema).fields[this.props.config.fieldName].name;
    let w = this.cityNameRef.current && this.cityNameRef.current.value ? 
      `${realFieldName} like '%${this.cityNameRef.current.value}%'` : '1=1'
    this.setState({
      query: {
        where: w,
        outFields: [realFieldName],
        resultRecordCount: 10
      }
    });
  }

  isDsConfigured = () => {
    if(!(this.props.useDataSources && this.props.useDataSources.length === 1)){
      return false;
    }
    return true;
  }

  onDsInjected = (ds) => {
    this.ds = ds;
  }

  dsRender = (ds, info: IMDataSourceInfo) => {
    return <div>
      <div>
        <input placeholder="City Name" ref={this.cityNameRef}/>
        <button onClick={this.query}>Query</button>
      </div>
      <div>query state: {info.status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          ds ? ds.getRecords().map((r, i) => {
            return <div key={i}>{r.getData()[this.props.config.fieldName]}</div>
          }) : null
        }
      </div>
    </div>
  }

  render(){
    if(!this.isDsConfigured()){
      return 'No data source';
    }

    return <div className="widget-use-feature-layer" style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <h3>
        This widget show how to use feature layer as a data source, and use data source mapping.
      </h3>

      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query} onDataSourceCreated={this.onDsInjected}>
        {
          this.dsRender
        }
      </DataSourceComponent>
    </div>;
  }
}
