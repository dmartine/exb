import { DataSourceTypes } from './common';
import { AbstractViewDataSource, ViewDataSourceConstructorOptions } from './view-data-source';
export interface SceneViewDataSourceContructorOptions extends ViewDataSourceConstructorOptions {
    view: __esri.SceneView;
}
export declare class SceneViewDataSource extends AbstractViewDataSource {
    type: DataSourceTypes;
    SceneView: typeof __esri.SceneView;
    view: __esri.SceneView;
}
