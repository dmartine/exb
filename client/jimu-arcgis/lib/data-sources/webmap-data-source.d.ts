import { MapDataSourceConstructorOptions, MapDataSource } from './map-data-source';
import { LayerDataSource } from './layer-data-source';
export interface WebMapDataSourceConstructorOptions extends MapDataSourceConstructorOptions {
    map?: __esri.WebMap;
}
export declare class WebMapDataSource extends MapDataSource {
    type: string;
    map: __esri.WebMap;
    childDataSourcesPromise: Promise<LayerDataSource[]>;
    PortalItem: typeof __esri.PortalItem;
    Portal: typeof __esri.Portal;
    WebMap: typeof __esri.WebMap;
    ready(): Promise<LayerDataSource[]>;
    createMap(): void;
    createChildDataSources(): Promise<LayerDataSource[]>;
}
