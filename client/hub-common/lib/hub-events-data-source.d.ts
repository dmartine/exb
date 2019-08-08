import { IFeature } from '@esri/arcgis-rest-types';
import { IQueryFeaturesOptions } from '@esri/arcgis-rest-feature-layer';
import { IEventResourceObject } from '@esri/hub-events';
import { DataRecord, AbstractQueriableDataSource, DataSourceConstructorOptions, DataSource, AbstractDataRecord } from 'jimu-core';
export declare class HubEventDataRecord extends AbstractDataRecord {
    feature: IFeature;
    isReversed: boolean;
    dataSource: DataSource;
    constructor(eventResource: IEventResourceObject, siteResource: IEventResourceObject, dataSource: DataSource);
    getOriginData(): any;
    convertOriginDataToData(originData: any): any;
    toJson(): IFeature & {
        [key: string]: any;
    };
    getData(): {
        [key: string]: any;
    };
    getId(): any;
    setId(id: string): void;
    getGeometry(): any;
}
export declare class HubEventsDataSource extends AbstractQueriableDataSource {
    orgId: string;
    constructor(options: DataSourceConstructorOptions);
    doQuery(query: {
        options: IQueryFeaturesOptions;
        type?: "upcoming" | "past" | "cancelled" | "draft";
    }): Promise<HubEventDataRecord[]>;
    doQueryById(id: string): Promise<DataRecord>;
    mergeQuery(baseQuery: any, newQuery: any): any;
}
