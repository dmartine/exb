import { ExpressionPart, ExpressionFunctions } from '../types/expression';
import { StatisticType } from './types';
export declare function getQueryResult(parts: ExpressionPart[], func: ExpressionFunctions): Promise<number>;
export declare function isNumber(n: any): boolean;
export declare function getCacheId(func: ExpressionFunctions, dsId: string, jimuFieldName?: string): string;
export declare function getStatisticOutputName(func: ExpressionFunctions, jimuFieldName?: string, index?: number): string;
export declare function getSingleCachedResult(func: ExpressionFunctions, dsId: string, jimuFieldName?: string): number;
export declare function getStatisticType(func: ExpressionFunctions): StatisticType;
export declare function cacheResult(value: number, id: string): void;
