import * as React from 'react';
import { DataRecord } from './data-source/ds-base-types';
import { ImmutableObject } from 'seamless-immutable';
export interface RepeatedDataSource {
    widgetId: string;
    dataSourceId: string;
    recordIndex: number;
    record: DataRecord;
}
export declare type IMRepeatedDataSource = ImmutableObject<RepeatedDataSource>;
export declare function RepeatedDataSourceProvider({ data, children }: {
    data: RepeatedDataSource | RepeatedDataSource[];
    children: React.ReactElement;
}): JSX.Element;
export declare const RepeatedDataSourceConsumer: React.ExoticComponent<React.ConsumerProps<any>>;
export declare function withRepeatedDataSource<T extends React.FunctionComponent<any>>(Component: T): T;
