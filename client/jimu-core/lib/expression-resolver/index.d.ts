/// <reference types="react-intl" />
import { DataRecord, InjectedIntl } from 'jimu-core';
import { Expression } from '../types/expression';
export declare function resolveExpression(expression: Expression, record?: DataRecord | {
    [dataSourceId: string]: DataRecord;
}, intl?: InjectedIntl): Promise<string>;
