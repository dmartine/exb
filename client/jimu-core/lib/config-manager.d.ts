import { AppConfig, IMAppConfig } from './types/app-config';
import { IItem } from '@esri/arcgis-rest-types';
import { InjectedIntl } from 'react-intl';
export default class ConfigManager {
    static instance: ConfigManager;
    static getInstance(options: {
        intl: InjectedIntl;
    }): ConfigManager;
    constructor(options: any);
    intl: InjectedIntl;
    loadAppConfig(): Promise<IMAppConfig>;
    private initTrackingManager;
    private _loadAndProcessAppConifg;
    processRawConfig(appConfig: AppConfig): Promise<AppConfig>;
    private setDocumentTitle;
    loadRawAppConfig(): Promise<AppConfig>;
    /**
     * By default, app can load app config from:
     *  ?config=<url>: relative or absolute URL
     *  ?id=<app id>: the item id.
     *  /:appId?:
     */
    loadAppConfigWithDefault(): Promise<AppConfig>;
    loadAppInfoFromPortal(appId: string): Promise<IItem>;
    loadAppConfigFromPortal(appId: string): Promise<AppConfig>;
    applyAppConfigProcessorExtension(appConfig: AppConfig): Promise<AppConfig>;
    loadAllWidgetsManifest(appConfig: AppConfig): Promise<AppConfig>;
    loadAndUpgradeAllWidgetsConfig(appConfig: AppConfig): Promise<AppConfig>;
    processAppConfigAfterLoad(appConfig: AppConfig): void;
    handlePortalResourceInConfig(appConfig: AppConfig): Promise<AppConfig>;
    handleEmbedMode(appConfig: AppConfig): void;
    addDefaultPageStructure(appConfig: AppConfig): void;
    fixAllIds(appConfig: AppConfig): void;
    fixId(section: any): void;
    fixWidgetUri(appConfig: AppConfig): void;
    addWidgetContext(appConfig: AppConfig): void;
    addDefaultValues(appConfig: AppConfig): AppConfig;
    addDefaultPageVisible(appConfig: AppConfig): void;
    addDefaultLabelAndIcon(appConfig: AppConfig): void;
}
