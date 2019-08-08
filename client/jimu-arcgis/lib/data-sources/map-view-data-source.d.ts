import { DataSourceTypes } from './common';
import { AbstractViewDataSource, ViewDataSourceConstructorOptions } from './view-data-source';
export interface MapViewDataSourceConstructorOptions extends ViewDataSourceConstructorOptions {
    view?: __esri.MapView;
}
export declare class MapViewDataSource extends AbstractViewDataSource {
    type: DataSourceTypes;
    view: __esri.MapView;
}
