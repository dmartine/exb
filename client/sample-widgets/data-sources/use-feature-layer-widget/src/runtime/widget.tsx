import {React, IMDataSourceInfo, DataSource} from 'jimu-core';

import {BaseWidget, AllWidgetProps, DataSourceComponent} from 'jimu-core';
import { DataActionDropDown } from 'jimu-ui';

interface State{
  query: any;
}

/**
 * This widget will show features from a configured feature layer
 */
export default class Widget extends BaseWidget<AllWidgetProps<{}>, State>{
  state = {query: null}
  cityNameRef: React.RefObject<HTMLInputElement> = React.createRef();

  componentDidMount(){
    this.query();
  }

  query = () => {
    if(!this.isDsConfigured()){
      return;
    }
    let fieldName = this.props.useDataSources[0].fields[0];
    let w = this.cityNameRef.current && this.cityNameRef.current.value ? 
    `${fieldName} like '%${this.cityNameRef.current.value}%'` : '1=1'
    this.setState({
      query: {
        where: w,
        outFields: ['*'],
        resultRecordCount: 10
      }
    });
  }

  isDsConfigured = () => {
    if(this.props.useDataSources &&
      this.props.useDataSources.length === 1 &&
      this.props.useDataSources[0].fields && 
      this.props.useDataSources[0].fields.length === 1){
      return true;
    }
    return false;
  }

  dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    let fName = this.props.useDataSources[0].fields[0];
    
    return <div>
      <div>
        <input placeholder="Query value" ref={this.cityNameRef}/>
        <button onClick={this.query}>Query</button>
      </div>
      <div>Query state: {info.status}</div>

      <div className="record-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
        {
          ds ? ds.getRecords().map((r, i) => {
            return <div key={i}>{r.getData()[fName]}</div>
          }) : null
        }
      </div>

      <DataActionDropDown dataSource={ds} records={ds.getRecords()}></DataActionDropDown>
    </div>
  }

  render(){
    if(!this.isDsConfigured()){
      return <h3>
        This widget demostrates how to use a feature layer as the data source.
        <br/>
        Please config data source.
      </h3>;
    }
    return <div className="widget-use-feature-layer" style={{width: '100%', height: '100%', maxHeight: '800px', overflow: 'auto'}}>
      <h3>
        This widget show how to use feature layer as a data source.
      </h3>

      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query}>
        {
          this.dataRender
        }
      </DataSourceComponent>
    </div>;
  }
}
