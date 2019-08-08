import { IMUseDataSource, ImmutableArray } from 'jimu-core';
import { DataSourceJsonWithRootId } from '../data-source-list/ds-types';
export declare function getWhetherDsInUseDataSources(dsJson: DataSourceJsonWithRootId, useDataSources: ImmutableArray<IMUseDataSource>): boolean;
export declare function getMergedSingleUsedDs(dsJson: DataSourceJsonWithRootId, usedDs: IMUseDataSource, isInherited: boolean, inheritFromWidgetId?: string): IMUseDataSource;
export declare function getSingleUsedDs(dsJson: DataSourceJsonWithRootId, isInherited: boolean, inheritFromWidgetId?: string): IMUseDataSource;
