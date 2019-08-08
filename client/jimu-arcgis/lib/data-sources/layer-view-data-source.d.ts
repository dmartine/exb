import { DataSourceConstructorOptions, AbstractDataSource } from 'jimu-core';
import { LayerDataSource } from './layer-data-source';
import { AbstractViewDataSource } from './view-data-source';
export interface LayerViewDataSourceConstructorOptions extends DataSourceConstructorOptions {
    view: __esri.LayerView;
    layerDataSourceId: string;
}
export declare abstract class LayerViewDataSource extends AbstractDataSource {
    view: __esri.LayerView;
    layerDataSourceId: string;
    /**
     * Layer view is created from a map view or scene view, which is created from a webmap/webscene/map, which is a configured data source.
     * This method will return the original layer data source which is configured in webmap/webscene/map.
     */
    getLayerDataSource(): LayerDataSource;
    getRootViewDataSource(): AbstractViewDataSource;
}
