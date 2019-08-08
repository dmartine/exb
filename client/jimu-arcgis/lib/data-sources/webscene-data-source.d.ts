import { MapDataSourceConstructorOptions, MapDataSource } from './map-data-source';
import { LayerDataSource } from './layer-data-source';
export interface WebSceneDataSourceContructorOptions extends MapDataSourceConstructorOptions {
    map?: __esri.WebScene;
}
export declare class WebSceneDataSource extends MapDataSource {
    type: string;
    map: __esri.WebScene;
    PortalItem: typeof __esri.PortalItem;
    Portal: typeof __esri.Portal;
    WebScene: typeof __esri.WebScene;
    ready(): Promise<LayerDataSource[]>;
    createMap(): void;
    createChildDataSources(): Promise<LayerDataSource[]>;
}
