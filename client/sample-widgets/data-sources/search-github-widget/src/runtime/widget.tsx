import {React, IMState, SimpleDataRecord, DataSourceStatus, DataRecord, DataSource, DataSourceComponent, IMDataSourceInfo} from 'jimu-core';

import {BaseWidget, AllWidgetProps, SimpleLocalDataSource, DataSourceManager} from 'jimu-core';
import { GithubRepositoryDataSource } from './github-data-source';

interface PreloadProps{
  preloadQueryString: string;
}
interface State{
  query: string;
}
export default class Widget extends BaseWidget<AllWidgetProps<{}> & PreloadProps, State>{
  searchRepoNameRef: React.RefObject<HTMLInputElement> = React.createRef();
  addRepoNameRef: React.RefObject<HTMLInputElement> = React.createRef();

  outputDataSource: Promise<SimpleLocalDataSource>;
  ds: GithubRepositoryDataSource;

  state = {query: null}

  static preloadData = (state: IMState, allProps: AllWidgetProps<{}>, dataSources: {[dsId: string]: DataSource}): Promise<PreloadProps> => {
    return Widget.query(allProps, 'react', dataSources).then((data) => {
      return {
        preloadQueryString: 'react',
      }
    });
  };

  static isDsConfigured = (props: AllWidgetProps<{}>) => {
    if(!(props.useDataSources && props.useDataSources.length === 1)){
      return false;
    }
    return true;
  }

  static query = (props: AllWidgetProps<{}>, queryVal: string, dataSources: {[dsId: string]: DataSource}): Promise<any[]> => {
    if(!Widget.isDsConfigured(props)){
      return Promise.resolve([]);
    }
    let ds: GithubRepositoryDataSource = dataSources && dataSources[props.useDataSources[0].dataSourceId] as GithubRepositoryDataSource;
    if(ds){
      return ds.load(queryVal).then(records => {
        return records.map(r => r.getData());
      });
    }else{
      return Promise.resolve([]);
    }
  }

  thisQuery = () => {
    if(this.searchRepoNameRef.current && this.searchRepoNameRef.current.value){
      this.setState({query: this.searchRepoNameRef.current.value})
    }
  }

  createOutputDs = (records: DataRecord[]) => {
    if(!this.outputDataSource){
      this.outputDataSource = DataSourceManager.getInstance().createDataSource(this.props.outputDataSources[0]).then((ds: SimpleLocalDataSource) => {
        ds.setRecords([...records]);
        return ds as SimpleLocalDataSource;
      });
    }else{
      this.outputDataSource.then(ds => {
        ds.updateAllRecoreds([...records]);
      });
    }
  }

  private updateOutputDs(){
    if(!this.ds){
      return;
    }
    if(this.ds.getStatus() === DataSourceStatus.Loaded){
      this.createOutputDs(this.ds.getRecords())
    }
  }

  add = () => {
    this.ds.addRecord(new SimpleDataRecord({
      full_name: this.addRepoNameRef.current.value
    }, this.ds));
  }

  dsRender = (ds: DataSource, info: IMDataSourceInfo) => {
    this.updateOutputDs();
    
    let list = ds ? ds.getRecords().map((r, i) => {
      return <div key={i}>{r.getData().full_name}</div>
    }) : null;

    return <>
    <div>
      <div>
        <input placeholder="Repository Name" defaultValue={this.props.preloadQueryString} ref={this.searchRepoNameRef}/>
        <button onClick={this.thisQuery}>Query</button>
      </div>
      <div>query state: {info.status}</div>
    </div>
  
    <div style={{marginTop: '20px'}}>
      <div>
        <input placeholder="Repository Name" ref={this.addRepoNameRef}/>
        <button onClick={this.add}>Add</button>
      </div>
      <div>add state: {info.saveStatus}</div>
    </div>

    <div className="repo-list" style={{width: '100%', marginTop: '20px', height: 'calc(100% - 80px)', overflow: 'auto'}}>
      {list}
    </div>
    </>
  }

  onDsCreate = (ds) => {
    this.ds = ds;
  }

  render(){
    if(!Widget.isDsConfigured(this.props)){
      return 'No data source';
    }
    return <div className="widget-github-repo" style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <h3>
      This widget will show:<br/>
        * how to create custom data source type<br/>
        * how to output data source so other widget can use<br/>
        * how to edit the data source and the consumer widget can reflect the update.<br/>
        * how to preload props.<br/>
      </h3>

      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query} onDataSourceCreated={this.onDsCreate}>
        {this.dsRender}
      </DataSourceComponent>
      
    </div>;
  }
}
