import * as React from 'react';
import { IMDataSourceInfo } from './types/state';
import { DataSource } from './data-source/ds-base-types';
import DataSourceManager from './data-source-manager';
import { IMDataSourceJson, IMUseDataSource } from './types/app-config';
interface DataRenderFunction {
    (ds: DataSource, info: IMDataSourceInfo, fields?: string[]): React.ReactNode;
}
export interface DataSourceComponentProps {
    useDataSource: IMUseDataSource;
    /**
     * force query even the query param does not change
     */
    refresh?: boolean;
    /**
     * the query params for the queriable data source. Will always use this query to query data for ds
     */
    query?: any;
    /**
     * Will be used only when ds is unloaded.
     */
    defaultQuery?: any;
    children?: DataRenderFunction | React.ReactNode;
    onDataSourceInfoChange?: (info: IMDataSourceInfo) => void;
    onDataSourceCreated?: (ds: DataSource) => void;
    onCreateDataSourceFailed?: (err: any) => void;
    onDataSourceQueryChange?: (ds: DataSource, query: any) => void;
}
export interface DataSourceComponentStateProps {
    dataSource: DataSource;
    dataSourceInfo: IMDataSourceInfo;
    dataSourceJson: IMDataSourceJson;
    rootDataSourceJson?: IMDataSourceJson;
    dataSourceManager: DataSourceManager;
}
interface state {
    query: any;
}
declare type AllProps = DataSourceComponentProps & DataSourceComponentStateProps;
export declare class DataSourceComponentInner extends React.PureComponent<AllProps, state> {
    constructor(props: AllProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: AllProps): void;
    render(): {};
    doQuery(): void;
    createDataSource(): void;
}
declare const _default: React.ComponentClass<DataSourceComponentProps, any>;
export default _default;
