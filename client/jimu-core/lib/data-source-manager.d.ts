/// <reference types="seamless-immutable" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-adapter-idb" />
/// <reference types="pouchdb-adapter-websql" />
/// <reference types="pouchdb-node" />
import { DataSource, DataRecord, DataSourceConstructorOptions } from './data-source/ds-base-types';
import { IMDataSourceJson, DataSourceSchema } from './types/app-config';
export default class DataSourceManager {
    static instance: DataSourceManager;
    static getInstance(): DataSourceManager;
    constructor();
    private dataSources;
    private dataSourcesCreatePromise;
    private dataSourceFactories;
    private pouchDB;
    getDataSource(dsId: string): DataSource;
    getDataSources(): {
        [dsId: string]: DataSource;
    };
    setDataSource(dsId: string, ds: DataSource): void;
    destroyAllDataSources(): void;
    destroyDataSource(dsId: string): void;
    /**
     * return the data sources that are configured in ds setting
     */
    getConfiguredDataSources(): DataSource[];
    getWidgetGeneratedDataSources(): {
        [widgetId: string]: DataSource[];
    };
    /**
     * return the create successfully datasources only.
     * For the failed data source, return null
     */
    createAllDataSources(): Promise<DataSource[]>;
    /**
     *
     * @param ds if the ds is JSON, the ds may not be in app config, this is the case that widget can use internal data source.
     */
    createDataSource(dsId: string): Promise<DataSource>;
    createDataSource(dsJson: IMDataSourceJson): Promise<DataSource>;
    createDataSource(options: DataSourceConstructorOptions): Promise<DataSource>;
    mergeSchema(dataSource: DataSource, configedSchema: DataSourceSchema, fetchedSchema: DataSourceSchema): DataSourceSchema;
    private mergeOneSchema;
    private createDsObj;
    protected getAppConfig(): import("seamless-immutable").ImmutableObject<import("jimu-core").AppConfig>;
    queryDataFromLocal(dataSourceId: string, query: any): Promise<any>;
    putDataToLocal(dataSourceId: string, records: DataRecord[]): Promise<void>;
    getLocalDBInfo(dataSourceId: string): Promise<PouchDB.Core.DatabaseInfo>;
    destroyLocalDB(dataSourceId: string): Promise<void>;
    isDataSourceInLocal(dataSourceId: string): Promise<boolean>;
    getAllLocalDBNames(): Promise<string[]>;
    private getLocalDB;
    private loadPouchDB;
    private createJimuCoreDataSource;
    private onStoreChange;
}
