import {React, IMState, ImmutableObject, IMDataSourceJson, DataSourceManager, QueriableDataSource, Immutable} from 'jimu-core';

import {BaseWidget, AllWidgetProps} from 'jimu-core';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source';

interface ExtraProps{
  allDataSources: ImmutableObject<{[dsId: string]: IMDataSourceJson}>;
}

interface OfflineStatus{
  isOffline: boolean;
  offlineRecordCount: number;
  workingState: string
}

interface State{
  offlineStatus: ImmutableObject<{
    [dsId: string]: OfflineStatus
  }>,
  storageInfo: {
    quota: number,
    usage: number
  }
}
FeatureLayerDataSource;
export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, State>{
  dsManager: DataSourceManager;
  filterRef: React.RefObject<HTMLInputElement> = React.createRef();

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<{}>): ExtraProps => {
    return {
      allDataSources: state.appConfig.dataSources
    };
  }

  constructor(props){
    super(props);

    this.dsManager = DataSourceManager.getInstance();
    this.state = {
      offlineStatus: Immutable({}) as ImmutableObject<{
        [dsId: string]: OfflineStatus
      }>,
      storageInfo: {
        quota: 0,
        usage: 0
      }
    }
  }

  offlineData = (dsId: string) => {
    let ds: QueriableDataSource = this.dsManager.getDataSource(dsId) as QueriableDataSource;
    if(!ds.query){
      console.error('Only QueriableDataSource can be offline.');
      return;
    }

    this.setState({offlineStatus: this.state.offlineStatus.setIn([dsId, 'workingState'], 'Doing...')});
    ds.offlineData({
      where: this.filterRef.current.value,
      outFields: ['*']
    }).then(records => {
      this.setState({offlineStatus: this.state.offlineStatus.set(dsId, {
        isOffline: true,
        offlineRecordCount: records.length,
        workingState: `Done.`
      })});

      this.updateStorageInfo();
    }, err => {
      console.error(err);
      this.setState({offlineStatus: err.message});
    })
  };

  deleteOfflineData = (dsId: string) => {
    this.setState({offlineStatus: this.state.offlineStatus.setIn([dsId, 'workingState'], 'Doing...')});
    this.dsManager.destroyLocalDB(dsId).then(() => {
      this.setState({offlineStatus: this.state.offlineStatus.set(dsId, {
        isOffline: false,
        workingState: 'Done'
      })});

      this.updateStorageInfo();
    });
    
  }

  componentDidMount(){
    this.updateStorageInfo();

    Object.keys(this.props.allDataSources).forEach(dsId => {
      if(!this.dsManager.getDataSource(dsId)){
        this.dsManager.createDataSource(dsId);
      }   
      
      this.dsManager.isDataSourceInLocal(dsId).then(inLocal => {
        if(inLocal){
          this.dsManager.getLocalDBInfo(dsId).then(info => {
            this.setState({offlineStatus: this.state.offlineStatus.set(dsId, {
              isOffline: true,
              offlineRecordCount: info.doc_count,
              workingState: ``
            })});
          });
        }else{
          this.setState({offlineStatus: this.state.offlineStatus.set(dsId, {
            isOffline: false,
            workingState: ''
          })});
        }
      })
    });
    
  }

  updateStorageInfo(){
    navigator.storage.estimate().then(estimate => {
      this.setState({
        storageInfo: {
          quota: Math.round(estimate.quota / (1024 * 1024)),
          usage: Math.round(estimate.usage / (1024 * 1024))
        }
      })
    });
  }

  render(){
    return <div className="widget-datasource-offline" style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <h2>This widget manages data source offline.</h2>
      <div>
        <h4>Estimated Storage Info:</h4>
        <div>{this.state.storageInfo.usage}M/{this.state.storageInfo.quota}M</div>
      </div>
      <br/>
      <div className="ds-list">
        {Object.keys(this.props.allDataSources).map(dsId => {
          return <div className="ds-item" key={dsId}>
            <div><b>Data source:</b>{this.props.allDataSources[dsId].label}</div>
            <div><b>Offline Status:</b>{this.state.offlineStatus[dsId] && this.state.offlineStatus[dsId].isOffline? `Offlined, count: ${this.state.offlineStatus[dsId].offlineRecordCount}`: 'Not offlined'}</div>
            <div>
              <label><b>Select data to offline:</b>
                <input defaultValue="city_name like '%ab%'" ref={this.filterRef} style={{marginLeft: '10px'}}/>
              </label>
              
              <button onClick={() => this.offlineData(dsId)} style={{marginLeft: '10px'}}>Offline</button>
            </div>
            
            {this.state.offlineStatus[dsId] && this.state.offlineStatus[dsId].isOffline && <button onClick={() => this.deleteOfflineData(dsId)}>Delete Offline Data</button>}

            <div>{this.state.offlineStatus[dsId] && this.state.offlineStatus[dsId].workingState}</div>
          </div>
        })}
      </div>
    </div>;
  }
}
