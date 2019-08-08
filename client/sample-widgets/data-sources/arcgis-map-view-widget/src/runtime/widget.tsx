import { React, IMState, jimuHistory, DataSourceComponent } from 'jimu-core';

import { BaseWidget, AllWidgetProps, DataSourceManager, IMDataSourceJson } from 'jimu-core';
import { MapViewDataSource } from 'jimu-arcgis/arcgis-data-source';
import MapView = require('esri/views/MapView');
import WebMap = require('esri/WebMap');
import Extent = require('esri/geometry/Extent');
import { MapViewDataSourceConstructorOptions } from 'jimu-arcgis/lib/data-sources/map-view-data-source';

MapViewDataSource;

interface Config{
  webmapId: string;
}
interface ExtraProps{
  outputDataSourceJson: IMDataSourceJson
}

export default class Widget extends BaseWidget<AllWidgetProps<Config> & ExtraProps, {}>{
  mapContainer = React.createRef<HTMLDivElement>();
  mapView: MapView;
  webMap: WebMap;
  extentWatch: __esri.WatchHandle;

  dsManager = DataSourceManager.getInstance();

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<Config>): ExtraProps => {
    return {
      outputDataSourceJson: state.appConfig.dataSources[ownProps.outputDataSources[0]]
    }
  }

  constructor(props) {
    super(props);
  }

  update(webmapDs) {
    if(!webmapDs){
      return;
    }

    if (!this.mapView) {
      let options: __esri.MapViewProperties = {
        map: webmapDs.map,
        container: this.mapContainer.current
      };
      if(this.props.queryObject[this.props.id]){
        let extentStr = this.props.queryObject[this.props.id].substr('extent='.length);
        let extent;
        try{
          extent = new Extent(JSON.parse(extentStr));
        }catch(err){
          console.error('Bad extent URL parameter.')
        }

        if(extent){
          options.extent = extent;
        }
      }
      this.mapView = new MapView(options);

      this.mapView.when(() => {
        if (this.props.outputDataSources) {
          let dsManager = DataSourceManager.getInstance();
          let outputDsId = this.props.outputDataSources[0];
          let ds = dsManager.getDataSource(outputDsId) as MapViewDataSource;
          if (!ds) {
            let mapViewDsOption: MapViewDataSourceConstructorOptions = {
              dataSourceJson: this.props.outputDataSourceJson,
              view: this.mapView
            };
            dsManager.createDataSource(mapViewDsOption).then(_ds => ds = _ds as MapViewDataSource);
          }
        }
      });

      if(!this.extentWatch){
        this.extentWatch = this.mapView.watch('extent', (extent: __esri.Extent) => {
          jimuHistory.changeQueryObject({
            [this.props.id]: `extent=${JSON.stringify(extent.toJSON())}`
          });
        });
      }
    }
  }

  onDsInject = (ds) => {
    this.update(ds);
  }

  mapNode = <div className="widget-map" style={{width: '500px', height: '500px'}} ref={this.mapContainer}></div>;

  render() {
    if (!this.props.useDataSources || this.props.useDataSources.length === 0) {
      return 'Please choose webmap in setting';
    }
    return <DataSourceComponent useDataSource={this.props.useDataSources[0]} onDataSourceCreated={this.onDsInject}>
      {this.mapNode}
    </DataSourceComponent>;
  }
}
