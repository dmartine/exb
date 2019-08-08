import { AbstractDataSource, DataSourceConstructorOptions, DataSourceSchema } from 'jimu-core';
import { LayerDataSource } from './layer-data-source';
export interface MapDataSourceConstructorOptions extends DataSourceConstructorOptions {
    map?: __esri.Map;
}
export declare class MapDataSource extends AbstractDataSource {
    type: string;
    map: __esri.Map;
    isDataSourceSet: boolean;
    protected childDataSourcesPromise: Promise<LayerDataSource[]>;
    Map: typeof __esri.Map;
    FeatureLayer: typeof __esri.FeatureLayer;
    constructor(options: MapDataSourceConstructorOptions);
    ready(): Promise<LayerDataSource[]>;
    fetchSchema(): Promise<DataSourceSchema>;
    whenChildDataSourcesCreated(): Promise<LayerDataSource[]>;
    createMap(): void;
    createChildDataSources(): Promise<LayerDataSource[]>;
    destroy(): void;
}
