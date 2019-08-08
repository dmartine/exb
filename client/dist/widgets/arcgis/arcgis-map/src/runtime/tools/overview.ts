import { loadArcGISJSAPIModules } from 'jimu-core';

interface ViewOptions{
  webMapId: string;
  parentMapView: __esri.MapView;
  parentMap:  __esri.Map;
}

export default class OverView {
  WatchUtils: typeof  __esri.watchUtils;
  Point: typeof  __esri.Point;
  MapView: typeof __esri.MapView;

  extentContainer: HTMLDivElement;
  elementContainer: HTMLDivElement;
  overviewMapView: __esri.MapView;
  webMapId: string;
  parentMapView: __esri.MapView;
  parentMap:  __esri.Map;

  constructor(options: ViewOptions) {
    const elementContainer = document && document.createElement('div');
    const extentContainer = document && document.createElement('div');
    if (extentContainer) {
      extentContainer.className = 'extent-container';
    }
    if (elementContainer) {
      elementContainer.className = 'overview-container';
      elementContainer.appendChild(extentContainer);
    }

    this.extentContainer = extentContainer;
    this.elementContainer = elementContainer;
    this.webMapId = options.webMapId;
    this.parentMapView = options.parentMapView;
    this.parentMap = options.parentMap;

    loadArcGISJSAPIModules([
      'esri/geometry/Point',
      'esri/core/watchUtils',
      'esri/views/MapView',
    ]).then(modules => {
      [this.Point, this.WatchUtils, this.MapView] = modules;
      this.initOverviewMapDatasource();
    });
  }

  initOverviewMapDatasource = () => {
    const overviewMapView = new this.MapView({
      map: this.parentMap,
      container: this.elementContainer
    });

    this.overviewMapView = overviewMapView;
    this.overviewMapView.when(() => {
      this.parentMapView.watch('extent', this.updateOverviewExtent.bind(this));
      this.overviewMapView.watch('extent', this.updateOverviewExtent.bind(this));

      this.WatchUtils.when(this.parentMapView, 'stationary', this.updateOverview.bind(this));
    });

    this.overviewMapView.ui.components = [];
  }

  updateOverview = () => {
    this.overviewMapView.goTo({
      extent: this.parentMapView.extent,
      scale: this.parentMapView.scale * 2 * Math.max(this.parentMapView.width /
        this.overviewMapView.width,
        this.parentMapView.height / this.overviewMapView.height)
    });
  }

  updateOverviewExtent = () => {
    const extent = this.parentMapView.extent;
    const p1 = new this.Point({
      x: extent.xmin,
      y: extent.ymin,
      spatialReference: extent.spatialReference
    });
    const p2 = new this.Point({
      x: extent.xmax,
      y: extent.ymax,
      spatialReference: extent.spatialReference
    });

    const bottomLeft = this.overviewMapView.toScreen(p1);
    const topRight = this.overviewMapView.toScreen(p2);

    this.extentContainer.style.top = topRight.y + 'px';
    this.extentContainer.style.left = bottomLeft.x + 'px';
    this.extentContainer.style.height = (bottomLeft.y - topRight.y) + 'px';
    this.extentContainer.style.width = (topRight.x - bottomLeft.x) + 'px';
  }

  destroy = () => {
    if (this.elementContainer && this.elementContainer.parentNode) {
      this.elementContainer.parentNode.removeChild(this.elementContainer);
    }
    this.overviewMapView.destroy();
  }
}