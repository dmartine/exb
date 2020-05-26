"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
var jimu_core_1 = require("jimu-core");
var jimu_arcgis_1 = require("jimu-arcgis");
function controlUIWidget(mapBaseView, isOpen, uiWidget, position, widgetName) {
    var ui = mapBaseView.ui;
    if (!uiWidget) {
        return;
    }
    if (isOpen) {
        ui.add(uiWidget, position);
        if (widgetName && ui.exbMapTools.indexOf(widgetName) === -1) {
            ui.exbMapTools.push(widgetName);
        }
    }
    else {
        ui.remove(uiWidget);
    }
}
exports.controlUIWidget = controlUIWidget;
function createNewFeaturelayer(mapBaseView, newFeatureSetValue) {
    var newLayerPromises = [];
    newFeatureSetValue && Object.keys(newFeatureSetValue).forEach(function (layerId) {
        var layer = mapBaseView.map.layers.find(function (layer) { return layer.id === layerId; });
        if (layer) {
            console.warn('the feature layer is already created');
            return;
        }
        newLayerPromises.push(addFeatureSetToMap(mapBaseView, newFeatureSetValue[layerId], layerId));
    });
    if (newLayerPromises.length === 0) {
        return null;
    }
    else {
        return Promise.all(newLayerPromises);
    }
}
exports.createNewFeaturelayer = createNewFeaturelayer;
function updateFeaturelayer(mapBaseView, changedFeatureSetValue) {
    var updatePromises = [];
    changedFeatureSetValue && Object.keys(changedFeatureSetValue).forEach(function (layerId) {
        var layer = mapBaseView.map.layers.find(function (layer) { return layer.id === layerId; });
        if (layer) {
            mapBaseView.map.remove(layer);
            updatePromises.push(addFeatureSetToMap(mapBaseView, changedFeatureSetValue[layerId], layerId));
        }
    });
    if (updatePromises.length === 0) {
        return null;
    }
    else {
        return Promise.all(updatePromises);
    }
}
exports.updateFeaturelayer = updateFeaturelayer;
function addFeatureSetToMap(mapBaseView, featureSet, layerId) {
    return new Promise(function (resolve, reject) {
        return jimu_arcgis_1.loadArcGISJSAPIModules([
            'esri/layers/FeatureLayer'
        ]).then(function (modules) {
            if (featureSet.features.length < 1) {
                return resolve();
            }
            else {
                //let FeatureSet: typeof  __esri.FeatureSet;
                var FeatureLayer = void 0;
                // eslint-disable-next-line
                FeatureLayer = modules[0];
                var layerFromFeatureSet = featureSet.features[0].layer;
                var fieldsInFeaturelayer = [];
                var fieldMap_1 = {};
                for (var i = 0; i < layerFromFeatureSet.fields.length; i++) {
                    var fieldsItem = getReasonableField(layerFromFeatureSet.fields[i]);
                    fieldMap_1[layerFromFeatureSet.fields[i].name] = fieldsItem.name;
                    fieldsInFeaturelayer.push(fieldsItem);
                }
                var fieldsInPopupTemplate = [];
                for (var key in featureSet.features[0].attributes) {
                    if (fieldMap_1[key]) {
                        var fieldsItem = {
                            fieldName: fieldMap_1[key],
                            label: key
                        };
                        fieldsInPopupTemplate.push(fieldsItem);
                    }
                }
                var sourceFeatures_1 = [];
                featureSet.features.forEach(function (feature, index) {
                    var tempFeature = feature;
                    if (tempFeature.attributes) {
                        for (var key in tempFeature.attributes) {
                            tempFeature.attributes[fieldMap_1[key]] = tempFeature.attributes[key];
                        }
                        tempFeature.attributes['exbfid'] = index;
                    }
                    else {
                        tempFeature.attributes = {
                            exbfid: index
                        };
                    }
                    sourceFeatures_1.push(tempFeature);
                });
                var layer = new FeatureLayer({
                    id: layerId,
                    title: layerFromFeatureSet.title,
                    source: sourceFeatures_1,
                    fields: fieldsInFeaturelayer,
                    outFields: ['*'],
                    objectIdField: 'exbfid',
                    renderer: layerFromFeatureSet.renderer,
                    popupEnabled: true,
                    popupTemplate: {
                        title: 'information',
                        content: [{
                                type: 'fields',
                                fieldInfos: fieldsInPopupTemplate
                            }]
                    }
                });
                mapBaseView.map.add(layer);
                layer.on('layerview-create', function (event) {
                    return resolve();
                });
            }
        });
    });
}
function getReasonableField(field) {
    // the function is supported to normalize the field.name
    var fieldName = field.name;
    return {
        name: fieldName.replace(/\./g, '_').replace(/\(/g, '_').replace(/\)/g, '_'),
        alias: field.alias,
        type: field.type
    };
}
function selectFeature(mapBaseView, target, layerId) {
    // In this function, we assume that features come from the same layer
    var featureLayerId = layerId;
    var featureLayerView = null;
    var tempFeature = null;
    // if layerId doesn't exist, we get layerId by feature
    if (!featureLayerId) {
        if (target instanceof Array) {
            tempFeature = target[0];
        }
        else {
            tempFeature = target;
        }
        if (tempFeature) {
            featureLayerId = tempFeature.layer && tempFeature.layer.id;
        }
    }
    if (featureLayerId) {
        var layerViews = mapBaseView.allLayerViews;
        for (var i = 0; i < layerViews.length; i++) {
            if (layerViews.getItemAt(i).layer.id === featureLayerId) {
                featureLayerView = layerViews.getItemAt(i);
            }
        }
        if (featureLayerView) {
            return {
                layerId: featureLayerId,
                handle: featureLayerView.highlight(target)
            };
        }
        else {
            return null;
        }
    }
}
exports.selectFeature = selectFeature;
function mapPanto(mapBaseView, target) {
    var panToTarget = target;
    var tempBaseMapView = mapBaseView;
    if (panToTarget instanceof Array) {
        if (panToTarget.length === 0)
            return Promise.resolve();
        if (panToTarget[0].geometry) {
            var geometryArr = [];
            for (var i = 0; i < panToTarget.length; i++) {
                geometryArr.push(panToTarget[i].geometry);
            }
            return getGeometriesExtent(geometryArr).then(function (extent) {
                return tempBaseMapView.goTo(extent.center);
            });
        }
        else {
            return getGeometriesExtent(panToTarget).then(function (extent) {
                return tempBaseMapView.goTo(extent.center);
            });
        }
    }
    else {
        if (panToTarget.geometry) {
            var getmetry = panToTarget.geometry;
            return tempBaseMapView.goTo(getCenterPoint(getmetry));
        }
        else {
            return tempBaseMapView.goTo(getCenterPoint(panToTarget));
        }
    }
}
exports.mapPanto = mapPanto;
function getGeometriesExtent(geometries) {
    return jimu_arcgis_1.loadArcGISJSAPIModules([
        'esri/geometry/Extent'
    ]).then(function (modules) {
        // eslint-disable-next-line
        var Extent;
        Extent = modules[0];
        if (!geometries || !geometries.length) {
            return Promise.resolve(null);
        }
        var fullExtent = null;
        var index;
        var numGeometries = geometries.length;
        for (index = 0; index < numGeometries; index++) {
            var geometry = geometries[index];
            if (!geometry) {
                continue;
            }
            var extent = geometry.extent;
            if (!extent && geometry.type === 'point') {
                var pointGeometry = geometry;
                if (pointGeometry.x && pointGeometry.y) {
                    extent = new Extent({
                        xmax: pointGeometry.x,
                        xmin: pointGeometry.x,
                        ymax: pointGeometry.y,
                        ymin: pointGeometry.y,
                        zmax: pointGeometry.z,
                        zmin: pointGeometry.z,
                        spatialReference: pointGeometry.spatialReference
                    });
                }
            }
            if (!extent) {
                continue;
            }
            if (fullExtent) {
                fullExtent = fullExtent.union(extent);
            }
            else {
                fullExtent = extent;
            }
        }
        if (fullExtent.width < 0 && fullExtent.height < 0) {
            return Promise.resolve(null);
        }
        return Promise.resolve(fullExtent);
    });
}
function filterFeaturesByQuery(mapBaseView, layerId, querySQL) {
    if (layerId) {
        var layerViews = mapBaseView.allLayerViews;
        var featureLayerView = null;
        for (var i = 0; i < layerViews.length; i++) {
            if (layerViews.getItemAt(i).layer.id === layerId) {
                featureLayerView = layerViews.getItemAt(i);
            }
        }
        if (featureLayerView) {
            featureLayerView.layer.definitionExpression = querySQL;
        }
    }
}
exports.filterFeaturesByQuery = filterFeaturesByQuery;
function flashFeaturesByQuery(mapBaseView, layerId, querySQL) {
    if (layerId) {
        var layerViews = mapBaseView.allLayerViews;
        var featureLayerView_1 = null;
        for (var i = 0; i < layerViews.length; i++) {
            if (layerViews.getItemAt(i).layer.id === layerId) {
                featureLayerView_1 = layerViews.getItemAt(i);
            }
        }
        if (featureLayerView_1) {
            jimu_arcgis_1.loadArcGISJSAPIModules([
                'esri/tasks/support/Query',
                'esri/Graphic'
            ]).then(function (modules) {
                // eslint-disable-next-line
                var Query;
                // eslint-disable-next-line
                var Graphic;
                Query = modules[0], Graphic = modules[1];
                var query = new Query();
                query.where = querySQL;
                query.outFields = ['*'];
                query.returnGeometry = true;
                featureLayerView_1.layer.queryFeatures(query).then(function (featureSet) {
                    if (featureSet && featureSet.features && featureSet.features.length > 0) {
                        var symbol_1 = getFlashSymbol(featureLayerView_1.layer.geometryType);
                        var flashFeatures = function (features, maxFlashCount) {
                            var graphics = [];
                            var flashCount = 0;
                            for (var i = 0; i < features.length; i++) {
                                var tempGraphic = new Graphic({
                                    geometry: features[i].geometry,
                                    symbol: symbol_1,
                                    attributes: features[i].attributes
                                });
                                graphics.push(tempGraphic);
                            }
                            var singleFlash = function () {
                                mapBaseView.graphics.addMany(graphics);
                                setTimeout(function () {
                                    mapBaseView.graphics.removeMany(graphics);
                                    flashCount = flashCount + 1;
                                    if (flashCount < maxFlashCount) {
                                        setTimeout(function () {
                                            singleFlash();
                                        }, 500);
                                    }
                                }, 500);
                            };
                            singleFlash();
                        };
                        flashFeatures(featureSet.features, 3);
                    }
                });
            });
        }
        else {
            return null;
        }
    }
}
exports.flashFeaturesByQuery = flashFeaturesByQuery;
function getFlashSymbol(geometryType) {
    if (['point', 'multipoint'].indexOf(geometryType) > -1) {
        return {
            type: 'simple-marker',
            style: 'circle',
            color: [255, 255, 0, 0.8],
            size: '16px',
            outline: {
                color: [255, 255, 0, 0.8],
                width: 3
            }
        };
    }
    else if (['polyline'].indexOf(geometryType) > -1) {
        return {
            type: 'simple-line',
            color: [255, 255, 0, 0.8],
            width: 3,
            style: 'solid'
        };
    }
    else if (['polygon', 'extent'].indexOf(geometryType) > -1) {
        return {
            type: 'simple-fill',
            color: [255, 255, 0, 0.5],
            style: 'solid',
            outline: {
                color: [255, 255, 0, 0.8],
                width: 3
            }
        };
    }
    else if (['mesh'].indexOf(geometryType) > -1) {
        return {
            type: 'mesh-3d',
            symbolLayers: [{
                    type: 'fill',
                    material: { color: [255, 255, 0, 0.8] }
                }]
        };
    }
    else {
        return null;
    }
}
function getCenterPoint(geometry) {
    //point | multipoint | polyline | polygon | extent | mesh
    switch (geometry.type) {
        case 'point':
            return geometry;
        case 'extent':
            return geometry.center;
        case 'polygon':
            return geometry.centroid;
        case 'polyline':
            return geometry.extent.center;
        default:
            return geometry && geometry.extent ? geometry.extent.center : undefined;
        //todo
    }
}
function handleFeature(feature, Graphic) {
    var tempFeature = null;
    if (feature.clone) {
        tempFeature = feature.clone();
    }
    else {
        tempFeature = Graphic.fromJSON(Object.assign({}, feature));
        tempFeature.attributes = Object.assign({}, feature.attributes);
    }
    return tempFeature;
}
exports.handleFeature = handleFeature;
function projectGeometries(geometries, spatialReference) {
    if (!geometries || geometries.length === 0 || !geometries[0]
        || spatialReference.wkid === geometries[0].spatialReference.wkid || (spatialReference.equals(geometries[0].spatialReference))) {
        return Promise.resolve(geometries);
    }
    else if (spatialReference.isWebMercator && geometries[0].spatialReference.isWGS84) {
        // In js api 4.x, the view can handle WebMercator and WGS84 spatialReference auto
        return Promise.resolve(geometries);
    }
    else if (spatialReference.isWGS84 && geometries[0].spatialReference.isWebMercator) {
        // In js api 4.x, the view can handle WebMercator and WGS84 spatialReference auto
        return Promise.resolve(geometries);
    }
    else {
        return jimu_arcgis_1.geometryUtils.projectToSpatialReference(geometries, spatialReference);
    }
}
exports.projectGeometries = projectGeometries;
function processZoomToFeatures(mapBaseView, layer, features) {
    if (mapBaseView && mapBaseView.type === '3d' && layer && layer.queryFeatures && features) {
        return jimu_arcgis_1.loadArcGISJSAPIModules([
            'esri/tasks/support/Query'
        ]).then(function (modules) {
            var Query = modules[0];
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ['*'];
            query.objectIds = features.map(function (feature) { return feature.attributes[layer.objectIdField]; });
            return layer.queryFeatures(query).then(function (result) {
                if (result && result.features && result.features.length === features.length) {
                    return Promise.resolve(result.features);
                }
                else {
                    return Promise.resolve(features);
                }
            }, function () {
                return Promise.resolve(features);
            });
        });
    }
    else {
        return Promise.resolve(features);
    }
}
exports.processZoomToFeatures = processZoomToFeatures;
function checkIsLive(appMode) {
    if (window.jimuConfig.isInBuilder) {
        if (appMode === jimu_core_1.AppMode.Design) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
exports.checkIsLive = checkIsLive;
function getMapBaseRestoreData(mapInstance) {
    return {
        mapContainer: mapInstance.mapContainer,
        state: mapInstance.state,
        MapView: mapInstance.MapView,
        SceneView: mapInstance.SceneView,
        Extent: mapInstance.Extent,
        Viewpoint: mapInstance.Viewpoint,
        mapView: mapInstance.mapView,
        sceneView: mapInstance.sceneView,
        extentWatch: mapInstance.extentWatch,
        fatalErrorWatch: mapInstance.fatalErrorWatch,
        dsManager: mapInstance.dsManager,
        highLightHandles: mapInstance.highLightHandles,
        mapBaseViewEventHandles: mapInstance.mapBaseViewEventHandles
    };
}
exports.getMapBaseRestoreData = getMapBaseRestoreData;
function restoreMapBase(mapInstance, restoreData) {
    mapInstance.mapContainer = restoreData.mapContainer;
    mapInstance.state = restoreData.state;
    mapInstance.MapView = restoreData.MapView;
    mapInstance.SceneView = restoreData.SceneView;
    mapInstance.Extent = restoreData.Extent;
    mapInstance.Viewpoint = restoreData.Viewpoint;
    mapInstance.mapView = restoreData.mapView;
    mapInstance.sceneView = restoreData.sceneView;
    mapInstance.extentWatch = restoreData.extentWatch;
    mapInstance.fatalErrorWatch = restoreData.fatalErrorWatch;
    mapInstance.dsManager = restoreData.dsManager;
    mapInstance.highLightHandles = restoreData.highLightHandles;
    mapInstance.mapBaseViewEventHandles = restoreData.mapBaseViewEventHandles;
}
exports.restoreMapBase = restoreMapBase;
//# sourceMappingURL=utils.js.map