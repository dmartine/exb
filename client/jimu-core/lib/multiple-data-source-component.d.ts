import * as React from 'react';
import { IMDataSourceInfo } from './types/state';
import { DataSource } from './data-source/ds-base-types';
import { IMUseDataSource } from './types/app-config';
interface DataRenderFunction {
    (dss: {
        [dataSourceId: string]: DataSource;
    }, infos: {
        [dataSourceId: string]: IMDataSourceInfo;
    }): React.ReactNode;
}
export interface MultipleDataSourceComponentProps {
    useDataSources?: IMUseDataSource[];
    queries?: {
        [dataSourceId: string]: any;
    };
    children?: DataRenderFunction | React.ReactNode;
    onDataSourceInfoChange?: (infos: {
        [dataSourceId: string]: IMDataSourceInfo;
    }) => void;
    onDataSourceCreated?: (dss: {
        [dataSourceId: string]: DataSource;
    }) => void;
}
interface ExtraProps {
    [dsId: string]: IMDataSourceInfo;
}
declare type AllProps = MultipleDataSourceComponentProps & ExtraProps;
export declare class MultipleDataSourceComponentInner extends React.PureComponent<AllProps, {}> {
    handleDataSourceCreated: () => void;
    handleDataSourceInfoChange: () => void;
    getDataSources: () => {};
    getDataSourcesInfo: () => {};
    hasLoadedDataSources: () => boolean;
    render(): JSX.Element | JSX.Element[];
}
declare const _default: React.ComponentClass<MultipleDataSourceComponentProps, any>;
export default _default;
