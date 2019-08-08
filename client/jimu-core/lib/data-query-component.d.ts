import * as React from 'react';
import { IMDataSourceInfo } from './types/state';
import { DataSource, QueriableDataSource, DataSourceStatus, DataRecord } from './data-source/ds-base-types';
import DataSourceManager from './data-source-manager';
import { IMDataSourceJson, IMUseDataSource } from './types/app-config';
interface DataRenderFunction {
    (ds: DataSource, queryStatus: DataSourceStatus, records: DataRecord[], fields?: string[]): React.ReactNode;
}
export interface DataSourceComponentProps {
    useDataSource: IMUseDataSource;
    /**
     * force query even the query param does not change
     */
    refresh?: boolean;
    /**
     * the query params for the queriable data source
     */
    query: any;
    children?: DataRenderFunction | React.ReactNode;
    onQueryStatusChange?: (status: DataSourceStatus) => void;
    onDataSourceCreated?: (ds: DataSource) => void;
    onCreateDataSourceFailed?: (err: any) => void;
}
export interface DataSourceComponentStateProps {
    dataSource: QueriableDataSource;
    dataSourceInfo: IMDataSourceInfo;
    dataSourceJson: IMDataSourceJson;
    rootDataSourceJson?: IMDataSourceJson;
    dataSourceManager: DataSourceManager;
}
declare type AllProps = DataSourceComponentProps & DataSourceComponentStateProps;
interface State {
    realQueryParam: any;
    queryStatus: DataSourceStatus;
    records: DataRecord[];
}
export declare class DataQueryComponentInner extends React.PureComponent<AllProps, State> {
    state: {
        realQueryParam: any;
        queryStatus: DataSourceStatus;
        records: any[];
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: AllProps, prevState: State): void;
    render(): {};
    doQuery(): void;
    createDataSource(): void;
}
declare const _default: React.ComponentClass<DataSourceComponentProps, any>;
export default _default;
