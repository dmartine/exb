import { AbstractQueriableDataSource, DataSourceSchema, DataRecord } from 'jimu-core';
import { DataSourceTypes } from './common';
import { LayerDataSource, LayerDataSourceConstructorOptions } from './layer-data-source';
import { FeatureDataRecord } from './feature-record';
import { MapDataSource } from './map-data-source';
import { LayerViewDataSource } from './layer-view-data-source';
export interface FeatureLayerDataSourceConstructorOptions extends LayerDataSourceConstructorOptions {
    layer?: __esri.FeatureLayer;
}
export declare class FeatureLayerDataSource extends AbstractQueriableDataSource implements LayerDataSource {
    layer: __esri.FeatureLayer;
    url: string;
    type: DataSourceTypes.FeatureLayer;
    FeatureLayer: typeof __esri.FeatureLayer;
    constructor(options: FeatureLayerDataSourceConstructorOptions);
    ready(): Promise<void>;
    doQuery(query: __esri.Query | __esri.QueryProperties): Promise<FeatureDataRecord[]>;
    doQueryById(id: string): Promise<FeatureDataRecord>;
    mergeQuery(baseQuery: __esri.Query | __esri.QueryProperties, newQuery: __esri.Query | __esri.QueryProperties): __esri.Query | __esri.QueryProperties;
    getIdField(): string;
    load(query: any, refresh?: boolean): Promise<DataRecord[]>;
    getAllLayerViewDataSource(): LayerViewDataSource[];
    fetchSchema(): Promise<DataSourceSchema>;
    selectRecordById(id: string): void;
    selectRecordsByIds(ids: string[]): void;
    getMapDataSource: () => MapDataSource;
    getLayerViewDataSource: () => LayerViewDataSource;
}
