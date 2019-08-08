import { React, MessageManager, SpatialDataRecordsSelectionChangeMessage} from 'jimu-core';

import { BaseWidget, AllWidgetProps } from 'jimu-core';
import MapView = require('esri/views/MapView');
import WebMap = require('esri/WebMap');
import PortalItem = require('esri/portal/PortalItem');
import Query = require('esri/tasks/support/Query');
import {FeatureDataRecord} from 'jimu-arcgis/arcgis-data-source';

interface Config{
  webmapId: string;
}
export default class Widget extends BaseWidget<AllWidgetProps<Config>, {}>{
  mapContainer = React.createRef<HTMLDivElement>();
  mapView: MapView;
  webMap: WebMap;
  highLightHandle;

  componentDidMount() {
    let webmapId = this.props.config.webmapId;
    if (!webmapId) {
      console.error('Please config webmap id.')
      return;
    }

    if (!this.webMap) {
      this.webMap = new WebMap({
        portalItem: new PortalItem({
          id: webmapId
        })
      });
    }

    if (!this.mapView) {
      let options: __esri.MapViewProperties = {
        map: this.webMap,
        container: this.mapContainer.current,
        popup: null
      };
      this.mapView = new MapView(options);

      this.mapView.when(() => {
        this.mapView.on('click', this.onMapClick);
      });

    }
  }

  onMapClick = (screenPoint) => {
    this.mapView.hitTest(screenPoint).then(response => {
      if (response.results.length) {
        response.results.forEach(result => {
          let graphic = result.graphic;
          let layerId = graphic.layer.id;
          let layerView: __esri.FeatureLayerView = this.mapView.layerViews.toArray().find(v => v.layer.id === layerId) as __esri.FeatureLayerView;
          if(this.highLightHandle){
            this.highLightHandle.remove();
            this.highLightHandle = null;
          }
          this.highLightHandle = layerView.highlight(graphic);

          let query = new Query({
            where: `objectid = ${graphic.attributes['objectid']}`,
            outFields: ['*'],
            returnGeometry: true
          })

          let layer = graphic.layer as __esri.FeatureLayer;
          layer.queryFeatures(query).then((results) => {
            if (results.features && results.features[0]) {
              console.log(this.props.id);
              MessageManager.getInstance().publishMessage(new SpatialDataRecordsSelectionChangeMessage(this.props.id, [new FeatureDataRecord(results.features[0], null, false)]));
            }
          });
        });
      }
    });
  }

  render() {
    if (!this.props.config.webmapId) {
      return 'Please choose webmap in setting';
    }
    return <div style={{width: '100%', height: '100%'}}>
      <h5>This widget will publish <b>SPATIAL_DATA_RECORDS_SELECTION_CHANGE</b>message</h5>
      <div className="widget-map" style={{width: '100%', height: 'calc(100% - 30px)'}} ref={this.mapContainer}></div>
    </div>;
  }
}
