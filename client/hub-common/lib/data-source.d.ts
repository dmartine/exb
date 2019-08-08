import { IFeature, IUser } from '@esri/arcgis-rest-types';
import { IQueryFeaturesOptions } from '@esri/arcgis-rest-feature-layer';
import { DataRecord, AbstractQueriableDataSource, AbstractDataRecord, DataSource } from 'jimu-core';
export declare class HubAnnotationDataRecord extends AbstractDataRecord {
    feature: IFeature;
    user: IUser;
    dataSource: DataSource;
    constructor(feature: IFeature, user: IUser, dataSource: DataSource, isOriginData?: boolean);
    getOriginData(): any;
    convertOriginDataToData(originData: any): any;
    toJson(): IFeature & {
        [key: string]: any;
    };
    getData(): {
        [key: string]: any;
    };
    getId(): string;
    setId(): void;
    getGeometry(): any;
}
export declare class HubAnnotationsDataSource extends AbstractQueriableDataSource {
    url: string;
    doQuery(query: IQueryFeaturesOptions): Promise<HubAnnotationDataRecord[]>;
    doQueryById(id: string): Promise<DataRecord>;
    mergeQuery(baseQuery: any, newQuery: any): any;
    addRecord(record: HubAnnotationDataRecord): Promise<HubAnnotationDataRecord>;
    addAnnotation(description: string, target: string, feature_id?: number): Promise<HubAnnotationDataRecord>;
}
