import {React, AllWidgetProps, classNames, MessageManager,
  getAppStore, appActions, MutableStoreManager, ExtentChangeMessage} from 'jimu-core';
import {Icon} from 'jimu-ui';
import { IMConfig } from '../../config';
import MapBase, {MapLoadStatus} from './mapbase';

let Exchange = require('jimu-ui/lib/icons/exchange.svg');

interface Props {
  baseWidgetProps: AllWidgetProps<IMConfig>;
  startLoadModules: boolean;
}

interface MapContainerStyle {
  opacity: number;
  zIndex: number
}

interface State {
  currentMapIndex?: 0 | 1;
  multiMapStyle?: MapContainerStyle[];
  firstMapDsId?: string;
  secondMapDsId?: string;
  activeViewPoint?: __esri.Viewpoint;
  useAnimation: boolean;
}

const VisibleStyles = {
  firstMapVisible: [{
    zIndex: 6,
    opacity: 1
  }, {
    zIndex: 5,
    opacity: 0
  }],
  secondMapVisible : [{
    zIndex: 5,
    opacity: 0
  }, {
    zIndex: 6,
    opacity: 1
  }]
}

export default class MultiSourceMap extends React.PureComponent<Props, State>{
  isReIniting: boolean;
  mutableStatePropsMap: {[propKey: string]: string[]} = {};

  constructor(props) {
    super(props);

    let restoreData = MutableStoreManager.getInstance().getStateValue([this.props.baseWidgetProps.id, 'restoreData',
      `${this.props.baseWidgetProps.id}-restoreData-multimap`]);
    if (restoreData) {
      this.reInitWidgetInstance(restoreData);
      this.props.baseWidgetProps.dispatch(appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id, 
        `restoreData.${this.props.baseWidgetProps.id}-restoreData-multimap`, null));
    } else {
      this.state = {
        currentMapIndex: 0,
        multiMapStyle: VisibleStyles.firstMapVisible,
        firstMapDsId: null,
        secondMapDsId: null,
        activeViewPoint: null,
        useAnimation: false
      };
    }

    this.mutableStatePropsMap = {};
  }

  reInitWidgetInstance = (restoreData) => {
    this.state = restoreData as State;
    this.isReIniting = true;
  }

  componentDidMount(){
    if (this.isReIniting) {
      return;
    }

    if (this.props.baseWidgetProps.useDataSources) {
      let initialMapDataSourceID = this.props.baseWidgetProps.config.initialMapDataSourceID;
      if (!initialMapDataSourceID) {
        this.setState({
          firstMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId,
          secondMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId
        });
      } else {
        if (initialMapDataSourceID === (this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId)) {
          this.setState({
            firstMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId,
            secondMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId
          });
        } else if (initialMapDataSourceID === (this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId)) {
          this.setState({
            firstMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId,
            secondMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId
          });
        } else {
          this.setState({
            firstMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId,
            secondMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId
          });
        }
      }
    }
  }

  componentWillUnmount() {
    let widgets =  getAppStore().getState().appConfig.widgets;

    if (widgets[this.props.baseWidgetProps.id] && widgets[this.props.baseWidgetProps.id].outputDataSources === this.props.baseWidgetProps.outputDataSources 
      && widgets[this.props.baseWidgetProps.id].outputDataSources) {
      let restoreData = {
        currentMapIndex: this.state.currentMapIndex,
        multiMapStyle: this.state.multiMapStyle,
        firstMapDsId: this.state.firstMapDsId,
        secondMapDsId: this.state.secondMapDsId,
        activeViewPoint: this.state.activeViewPoint,
        useAnimation: this.state.useAnimation
      }
      this.props.baseWidgetProps.dispatch(appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id, 
        `restoreData.${this.props.baseWidgetProps.id}-restoreData-multimap`, restoreData));
    }
  }

  getChangedState = (firstMapDsId, secondMapDsId, useDataSources): State => {
    let changedState = {} as State;

    if (useDataSources && useDataSources[0]) {
      let newDataSourceArr = [];
      let repeatDataSourceArr = [];
      for (let i = 0; i < useDataSources.length; i++) {
        if (firstMapDsId !== useDataSources[i].dataSourceId) {
          newDataSourceArr.push(useDataSources[i].dataSourceId);
        } else {
          repeatDataSourceArr.push(useDataSources[i].dataSourceId);
        }
      }
      if (repeatDataSourceArr.length > 0) {
        changedState.firstMapDsId = firstMapDsId;
        changedState.secondMapDsId = newDataSourceArr[0];
      } else if (repeatDataSourceArr.length === 0) {
        if (newDataSourceArr.indexOf(secondMapDsId) > -1) {
          newDataSourceArr.splice(newDataSourceArr.indexOf(secondMapDsId), 1);
          changedState.firstMapDsId = newDataSourceArr[0];
          changedState.secondMapDsId = secondMapDsId;
        } else {
          changedState.firstMapDsId = newDataSourceArr[0];
          changedState.secondMapDsId = newDataSourceArr[1];
        }
      }
    } else {
      changedState.firstMapDsId = null;
      changedState.secondMapDsId = null;
    }

    if (changedState.firstMapDsId !== firstMapDsId) {
      if (changedState.firstMapDsId) {
        changedState.multiMapStyle = VisibleStyles.firstMapVisible;
        changedState.currentMapIndex = 0;
      } else if (changedState.secondMapDsId) {
        changedState.multiMapStyle = VisibleStyles.secondMapVisible;
        changedState.currentMapIndex = 1;
      } else {
        changedState.multiMapStyle = VisibleStyles.firstMapVisible;
        changedState.currentMapIndex = 0;
      }
    } else {
      if (!changedState.secondMapDsId) {
        changedState.multiMapStyle = VisibleStyles.firstMapVisible;
        changedState.currentMapIndex = 0;
      } else if (changedState.secondMapDsId !== secondMapDsId) {
        changedState.multiMapStyle = VisibleStyles.secondMapVisible;
        changedState.currentMapIndex = 1;
      }
    }
    return changedState;
  }

  componentWillReceiveProps (newProps: Props) {
    if (newProps.baseWidgetProps.useDataSources !== this.props.baseWidgetProps.useDataSources) {
      let newState = this.getChangedState(this.state.firstMapDsId, this.state.secondMapDsId, newProps.baseWidgetProps.useDataSources);
      if (!(newProps.baseWidgetProps.useDataSources && newProps.baseWidgetProps.useDataSources[0])) {
        newState.activeViewPoint = null;
      }
      this.setState(newState);
    }

    if (newProps.baseWidgetProps.stateProps && newProps.baseWidgetProps.stateProps.initialMapDataSourceID) {
      let initialMapDataSourceID = newProps.baseWidgetProps.stateProps.initialMapDataSourceID;
      if (this.state.firstMapDsId === initialMapDataSourceID) {
        let firstMapInstance = this.refs.firstMapInstance as MapBase;
        if (firstMapInstance) {
          firstMapInstance.goHome(false);
        }
      }
      if (this.state.secondMapDsId === initialMapDataSourceID) {
        let secondMapInstance = this.refs.secondMapInstance as MapBase;
        if (secondMapInstance) {
          secondMapInstance.goHome(false);
        }
      }
      this.props.baseWidgetProps.dispatch(appActions.widgetStatePropChange(this.props.baseWidgetProps.id,
        'initialMapDataSourceID', null));
    }
  }

  componentDidUpdate (prevProps) {
    if (this.isReIniting) {
      this.isReIniting = false;
      return;
    }

    if (this.props.baseWidgetProps.config.initialMapDataSourceID !== prevProps.baseWidgetProps.config.initialMapDataSourceID) {
      this.changeInitialMapDataSourceID(this.props.baseWidgetProps.config.initialMapDataSourceID);
    }
  }

  changeInitialMapDataSourceID = (dataSourceId: string) => {
    if (this.props.baseWidgetProps.useDataSources.length > 1 ) {
      let firstMapInstance = this.refs.firstMapInstance as MapBase;
      let secondMapInstance = this.refs.secondMapInstance as MapBase;

      if (!this.state.currentMapIndex) {
        if (this.state.secondMapDsId && this.state.secondMapDsId === dataSourceId) {
          this.startChangeInitialMapAnimation();
          secondMapInstance.goHome(false);
        } else {
          firstMapInstance.goHome(false);
        }

      } else {
        if (this.state.firstMapDsId && this.state.firstMapDsId === dataSourceId) {
          this.startChangeInitialMapAnimation();
          firstMapInstance.goHome(false);
        } else {
          secondMapInstance.goHome(false);
        }
      }
    }
  }

  startChangeInitialMapAnimation = () => {
    let tempState = Object.assign({}, this.state) as any;

    let firstMapInstance = this.refs.firstMapInstance as MapBase;
    let secondMapInstance = this.refs.secondMapInstance as MapBase;
    if (!this.state.currentMapIndex) {
      tempState.currentMapIndex = 1;
      tempState.multiMapStyle = VisibleStyles.secondMapVisible;

      let viewPoint = firstMapInstance && firstMapInstance.getViewPoint && firstMapInstance.getViewPoint();
      if (viewPoint) {
        secondMapInstance && secondMapInstance.setViewPoint && secondMapInstance.setViewPoint(viewPoint);
      }
      this.setState(tempState);
    } else {
      tempState.currentMapIndex = 0;
      tempState.multiMapStyle = VisibleStyles.firstMapVisible;

      let viewPoint = secondMapInstance && secondMapInstance.getViewPoint && secondMapInstance.getViewPoint();
      if (viewPoint) {
        firstMapInstance && firstMapInstance.setViewPoint && firstMapInstance.setViewPoint(viewPoint);
      }
      this.setState(tempState);
    }
  }

  switchMap = () => {
    let tempState = Object.assign({}, this.state) as any;
    tempState.useAnimation = true

    let firstMapInstance = this.refs.firstMapInstance as MapBase;
    let secondMapInstance = this.refs.secondMapInstance as MapBase;

    if (!this.state.currentMapIndex) {
      tempState.currentMapIndex = 1;
      tempState.multiMapStyle = VisibleStyles.secondMapVisible;

      let viewPoint = firstMapInstance && firstMapInstance.getViewPoint && firstMapInstance.getViewPoint();
      if (viewPoint) {
        secondMapInstance && secondMapInstance.setViewPoint && secondMapInstance.setViewPoint(viewPoint);
      }
    } else {
      tempState.currentMapIndex = 0;
      tempState.multiMapStyle = VisibleStyles.firstMapVisible;

      let viewPoint = secondMapInstance && secondMapInstance.getViewPoint && secondMapInstance.getViewPoint();
      if (viewPoint) {
        firstMapInstance && firstMapInstance.setViewPoint && firstMapInstance.setViewPoint(viewPoint);
      }
    }

    if (firstMapInstance && secondMapInstance) {
      let firstViewType = firstMapInstance.getViewType();
      let secondViewType = secondMapInstance.getViewType();
      if (firstViewType && secondViewType && (firstViewType !== secondViewType)) {
        firstMapInstance.goToTilt(0);
        secondMapInstance.goToTilt(0);

        if (this.state.currentMapIndex) {
          setTimeout(() => {
            firstMapInstance.goToTilt(45);
          }, 300);
        } else {
          setTimeout(() => {
            secondMapInstance.goToTilt(45);
          }, 300);
        }
      }
    }

    this.setState(tempState, () => {
      setTimeout(() => {
        this.setState({
          useAnimation: false
        });
      }, 500);
    });
  }

  handleMutableStatePropsChanged = (dataSourceId: string, propKey: string, value?: any) => {
    if (!this.mutableStatePropsMap[propKey]) {
      this.mutableStatePropsMap[propKey] = [dataSourceId];
    } else {
      if (this.mutableStatePropsMap[propKey].indexOf(dataSourceId) === -1) {
        this.mutableStatePropsMap[propKey].push(dataSourceId);
      }
    }

    let multiMapDsIds = [];
    let firstMapInstance = this.refs.firstMapInstance as MapBase;
    let secondMapInstance = this.refs.secondMapInstance as MapBase;

    if (firstMapInstance && firstMapInstance.getViewType()) {
      multiMapDsIds.push(this.state.firstMapDsId);
    }

    if (secondMapInstance && secondMapInstance.getViewType()) {
      multiMapDsIds.push(this.state.secondMapDsId);
    }

    let isAllMatched = true;
    for (let i = 0; i < multiMapDsIds.length; i++) {
      if (this.mutableStatePropsMap[propKey].indexOf(multiMapDsIds[i]) === -1) {
        isAllMatched = false;
        break;
      }
    }

    if (isAllMatched) {
      delete this.mutableStatePropsMap[propKey];
      this.props.baseWidgetProps.dispatch(appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id,
        propKey, value));
    }
  }

  handleViewChanged = (dataSourceId: string, viewPoint: __esri.Viewpoint) => {
    if (viewPoint === null) {
      this.setState({
        activeViewPoint: null
      });
      return;
    }

    let currentVisibleDsId = this.getCurrentVisibleDsId();
    if (currentVisibleDsId === dataSourceId) {
      this.setState({
        activeViewPoint: viewPoint
      });
    }
  }

  handleExtentChanged = (dataSourceId: string, extentMessage: ExtentChangeMessage) => {
    let currentVisibleDsId = this.getCurrentVisibleDsId();
    if (currentVisibleDsId === dataSourceId) {
      MessageManager.getInstance().publishMessage(extentMessage);
    }
  }

  handleMapLoaded = (dataSourceId: string, mapLoadStatus: MapLoadStatus) => {
    this.forceUpdate();
  }

  isShowMapSwitchBtn = (): boolean => {
    let firstMapInstance = this.refs.firstMapInstance as MapBase;
    let secondMapInstance = this.refs.secondMapInstance as MapBase;
    if (firstMapInstance && secondMapInstance) {
      if(firstMapInstance.getMapLoadStatus() !== MapLoadStatus.Loading && secondMapInstance.getMapLoadStatus() !== MapLoadStatus.Loading) {
        return true;
      }
    } else {
      return false;
    }
  }

  getCurrentVisibleDsId = () => {
    if (this.state.multiMapStyle[0].opacity === 1) {
      return this.state.firstMapDsId;
    } else {
      return this.state.secondMapDsId;
    }
  }

  render() {
    return <div className="jimu-widget" style={{position: 'relative'}}>
      <div className={classNames('jimu-widget', {
        'multisourcemap-item-appear': this.state.useAnimation && this.state.multiMapStyle[0].opacity, 
        'multisourcemap-item-disappear': this.state.useAnimation && !(this.state.multiMapStyle[0].opacity), 
        'multisourcemap-item-appear-noanimate': this.state.multiMapStyle[0].opacity, 
        'multisourcemap-item-disappear-noanimate': !(this.state.multiMapStyle[0].opacity)
      })}
        style={{position: 'absolute', zIndex: this.state.multiMapStyle[0].zIndex}}>
        {this.state.firstMapDsId && <MapBase ref="firstMapInstance" activeViewPoint={this.state.activeViewPoint} 
          onViewChanged={this.handleViewChanged} baseWidgetProps={this.props.baseWidgetProps} onMapLoaded={this.handleMapLoaded}
          onMutableStatePropsChanged={this.handleMutableStatePropsChanged} onExtentChanged={this.handleExtentChanged}
          startLoadModules={this.props.startLoadModules} dataSourceId={this.state.firstMapDsId}>
        </MapBase>}
      </div>
      <div className={classNames('jimu-widget', {
        'multisourcemap-item-appear': this.state.useAnimation && this.state.multiMapStyle[1].opacity, 
        'multisourcemap-item-disappear': this.state.useAnimation && !(this.state.multiMapStyle[1].opacity),
        'multisourcemap-item-appear-noanimate': this.state.multiMapStyle[1].opacity, 
        'multisourcemap-item-disappear-noanimate': !(this.state.multiMapStyle[1].opacity)
      })}
        style={{position: 'absolute', zIndex: this.state.multiMapStyle[1].zIndex}}>
        {this.state.secondMapDsId && <MapBase ref="secondMapInstance" activeViewPoint={this.state.activeViewPoint} 
        onViewChanged={this.handleViewChanged} baseWidgetProps={this.props.baseWidgetProps} onMapLoaded={this.handleMapLoaded}
        onMutableStatePropsChanged={this.handleMutableStatePropsChanged} onExtentChanged={this.handleExtentChanged}
        startLoadModules={this.props.startLoadModules} dataSourceId={this.state.secondMapDsId}>
        </MapBase>}
      </div>
      {this.props.baseWidgetProps.useDataSources.length > 1 && this.isShowMapSwitchBtn() && <div className="mapswitch-container">
        <div onClick={(e) => {e.preventDefault(); this.switchMap(); }} className="border-0 jimu-widget esri-widget--button" >
        <Icon icon={Exchange} width={16} height={16} className="mapswitch-icon"/>
      </div></div>}
    </div>
  }
}