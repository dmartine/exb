import DataSourceManager from '../data-source-manager';
import { IMDataSourceJson, DataSourceSchema, ReversedDataSourceSchema, FieldSchema } from '../types/app-config';
import { InjectedIntl } from 'react-intl';
import { IMDataSourceInfo } from '../types/state';
import { EsriDateFormats } from '../types/common';
import { IGeometry, GeometryType } from '@esri/arcgis-rest-types';
export declare enum DataSourceStatus {
    Error = "ERROR",
    Unloaded = "UNLOADED",
    Loading = "LOADING",
    Loaded = "LOADED",
    Saving = "SAVING",
    Saved = "SAVED",
    Closed = "CLOSED",
    Connecting = "CONNECTING",
    Connected = "CONNECTED",
    Closing = "CLOSING"
}
export declare enum DataSourceTypes {
    SimpleLocal = "SIMPLE_LOCAL",
    CSV = "CSV",
    FeatureQuery = "FEATURE_QUERY"
}
export interface DataSourceFactory {
    createDataSource: (options: DataSourceConstructorOptions) => DataSource;
}
export interface DataRecord {
    dataSource: DataSource;
    /**
     * data should be plain object, and the format is {key: value}, the key is "jimuFieldName"
     *
     * The original data is use this schema: {fieldName: value}, we need to return this schema: {jimuFieldName: value}
     */
    getData: () => any;
    getOriginData: () => any;
    getFormattedData: (intl: InjectedIntl) => any;
    convertOriginDataToData: (originData: any) => any;
    /**
     * return the original data's JSON format, used to serialize data, the key is "jimuFieldName"
     */
    toJson: () => any;
    getId: () => string;
    setId: (id: string) => void;
    getGeometry: () => IGeometry;
}
export interface DataRecordSet {
    records: DataRecord[];
    fields?: FieldSchema[];
    dataSource?: DataSource;
}
export interface DataSource {
    /**
     * these 3 props are in app config.
     * put them here for easy use.
     */
    id: string;
    label: string;
    type: string;
    dataSourceJson: IMDataSourceJson;
    dataSourceManager: DataSourceManager;
    /**
     * the dataset data source should create all its child data sources in its constructor
     */
    isDataSourceSet: boolean;
    /**
     * null means it's root datasource.
     */
    parentDataSource: DataSource;
    /**
     * The origin data schema is in "dataSourceJson",
     *    * For data source, and use "jimuName" as key, and save the actual field name in the object
     *    * For data source set, use "jimuChildId" as key, and save the actual child id in the object
     * In many cases, we need to use the actual "childId" or "fieldName" to access info, so we can use this method to get a reverse schema for easy use.
     */
    getReversedConfigSchema: () => ReversedDataSourceSchema;
    getRecord: (index: number) => DataRecord;
    getRecordById: (id: string) => DataRecord;
    getRecords: () => DataRecord[];
    setRecords: (records: DataRecord[]) => void;
    getSelectedRecords?: () => DataRecord[];
    getSelectedRecordIndexes?: () => number[];
    getSelectedRecordIds?: () => string[];
    nextRecord?: () => DataRecord;
    prevRecord?: () => DataRecord;
    selectRecord?: (index: number) => void;
    selectRecords?: (indexes: number[]) => void;
    /**
     * jsonData may come from SSR, the data uses jimuFieldName as key
     */
    setJsonData: (jsonData: any[]) => void;
    selectRecordById?: (id: string) => void;
    selectRecordsByIds?: (ids: string[]) => void;
    clearData?: () => void;
    /**
     * the schema returned here is the merge of the configured schema and fetched schema
     */
    getSchema: () => DataSourceSchema;
    setSchema: (schema: DataSourceSchema) => void;
    /**
     * featch data schema from actual data source
     */
    fetchSchema: () => Promise<DataSourceSchema>;
    getFetchedSchema: () => DataSourceSchema;
    setFetchedSchema: (schema: DataSourceSchema) => void;
    getStatus: () => DataSourceStatus;
    setStatus?: (status: DataSourceStatus) => void;
    getVersion: () => number;
    addVersion?: () => void;
    getIdField: () => string;
    destroy: () => void;
    ready: () => Promise<void | any>;
    getInfo: () => IMDataSourceInfo;
    getRootDataSource: () => DataSource;
    /**
     * return null means the ds is a non-spatial ds.
     */
    getGeometryType: () => GeometryType;
    /**
     * The followings are for data source set only.
     */
    getChildDataSources?: () => DataSource[];
    /**
     * The child id is differrent with the data source id.
     */
    getChildDataSource?: (jimuChildId: string) => DataSource;
    /**
     * Use the child id to get the full data source id.
     */
    getFullChildDataSourceId?: (jimuChildId: string) => string;
    getJimuChildId?: (childId: string) => string[];
}
export interface QueriableDataSource extends DataSource {
    url: string;
    /**
     * do query against the service and update the internal data records.
     * @param query
     * @param refresh
     *    if `false`, the same query does not trigger a query request.
     *    if `true`, a query request is triggered always.
     *    the defualt value is false
     */
    load(query: any, refresh?: boolean): Promise<DataRecord[]>;
    /**
     * do not use filter configured in ds
     * @param id
     * @param refresh
     */
    loadById(id: string, refresh?: boolean): Promise<DataRecord>;
    /**
     * get the current query param of the current records.
     */
    getQueryParam(): any;
    getQueryId(): string;
    /**
     * return merge the new query to base query using AND
     * @param baseQuery
     * @param newQuery
     */
    mergeQuery(baseQuery: any, newQuery: any): any;
    /**
     * when do query/load, we need to consider the current ds's query.
     *
     * @param query
     * @param flag
     */
    getRealQuery(query: any, flag: 'query' | 'load'): any;
    /**
     * do query against the service only, do NOT update the internal data records.
     * Will do query based on the data source's current query
     * @param query
     */
    query(query: any): Promise<DataRecord[]>;
    queryById(id: string): Promise<DataRecord>;
    /**
     * The following 2 methods are to support data source offline.
     * When it's offline, widget that support offline should call these methods.
     */
    /**
     * do query against the local cache and update the internal data records.
     * @param query
     */
    loadFromLocal?(query: any): Promise<DataRecord[]>;
    /**
     * do query against the local cache only, do NOT update the internal data records.
     * This means the widget which call this method should hold the returnd data records.
     * @param query
     */
    queryFromLocal?(query: any): Promise<DataRecord[]>;
    offlineData?(query: any): Promise<DataRecord[]>;
    addRecord?: (record: DataRecord) => Promise<DataRecord>;
    updateRecord?: (record: DataRecord) => Promise<DataRecord>;
    deleteRecord?: (index: number) => Promise<void>;
    getSaveStatus: () => DataSourceStatus;
    setSaveStatus?: (status: DataSourceStatus) => void;
}
export interface LoadableDataSource extends DataSource {
    url: string;
    /**
     * load all data records.
     */
    load(): Promise<DataRecord[]>;
    loadFromLocal?(): Promise<DataRecord[]>;
}
export interface DataSourceConstructorOptions {
    dataSourceJson: IMDataSourceJson;
    dataSourceManager?: DataSourceManager;
    parentDataSource?: DataSource;
    childId?: string;
    jimuChildId?: string;
}
export declare abstract class AbstractDataSource implements DataSource {
    id: string;
    label: string;
    type: string;
    dataSourceJson: IMDataSourceJson;
    private fetchedSchema;
    private schema;
    private reverseSchema;
    dataSourceManager: DataSourceManager;
    isDataSourceSet: boolean;
    parentDataSource: DataSource;
    protected records: DataRecord[];
    getSchema(): DataSourceSchema;
    setSchema(schema: DataSourceSchema): void;
    fetchSchema(): Promise<DataSourceSchema>;
    getFetchedSchema(): DataSourceSchema;
    setFetchedSchema(fetchedSchema: DataSourceSchema): void;
    getGeometryType(): GeometryType;
    constructor({ dataSourceJson, parentDataSource, dataSourceManager, childId, jimuChildId }: DataSourceConstructorOptions);
    getReversedConfigSchema(): ReversedDataSourceSchema;
    setRecords(records: DataRecord[]): void;
    setJsonData(data: any[]): void;
    /**
     * the origin schema use jimu
     * @param schema
     */
    private getOneReversedConfigSchema;
    getStatus(): DataSourceStatus;
    setStatus(status: DataSourceStatus): void;
    getVersion(): number;
    addVersion(): void;
    getRecords(): DataRecord[];
    getSelectedRecords(): DataRecord[];
    getSelectedRecordIndexes(): number[];
    getSelectedRecordIds(): string[];
    nextRecord(): DataRecord;
    prevRecord(): DataRecord;
    getRecord(index: number): DataRecord;
    getRecordById(id: string): DataRecord;
    selectRecord(index: number): void;
    selectRecords(indexes: number[]): void;
    selectRecordById(id: string): void;
    selectRecordsByIds(ids: string[]): void;
    getInfo(): IMDataSourceInfo;
    clearData(): void;
    getIdField(): string;
    getFullChildDataSourceId(jimuChildId: string): string;
    getChildDataSources(): DataSource[];
    getChildDataSource(jimuChildId: string): DataSource;
    getJimuChildId(childId: string): string[];
    getRootDataSource(): DataSource;
    ready(): Promise<void | any>;
    destroy(): void;
    private changeUrlByIndexes;
    private changeUrlByIds;
    private changeUrl;
    private getNewUrlStr;
}
export interface CheckDoQueryOptions {
    queryType: 'byQuery' | 'byId';
    queryValue: any;
    currentQuery: any;
    refresh: boolean;
    queryStatus: DataSourceStatus;
    records: DataRecord[];
}
export declare abstract class AbstractQueriableDataSource extends AbstractDataSource implements QueriableDataSource {
    url: string;
    private queryParam;
    private queryId;
    constructor(options: DataSourceConstructorOptions);
    getQueryParam(): any;
    getQueryId(): string;
    getRealQuery(query: any, flag: 'query' | 'load'): any;
    load(query: any, refresh?: boolean): Promise<DataRecord[]>;
    query(query: any): Promise<DataRecord[]>;
    loadById(id: string, refresh?: boolean): Promise<DataRecord>;
    queryById(id: string): Promise<DataRecord>;
    selectRecordById(id: string): void;
    selectRecordsByIds(ids: string[]): void;
    addRecord?(record: DataRecord): Promise<DataRecord>;
    updateRecord?(record: DataRecord): Promise<DataRecord>;
    deleteRecord?(index: number): Promise<void>;
    getSaveStatus(): DataSourceStatus;
    setSaveStatus(status: DataSourceStatus): void;
    protected doAdd?(record: DataRecord): Promise<DataRecord>;
    protected doUpdateRecord?(record: DataRecord): Promise<DataRecord>;
    protected doDeleteRecord?(index: number): Promise<void>;
    abstract doQuery(query: any): Promise<DataRecord[]>;
    abstract doQueryById(id: string): Promise<DataRecord>;
    abstract mergeQuery(baseQuery: any, newQuery: any): any;
    loadFromLocal(query: any): Promise<DataRecord[]>;
    queryFromLocal?(query: any): Promise<DataRecord[]>;
}
export declare abstract class AbstractLoadableDataSource extends AbstractDataSource implements LoadableDataSource {
    url: string;
    load(): Promise<DataRecord[]>;
    loadFromLocal(): Promise<DataRecord[]>;
    abstract doLoad(): Promise<DataRecord[]>;
    doLoadFromLocal?(): Promise<DataRecord[]>;
}
export declare class SimpleLocalDataSource extends AbstractDataSource {
    updateAllRecoreds(records: DataRecord[]): void;
    addRecord(record: DataRecord): DataRecord;
    updateRecord(record: DataRecord): void;
    deleteRecord(index: number): void;
}
export declare abstract class AbstractDataRecord implements DataRecord {
    dataSource: DataSource;
    abstract getData(): any;
    abstract getOriginData(): any;
    abstract toJson(): any;
    abstract getId(): string;
    abstract setId(id: string): void;
    abstract getGeometry(): IGeometry;
    convertOriginDataToData(originData: any): {};
    convertDataToOriginData(data: any): {};
    getFormattedData(intl: InjectedIntl): {};
    formatDateField(value: any, esriDateFormat: EsriDateFormats, intl: InjectedIntl): string;
    _formatDate: (date: Date, pattern: string, intl: InjectedIntl) => string;
    _formatTime: (date: Date, pattern: string, intl: InjectedIntl) => string;
    formatNumberField(value: number, places: number, digitSeparator: boolean, intl: InjectedIntl): string;
}
export declare class SimpleDataRecord extends AbstractDataRecord {
    private data;
    dataSource: DataSource;
    /**
     * originData: is the data from the real data source, such as query from remote service/database.
     * data is the data used in Exb.
     *
     * The origin data uses this schema: {fieldName: value}, we'll reverse it to {jimuFieldName: value}, which is called data and will be used in exb.
     *
     */
    constructor(data: any, dataSource: DataSource, isOriginData?: boolean);
    getData(): any;
    getOriginData(): {};
    toJson(): any;
    getId(): any;
    setId(): void;
    getGeometry(): any;
}
export declare class SimpleDataRecordSet implements DataRecordSet {
    records: DataRecord[];
    fields?: FieldSchema[];
    dataSource?: DataSource;
    constructor(options: DataRecordSet);
}
export declare class CsvDataSource extends AbstractLoadableDataSource {
    type: DataSourceTypes;
    constructor(options: DataSourceConstructorOptions);
    doLoad(): Promise<DataRecord[]>;
}
