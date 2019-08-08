import { AbstractDataSource, DataSourceConstructorOptions } from 'jimu-core';
import { MapDataSource } from './map-data-source';
import { LayerViewDataSource } from './layer-view-data-source';
export interface LayerDataSourceConstructorOptions extends DataSourceConstructorOptions {
    layer?: __esri.Layer;
}
export declare class LayerDataSource extends AbstractDataSource {
    layer: __esri.Layer;
    getMapDataSource(): MapDataSource;
    /**
     * Layer view is created from a map view or scene view, which is created from a webmap/webscene/map, which is a configured data source.
     * This method will return the original layer data source which is configured in webmap/webscene/map.
     */
    getLayerViewDataSource(): LayerViewDataSource;
}
