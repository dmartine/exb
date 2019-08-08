import { DataSource, DataSourceConstructorOptions, DataSourceFactory } from 'jimu-core';
import { DataSourceTypes } from './data-sources/common';
import { MapDataSource } from './data-sources/map-data-source';
import { WebMapDataSource } from './data-sources/webmap-data-source';
import { WebSceneDataSource } from './data-sources/webscene-data-source';
import { FeatureLayerDataSource } from './data-sources/feature-layer-data-source';
import { FeatureLayerViewDataSource } from './data-sources/feature-layer-view-data-source';
import { MapViewDataSource, MapViewDataSourceConstructorOptions } from './data-sources/map-view-data-source';
import { SceneViewDataSourceContructorOptions, SceneViewDataSource } from './data-sources/scene-view-data-source';
import { FeatureDataRecord } from './data-sources/feature-record';
import { LayerViewDataSource } from './data-sources/layer-view-data-source';
export declare class ArcGISDataSourceFactory implements DataSourceFactory {
    createDataSource(options: DataSourceConstructorOptions): DataSource;
}
export { MapDataSource, WebMapDataSource, WebSceneDataSource, MapViewDataSource, MapViewDataSourceConstructorOptions, LayerViewDataSource, SceneViewDataSource, SceneViewDataSourceContructorOptions, FeatureLayerDataSource, FeatureLayerViewDataSource, DataSourceTypes, FeatureDataRecord };
