import { AbstractDataSource, DataSource, DataSourceConstructorOptions } from 'jimu-core';
import { LayerViewDataSource } from './layer-view-data-source';
import { MapDataSource } from '../data-source';
export interface ViewDataSourceConstructorOptions extends DataSourceConstructorOptions {
    view?: __esri.MapView | __esri.SceneView;
}
export declare abstract class AbstractViewDataSource extends AbstractDataSource {
    isDataSourceSet: boolean;
    ViewClass: typeof __esri.MapView | __esri.SceneView;
    view: __esri.MapView | __esri.SceneView;
    private childDataSourcesPromise;
    isChildrenCreatedInBuilder: boolean;
    isClickedNoPopUpFeature: boolean;
    constructor(options: ViewDataSourceConstructorOptions);
    onViewCreatedInApp(view: any): void;
    ready(): Promise<{}>;
    private initView;
    private onClick;
    private clearAllChildernDsSelectRecord;
    private whenViewLoaded;
    makeSureOriginDataSource(): Promise<DataSource>;
    whenChildDataSourcesCreated(): Promise<LayerViewDataSource[]>;
    createChildDataSources(): Promise<LayerViewDataSource[]>;
    getSchema(): import("jimu-core").DataSourceSchema;
    getReversedConfigSchema(): import("jimu-core").ReversedDataSourceSchema;
    getMapDataSource(): MapDataSource;
    destroy(): void;
}
