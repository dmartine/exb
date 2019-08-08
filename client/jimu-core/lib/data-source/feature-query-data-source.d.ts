import { IQueryFeaturesOptions } from '@esri/arcgis-rest-feature-layer';
import { DataSourceSchema } from '../types/app-config';
import { AbstractQueriableDataSource, DataSourceConstructorOptions, DataSourceTypes } from './ds-base-types';
import { FeatureDataRecord } from './feature-record';
export declare class FeatureQueryDataSource extends AbstractQueriableDataSource {
    portalUrl?: string;
    itemId?: string;
    layerId?: string;
    url: string;
    type: DataSourceTypes.FeatureQuery;
    constructor(options: DataSourceConstructorOptions);
    getIdField(): string;
    setJsonData(data: any[]): void;
    doQuery(queryOptions: IQueryFeaturesOptions): Promise<FeatureDataRecord[]>;
    doQueryById(id: string): Promise<FeatureDataRecord>;
    mergeQuery(baseQuery: IQueryFeaturesOptions, newQuery: IQueryFeaturesOptions): IQueryFeaturesOptions;
    addRecord(record: FeatureDataRecord): Promise<FeatureDataRecord>;
    fetchSchema(): Promise<DataSourceSchema>;
}
