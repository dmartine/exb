"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
var jimu_arcgis_1 = require("jimu-arcgis");
var jimu_ui_1 = require("jimu-ui");
var utils_1 = require("../utils");
var layout_1 = require("../layout/layout");
var pc_layout_json_1 = require("../layout/pc-layout-json");
var mobile_layout_json_1 = require("../layout/mobile-layout-json");
var jimu_ui_2 = require("jimu-ui");
var multisourcemap_context_1 = require("./multisourcemap-context");
var Exchange = require('../assets/icons/exchange.svg');
var MapLoadStatus;
(function (MapLoadStatus) {
    MapLoadStatus["Loading"] = "LOADING";
    MapLoadStatus["Loadok"] = "LOADOK";
    MapLoadStatus["LoadError"] = "LOADERROR";
})(MapLoadStatus = exports.MapLoadStatus || (exports.MapLoadStatus = {}));
var MapBase = /** @class */ (function (_super) {
    __extends(MapBase, _super);
    function MapBase(props) {
        var _this = _super.call(this, props) || this;
        _this.highLightHandles = {};
        _this.mapBaseViewEventHandles = {};
        _this.dsManager = jimu_core_1.DataSourceManager.getInstance();
        _this.onExtented = null;
        _this.isReceiveExtentChange = false;
        _this.startRenderMap = function () {
            jimu_arcgis_1.loadArcGISJSAPIModules([
                'esri/geometry/Extent',
                'esri/Viewpoint'
            ]).then(function (modules) {
                _this.Extent = modules[0], _this.Viewpoint = modules[1];
                _this.setState({
                    isModulesLoaded: true
                });
            });
        };
        _this.analysisMapView = function () {
            if (!_this.mapView) {
                if (_this.MapView) {
                    _this.initMapView();
                    return Promise.resolve();
                }
                else {
                    return jimu_arcgis_1.loadArcGISJSAPIModules([
                        'esri/geometry/Geometry',
                        'esri/webmap/InitialViewProperties',
                        'esri/Basemap',
                        'esri/layers/TileLayer',
                        'esri/views/MapView',
                        'esri/WebMap',
                        'esri/portal/Portal',
                        'esri/portal/PortalItem'
                    ]).then(function (modules) {
                        _this.Geometry = modules[0], _this.InitialViewProperties = modules[1], _this.Basemap = modules[2], _this.TileLayer = modules[3], _this.MapView = modules[4], _this.WebMap = modules[5], _this.Portal = modules[6], _this.PortalItem = modules[7];
                        _this.initMapView();
                        return Promise.resolve();
                    });
                }
            }
            else {
                return Promise.resolve();
            }
        };
        _this.analysisSceneView = function () {
            if (!_this.sceneView) {
                if (_this.SceneView) {
                    _this.initSceneView();
                    return Promise.resolve();
                }
                else {
                    return jimu_arcgis_1.loadArcGISJSAPIModules([
                        'esri/views/SceneView',
                        'esri/WebScene',
                        'esri/portal/Portal',
                        'esri/portal/PortalItem'
                    ]).then(function (modules) {
                        _this.SceneView = modules[0], _this.WebScene = modules[1], _this.Portal = modules[2], _this.PortalItem = modules[3];
                        _this.initSceneView();
                        return Promise.resolve();
                    });
                }
            }
            else {
                return Promise.resolve();
            }
        };
        _this.generateViewPointFromInitialMapState = function (initialMapState) {
            if (initialMapState.viewType === '2d') {
                return new _this.Viewpoint({
                    targetGeometry: _this.Extent.fromJSON(initialMapState.extent),
                    rotation: initialMapState.rotation
                });
            }
            else {
                return _this.Viewpoint.fromJSON(initialMapState.viewPoint);
            }
        };
        _this.cloneMap = function (dataSource) {
            var map = null;
            var dataSourceJson = dataSource.dataSourceJson;
            var MapClass = null;
            if (dataSourceJson.type === jimu_arcgis_1.DataSourceTypes.WebMap) {
                MapClass = _this.WebMap;
            }
            if (dataSourceJson.type === jimu_arcgis_1.DataSourceTypes.WebScene) {
                MapClass = _this.WebScene;
            }
            if (dataSourceJson.portalUrl) {
                var portal = new _this.Portal({
                    url: jimu_core_1.portalUrlUtils.getHostUrlByOrgUrl(dataSourceJson.portalUrl)
                });
                map = new MapClass({
                    portalItem: new _this.PortalItem({
                        id: dataSourceJson.itemId,
                        portal: portal
                    })
                });
            }
            else {
                map = new MapClass({
                    portalItem: new _this.PortalItem({
                        id: dataSourceJson.itemId
                    })
                });
            }
            return map;
        };
        _this.getInitViewPointForDefaultWebMap = function () {
            var portalSelf = jimu_core_1.getAppStore().getState().portalSelf;
            var defaultExtent = portalSelf && portalSelf.defaultExtent;
            var tempViewPoint = null;
            if (_this.props.baseWidgetProps.config.initialMapState && _this.props.baseWidgetProps.config.initialMapState.viewPoint) {
                tempViewPoint = _this.generateViewPointFromInitialMapState(_this.props.baseWidgetProps.config.initialMapState);
            }
            else {
                tempViewPoint = new _this.Viewpoint({
                    targetGeometry: new _this.Extent({
                        xmin: defaultExtent && defaultExtent.xmin,
                        ymin: defaultExtent && defaultExtent.ymin,
                        xmax: defaultExtent && defaultExtent.xmax,
                        ymax: defaultExtent && defaultExtent.ymax,
                        spatialReference: { wkid: defaultExtent.spatialReference.wkid }
                    })
                });
            }
            return tempViewPoint;
        };
        _this.getDefaultWebMap = function () {
            var portalSelf = jimu_core_1.getAppStore().getState().portalSelf;
            var baseMapObj = portalSelf && portalSelf.defaultBasemap && portalSelf.defaultBasemap.baseMapLayers && portalSelf.defaultBasemap.baseMapLayers[0];
            var defaultExtent = portalSelf && portalSelf.defaultExtent;
            var tempViewPoint = null;
            tempViewPoint = new _this.Viewpoint({
                targetGeometry: new _this.Extent({
                    xmin: defaultExtent && defaultExtent.xmin,
                    ymin: defaultExtent && defaultExtent.ymin,
                    xmax: defaultExtent && defaultExtent.xmax,
                    ymax: defaultExtent && defaultExtent.ymax,
                    spatialReference: { wkid: defaultExtent.spatialReference.wkid }
                })
            });
            var defaultWebmap = new _this.WebMap({
                basemap: new _this.Basemap({
                    baseLayers: [
                        new _this.TileLayer({
                            url: baseMapObj && baseMapObj.url
                        })
                    ],
                    title: 'basemap',
                    id: 'basemap'
                }),
                initialViewProperties: new _this.InitialViewProperties({
                    spatialReference: defaultExtent && defaultExtent.spatialReference,
                    viewpoint: tempViewPoint,
                })
            });
            return defaultWebmap;
        };
        _this.initMapView = function () {
            _this.extentWatch = null;
            _this.fatalErrorWatch = null;
            if (_this.mapView) {
                return;
            }
            var mapViewOption;
            if (_this.props.isDefaultMap) {
                var defaultMap = _this.getDefaultWebMap();
                mapViewOption = {
                    map: defaultMap,
                    container: _this.mapContainer,
                    viewpoint: _this.getInitViewPointForDefaultWebMap(),
                    rotation: _this.props.baseWidgetProps.config.initialMapState && _this.props.baseWidgetProps.config.initialMapState.rotation
                };
            }
            else {
                var tempWebmap = _this.cloneMap(_this.state.mapDs);
                if (_this.props.baseWidgetProps.config.initialMapState) {
                    mapViewOption = {
                        map: tempWebmap,
                        container: _this.mapContainer,
                        viewpoint: _this.props.baseWidgetProps.config.initialMapState
                            && _this.generateViewPointFromInitialMapState(_this.props.baseWidgetProps.config.initialMapState)
                    };
                }
                else {
                    mapViewOption = {
                        map: tempWebmap,
                        container: _this.mapContainer
                    };
                }
            }
            if (!window.jimuConfig.isInBuilder) {
                if (_this.props.baseWidgetProps.queryObject[_this.props.baseWidgetProps.id]) {
                    var extentStr = _this.props.baseWidgetProps.queryObject[_this.props.baseWidgetProps.id].substr('extent='.length);
                    var extent = void 0;
                    try {
                        extent = new _this.Extent(JSON.parse(extentStr));
                    }
                    catch (err) {
                        console.error('Bad extent URL parameter.');
                    }
                    if (extent) {
                        mapViewOption.extent = extent;
                    }
                }
            }
            _this.mapView = new _this.MapView(mapViewOption);
            _this.mapView.popup.spinnerEnabled = false;
            var ui = _this.mapView.ui;
            ui.exbMapTools = {};
            jimu_arcgis_1.MapViewManager.getInstance().createJimuMapView({
                mapWidgetId: _this.props.baseWidgetProps.id,
                datasourceId: _this.props.dataSourceId,
                view: _this.mapView,
                isEnablePopup: _this.props.baseWidgetProps.config && !_this.props.baseWidgetProps.config.disablePopUp
            });
            _this.mapView.when(function () {
                // after view is loaded, send extent change message
                _this.setState({ mapLoadStatus: MapLoadStatus.Loadok }, function () {
                    _this.props.onMapLoaded(_this.props.dataSourceId, MapLoadStatus.Loadok);
                });
                var tempJimuMapViewId = _this.props.baseWidgetProps.id + "-" + _this.props.dataSourceId;
                var tempJimuMapView = jimu_arcgis_1.MapViewManager.getInstance().getJimuMapViewById(tempJimuMapViewId);
                if (tempJimuMapView) {
                    _this.props.onJimuMapViewCreated();
                    _this.setState({
                        mapBaseJimuMapView: tempJimuMapView
                    });
                }
                if (!_this.extentWatch) {
                    _this.extentWatch = _this.mapView.watch('extent', function (extent) {
                        if (!extent) {
                            return;
                        }
                        clearTimeout(_this.onExtented);
                        _this.onExtented = setTimeout(function () {
                            if (!extent) {
                                return;
                            }
                            if (_this.isReceiveExtentChange) {
                                _this.isReceiveExtentChange = false;
                            }
                            else {
                                var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, extent);
                                extentMessage.addRelatedWidgetId(_this.props.baseWidgetProps.id);
                                _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                            }
                        }, 200);
                    });
                }
                if (!_this.fatalErrorWatch) {
                    _this.fatalErrorWatch = _this.mapView.watch('fatalError', function (error) {
                        if (error) {
                            console.error('Fatal Error! View has lost its WebGL context. Attempting to recover...');
                            _this.mapView.tryFatalErrorRecovery();
                        }
                    });
                }
                setTimeout(function () {
                    _this.goHome(false).then(function () {
                        var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, _this.mapView.extent);
                        extentMessage.addRelatedWidgetId(_this.props.baseWidgetProps.id);
                        _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                        _this.props.onViewChanged && _this.props.onViewChanged({ dataSourceId: _this.props.dataSourceId, viewpoint: _this.mapView.viewpoint.clone() });
                    });
                }, 500);
            });
            _this.bindMapBaseViewEvent(_this.mapView);
        };
        _this.initSceneView = function () {
            _this.extentWatch = null;
            _this.fatalErrorWatch = null;
            if (_this.sceneView) {
                return;
            }
            var tempWebScene = _this.cloneMap(_this.state.mapDs);
            var mapViewOption;
            if (_this.props.baseWidgetProps.config.initialMapState) {
                mapViewOption = {
                    map: tempWebScene,
                    container: _this.mapContainer,
                    qualityProfile: 'low',
                    viewpoint: _this.props.baseWidgetProps.config.initialMapState
                        && _this.generateViewPointFromInitialMapState(_this.props.baseWidgetProps.config.initialMapState)
                };
            }
            else {
                mapViewOption = {
                    map: tempWebScene,
                    container: _this.mapContainer,
                    qualityProfile: 'low'
                };
            }
            _this.sceneView = new _this.SceneView(mapViewOption);
            _this.sceneView.popup.spinnerEnabled = false;
            var ui = _this.sceneView.ui;
            ui.exbMapTools = {};
            jimu_arcgis_1.MapViewManager.getInstance().createJimuMapView({
                mapWidgetId: _this.props.baseWidgetProps.id,
                datasourceId: _this.props.dataSourceId,
                view: _this.sceneView,
                isEnablePopup: _this.props.baseWidgetProps.config && !_this.props.baseWidgetProps.config.disablePopUp
            });
            _this.sceneView.when(function () {
                // after view is loaded, send extent change message
                _this.setState({ mapLoadStatus: MapLoadStatus.Loadok }, function () {
                    _this.props.onMapLoaded(_this.props.dataSourceId, MapLoadStatus.Loadok);
                });
                var tempJimuMapViewId = _this.props.baseWidgetProps.id + "-" + _this.props.dataSourceId;
                var tempJimuMapView = jimu_arcgis_1.MapViewManager.getInstance().getJimuMapViewById(tempJimuMapViewId);
                if (tempJimuMapView) {
                    _this.props.onJimuMapViewCreated();
                    _this.setState({
                        mapBaseJimuMapView: tempJimuMapView
                    });
                }
                if (!_this.extentWatch) {
                    _this.extentWatch = _this.sceneView.watch('extent', function (extent) {
                        if (!extent) {
                            return;
                        }
                        clearTimeout(_this.onExtented);
                        _this.onExtented = setTimeout(function () {
                            if (!extent) {
                                return;
                            }
                            if (_this.isReceiveExtentChange) {
                                _this.isReceiveExtentChange = false;
                            }
                            else {
                                var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, extent);
                                extentMessage.addRelatedWidgetId(_this.props.baseWidgetProps.id);
                                _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                            }
                        }, 200);
                    });
                }
                if (!_this.fatalErrorWatch) {
                    _this.fatalErrorWatch = _this.sceneView.watch('fatalError', function (error) {
                        if (error) {
                            console.error('Fatal Error! View has lost its WebGL context. Attempting to recover...');
                            _this.sceneView.tryFatalErrorRecovery();
                        }
                    });
                }
                setTimeout(function () {
                    _this.goHome(false).then(function () {
                        var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, _this.sceneView.extent);
                        extentMessage.addRelatedWidgetId(_this.props.baseWidgetProps.id);
                        _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                        _this.props.onViewChanged && _this.props.onViewChanged({ dataSourceId: _this.props.dataSourceId, viewpoint: _this.sceneView.viewpoint.clone() });
                    });
                }, 500);
            });
            _this.bindMapBaseViewEvent(_this.sceneView);
        };
        _this.updateMapView = function (config) {
            var jimuMapViewId = _this.props.baseWidgetProps.id + "-" + _this.props.dataSourceId;
            var jimuMapView = null;
            if (jimuMapViewId) {
                jimuMapView = jimu_arcgis_1.MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId);
            }
            if (!(jimuMapView && jimuMapView.getIsEditing())) {
                if (config.disablePopUp) {
                    _this.mapView.popup.close();
                    _this.mapView.popup.autoOpenEnabled = false;
                }
                else {
                    _this.mapView.popup.autoOpenEnabled = true;
                }
                if (jimuMapView) {
                    jimuMapView.isEnablePopUp = !config.disablePopUp;
                }
            }
            if (!_this.mapView.ui) {
                return;
            }
            _this.mapView.ui.components = [];
        };
        _this.updateSceneView = function (config) {
            var jimuMapViewId = _this.props.baseWidgetProps.id + "-" + _this.props.dataSourceId;
            var jimuMapView = null;
            if (jimuMapViewId) {
                jimuMapView = jimu_arcgis_1.MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId);
            }
            if (!(jimuMapView && jimuMapView.getIsEditing())) {
                if (config.disablePopUp) {
                    _this.sceneView.popup.close();
                    _this.sceneView.popup.autoOpenEnabled = false;
                }
                else {
                    _this.sceneView.popup.autoOpenEnabled = true;
                }
                if (jimuMapView) {
                    jimuMapView.isEnablePopUp = !config.disablePopUp;
                }
            }
            if (!_this.sceneView.ui) {
                return;
            }
            _this.sceneView.ui.components = [];
        };
        _this.bindMapBaseViewEvent = function (mapBaseView) {
            if (mapBaseView) {
                if (_this.mapBaseViewEventHandles['mouse-wheel']) {
                    _this.mapBaseViewEventHandles['mouse-wheel'].remove();
                    _this.mapBaseViewEventHandles['mouse-wheel'] = null;
                }
                _this.mapBaseViewEventHandles['mouse-wheel'] = mapBaseView.on('mouse-wheel', function (e) {
                    if (_this.props.baseWidgetProps.config.disableScroll) {
                        e.stopPropagation();
                        _this.handleDisableWheel();
                        return;
                    }
                    _this.props.onViewChanged && _this.props.onViewChanged({ dataSourceId: _this.props.dataSourceId, viewpoint: mapBaseView.viewpoint.clone() });
                });
                if (_this.mapBaseViewEventHandles['drag']) {
                    _this.mapBaseViewEventHandles['drag'].remove();
                    _this.mapBaseViewEventHandles['drag'] = null;
                }
                _this.mapBaseViewEventHandles['drag'] = mapBaseView.on('drag', function () {
                    _this.props.onViewChanged && _this.props.onViewChanged({ dataSourceId: _this.props.dataSourceId, viewpoint: mapBaseView.viewpoint.clone() });
                });
                if (_this.mapBaseViewEventHandles['click']) {
                    _this.mapBaseViewEventHandles['click'].remove();
                    _this.mapBaseViewEventHandles['click'] = null;
                }
                _this.mapBaseViewEventHandles['click'] = mapBaseView.on('click', function () {
                    for (var key in _this.highLightHandles) {
                        _this.highLightHandles[key].remove();
                    }
                });
            }
        };
        _this.getMapDsId = function () {
            return _this.state.mapDs && _this.state.mapDs.id;
        };
        _this.onDataSourceCreated = function (dataSource) {
            _this.setState({
                mapDs: dataSource,
                preMapDs: _this.state.mapDs
            });
        };
        _this.onCreateDataSourceFailed = function (err) {
            console.warn(err);
            _this.setState({
                mapLoadStatus: MapLoadStatus.LoadError,
                mapDs: null,
                preMapDs: _this.state.mapDs
            }, function () {
                _this.props.onMapLoaded(_this.props.dataSourceId, MapLoadStatus.LoadError);
                jimu_arcgis_1.MapViewManager.getInstance().createJimuMapView({
                    mapWidgetId: _this.props.baseWidgetProps.id,
                    datasourceId: _this.props.dataSourceId,
                    view: null,
                    isEnablePopUp: _this.props.baseWidgetProps.config && !_this.props.baseWidgetProps.config.disablePopUp
                });
            });
        };
        _this.setViewPoint = function (viewPoint) {
            if (!viewPoint || !_this.state.mapDs) {
                return;
            }
            if (_this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebMap) {
                if (_this.mapView) {
                    _this.mapView.viewpoint = viewPoint;
                }
            }
            if (_this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebScene) {
                if (_this.sceneView) {
                    _this.sceneView.viewpoint = viewPoint;
                }
            }
        };
        _this.getMapLoadStatus = function () {
            return _this.state.mapLoadStatus;
        };
        _this.getViewPoint = function () {
            if (!_this.state.mapDs) {
                return null;
            }
            if (_this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebMap) {
                return _this.mapView && _this.mapView.viewpoint ? _this.mapView.viewpoint.clone() : null;
            }
            if (_this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebScene) {
                if (_this.sceneView && _this.sceneView.viewpoint) {
                    // For scene, the first extent (after scene loaded) is not correct. So we use go to camera to get correct extent
                    _this.sceneView.goTo(_this.sceneView.viewpoint.camera, {
                        animate: false
                    });
                    return _this.sceneView.viewpoint.clone();
                }
                else {
                    return null;
                }
            }
        };
        _this.getViewType = function () {
            return _this.state.mapDs && _this.state.mapDs.type;
        };
        _this.goToTilt = function (tilt) {
            _this.sceneView && _this.sceneView.goTo({
                tilt: tilt
            });
        };
        _this.goHome = function (useAmination) {
            if (!_this.state.mapDs) {
                return Promise.resolve();
            }
            var initViewPoint = _this.getMapBaseInitViewPoint();
            if (_this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebMap) {
                if (_this.mapView) {
                    return _this.mapView.goTo(initViewPoint, {
                        animate: useAmination
                    });
                }
            }
            if (_this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebScene) {
                if (_this.sceneView) {
                    return _this.sceneView.goTo(initViewPoint, {
                        animate: useAmination
                    });
                }
            }
            return Promise.resolve();
        };
        _this.getMapBaseInitViewPoint = function () {
            if (_this.props.isDefaultMap) {
                return _this.getInitViewPointForDefaultWebMap();
            }
            else {
                if (_this.props.baseWidgetProps.config.initialMapState) {
                    return _this.generateViewPointFromInitialMapState(_this.props.baseWidgetProps.config.initialMapState);
                }
                else {
                    return _this.state.mapDs.map.initialViewProperties.viewpoint.clone();
                }
            }
        };
        _this.handleAction = function (mutableStateProps, mapBaseView) {
            if (mutableStateProps.zoomToFeatureActionValue) {
                if (mutableStateProps.zoomToFeatureActionValue.relatedWidgets
                    && mutableStateProps.zoomToFeatureActionValue.relatedWidgets.indexOf(_this.props.baseWidgetProps.id) > -1) {
                    _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'zoomToFeatureActionValue', null);
                }
                else {
                    var tempMapBaseView_1 = mapBaseView;
                    var relatedWidgets_1 = mutableStateProps.zoomToFeatureActionValue.relatedWidgets ?
                        mutableStateProps.zoomToFeatureActionValue.relatedWidgets : [];
                    var zoomToFeatureValue_1 = mutableStateProps.zoomToFeatureActionValue.value;
                    var layer_1 = null;
                    if (zoomToFeatureValue_1.layerId) {
                        layer_1 = tempMapBaseView_1.map.layers.find(function (layer) { return layer.id === zoomToFeatureValue_1.layerId; });
                    }
                    if (zoomToFeatureValue_1.type === 'zoom-to-extent') {
                        jimu_arcgis_1.zoomToUtils.zoomTo(tempMapBaseView_1, zoomToFeatureValue_1.features[0], zoomToFeatureValue_1.zoomToOption).then(function () {
                            _this.isReceiveExtentChange = true;
                            relatedWidgets_1.push(_this.props.baseWidgetProps.id);
                            var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, tempMapBaseView_1.extent);
                            extentMessage.setRelatedWidgetIds(relatedWidgets_1);
                            _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                        }, function () {
                            _this.isReceiveExtentChange = true;
                        });
                    }
                    else {
                        var target_1 = null;
                        if (layer_1) {
                            target_1 = {
                                layer: layer_1,
                                graphics: zoomToFeatureValue_1.features
                            };
                        }
                        else {
                            target_1 = zoomToFeatureValue_1.features;
                        }
                        utils_1.processZoomToFeatures(tempMapBaseView_1, target_1.layer, (target_1 && target_1.graphics) ? target_1.graphics : target_1).then(function (graphics) {
                            if (layer_1) {
                                target_1.graphics = graphics;
                            }
                            else {
                                target_1 = graphics;
                            }
                            jimu_arcgis_1.zoomToUtils.zoomTo(tempMapBaseView_1, target_1, zoomToFeatureValue_1.zoomToOption).then(function () {
                                _this.isReceiveExtentChange = true;
                                relatedWidgets_1.push(_this.props.baseWidgetProps.id);
                                var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, tempMapBaseView_1.extent);
                                extentMessage.setRelatedWidgetIds(relatedWidgets_1);
                                _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                            }, function () {
                                _this.isReceiveExtentChange = true;
                            });
                        });
                    }
                    _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'zoomToFeatureActionValue', null);
                }
            }
            if (mutableStateProps.panToActionValue) {
                if (mutableStateProps.panToActionValue.relatedWidgets
                    && mutableStateProps.panToActionValue.relatedWidgets.indexOf(_this.props.baseWidgetProps.id) > -1) {
                    _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'panToActionValue', null);
                }
                else {
                    var tempMapBaseView_2 = mapBaseView;
                    var relatedWidgets_2 = mutableStateProps.panToActionValue.relatedWidgets ?
                        mutableStateProps.panToActionValue.relatedWidgets : [];
                    var panToValue = mutableStateProps.panToActionValue.value;
                    utils_1.projectGeometries(panToValue.features, tempMapBaseView_2.spatialReference).then(function (geometries) {
                        utils_1.mapPanto(mapBaseView, geometries).then(function () {
                            _this.isReceiveExtentChange = true;
                            relatedWidgets_2.push(_this.props.baseWidgetProps.id);
                            var extentMessage = new jimu_core_1.ExtentChangeMessage(_this.props.baseWidgetProps.id, tempMapBaseView_2.extent);
                            extentMessage.setRelatedWidgetIds(relatedWidgets_2);
                            _this.props.onExtentChanged(_this.props.dataSourceId, extentMessage);
                        }, function () {
                            _this.isReceiveExtentChange = true;
                        });
                    });
                }
                _this.isReceiveExtentChange = true;
                _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'panToActionValue', null);
            }
            if (mutableStateProps.newFeatureSetActionValue && !mutableStateProps.newFeatureSetActionValue.promise) {
                var createNewFeaturelayerPromise = utils_1.createNewFeaturelayer(mapBaseView, mutableStateProps.newFeatureSetActionValue.value);
                if (createNewFeaturelayerPromise) {
                    _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'newFeatureSetActionValue.promise', createNewFeaturelayerPromise);
                    createNewFeaturelayerPromise.then(function () {
                        _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'newFeatureSetActionValue', null);
                    });
                }
                else {
                    _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'newFeatureSetActionValue', null);
                }
            }
            if (mutableStateProps.changedFeatureSetActionValue) {
                utils_1.updateFeaturelayer(mapBaseView, mutableStateProps.changedFeatureSetActionValue);
                _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'changedFeatureSetActionValue', null);
            }
            if (mutableStateProps.selectFeatureActionValue) {
                mapBaseView.popup.close();
                for (var key in _this.highLightHandles) {
                    _this.highLightHandles[key].remove();
                }
                var selectFeatureHandle = utils_1.selectFeature(mapBaseView, mutableStateProps.selectFeatureActionValue);
                if (selectFeatureHandle) {
                    _this.highLightHandles[selectFeatureHandle.layerId] = selectFeatureHandle.handle;
                }
                setTimeout(function () {
                    _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'selectFeatureActionValue', null);
                }, 500);
            }
            if (mutableStateProps.flashActionValue) {
                mutableStateProps.flashActionValue.querySQL && utils_1.flashFeaturesByQuery(mapBaseView, mutableStateProps.flashActionValue.layerId, mutableStateProps.flashActionValue.querySQL);
                _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'flashActionValue', null);
            }
            if (mutableStateProps.filterActionValue) {
                utils_1.filterFeaturesByQuery(mapBaseView, mutableStateProps.filterActionValue.layerId, mutableStateProps.filterActionValue.querySQL);
                _this.props.onMutableStatePropsChanged(_this.props.dataSourceId, 'filterActionValue', null);
            }
        };
        _this.formatMessage = function (id) {
            return _this.props.baseWidgetProps.intl.formatMessage({ id: id, defaultMessage: jimu_ui_1.defaultMessages[id] });
        };
        _this.handleDisableWheel = function () {
            _this.widgetContainer.style.pointerEvents = 'none';
            setTimeout(function () {
                _this.widgetContainer.style.pointerEvents = 'auto';
            }, 50);
        };
        _this.getLayoutConfig = function () {
            if (_this.state.widthBreakpoint === 'xsmall') {
                return mobile_layout_json_1.default[0];
            }
            else {
                return _this.props.baseWidgetProps.config.layoutIndex ? pc_layout_json_1.default[_this.props.baseWidgetProps.config.layoutIndex] : pc_layout_json_1.default[0];
            }
        };
        _this.onResize = function (width, height) {
            if (!width || !height) {
                return;
            }
            if (width <= 545 && width > 0) {
                _this.setState({
                    widthBreakpoint: 'xsmall',
                    widgetHeight: height
                });
            }
            else {
                _this.setState({
                    widthBreakpoint: 'other',
                    widgetHeight: height
                });
            }
        };
        _this.getMapSwitchForErrorMap = function () {
            return jimu_core_1.React.createElement(multisourcemap_context_1.MultiSourceMapContext.Consumer, null, function (_a) {
                var isShowMapSwitchBtn = _a.isShowMapSwitchBtn, dataSourceIds = _a.dataSourceIds, activeDataSourceId = _a.activeDataSourceId, switchMap = _a.switchMap;
                return (jimu_core_1.React.createElement("div", { className: "mapswitch-container", style: { display: isShowMapSwitchBtn ? 'block' : 'none',
                        marginBottom: _this.state.widthBreakpoint === 'xsmall' ? 10 : 0 } },
                    jimu_core_1.React.createElement("div", { onClick: function (e) { e.preventDefault(); switchMap(); }, className: "border-0 jimu-widget esri-widget--button" },
                        jimu_core_1.React.createElement(jimu_ui_2.Icon, { icon: Exchange, width: 16, height: 16, className: "mapswitch-icon" }))));
            });
        };
        var restoreData = jimu_core_1.MutableStoreManager.getInstance().getStateValue([_this.props.baseWidgetProps.id, 'restoreData',
            _this.props.baseWidgetProps.id + "-restoreData-" + _this.props.dataSourceId]);
        if (restoreData) {
            utils_1.restoreMapBase(_this, restoreData);
            _this.props.baseWidgetProps.dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.props.baseWidgetProps.id, "restoreData." + _this.props.baseWidgetProps.id + "-restoreData-" + _this.props.dataSourceId, null));
            _this.bindMapBaseViewEvent(_this.mapView || _this.sceneView);
        }
        else {
            _this.state = {
                mapLoadStatus: MapLoadStatus.Loading,
                widthBreakpoint: null,
                mapBaseJimuMapView: null,
                dataSourceId: null,
                widgetHeight: null
            };
        }
        return _this;
    }
    MapBase.prototype.componentDidMount = function () {
        var _this = this;
        if (this.widgetContainer.getElementsByClassName('widget-map').length === 0) {
            if (!this.mapContainer) {
                this.mapContainer = document && document.createElement('div');
                this.mapContainer.className = 'jimu-widget widget-map';
            }
            this.widgetContainer.appendChild(this.mapContainer);
        }
        if (this.props.startLoadModules && !this.state.isModulesLoaded) {
            this.startRenderMap();
            return;
        }
        if (!this.getMapDsId() && !this.props.isDefaultMap) {
            return;
        }
        if (!this.state.mapDs && !this.props.isDefaultMap) {
            return;
        }
        if (this.props.isDefaultMap) {
            // init and update map
            this.analysisMapView().then(function () {
                _this.updateMapView(_this.props.baseWidgetProps.config);
            });
            return;
        }
        if (this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebMap) {
            // init and update map
            this.analysisMapView().then(function () {
                _this.updateMapView(_this.props.baseWidgetProps.config);
            });
        }
        if (this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebScene) {
            // init and update map
            this.analysisSceneView().then(function () {
                _this.updateSceneView(_this.props.baseWidgetProps.config);
            });
        }
    };
    MapBase.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (!this.state.isModulesLoaded) {
            return;
        }
        var curDsId = this.getMapDsId();
        var prevDsId = this.state.preMapDs && this.state.preMapDs.id;
        var curDsItemId = this.state.mapDs && this.state.mapDs.dataSourceJson.itemId;
        var preDsItemId = this.state.preMapDs && this.state.preMapDs.dataSourceJson.itemId;
        if (curDsId !== prevDsId || curDsItemId !== preDsItemId) {
            this.mapView = null;
            this.sceneView = null;
            var prevJimuMapViewId = this.state.preMapDs && this.props.baseWidgetProps.id + "-" + this.state.preMapDs.id;
            if (prevJimuMapViewId) {
                jimu_arcgis_1.MapViewManager.getInstance().destroyJimuMapView(prevJimuMapViewId);
            }
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
        if (this.props.isDefaultMap) {
            this.sceneView = null;
            this.analysisMapView().then(function () {
                _this.updateMapView(_this.props.baseWidgetProps.config);
                if (!_this.mapView || !_this.props.baseWidgetProps.mutableStateProps) {
                    return;
                }
                if (_this.props.baseWidgetProps.mutableStateProps) {
                    _this.handleAction(_this.props.baseWidgetProps.mutableStateProps, _this.mapView);
                }
            });
        }
        if (!this.state.mapDs) {
            return;
        }
        if (this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebMap) {
            this.sceneView = null;
            this.analysisMapView().then(function () {
                _this.updateMapView(_this.props.baseWidgetProps.config);
                if (!_this.mapView || !_this.props.baseWidgetProps.mutableStateProps) {
                    return;
                }
                if (_this.props.baseWidgetProps.mutableStateProps) {
                    _this.handleAction(_this.props.baseWidgetProps.mutableStateProps, _this.mapView);
                }
            });
        }
        if (this.state.mapDs.type === jimu_arcgis_1.DataSourceTypes.WebScene) {
            this.mapView = null;
            this.analysisSceneView().then(function () {
                _this.updateSceneView(_this.props.baseWidgetProps.config);
                if (!_this.sceneView || !_this.props.baseWidgetProps.mutableStateProps) {
                    return;
                }
                if (_this.props.baseWidgetProps.mutableStateProps) {
                    _this.handleAction(_this.props.baseWidgetProps.mutableStateProps, _this.sceneView);
                }
            });
        }
    };
    MapBase.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.dataSourceId !== prevState.dataSourceId) {
            return {
                dataSourceId: nextProps.dataSourceId,
                mapLoadStatus: MapLoadStatus.Loading
            };
        }
        else {
            return null;
        }
    };
    MapBase.prototype.componentWillUnmount = function () {
        var widgets = jimu_core_1.getAppStore().getState().appConfig.widgets;
        if (widgets[this.props.baseWidgetProps.id] && widgets[this.props.baseWidgetProps.id].useDataSources === this.props.baseWidgetProps.useDataSources) {
            var restoreData = utils_1.getMapBaseRestoreData(this);
            this.props.baseWidgetProps.dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id, "restoreData." + this.props.baseWidgetProps.id + "-restoreData-" + this.props.dataSourceId, restoreData));
        }
        else {
            this.props.onViewChanged && this.props.onViewChanged({ dataSourceId: this.props.dataSourceId, viewpoint: null });
            var jimuMapViewId = this.props.baseWidgetProps.id + "-" + this.props.dataSourceId;
            jimu_arcgis_1.MapViewManager.getInstance().destroyJimuMapView(jimuMapViewId);
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
            this.fatalErrorWatch = null;
        }
    };
    MapBase.prototype.render = function () {
        var _this = this;
        var useDataSource = null;
        if (this.props.baseWidgetProps.useDataSources) {
            for (var i = 0; i < this.props.baseWidgetProps.useDataSources.length; i++) {
                if (this.props.baseWidgetProps.useDataSources[i].dataSourceId == this.props.dataSourceId) {
                    useDataSource = this.props.baseWidgetProps.useDataSources[i];
                }
            }
        }
        return jimu_core_1.React.createElement("div", { className: "jimu-widget", style: { position: 'relative' }, ref: function (ref) { _this.widgetContainer = ref; } },
            (this.state.mapLoadStatus === MapLoadStatus.Loading) &&
                jimu_core_1.React.createElement("div", { className: "jimu-widget widget-map-background" },
                    jimu_core_1.React.createElement("div", { style: { position: 'absolute', left: '50%', top: '50%' }, className: "jimu-secondary-loading" })),
            (this.state.mapLoadStatus === MapLoadStatus.LoadError) &&
                jimu_core_1.React.createElement("div", { className: "jimu-widget widget-map-background" },
                    this.getMapSwitchForErrorMap(),
                    jimu_core_1.React.createElement("div", { className: "jimu-widget d-flex justify-content-center align-items-center" }, this.formatMessage('mapFailure'))),
            this.state.mapBaseJimuMapView && this.state.widthBreakpoint && jimu_core_1.React.createElement(layout_1.default, { isMobile: this.state.widthBreakpoint === 'xsmall', jimuMapView: this.state.mapBaseJimuMapView, appMode: this.props.baseWidgetProps.appMode, layouts: this.props.baseWidgetProps.layouts, intl: this.props.baseWidgetProps.intl, LayoutEntry: this.props.baseWidgetProps.builderSupportModules && this.props.baseWidgetProps.builderSupportModules.LayoutEntry, layoutConfig: this.getLayoutConfig(), toolConfig: this.props.baseWidgetProps.config.toolConifg ? this.props.baseWidgetProps.config.toolConifg : {}, widgetManifestName: this.props.baseWidgetProps.manifest.name, widgetHeight: this.state.widthBreakpoint === 'xsmall' ? null : this.state.widgetHeight }),
            !this.props.isDefaultMap && jimu_core_1.React.createElement("div", { style: { position: 'absolute', display: 'none' } },
                jimu_core_1.React.createElement(jimu_core_1.DataSourceComponent, { useDataSource: useDataSource, onDataSourceCreated: this.onDataSourceCreated, onCreateDataSourceFailed: this.onCreateDataSourceFailed })),
            jimu_core_1.React.createElement(jimu_core_1.ReactResizeDetector, { handleWidth: true, handleHeight: true, onResize: this.onResize }));
    };
    return MapBase;
}(jimu_core_1.React.PureComponent));
exports.default = MapBase;
//# sourceMappingURL=mapbase.js.map