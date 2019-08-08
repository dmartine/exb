import { AbstractQueriableDataSource } from 'jimu-core';
import { LayerViewDataSource, LayerViewDataSourceConstructorOptions } from './layer-view-data-source';
import { AbstractViewDataSource } from './view-data-source';
import { LayerDataSource } from './layer-data-source';
import { FeatureDataRecord } from './feature-record';
export interface FeatureLayerViewDataSourceConstructorOptions extends LayerViewDataSourceConstructorOptions {
    view: __esri.FeatureLayerView;
}
export declare class FeatureLayerViewDataSource extends AbstractQueriableDataSource implements LayerViewDataSource {
    view: __esri.FeatureLayerView;
    layerDataSourceId: string;
    url: any;
    highLightHandle: any;
    updateWatchHandle: any;
    constructor(options: FeatureLayerViewDataSourceConstructorOptions);
    /**
     * this queries from client
     * @param query
     */
    doQuery(query: any): Promise<FeatureDataRecord[]>;
    doQueryById(id: string): Promise<FeatureDataRecord>;
    mergeQuery(baseQuery: __esri.Query | __esri.QueryProperties, newQuery: __esri.Query | __esri.QueryProperties): __esri.Query | __esri.QueryProperties;
    setDefinitionExpressionForLayer(query: __esri.Query | __esri.QueryProperties): void;
    highLightSelectedFeatures(): void;
    highLightFeatures(features: __esri.Graphic[] | number[], isReservePopup?: boolean): void;
    clearHighLight(): void;
    selectRecordById(id: string): void;
    selectRecordsByIds(ids: string[]): void;
    getView: () => __esri.MapView | __esri.SceneView;
    handleFeatureNavigationAtPopUp(id: string): void;
    moveFeatureToCenter(id: string): Promise<void>;
    getCenterPoint(geometry: __esri.Geometry): __esri.Point;
    getIdField(): string;
    getSchema(): import("jimu-core").DataSourceSchema;
    getLayerDataSource: () => LayerDataSource;
    getRootViewDataSource: () => AbstractViewDataSource;
}
