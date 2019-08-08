/// <reference types="react-intl" />
import { FeatureDataRecord, InjectedIntl, IMUseDataSource, ImmutableArray } from 'jimu-core';
import { ExpressionPart, Expression } from '../types/expression';
export declare function resolveExpression(expression: Expression, record?: FeatureDataRecord | {
    [dataSourceId: string]: FeatureDataRecord;
}, intl?: InjectedIntl): Promise<string>;
export declare function resolveField(variable: string, record: FeatureDataRecord, intl?: InjectedIntl): string | boolean | number;
export declare function getUseDataSourceFromExpParts(parts: ExpressionPart[]): ImmutableArray<IMUseDataSource>;
export declare function mergeUseDataSources(u1: ImmutableArray<IMUseDataSource>, u2: ImmutableArray<IMUseDataSource>): ImmutableArray<IMUseDataSource>;
export declare function resolveExpression2(expression: string, record: FeatureDataRecord | {
    [dataSourceId: string]: FeatureDataRecord;
}, intl: InjectedIntl): string;
export declare function isMultiple2(expression: string): boolean;
export declare function getSingleDsVariables(expression: string): string[];
export declare function getMultipleDsVariables(expression: string): {
    [dataSourceId: string]: string[];
};
