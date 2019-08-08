import { loadArcGISJSAPIModules } from 'jimu-core';
import MapBase, {HighLightHandle} from './components/mapbase';
import { IFeature } from '@esri/arcgis-rest-types';

export function controlUIWidget(mapBaseView: __esri.MapView | __esri.SceneView, isOpen: boolean, uiWidget: __esri.Widget, position?: string, widgetName?: string) {
  let ui = mapBaseView.ui as any;
  if (!uiWidget) {
    return;
  }
  if (isOpen) {
    ui.add(uiWidget, position);
    if (widgetName && ui.specialComponents.indexOf(widgetName) === -1) {
      ui.specialComponents.push(widgetName);
    }
  } else {
    ui.remove(uiWidget);
  }
}

export function createNewFeaturelayer(mapBaseView: __esri.MapView | __esri.SceneView, newFeatureSetValue?: {[layerID: string]: __esri.FeatureSet}): Promise<any> {
  let newLayerPromises = [];
  newFeatureSetValue && Object.keys(newFeatureSetValue).forEach(layerId => {
    let layer = mapBaseView.map.layers.find(layer => layer.id === layerId);
    if (layer) {
      console.warn('the feature layer is already created');
      return;
    }
    newLayerPromises.push(addFeatureSetToMap(mapBaseView, newFeatureSetValue[layerId], layerId));
  });

  if (newLayerPromises.length === 0) {
    return null;
  } else {
    return Promise.all(newLayerPromises);
  }
}

export function updateFeaturelayer(mapBaseView: __esri.MapView | __esri.SceneView, changedFeatureSetValue?: {[layerID: string]: __esri.FeatureSet}): Promise<any> {
  let updatePromises = [];
  changedFeatureSetValue && Object.keys(changedFeatureSetValue).forEach(layerId => {
    let layer = mapBaseView.map.layers.find(layer => layer.id === layerId);
    if (layer) {
      mapBaseView.map.remove(layer);
      updatePromises.push(addFeatureSetToMap(mapBaseView, changedFeatureSetValue[layerId], layerId));
    }
  });

  if (updatePromises.length === 0) {
    return null;
  } else {
    return Promise.all(updatePromises);
  }
}

function addFeatureSetToMap(mapBaseView: __esri.MapView | __esri.SceneView, featureSet: __esri.FeatureSet, layerId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer'
    ]).then(modules => {
      if (featureSet.features.length < 1) {
        return resolve();
      } else {
        //let FeatureSet: typeof  __esri.FeatureSet;
        let FeatureLayer: typeof  __esri.FeatureLayer;
        [FeatureLayer] = modules;

        let layerFromFeatureSet = featureSet.features[0].layer as any;
        let fieldsInFeaturelayer = [];
        let fieldMap = {};
    
        for (let i = 0; i < layerFromFeatureSet.fields.length; i++) {
          let fieldsItem = getReasonableField(layerFromFeatureSet.fields[i]);
          fieldMap[layerFromFeatureSet.fields[i].name] = fieldsItem.name;
          fieldsInFeaturelayer.push(fieldsItem);
        }
    
        let fieldsInPopupTemplate = [];
        for (let key in featureSet.features[0].attributes) {
          if (fieldMap[key]) {
            let fieldsItem = {
              fieldName: fieldMap[key],
              label: key
            }
            fieldsInPopupTemplate.push(fieldsItem);
          }
        }
    
        let sourceFeatures = [];
        featureSet.features.forEach((feature, index) => {
          let tempFeature = feature;
          if (tempFeature.attributes) {
            for (let key in tempFeature.attributes) {
              tempFeature.attributes[fieldMap[key]] = tempFeature.attributes[key];
            }
    
            tempFeature.attributes['exbfid'] = index;
          } else {
            tempFeature.attributes = {
              exbfid: index
            }
          }
          sourceFeatures.push(tempFeature);
        })
    
        let layer = new FeatureLayer({
          id: layerId,
          title: layerFromFeatureSet.title,
          source: sourceFeatures,
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

        layer.on('layerview-create', event => {
          return resolve();
        });
      }
    })
  });
}

function getReasonableField (field: __esri.Field): __esri.Field {
  // the function is supported to normalize the field.name
  let fieldName = field.name;
  return {
    name: fieldName.replace(/\./g, '_').replace(/\(/g, '_').replace(/\)/g, '_'),
    alias: field.alias,
    type: field.type
  } as any;
}

export function selectFeature(mapBaseView: __esri.MapView |  __esri.SceneView, target: __esri.Graphic | __esri.Graphic[] | IFeature | IFeature[], layerId?: string): HighLightHandle {
  // In this function, we assume that features come from the same layer
  let featureLayerId = layerId;
  let featureLayerView = null;
  let tempFeature = null;

  // if layerId doesn't exist, we get layerId by feature
  if (!featureLayerId) {
    if (target instanceof Array) {
      tempFeature = target[0] as __esri.Graphic;
    } else {
      tempFeature = target as __esri.Graphic;
    }
  
    if (tempFeature) {
      featureLayerId = tempFeature.layer && tempFeature.layer.id;
    }
  }

  if (featureLayerId) {
    let layerViews = mapBaseView.allLayerViews;
    for (let i = 0; i < layerViews.length; i++) {
      if (layerViews.getItemAt(i).layer.id === featureLayerId) {
        featureLayerView = layerViews.getItemAt(i);
      }
    }

    if (featureLayerView) {
      return {
        layerId: featureLayerId,
        handle: featureLayerView.highlight(target)}
    } else {
      return null;
    }
  }
}

export function mapPanto(mapBaseView: __esri.MapView |  __esri.SceneView, target: __esri.Geometry | __esri.Geometry[] | 
  __esri.Graphic | __esri.Graphic[] | __esri.Extent): Promise<any> {
  let panToTarget = target as any;
  let tempBaseMapView = mapBaseView as any;
  if (panToTarget instanceof Array) {
    if (panToTarget.length === 0) return Promise.resolve();

    if (panToTarget[0].geometry) {
      let geometryArr: __esri.Geometry[]  = [];
      for (let i = 0; i < panToTarget.length; i++) {
        geometryArr.push(panToTarget[i].geometry);
      }

      return getGeometriesExtent(geometryArr).then((extent) => {
        return tempBaseMapView.goTo(extent.center);
      })
    } else if (panToTarget[0].extent) {
      return getGeometriesExtent(panToTarget).then((extent) => {
        return tempBaseMapView.goTo(extent.center);
      })
    } else {
      return Promise.resolve();
    }
  } else {
    if (panToTarget.geometry) {
      let getmetry = panToTarget.geometry as __esri.Geometry;
      return tempBaseMapView.goTo(getCenterPoint(getmetry));
    } else if (panToTarget.extent) {
      let getmetry = panToTarget as __esri.Geometry;
      return tempBaseMapView.goTo(getCenterPoint(getmetry));
    } else {
      return Promise.resolve();
    }
  }
}

function getGeometriesExtent(geometries: __esri.Geometry[]): Promise<__esri.Extent> {
  return loadArcGISJSAPIModules([
    'esri/geometry/Extent'
  ]).then(modules => {
    let Extent: typeof __esri.Extent;
    [Extent] = modules;

    if (!geometries || !geometries.length) {
      return Promise.resolve(null);
    }

    let fullExtent: __esri.Extent = null;
    let index;
    let numGeometries = geometries.length;

    for (index = 0; index < numGeometries; index++) {
      var geometry = geometries[index];
      if (!geometry) {
        continue;
      }

      let extent = geometry.extent;

      if (!extent && geometry.type === 'point') {
        let pointGeometry = geometry as any;

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
  })
}

export function flashFeaturesByQuery(mapBaseView: __esri.MapView |  __esri.SceneView, layerId: string, querySQL: string): void {
  if (layerId) {
    let layerViews = mapBaseView.allLayerViews;
    let featureLayerView: __esri.FeatureLayerView = null;
    for (let i = 0; i < layerViews.length; i++) {
      if (layerViews.getItemAt(i).layer.id === layerId) {
        featureLayerView = layerViews.getItemAt(i) as __esri.FeatureLayerView;
      }
    }

    if (featureLayerView) {
      loadArcGISJSAPIModules([
        'esri/tasks/support/Query',
        'esri/Graphic'
      ]).then(modules => {
        let Query: typeof __esri.Query;
        let Graphic: typeof __esri.Graphic;
        [Query, Graphic] = modules;
        var query = new Query();
        query.where = querySQL;
        query.outFields = ['*'];
        query.returnGeometry = true;
        featureLayerView.layer.queryFeatures(query).then(featureSet => {
          if (featureSet && featureSet.features && featureSet.features.length > 0) {
            let symbol = getFlashSymbol(featureLayerView.layer.geometryType);
            let flashFeatures = function (features: __esri.Graphic[], maxFlashCount: number) {
              let graphics = [];
              let flashCount = 0;
              for (let i = 0; i < features.length; i++) {
                let tempGraphic = new Graphic({
                  geometry: features[i].geometry,
                  symbol: symbol,
                  attributes: features[i].attributes
                })
                graphics.push(tempGraphic);
              }

              let singleFlash = function () {
                mapBaseView.graphics.addMany(graphics);
                setTimeout(() => {
                  mapBaseView.graphics.removeMany(graphics);
                  flashCount = flashCount + 1;
                  if (flashCount < maxFlashCount) {
                    setTimeout(() => {
                      singleFlash();
                    }, 500);
                  }
                }, 500)
              }

              singleFlash();
            }

            flashFeatures(featureSet.features, 3);
          }
        })
      });
    } else {
      return null;
    }
  }
}

function getFlashSymbol (geometryType: string) {
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
    }
  } else if (['polyline'].indexOf(geometryType) > -1) {
    return {
      type: 'simple-line',
      color: [255, 255, 0, 0.8],
      width: 3,
      style: 'solid'
    }
  } else if (['polygon', 'extent'].indexOf(geometryType) > -1) {
    return {
      type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
      color: [255, 255, 0, 0.5],
      style: 'solid',
      outline: {  // autocasts as new SimpleLineSymbol()
        color: [255, 255, 0, 0.8],
        width: 3
      }
    }
  } else if (['mesh'].indexOf(geometryType) > -1) {
    return {
      type: 'mesh-3d',  // autocasts as new MeshSymbol3D()
      symbolLayers: [{
        type: 'fill',  // autocasts as new FillSymbol3DLayer()
        material: { color: [255, 255, 0, 0.8] }
      }]
    }
  } else {
    return null;
  }
}

function getCenterPoint(geometry: __esri.Geometry): __esri.Point{
  //point | multipoint | polyline | polygon | extent | mesh
  switch(geometry.type){
    case 'point':
      return geometry as  __esri.Point;
    case 'extent':
      return (geometry as __esri.Extent).center;
    case 'polygon':
      return (geometry as __esri.Polygon).centroid;
    case 'polyline':
      return (geometry as __esri.Polyline).extent.center;
    default:
      return geometry && geometry.extent ? geometry.extent.center : undefined;
      //todo
  }
}

export function handleFeature(feature: IFeature | __esri.Graphic, Graphic: __esri.GraphicConstructor): __esri.Graphic{
  let tempFeature = null;
  if ((feature as any).clone) {
    tempFeature = (feature as any).clone();
  } else {
    tempFeature = Graphic.fromJSON(Object.assign({}, feature));
    tempFeature.attributes = Object.assign({}, feature.attributes);
  }
  return tempFeature;
}

export function getMapBaseRestoreData(mapInstance: MapBase): any {
  return {
    mapContainer: mapInstance.mapContainer,
    state: mapInstance.state,
    MapView: mapInstance.MapView,
    SceneView: mapInstance.SceneView,
    Extent: mapInstance.Extent,
    Zoom: mapInstance.Zoom,
    ScaleBar: mapInstance.ScaleBar,
    Home: mapInstance.Home,
    Locate: mapInstance.Locate,
    Search: mapInstance.Search,
    Compass: mapInstance.Compass,
    Navigate: mapInstance.Navigate,
    Viewpoint: mapInstance.Viewpoint,
    mapView: mapInstance.mapView,
    sceneView: mapInstance.sceneView,
    mapViewDS: mapInstance.mapViewDS,
    sceneViewDS: mapInstance.sceneViewDS,
    overview: mapInstance.overview,
    zoomBtn: mapInstance.zoomBtn,
    scaleBar: mapInstance.scaleBar,
    homeBtn: mapInstance.homeBtn,
    locateBtn: mapInstance.locateBtn,
    earchBtn: mapInstance.searchBtn,
    compassBtn: mapInstance.compassBtn,
    navigateBtn: mapInstance.navigateBtn,
    extentWatch: mapInstance.extentWatch,
    dsManager: mapInstance.dsManager,
    highLightHandles: mapInstance.highLightHandles,
    mapBaseViewEventHandles: mapInstance.mapBaseViewEventHandles,
    initialViewPoint: mapInstance.initialViewPoint
  };
}

export function restoreMapBase(mapInstance: MapBase, restoreData: any): void {
  mapInstance.mapContainer = restoreData.mapContainer;
  mapInstance.state = restoreData.state;
  mapInstance.MapView = restoreData.MapView;
  mapInstance.SceneView = restoreData.SceneView;
  mapInstance.Extent = restoreData.Extent;
  mapInstance.Zoom = restoreData.Zoom;
  mapInstance.ScaleBar = restoreData.ScaleBar;
  mapInstance.Home = restoreData.Home;
  mapInstance.Locate = restoreData.Locate;
  mapInstance.Search = restoreData.Search;
  mapInstance.Compass = restoreData.Compass;
  mapInstance.Navigate = restoreData.Navigate;
  mapInstance.Viewpoint = restoreData.Viewpoint;
  mapInstance.mapView = restoreData.mapView;
  mapInstance.sceneView = restoreData.sceneView;
  mapInstance.mapViewDS = restoreData.mapViewDS;
  mapInstance.sceneViewDS = restoreData.sceneViewDS;
  mapInstance.overview = restoreData.overview;
  mapInstance.zoomBtn = restoreData.zoomBtn;
  mapInstance.scaleBar = restoreData.scaleBar;
  mapInstance.homeBtn = restoreData.homeBtn;
  mapInstance.locateBtn = restoreData.locateBtn;
  mapInstance.searchBtn = restoreData.searchBtn;
  mapInstance.compassBtn = restoreData.compassBtn;
  mapInstance.navigateBtn = restoreData.navigateBtn;
  mapInstance.extentWatch = restoreData.extentWatch;
  mapInstance.dsManager = restoreData.dsManager;
  mapInstance.highLightHandles = restoreData.highLightHandles;
  mapInstance.mapBaseViewEventHandles = restoreData.mapBaseViewEventHandles;
  mapInstance.initialViewPoint = restoreData.initialViewPoint;
}