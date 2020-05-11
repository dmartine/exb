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
/* eslint-disable react/no-direct-mutation-state*/
var jimu_core_1 = require("jimu-core");
var mapbase_1 = require("./mapbase");
var multisourcemap_context_1 = require("./multisourcemap-context");
var jimu_arcgis_1 = require("jimu-arcgis");
var map_fixed_layout_1 = require("../layout/map-fixed-layout");
var VisibleStyles = {
    firstMapVisible: [{
            zIndex: 6,
            opacity: 1
        }, {
            zIndex: 5,
            opacity: 0
        }],
    secondMapVisible: [{
            zIndex: 5,
            opacity: 0
        }, {
            zIndex: 6,
            opacity: 1
        }]
};
var MultiSourceMap = /** @class */ (function (_super) {
    __extends(MultiSourceMap, _super);
    function MultiSourceMap(props) {
        var _this = _super.call(this, props) || this;
        _this.mutableStatePropsMap = {};
        _this.reInitWidgetInstance = function (restoreData) {
            _this.state = restoreData;
            _this.isReIniting = true;
        };
        _this.changeInitialMapDataSourceID = function (dataSourceId, callBack) {
            if (_this.props.baseWidgetProps.useDataSources && _this.props.baseWidgetProps.useDataSources.length > 1) {
                var firstMapInstance = _this.refs.firstMapInstance;
                var secondMapInstance = _this.refs.secondMapInstance;
                if (!_this.state.currentMapIndex) {
                    if (_this.state.secondMapDsId && _this.state.secondMapDsId === dataSourceId) {
                        _this.startChangeInitialMapAnimation(callBack);
                        secondMapInstance.goHome(false);
                    }
                    else {
                        firstMapInstance.goHome(false);
                    }
                }
                else {
                    if (_this.state.firstMapDsId && _this.state.firstMapDsId === dataSourceId) {
                        _this.startChangeInitialMapAnimation(callBack);
                        firstMapInstance.goHome(false);
                    }
                    else {
                        secondMapInstance.goHome(false);
                    }
                }
            }
        };
        _this.startChangeInitialMapAnimation = function (callBack) {
            var tempState = Object.assign({}, _this.state);
            var firstMapInstance = _this.refs.firstMapInstance;
            var secondMapInstance = _this.refs.secondMapInstance;
            if (!_this.state.currentMapIndex) {
                tempState.currentMapIndex = 1;
                tempState.multiMapStyle = VisibleStyles.secondMapVisible;
                var viewPoint = firstMapInstance && firstMapInstance.getViewPoint && firstMapInstance.getViewPoint();
                if (viewPoint) {
                    secondMapInstance && secondMapInstance.setViewPoint && secondMapInstance.setViewPoint(viewPoint);
                }
                _this.setState(tempState, function () { callBack(); });
            }
            else {
                tempState.currentMapIndex = 0;
                tempState.multiMapStyle = VisibleStyles.firstMapVisible;
                var viewPoint = secondMapInstance && secondMapInstance.getViewPoint && secondMapInstance.getViewPoint();
                if (viewPoint) {
                    firstMapInstance && firstMapInstance.setViewPoint && firstMapInstance.setViewPoint(viewPoint);
                }
                _this.setState(tempState, function () { callBack(); });
            }
        };
        _this.switchMap = function () {
            var tempState = Object.assign({}, _this.state);
            tempState.useAnimation = true;
            var firstMapInstance = _this.refs.firstMapInstance;
            var secondMapInstance = _this.refs.secondMapInstance;
            if (!_this.state.currentMapIndex) {
                tempState.currentMapIndex = 1;
                tempState.multiMapStyle = VisibleStyles.secondMapVisible;
                var viewPoint = firstMapInstance && firstMapInstance.getViewPoint && firstMapInstance.getViewPoint();
                if (viewPoint) {
                    secondMapInstance && secondMapInstance.setViewPoint && secondMapInstance.setViewPoint(viewPoint);
                }
            }
            else {
                tempState.currentMapIndex = 0;
                tempState.multiMapStyle = VisibleStyles.firstMapVisible;
                var viewPoint = secondMapInstance && secondMapInstance.getViewPoint && secondMapInstance.getViewPoint();
                if (viewPoint) {
                    firstMapInstance && firstMapInstance.setViewPoint && firstMapInstance.setViewPoint(viewPoint);
                }
            }
            if (firstMapInstance && secondMapInstance) {
                var firstViewType = firstMapInstance.getViewType();
                var secondViewType = secondMapInstance.getViewType();
                if (firstViewType && secondViewType && (firstViewType !== secondViewType)) {
                    firstMapInstance.goToTilt(0);
                    secondMapInstance.goToTilt(0);
                    if (_this.state.currentMapIndex) {
                        setTimeout(function () {
                            firstMapInstance.goToTilt(45);
                        }, 300);
                    }
                    else {
                        setTimeout(function () {
                            secondMapInstance.goToTilt(45);
                        }, 300);
                    }
                }
            }
            _this.setState(tempState, function () {
                _this.confirmJimuMapViewIsActive();
                setTimeout(function () {
                    _this.setState({
                        useAnimation: false
                    });
                }, 500);
            });
        };
        _this.handleMutableStatePropsChanged = function (dataSourceId, propKey, value) {
            if (!_this.mutableStatePropsMap[propKey]) {
                _this.mutableStatePropsMap[propKey] = [dataSourceId];
            }
            else {
                if (_this.mutableStatePropsMap[propKey].indexOf(dataSourceId) === -1) {
                    _this.mutableStatePropsMap[propKey].push(dataSourceId);
                }
            }
            var multiMapDsIds = [];
            var firstMapInstance = _this.refs.firstMapInstance;
            var secondMapInstance = _this.refs.secondMapInstance;
            if (firstMapInstance && firstMapInstance.getViewType()) {
                multiMapDsIds.push(_this.state.firstMapDsId);
            }
            if (secondMapInstance && secondMapInstance.getViewType()) {
                multiMapDsIds.push(_this.state.secondMapDsId);
            }
            var isAllMatched = true;
            for (var i = 0; i < multiMapDsIds.length; i++) {
                if (_this.mutableStatePropsMap[propKey].indexOf(multiMapDsIds[i]) === -1) {
                    isAllMatched = false;
                    break;
                }
            }
            if (isAllMatched) {
                delete _this.mutableStatePropsMap[propKey];
                _this.props.baseWidgetProps.dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.props.baseWidgetProps.id, propKey, value));
            }
        };
        _this.handleViewChanged = function (shareViewPoint) {
            if (shareViewPoint.viewpoint === null) {
                var firstMapInstance = _this.refs.firstMapInstance;
                var secondMapInstance = _this.refs.secondMapInstance;
                firstMapInstance && firstMapInstance.goHome(false);
                secondMapInstance && secondMapInstance.goHome(false);
                return;
            }
            var currentVisibleDsId = _this.getCurrentVisibleDsId();
            if (currentVisibleDsId === shareViewPoint.dataSourceId) {
                if (_this.state.firstMapDsId && _this.state.firstMapDsId !== currentVisibleDsId) {
                    var firstMapInstance = _this.refs.firstMapInstance;
                    firstMapInstance && firstMapInstance.setViewPoint(shareViewPoint.viewpoint);
                }
                if (_this.state.secondMapDsId && _this.state.secondMapDsId !== currentVisibleDsId) {
                    var secondMapInstance = _this.refs.secondMapInstance;
                    secondMapInstance && secondMapInstance.setViewPoint(shareViewPoint.viewpoint);
                }
            }
        };
        _this.handleExtentChanged = function (dataSourceId, extentMessage) {
            var currentVisibleDsId = _this.getCurrentVisibleDsId();
            if (currentVisibleDsId === dataSourceId) {
                jimu_core_1.MessageManager.getInstance().publishMessage(extentMessage);
            }
        };
        _this.handleMapLoaded = function (dataSourceId, mapLoadStatus) {
            _this.forceUpdate();
        };
        _this.handleJimuMapViewCreated = function () {
            _this.confirmJimuMapViewIsActive();
        };
        _this.confirmJimuMapViewIsActive = function () {
            if (_this.props.isDefaultMap) {
                var jimuMapViewId = _this.props.baseWidgetProps.id + "-" + null;
                var jimuMapView = jimu_arcgis_1.MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId);
                if (jimuMapView) {
                    _this.setActiveJimuMapView(jimuMapView, true);
                }
                return;
            }
            var allDatasourceIds = [];
            _this.state.firstMapDsId && allDatasourceIds.push(_this.state.firstMapDsId);
            _this.state.secondMapDsId && allDatasourceIds.push(_this.state.secondMapDsId);
            var currentDataSourceId = _this.getCurrentVisibleDsId();
            for (var i = 0; i < allDatasourceIds.length; i++) {
                var jimuMapViewId = _this.props.baseWidgetProps.id + "-" + allDatasourceIds[i];
                var jimuMapView = jimu_arcgis_1.MapViewManager.getInstance().getJimuMapViewById(jimuMapViewId);
                if (jimuMapView) {
                    if (allDatasourceIds[i] === currentDataSourceId) {
                        _this.setActiveJimuMapView(jimuMapView, true);
                    }
                    else {
                        _this.setActiveJimuMapView(jimuMapView, false);
                    }
                }
            }
        };
        _this.isShowMapSwitchBtn = function () {
            var firstMapInstance = _this.refs.firstMapInstance;
            var secondMapInstance = _this.refs.secondMapInstance;
            if (firstMapInstance && secondMapInstance) {
                if (firstMapInstance.getMapLoadStatus() !== mapbase_1.MapLoadStatus.Loading && secondMapInstance.getMapLoadStatus() !== mapbase_1.MapLoadStatus.Loading) {
                    return true;
                }
            }
            else {
                return false;
            }
        };
        _this.getCurrentVisibleDsId = function () {
            if (_this.state.multiMapStyle[0].opacity === 1) {
                return _this.state.firstMapDsId;
            }
            else {
                return _this.state.secondMapDsId;
            }
        };
        var restoreData = jimu_core_1.MutableStoreManager.getInstance().getStateValue([_this.props.baseWidgetProps.id, 'restoreData',
            _this.props.baseWidgetProps.id + "-restoreData-multimap"]);
        if (restoreData) {
            _this.reInitWidgetInstance(restoreData);
            _this.props.baseWidgetProps.dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(_this.props.baseWidgetProps.id, "restoreData." + _this.props.baseWidgetProps.id + "-restoreData-multimap", null));
        }
        else {
            _this.state = {
                currentMapIndex: 0,
                multiMapStyle: VisibleStyles.firstMapVisible,
                firstMapDsId: null,
                secondMapDsId: null,
                useAnimation: false,
                useDataSources: null,
                currentJimuMapView: null
            };
        }
        _this.mutableStatePropsMap = {};
        return _this;
    }
    MultiSourceMap.prototype.componentDidMount = function () {
        if (this.isReIniting) {
            return;
        }
        if (this.props.baseWidgetProps.useDataSources) {
            var initialMapDataSourceID = this.props.baseWidgetProps.config.initialMapDataSourceID;
            if (!initialMapDataSourceID) {
                this.setState({
                    firstMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId,
                    secondMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId
                });
            }
            else {
                if (initialMapDataSourceID === (this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId)) {
                    this.setState({
                        firstMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId,
                        secondMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId
                    });
                }
                else if (initialMapDataSourceID === (this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId)) {
                    this.setState({
                        firstMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId,
                        secondMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId
                    });
                }
                else {
                    this.setState({
                        firstMapDsId: this.props.baseWidgetProps.useDataSources[0] && this.props.baseWidgetProps.useDataSources[0].dataSourceId,
                        secondMapDsId: this.props.baseWidgetProps.useDataSources[1] && this.props.baseWidgetProps.useDataSources[1].dataSourceId
                    });
                }
            }
        }
    };
    MultiSourceMap.prototype.componentWillUnmount = function () {
        var widgets = jimu_core_1.getAppStore().getState().appConfig.widgets;
        if (widgets[this.props.baseWidgetProps.id]) {
            var restoreData = {
                currentMapIndex: this.state.currentMapIndex,
                multiMapStyle: this.state.multiMapStyle,
                firstMapDsId: this.state.firstMapDsId,
                secondMapDsId: this.state.secondMapDsId,
                useAnimation: this.state.useAnimation,
                currentJimuMapView: this.state.currentJimuMapView
            };
            this.props.baseWidgetProps.dispatch(jimu_core_1.appActions.widgetMutableStatePropChange(this.props.baseWidgetProps.id, "restoreData." + this.props.baseWidgetProps.id + "-restoreData-multimap", restoreData));
        }
    };
    MultiSourceMap.getDerivedStateFromProps = function (newProps, prevState) {
        if (newProps.baseWidgetProps.useDataSources !== prevState.useDataSources) {
            var newState = MultiSourceMap.getChangedState(prevState.firstMapDsId, prevState.secondMapDsId, newProps.baseWidgetProps.useDataSources);
            return newState;
        }
        else {
            return null;
        }
    };
    MultiSourceMap.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.props.baseWidgetProps.stateProps && this.props.baseWidgetProps.stateProps.initialMapDataSourceID) {
            var initialMapDataSourceID = this.props.baseWidgetProps.stateProps.initialMapDataSourceID;
            if (this.state.firstMapDsId === initialMapDataSourceID) {
                var firstMapInstance = this.refs.firstMapInstance;
                if (firstMapInstance) {
                    firstMapInstance.goHome(false);
                }
            }
            if (this.state.secondMapDsId === initialMapDataSourceID) {
                var secondMapInstance = this.refs.secondMapInstance;
                if (secondMapInstance) {
                    secondMapInstance.goHome(false);
                }
            }
            this.props.baseWidgetProps.dispatch(jimu_core_1.appActions.widgetStatePropChange(this.props.baseWidgetProps.id, 'initialMapDataSourceID', null));
        }
        if (this.isReIniting) {
            this.isReIniting = false;
            return;
        }
        if (this.props.baseWidgetProps.config.initialMapDataSourceID !== prevProps.baseWidgetProps.config.initialMapDataSourceID) {
            this.changeInitialMapDataSourceID(this.props.baseWidgetProps.config.initialMapDataSourceID, this.confirmJimuMapViewIsActive);
        }
        if (this.props.baseWidgetProps.useDataSources !== prevProps.baseWidgetProps.useDataSources) {
            this.confirmJimuMapViewIsActive();
        }
    };
    MultiSourceMap.prototype.setActiveJimuMapView = function (jimuMapView, isActive) {
        if (isActive) {
            jimuMapView.setIsActive(isActive);
            this.setState({
                currentJimuMapView: jimuMapView
            });
        }
        else {
            jimuMapView.setIsActive(isActive);
        }
    };
    MultiSourceMap.prototype.render = function () {
        var _this = this;
        return jimu_core_1.React.createElement(multisourcemap_context_1.MultiSourceMapContext.Provider, { value: {
                isShowMapSwitchBtn: this.props.baseWidgetProps.useDataSources && this.props.baseWidgetProps.useDataSources.length > 1 && this.isShowMapSwitchBtn(),
                dataSourceIds: [this.state.firstMapDsId, this.state.secondMapDsId],
                activeDataSourceId: this.getCurrentVisibleDsId(),
                switchMap: this.switchMap,
                fullScreenMap: this.props.fullScreenMap,
                initialMapState: this.props.baseWidgetProps.config && this.props.baseWidgetProps.config.initialMapState
            } },
            !this.props.isDefaultMap && jimu_core_1.React.createElement("div", { className: "jimu-widget", style: { position: 'relative' } },
                jimu_core_1.React.createElement("div", { className: jimu_core_1.classNames('jimu-widget', {
                        'multisourcemap-item-appear': this.state.useAnimation && this.state.multiMapStyle[0].opacity,
                        'multisourcemap-item-disappear': this.state.useAnimation && !(this.state.multiMapStyle[0].opacity),
                        'multisourcemap-item-appear-noanimate': this.state.multiMapStyle[0].opacity,
                        'multisourcemap-item-disappear-noanimate': !(this.state.multiMapStyle[0].opacity)
                    }), style: { position: 'absolute', zIndex: this.state.multiMapStyle[0].zIndex } }, this.state.firstMapDsId && jimu_core_1.React.createElement(mapbase_1.default, { ref: "firstMapInstance", onViewChanged: this.handleViewChanged, baseWidgetProps: this.props.baseWidgetProps, onMapLoaded: this.handleMapLoaded, onMutableStatePropsChanged: this.handleMutableStatePropsChanged, onExtentChanged: function (dataSourceId, message) { _this.handleExtentChanged(dataSourceId, message); }, onJimuMapViewCreated: this.handleJimuMapViewCreated, startLoadModules: this.props.startLoadModules, dataSourceId: this.state.firstMapDsId })),
                jimu_core_1.React.createElement("div", { className: jimu_core_1.classNames('jimu-widget', {
                        'multisourcemap-item-appear': this.state.useAnimation && this.state.multiMapStyle[1].opacity,
                        'multisourcemap-item-disappear': this.state.useAnimation && !(this.state.multiMapStyle[1].opacity),
                        'multisourcemap-item-appear-noanimate': this.state.multiMapStyle[1].opacity,
                        'multisourcemap-item-disappear-noanimate': !(this.state.multiMapStyle[1].opacity)
                    }), style: { position: 'absolute', zIndex: this.state.multiMapStyle[1].zIndex } }, this.state.secondMapDsId && jimu_core_1.React.createElement(mapbase_1.default, { ref: "secondMapInstance", onViewChanged: this.handleViewChanged, baseWidgetProps: this.props.baseWidgetProps, onMapLoaded: this.handleMapLoaded, onMutableStatePropsChanged: this.handleMutableStatePropsChanged, onExtentChanged: function (dataSourceId, message) { _this.handleExtentChanged(dataSourceId, message); }, onJimuMapViewCreated: this.handleJimuMapViewCreated, startLoadModules: this.props.startLoadModules, dataSourceId: this.state.secondMapDsId }))),
            this.props.isDefaultMap && jimu_core_1.React.createElement("div", { className: "jimu-widget", style: { position: 'relative' } },
                jimu_core_1.React.createElement("div", { className: jimu_core_1.classNames('jimu-widget multisourcemap-item-appear-noanimate'), style: { position: 'absolute', zIndex: 6 } }, jimu_core_1.React.createElement(mapbase_1.default, { ref: "firstMapInstance", isDefaultMap: this.props.isDefaultMap, onViewChanged: this.handleViewChanged, baseWidgetProps: this.props.baseWidgetProps, onMapLoaded: this.handleMapLoaded, onMutableStatePropsChanged: this.handleMutableStatePropsChanged, dataSourceId: null, onExtentChanged: function (dataSourceId, message) { _this.handleExtentChanged(dataSourceId, message); }, onJimuMapViewCreated: this.handleJimuMapViewCreated, startLoadModules: this.props.startLoadModules }))),
            this.state.currentJimuMapView && this.state.currentJimuMapView.view && jimu_core_1.React.createElement(map_fixed_layout_1.default, { jimuMapView: this.state.currentJimuMapView, appMode: this.props.baseWidgetProps.appMode, layouts: this.props.baseWidgetProps.layouts, LayoutEntry: this.props.baseWidgetProps.builderSupportModules && this.props.baseWidgetProps.builderSupportModules.LayoutEntry, widgetManifestName: this.props.baseWidgetProps.manifest.name }));
    };
    MultiSourceMap.getChangedState = function (firstMapDsId, secondMapDsId, useDataSources) {
        var changedState = {};
        if (useDataSources && useDataSources[0]) {
            var newDataSourceArr = [];
            var repeatDataSourceArr = [];
            for (var i = 0; i < useDataSources.length; i++) {
                if (firstMapDsId !== useDataSources[i].dataSourceId) {
                    newDataSourceArr.push(useDataSources[i].dataSourceId);
                }
                else {
                    repeatDataSourceArr.push(useDataSources[i].dataSourceId);
                }
            }
            if (repeatDataSourceArr.length > 0) {
                changedState.firstMapDsId = firstMapDsId;
                changedState.secondMapDsId = newDataSourceArr[0];
            }
            else if (repeatDataSourceArr.length === 0) {
                if (newDataSourceArr.indexOf(secondMapDsId) > -1) {
                    newDataSourceArr.splice(newDataSourceArr.indexOf(secondMapDsId), 1);
                    changedState.firstMapDsId = newDataSourceArr[0];
                    changedState.secondMapDsId = secondMapDsId;
                }
                else {
                    changedState.firstMapDsId = newDataSourceArr[0];
                    changedState.secondMapDsId = newDataSourceArr[1];
                }
            }
        }
        else {
            changedState.firstMapDsId = null;
            changedState.secondMapDsId = null;
        }
        if (changedState.firstMapDsId !== firstMapDsId) {
            if (changedState.firstMapDsId) {
                changedState.multiMapStyle = VisibleStyles.firstMapVisible;
                changedState.currentMapIndex = 0;
            }
            else if (changedState.secondMapDsId) {
                changedState.multiMapStyle = VisibleStyles.secondMapVisible;
                changedState.currentMapIndex = 1;
            }
            else {
                changedState.multiMapStyle = VisibleStyles.firstMapVisible;
                changedState.currentMapIndex = 0;
            }
        }
        else {
            if (!changedState.secondMapDsId) {
                changedState.multiMapStyle = VisibleStyles.firstMapVisible;
                changedState.currentMapIndex = 0;
            }
            else if (changedState.secondMapDsId !== secondMapDsId) {
                changedState.multiMapStyle = VisibleStyles.secondMapVisible;
                changedState.currentMapIndex = 1;
            }
        }
        return changedState;
    };
    return MultiSourceMap;
}(jimu_core_1.React.PureComponent));
exports.default = MultiSourceMap;
//# sourceMappingURL=multisourcemap.js.map