import { extensionSpec } from 'jimu-core';
export declare class HubDataSourceFactoryUriExtension implements extensionSpec.DataSourceFactoryUri {
    id: string;
    getFactoryUri(dataSourceType: any): string;
}
