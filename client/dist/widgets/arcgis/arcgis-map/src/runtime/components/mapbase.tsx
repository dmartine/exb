import {React, DataSourceManager, loadArcGISJSAPIModules, ExtentChangeMessage, DataSourceComponent, 
  getAppStore, appActions, MutableStoreManager} from 'jimu-core';
import { IMConfig } from '../../config';
import { MapDataSource, MapViewDataSource, SceneViewDataSource, DataSourceTypes,
  MapViewDataSourceConstructorOptions, SceneViewDataSourceContructorOptions} from 'jimu-arcgis/arcgis-data-source';
import OverView from '../tools/overview';
import { controlUIWidget, createNewFeaturelayer, updateFeaturelayer, getMapBaseRestoreData, restoreMapBase, selectFeature, mapPanto, flashFeaturesByQuery} from '../utils';
import {MapWidgetProps, ActionRelatedProps} from '../widget';
import defaultMessages from '../translations/default';

interface Props{
  baseWidgetProps: MapWidgetProps;
  startLoadModules: boolean;
  dataSourceId: string;
  onViewChanged?: (dataSourceId: string, viewPoint: __esri.Viewpoint) => void;
  activeViewPoint?: __esri.Viewpoint;
  onMutableStatePropsChanged?: (dataSourceId: string, propKey: string, value?: any) => void;

  onExtentChanged?: (dataSourceId: string, message: ExtentChangeMessage) => void;
  onMapLoaded?: (dataSourceId: string, mapLoadStatus: MapLoadStatus) => void;
}

export enum MapLoadStatus {
  Loading = 'LOADING',
  Loadok = 'LOADOK',
  LoadError = 'LOADERROR'
}

export interface HighLightHandle {
  layerId: string;
  handle: __esri.Handle;
}

interface State{
  mapDs?: MapDataSource;
  preMapDs?: MapDataSource;
  isModulesLoaded?: boolean;
  mapLoadStatus?: MapLoadStatus;
}

export default class MapBase extends React.PureComponent<Props, State>{
  mapContainer: HTMLDivElement;
  widgetContainer: HTMLDivElement;

  MapView: typeof __esri.MapView;
  SceneView: typeof __esri.SceneView;
  Extent: typeof  __esri.geometry.Extent;
  Zoom: typeof  __esri.Zoom;
  ScaleBar: typeof  __esri.ScaleBar;
  Home: typeof  __esri.Home;
  Locate: typeof  __esri.Locate;
  Search: typeof  __esri.widgetsSearch;
  Compass: typeof  __esri.Compass;
  Navigate: typeof __esri.NavigationToggle;
  Viewpoint: typeof  __esri.Viewpoint;

  //attributes
  mapView: __esri.MapView;
  sceneView: __esri.SceneView;
  mapViewDS: MapViewDataSource;
  sceneViewDS: SceneViewDataSource;
  overview?: OverView;
  zoomBtn: __esri.Zoom;
  scaleBar: __esri.ScaleBar;
  homeBtn: __esri.Home;
  locateBtn: __esri.Locate;
  searchBtn: __esri.widgetsSearch;
  compassBtn: __esri.Compass;
  navigateBtn: __esri.NavigationToggle;
  extentWatch: __esri.WatchHandle;
  highLightHandles: {[layerId: string]: __esri.Handle} = {};
  mapBaseViewEventHandles: {[eventName: string]: __esri.Handle} = {};
  dsManager = DataSourceManager.getInstance();
  initialViewPoint: __esri.Viewpoint = null;

  onExtented = null;
  isReceiveExtentChange = false;

  constructor(props) {
    super(props);

    let restoreData = MutableStoreManager.getInstance().getStateValue([this.props.baseWidgetProps.id, 'restoreData',
      `${this.props.baseWidgetProps.id}-restoreData-${this.props.dataSourceId}`]);
    
    if (restoreData) {
      restoreMapBase(this, restoreData);
      this.props.baseWidgetProps.dispatch(appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id,
        `restoreData.${this.props.baseWidgetProps.id}-restoreData-${this.props.dataSourceId}`, null));
      
      this.bindMapBaseViewEvent(this.mapView || this.sceneView);
    } else {
      this.state = {
        mapLoadStatus: MapLoadStatus.Loading
      } as State;
    }
  }

  startRenderMap = () => {
    loadArcGISJSAPIModules([
      'esri/geometry/Extent',
      'esri/widgets/Zoom',
      'esri/widgets/ScaleBar',
      'esri/widgets/Home',
      'esri/widgets/Locate',
      'esri/widgets/Search',
      'esri/widgets/Compass',
      'esri/widgets/NavigationToggle',
      'esri/Viewpoint'
    ]).then(modules => {
      [
        this.Extent, this.Zoom, this.ScaleBar, this.Home, this.Locate, this.Search, this.Compass, this.Navigate, this.Viewpoint
      ] = modules;

      this.setState({
        isModulesLoaded: true
      });
    });
  }

  componentDidMount() {
    if (this.widgetContainer.getElementsByClassName('widget-map').length === 0 ) {
      if (!this.mapContainer) {
        this.mapContainer = document && document.createElement('div');
        this.mapContainer.className = 'jimu-widget widget-map';
      }
      this.widgetContainer.appendChild(this.mapContainer);
    }

    if(this.props.startLoadModules && !this.state.isModulesLoaded){
      this.startRenderMap();
      return;
    }

    if (!this.getMapDsId()) {
      return;
    }

    if(!this.state.mapDs){
      return;
    }

    if (this.state.mapDs.type === DataSourceTypes.WebMap) {
      // init and update map
      this.analysisMapView().then(() => {
        this.updateMapView(this.props.baseWidgetProps.config);
      });
    }

    if (this.state.mapDs.type === DataSourceTypes.WebScene) {
      // init and update map
      this.analysisSceneView().then(() => {
        this.updateSceneView(this.props.baseWidgetProps.config);
      });
    }
  }

  componentDidUpdate() {
    if(!this.state.isModulesLoaded){
      return;
    }

    const curDsId = this.getMapDsId();
    const prevDsId = this.state.preMapDs && this.state.preMapDs.id;

    const curDsItemId = this.state.mapDs && this.state.mapDs.dataSourceJson.itemId;
    const preDsItemId = this.state.preMapDs && this.state.preMapDs.dataSourceJson.itemId;

    if (curDsId !== prevDsId || curDsItemId !== preDsItemId) {
      this.mapView = null;
      this.sceneView = null;
      let prevOutputId = this.state.preMapDs && `${this.state.preMapDs.id}-${this.props.baseWidgetProps.id}-view`;
      prevOutputId && this.dsManager.destroyDataSource(prevOutputId);
      // this.state.preMapDs && this.dsManager.destroyDataSource(this.state.preMapDs.id);

      if (this.state.mapLoadStatus === MapLoadStatus.LoadError && !this.state.mapDs) {
        this.setState({
          preMapDs: this.state.mapDs
        });
        return;
      }

      this.setState({
        preMapDs: this.state.mapDs,
        mapLoadStatus: MapLoadStatus.Loading
      });
    }

    if(!this.state.mapDs){
      return;
    }

    if (this.state.mapDs.type === DataSourceTypes.WebMap) {
      this.sceneView = null;

      this.analysisMapView().then(() => {
        this.updateMapView(this.props.baseWidgetProps.config);

        if(!this.mapView || !this.props.baseWidgetProps.mutableStateProps){
          return;
        }

        if (this.props.baseWidgetProps.mutableStateProps) {
          this.handleAction(this.props.baseWidgetProps.mutableStateProps, this.mapView);
        }
      });
    }

    if (this.state.mapDs.type === DataSourceTypes.WebScene) {
      this.mapView = null;

      this.analysisSceneView().then(() => {
        this.updateSceneView(this.props.baseWidgetProps.config);

        if(!this.sceneView || !this.props.baseWidgetProps.mutableStateProps){
          return;
        }

        if (this.props.baseWidgetProps.mutableStateProps) {
          this.handleAction(this.props.baseWidgetProps.mutableStateProps, this.sceneView);
        }
      });
    }
  }

  analysisMapView = (): Promise<void> => {
    if (!this.mapView) {
      if (this.MapView) {
        this.initMapView();
        return Promise.resolve();
      } else {
        return loadArcGISJSAPIModules([
          'esri/views/MapView'
        ]).then(modules => {
          [
            this.MapView
          ] = modules;
          this.initMapView();
          return Promise.resolve();
        });
      }
    } else {
      return Promise.resolve();
    }
  }

  analysisSceneView = (): Promise<void> => {
    if (!this.sceneView) {
      if (this.SceneView) {
        this.initSceneView();
        return Promise.resolve();
      } else {
        return loadArcGISJSAPIModules([
          'esri/views/SceneView'
        ]).then(modules => {
          [
            this.SceneView
          ] = modules;
          this.initSceneView();
          return Promise.resolve();
        });
      }
    } else {
      return Promise.resolve();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeViewPoint !== this.props.activeViewPoint) {
      if (!newProps.activeViewPoint) {
        this.goHome(false);
      } else {
        this.setViewPoint(newProps.activeViewPoint);
      }
    }

    if (newProps.dataSourceId !== this.props.dataSourceId) {
      this.setState({mapLoadStatus: MapLoadStatus.Loading});
    }
  }

  componentWillUnmount() {
    let widgets =  getAppStore().getState().appConfig.widgets;

    if (widgets[this.props.baseWidgetProps.id] && widgets[this.props.baseWidgetProps.id].outputDataSources === this.props.baseWidgetProps.outputDataSources
      && widgets[this.props.baseWidgetProps.id].outputDataSources 
      && widgets[this.props.baseWidgetProps.id].useDataSources === this.props.baseWidgetProps.useDataSources
      && widgets[this.props.baseWidgetProps.id].outputDataSources.indexOf(`${this.props.dataSourceId}-${this.props.baseWidgetProps.id}-view`) > -1) {
      let restoreData = getMapBaseRestoreData(this);
      this.props.baseWidgetProps.dispatch(appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id, 
        `restoreData.${this.props.baseWidgetProps.id}-restoreData-${this.props.dataSourceId}`, restoreData));

      this.mapView && controlUIWidget(this.mapView, false, this.searchBtn, 'top-right');
      this.sceneView && controlUIWidget(this.sceneView, false, this.searchBtn, 'top-right');
    } else {
      this.props.onViewChanged && this.props.onViewChanged(this.props.dataSourceId, null);
      if (this.props.dataSourceId) {
        let outputId = `${this.props.dataSourceId}-${this.props.baseWidgetProps.id}-view`;
        this.dsManager.destroyDataSource(outputId);
        if (this.mapView && !this.mapView.destroyed) {
          this.mapView.container = null;
          this.mapView = null;
        }
        if (this.sceneView && !this.sceneView.destroyed) {
          this.sceneView.container = null;
          this.sceneView = null;
        }
        this.highLightHandles = {};
        this.extentWatch = null;
      }
    }
  }

  initMapView = (): void => {
    //let config = this.props.baseWidgetProps.config;
    this.extentWatch = null;

    if (this.mapView) {
      return;
    }
    this.initialViewPoint = null;

    let mapViewOption: __esri.MapViewProperties;
    mapViewOption = {
      map: this.state.mapDs.map,
      container: this.mapContainer
    };

    let tempWebMap = (this.state.mapDs.map as __esri.WebMap);
    if (tempWebMap.initialViewProperties && tempWebMap.initialViewProperties.viewpoint) {
      this.initialViewPoint = tempWebMap.initialViewProperties.viewpoint.clone();
    }

    if (!window.jimuConfig.isInBuilder) {
      if(this.props.baseWidgetProps.queryObject[this.props.baseWidgetProps.id]){
        let extentStr = this.props.baseWidgetProps.queryObject[this.props.baseWidgetProps.id].substr('extent='.length);
        let extent;
        try{
          extent = new this.Extent(JSON.parse(extentStr));
        }catch(err){
          console.error('Bad extent URL parameter.')
        }
  
        if(extent){
          mapViewOption.extent = extent;
        }
      }
    }

    this.mapView = new this.MapView(mapViewOption);
    this.mapView.popup.spinnerEnabled = false;

    let ui = this.mapView.ui as any;
    ui.specialComponents = [];
    this.mapView.when(() => {
      // after view is loaded, send extent change message
      this.goHome(false).then(() => {
        let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, this.mapView.extent);
        extentMessage.addRelatedWidgetId(this.props.baseWidgetProps.id);
        this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
        this.props.onViewChanged && this.props.onViewChanged(this.props.dataSourceId, this.mapView.viewpoint.clone());
      });

      this.setState({mapLoadStatus: MapLoadStatus.Loadok}, () => {
        this.props.onMapLoaded(this.props.dataSourceId, MapLoadStatus.Loadok);
      });
      if (this.props.baseWidgetProps.outputDataSources) {
        let dsManager = DataSourceManager.getInstance();
        let outputDsId = `${this.props.dataSourceId}-${this.props.baseWidgetProps.id}-view`;
        this.mapViewDS = dsManager.getDataSource(outputDsId) as MapViewDataSource;
        if (!this.mapViewDS) {
          let allDatasources = getAppStore().getState().appConfig.dataSources;
          let dataSourceJson = allDatasources[`${this.props.dataSourceId}-${this.props.baseWidgetProps.id}-view`];

          let mapViewDsOption: MapViewDataSourceConstructorOptions = {
            dataSourceJson: dataSourceJson,
            view: this.mapView,
          };

          dsManager.createDataSource(mapViewDsOption).then(ds => {
            this.mapViewDS = ds as MapViewDataSource;
          });
        }

        if(!this.extentWatch){
          this.extentWatch = this.mapView.watch('extent', (extent: __esri.Extent) => {
            if (!extent) {
              return;
            }

            //comment out this for demo because this conflicts with the current selection.

            // jimuHistory.changeQueryObject({
            //   [this.props.baseWidgetProps.id]: `extent=${JSON.stringify(extent.toJSON())}`
            // });
            
            clearTimeout(this.onExtented);
            this.onExtented = setTimeout(() => {
              if (!extent) {
                return;
              }

              if (this.isReceiveExtentChange) {
                this.isReceiveExtentChange = false;
              } else {
                let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, extent);
                extentMessage.addRelatedWidgetId(this.props.baseWidgetProps.id);
                this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
              }
            }, 200);
          });
        }
      }
    });

    this.bindMapBaseViewEvent(this.mapView);
  }

  initSceneView = (): void => {
    this.extentWatch = null;

    if (this.sceneView) {
      return;
    }

    this.initialViewPoint = null;

    let tempWebScene = (this.state.mapDs.map as __esri.WebScene);
    if (tempWebScene.initialViewProperties && tempWebScene.initialViewProperties.viewpoint) {
      this.initialViewPoint = tempWebScene.initialViewProperties.viewpoint.clone();
    }

    let mapViewOption: __esri.MapViewProperties;
    mapViewOption = {
      map: this.state.mapDs.map,
      container: this.mapContainer
    };

    this.sceneView = new this.SceneView(mapViewOption);
    this.sceneView.popup.spinnerEnabled = false;

    let ui = this.sceneView.ui as any;
    ui.specialComponents = [];
    this.sceneView.when(() => {
      // after view is loaded, send extent change message

      this.setState({mapLoadStatus: MapLoadStatus.Loadok}, () => {
        this.props.onMapLoaded(this.props.dataSourceId, MapLoadStatus.Loadok);
      });
      if (this.props.baseWidgetProps.outputDataSources) {
        let dsManager = DataSourceManager.getInstance();
        let outputDsId = `${this.props.dataSourceId}-${this.props.baseWidgetProps.id}-view`;
        this.sceneViewDS = dsManager.getDataSource(outputDsId) as SceneViewDataSource;
        if (!this.sceneViewDS) {
          let allDatasources = getAppStore().getState().appConfig.dataSources;
          let dataSourceJson = allDatasources[`${this.props.dataSourceId}-${this.props.baseWidgetProps.id}-view`];

          let sceneViewDsOption: SceneViewDataSourceContructorOptions = {
            dataSourceJson: dataSourceJson,
            view: this.sceneView,
          };

          dsManager.createDataSource(sceneViewDsOption).then(ds => {
            this.sceneViewDS = ds as SceneViewDataSource;
          });
        }

        if(!this.extentWatch){
          this.extentWatch = this.sceneView.watch('extent', (extent: __esri.Extent) => {
            if (!extent) {
              return;
            }

            // jimuHistory.changeQueryObject({
            //   [this.props.baseWidgetProps.id]: `extent=${JSON.stringify(extent.toJSON())}`
            // });
            clearTimeout(this.onExtented);
            this.onExtented = setTimeout(() => {
              if (!extent) {
                return;
              }

              if (this.isReceiveExtentChange) {
                this.isReceiveExtentChange = false;
              } else {
                let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, extent);
                extentMessage.addRelatedWidgetId(this.props.baseWidgetProps.id);
                this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
              }
            }, 200);
          });
        }

        setTimeout(() => {
          this.goHome(false).then(() => {
            let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, this.sceneView.extent);
            extentMessage.addRelatedWidgetId(this.props.baseWidgetProps.id);
            this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
            this.props.onViewChanged && this.props.onViewChanged(this.props.dataSourceId, this.sceneView.viewpoint.clone());
          });
        }, 500);
      }
    });

    this.bindMapBaseViewEvent(this.sceneView);
  }

  updateMapView = (config: IMConfig | {}): void => {
    if (!this.mapView.ui) {
      return;
    }

    this.mapView.ui.components = [];

    for (let key in config) {
      switch (key) {
        case 'canZoom':
          if (!this.zoomBtn || this.zoomBtn.view !== this.mapView) {
            const ZoomBtn = this.Zoom;
            const zoomBtn = new ZoomBtn({ view: this.mapView });
            this.zoomBtn = zoomBtn;
          }
          controlUIWidget(this.mapView, config[key], this.zoomBtn, 'top-left');
          break;
        case 'canScale':
          if (!this.scaleBar || this.scaleBar.view !== this.mapView) {
            const ScaleBar = this.ScaleBar;
            const scaleBar = new ScaleBar({ view: this.mapView, unit: 'dual' });
            this.scaleBar = scaleBar;
          }
          controlUIWidget(this.mapView, config[key], this.scaleBar, 'bottom-left');
          break;
        case 'canGoHome':
          if (!this.homeBtn || this.homeBtn.view !== this.mapView) {
            const HomeBtn = this.Home;
            const homeBtn = new HomeBtn({ view: this.mapView, viewpoint: this.initialViewPoint });
            this.homeBtn = homeBtn;
          }
          controlUIWidget(this.mapView, config[key], this.homeBtn, 'top-left');
          break;
        case 'canSearch':
          if (!this.searchBtn || this.searchBtn.view !== this.mapView) {
            const SearchBtn = this.Search;
            const searchBtn = new SearchBtn({ view: this.mapView });
            this.searchBtn = searchBtn;
          }
          controlUIWidget(this.mapView, config[key], this.searchBtn, 'top-right', 'search');
          break;
        case 'canOverviewMap':
          if (!this.overview || this.overview.parentMapView !== this.mapView) {
            this.overview && this.overview.destroy();
            this.overview = new OverView({
              webMapId: this.getMapDsId(),
              parentMapView: this.mapView,
              parentMap: this.state.mapDs.map
            });
          }
          if (!config[key] && this.mapContainer.getElementsByClassName('overview-container').length > 0) {
            this.mapContainer.getElementsByClassName('overview-container')[0].parentNode.removeChild(this.overview.elementContainer);
          } else if (config[key] && this.mapContainer.getElementsByClassName('overview-container').length < 1) {
            this.mapContainer.appendChild(this.overview.elementContainer);
          }
          break;
        case 'canLocate':
          if (!this.locateBtn || this.locateBtn.view !== this.mapView) {
            const LocateBtn = this.Locate;
            const locateBtn = new LocateBtn({ view: this.mapView });
            this.locateBtn = locateBtn;
          }
          controlUIWidget(this.mapView, config[key], this.locateBtn, 'top-left');
          break;
        default:
          break;
      }
    }
  }

  updateSceneView = (config: IMConfig | {}): void => {
    if (!this.sceneView.ui) {
      return;
    }

    this.sceneView.ui.components = [];
    for (let key in config) {
      switch (key) {
        case 'canZoom':
          if (!this.zoomBtn || this.zoomBtn.view !== this.sceneView) {
            const ZoomBtn = this.Zoom;
            const zoomBtn = new ZoomBtn({ view: this.sceneView });
            this.zoomBtn = zoomBtn;
          }
          controlUIWidget(this.sceneView, config[key], this.zoomBtn, 'top-left');
          break;
        case 'canGoHome':
          if (!this.homeBtn || this.homeBtn.view !== this.sceneView) {
            const HomeBtn = this.Home;
            const homeBtn = new HomeBtn({ view: this.sceneView, viewpoint: this.initialViewPoint });
            this.homeBtn = homeBtn;
          }
          controlUIWidget(this.sceneView, config[key], this.homeBtn, 'top-left');
          break;
        case 'canLocate':
          if (!this.locateBtn || this.locateBtn.view !== this.sceneView) {
            const LocateBtn = this.Locate;
            const locateBtn = new LocateBtn({ view: this.sceneView });
            this.locateBtn = locateBtn;
          }
          controlUIWidget(this.sceneView, config[key], this.locateBtn, 'top-left');
          break;
        case 'canCompass':
          if (!this.compassBtn || this.compassBtn.view !== this.sceneView) {
            const CompassBtn = this.Compass;
            const compassBtn = new CompassBtn({ view: this.sceneView });
            this.compassBtn = compassBtn;
          }
          controlUIWidget(this.sceneView, config[key], this.compassBtn, 'top-left');
          break;
        case 'canSearch':
          if (!this.searchBtn || this.searchBtn.view !== this.sceneView) {
            const SearchBtn = this.Search;
            const searchBtn = new SearchBtn({ view: this.sceneView });
            this.searchBtn = searchBtn;
          }
          controlUIWidget(this.sceneView, config[key], this.searchBtn, 'top-right', 'search');
          break;
        case 'canNavigate':
          if (!this.navigateBtn || this.navigateBtn.view !== this.sceneView) {
            const NavigateBtn = this.Navigate;
            const navigateBtn = new NavigateBtn({ view: this.sceneView });
            this.navigateBtn = navigateBtn;
          }
          controlUIWidget(this.sceneView, config[key], this.navigateBtn, 'top-left');
          break;
        default:
          break;
      }
    }

    if (this.mapContainer.getElementsByClassName('overview-container').length > 0) {
      this.mapContainer.getElementsByClassName('overview-container')[0].parentNode.removeChild(this.overview.elementContainer);
    }
  }

  bindMapBaseViewEvent = (mapBaseView: __esri.MapView |  __esri.SceneView) => {
    if (mapBaseView) {
      if (this.mapBaseViewEventHandles['mouse-wheel']) {
        this.mapBaseViewEventHandles['mouse-wheel'].remove();
        this.mapBaseViewEventHandles['mouse-wheel'] = null;
      }

      this.mapBaseViewEventHandles['mouse-wheel'] = mapBaseView.on('mouse-wheel', (e) => {
        if (this.props.baseWidgetProps.config.disableScroll) {
          e.stopPropagation();
          this.handleDisableWheel();
          return;
        }
  
        this.props.onViewChanged && this.props.onViewChanged(this.props.dataSourceId, mapBaseView.viewpoint.clone());
      });
  
      if (this.mapBaseViewEventHandles['drag']) {
        this.mapBaseViewEventHandles['drag'].remove();
        this.mapBaseViewEventHandles['drag'] = null;
      }

      this.mapBaseViewEventHandles['drag'] = mapBaseView.on('drag', () => {
        this.props.onViewChanged && this.props.onViewChanged(this.props.dataSourceId, mapBaseView.viewpoint.clone());
      });
  
      if (this.mapBaseViewEventHandles['click']) {
        this.mapBaseViewEventHandles['click'].remove();
        this.mapBaseViewEventHandles['click'] = null;
      }

      this.mapBaseViewEventHandles['click'] = mapBaseView.on('click', () => {
        for (let key in this.highLightHandles) {
          this.highLightHandles[key].remove();
        }
      });
    }
  }

  getMapDsId = (): string => {
    return this.state.mapDs && this.state.mapDs.id;
  }

  onDataSourceCreated = (dataSource: MapDataSource): void => {
    this.setState({
      mapDs: dataSource,
      preMapDs: this.state.mapDs
    }
    )
  }

  onCreateDataSourceFailed = (err): void => {
    console.warn(err);
    this.setState({
      mapLoadStatus: MapLoadStatus.LoadError,
      mapDs: null,
      preMapDs: this.state.mapDs
    }, () => {
      this.props.onMapLoaded(this.props.dataSourceId, MapLoadStatus.LoadError);
    });
  }

  setViewPoint = (viewPoint): void => {
    if (!viewPoint || !this.state.mapDs) {
      return;
    }

    if (this.state.mapDs.type === DataSourceTypes.WebMap) {
      if (this.mapView) {
        this.mapView.viewpoint = viewPoint;
      }
    }

    if (this.state.mapDs.type === DataSourceTypes.WebScene) {
      if (this.sceneView) {
        this.sceneView.viewpoint = viewPoint;
      }
    }
  }

  getMapLoadStatus = (): MapLoadStatus => {
    return this.state.mapLoadStatus;
  }

  getViewPoint = (): __esri.Viewpoint => {
    if (!this.state.mapDs) {
      return null;
    }

    if (this.state.mapDs.type === DataSourceTypes.WebMap) {
      return this.mapView && this.mapView.viewpoint ? this.mapView.viewpoint.clone() : null;
    }

    if (this.state.mapDs.type === DataSourceTypes.WebScene) {
      return this.sceneView && this.sceneView.viewpoint ? this.sceneView.viewpoint.clone() : null;
    }
  }

  getViewType = (): string => {
    return this.state.mapDs && this.state.mapDs.type;
  }

  goToTilt = (tilt) => {
    this.sceneView && this.sceneView.goTo({
      tilt: tilt
    });
  }

  goHome = (useAmination?: boolean): Promise<any> => {
    if (!this.initialViewPoint || !this.state.mapDs) {
      return Promise.resolve();
    }

    if (this.state.mapDs.type === DataSourceTypes.WebMap) {
      if (this.mapView) {
        return this.mapView.goTo(this.initialViewPoint, {
          animate: useAmination
        }) as any;
      }
    }

    if (this.state.mapDs.type === DataSourceTypes.WebScene) {
      if (this.sceneView) {
        return this.sceneView.goTo(this.initialViewPoint, {
          animate: useAmination
        }) as any;
      }
    }

    return Promise.resolve();
  }

  handleAction = (mutableStateProps: ActionRelatedProps, mapBaseView: __esri.MapView | __esri.SceneView) => {
    if (mutableStateProps.zoomToFeatureActionValue) {
      if (mutableStateProps.zoomToFeatureActionValue.relatedWidgets 
        && mutableStateProps.zoomToFeatureActionValue.relatedWidgets.indexOf(this.props.baseWidgetProps.id) > -1) {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, `zoomToFeatureActionValue`, null);
      } else {
        let tempMapBaseView = mapBaseView as any;

        let relatedWidgets = mutableStateProps.zoomToFeatureActionValue.relatedWidgets ? 
          mutableStateProps.zoomToFeatureActionValue.relatedWidgets : [];

        let zoomToFeatureValue = mutableStateProps.zoomToFeatureActionValue.value as any;
        if (zoomToFeatureValue.features) {
          tempMapBaseView.goTo((zoomToFeatureValue as __esri.FeatureSet).features).then(() => {
            relatedWidgets.push(this.props.baseWidgetProps.id);
            let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, tempMapBaseView.extent);
            extentMessage.setRelatedWidgetIds(relatedWidgets);
            this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
          });
        } else {
          tempMapBaseView.goTo(zoomToFeatureValue).then(() => {
            relatedWidgets.push(this.props.baseWidgetProps.id);
            let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, tempMapBaseView.extent);
            extentMessage.setRelatedWidgetIds(relatedWidgets);
            this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
          });
        }

        this.isReceiveExtentChange = true;
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, `zoomToFeatureActionValue`, null);
      }
    }

    if (mutableStateProps.panToActionValue) {
      if (mutableStateProps.panToActionValue.relatedWidgets 
        && mutableStateProps.panToActionValue.relatedWidgets.indexOf(this.props.baseWidgetProps.id) > -1) {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, `panToActionValue`, null);
      } else {
        let tempMapBaseView = mapBaseView as any;
        let relatedWidgets = mutableStateProps.panToActionValue.relatedWidgets ? 
        mutableStateProps.panToActionValue.relatedWidgets : [];

        let panToValue = mutableStateProps.panToActionValue.value as any;
        if (panToValue.features) {
          mapPanto(mapBaseView, (panToValue as __esri.FeatureSet).features).then(() => {
            relatedWidgets.push(this.props.baseWidgetProps.id);
            let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, tempMapBaseView.extent);
            extentMessage.setRelatedWidgetIds(relatedWidgets);
            this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
          });
        } else {
          mapPanto(mapBaseView, panToValue).then(() => {
            relatedWidgets.push(this.props.baseWidgetProps.id);
            let extentMessage = new ExtentChangeMessage(this.props.baseWidgetProps.id, tempMapBaseView.extent);
            extentMessage.setRelatedWidgetIds(relatedWidgets);
            this.props.onExtentChanged(this.props.dataSourceId, extentMessage);
          });
        }
      }

      this.isReceiveExtentChange = true;
      this.props.onMutableStatePropsChanged(this.props.dataSourceId, `panToActionValue`, null);
    }

    if (mutableStateProps.newFeatureSetActionValue && !mutableStateProps.newFeatureSetActionValue.promise) {
      let createNewFeaturelayerPromise = createNewFeaturelayer(mapBaseView, mutableStateProps.newFeatureSetActionValue.value);
      if (createNewFeaturelayerPromise) {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, `newFeatureSetActionValue.promise`, createNewFeaturelayerPromise);


        createNewFeaturelayerPromise.then(() => {
          this.props.onMutableStatePropsChanged(this.props.dataSourceId, `newFeatureSetActionValue`, null);
        })
      } else {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, `newFeatureSetActionValue`, null);
      }
    }

    if (mutableStateProps.changedFeatureSetActionValue) {
      updateFeaturelayer(mapBaseView, mutableStateProps.changedFeatureSetActionValue);
      this.props.onMutableStatePropsChanged(this.props.dataSourceId, `changedFeatureSetActionValue`, null);
    }

    if (mutableStateProps.selectFeatureActionValue) {
      mapBaseView.popup.close();

      for (let key in this.highLightHandles) {
        this.highLightHandles[key].remove();
      }

      let selectFeatureHandle = selectFeature(mapBaseView, mutableStateProps.selectFeatureActionValue);
      if (selectFeatureHandle) {
        this.highLightHandles[selectFeatureHandle.layerId] = selectFeatureHandle.handle;
      }

      setTimeout(() => {
        this.props.onMutableStatePropsChanged(this.props.dataSourceId, `selectFeatureActionValue`, null);
      }, 500);
    }

    if (mutableStateProps.flashActionValue) {
      mutableStateProps.flashActionValue.querySQL && flashFeaturesByQuery(mapBaseView, mutableStateProps.flashActionValue.layerId, mutableStateProps.flashActionValue.querySQL);
      this.props.onMutableStatePropsChanged(this.props.dataSourceId, `flashActionValue`, null);
    }
  }

  formatMessage = (id: string) => {
    return this.props.baseWidgetProps.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  handleDisableWheel = () => {
    this.widgetContainer.style.pointerEvents = 'none';
    setTimeout(() => {
      this.widgetContainer.style.pointerEvents = 'auto';
    }, 50);
  }

  render() {
    let useDataSource = null;
    for (let i = 0; i < this.props.baseWidgetProps.useDataSources.length; i++) {
      if (this.props.baseWidgetProps.useDataSources[i].dataSourceId == this.props.dataSourceId) {
        useDataSource = this.props.baseWidgetProps.useDataSources[i];
      }
    }

    return <div className="jimu-widget" style={{position: 'relative'}} ref={ref => {this.widgetContainer = ref; }}>
      {(this.state.mapLoadStatus === MapLoadStatus.Loading) && 
        <div className="jimu-widget widget-map-background">
          <div style={{ position: 'absolute', left: '50%', top: '50%'}} className="jimu-small-loading">
          </div>
        </div>}
      {(this.state.mapLoadStatus === MapLoadStatus.LoadError) && 
        <div className="jimu-widget widget-map-background">
          <div className="jimu-widget d-flex justify-content-center align-items-center">{this.formatMessage('mapFailure')}</div>
        </div>}
      <div style={{position: 'absolute', display: 'none'}}><DataSourceComponent useDataSource={useDataSource}
        onDataSourceCreated={this.onDataSourceCreated} onCreateDataSourceFailed={this.onCreateDataSourceFailed}/></div>
    </div>;
  }
}