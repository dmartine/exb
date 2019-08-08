import { ExpressionPart, IMUseDataSource, ImmutableArray, Expression, DataSourceManager } from 'jimu-core';
import AppDataSourceManager from '../app-data-source-manager';
export declare function getUseDataSourceFromExpParts(parts: ExpressionPart[]): ImmutableArray<IMUseDataSource>;
export declare function mergeUseDataSources(u1?: ImmutableArray<IMUseDataSource>, u2?: ImmutableArray<IMUseDataSource>): ImmutableArray<IMUseDataSource>;
export declare function getWhetherExpressionValid(e: Expression): boolean;
export declare function getDsManager(): DataSourceManager | AppDataSourceManager;
export declare function getWhetherFieldInDs(dsId: string, jimuFieldName: string): boolean;
export declare function getWhetherFieldIsNumber(dsId: string, jimuFieldName: string): boolean;
export declare function getWhetherDsDisabled(part: ExpressionPart, dataSourceIds: string[]): boolean;
