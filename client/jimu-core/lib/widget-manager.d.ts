import * as React from 'react';
import { IMWidgetJson, WidgetJson } from './types/app-config';
import { WidgetManifest } from './types/manifest';
import { IMState } from './types/state';
import { WidgetProps } from './types/props';
import DataSourceManager from './data-source-manager';
import { I18nMessages } from './i18n';
interface WidgetRawClassInfo {
    clazz: any;
    i18nMessages: I18nMessages;
}
export default class WidgetManager {
    static instance: WidgetManager;
    static getInstance(): WidgetManager;
    dsManager: DataSourceManager;
    constructor();
    widgetRawClasses: {
        [widgetName: string]: Promise<WidgetRawClassInfo>;
    };
    widgetClasses: {
        [widgetId: string]: React.ComponentClass<WidgetProps>;
    };
    widgetClassesPromise: {
        [widgetId: string]: Promise<React.ComponentClass<WidgetProps>>;
    };
    widgetManifestsPromise: {
        [widgetUri: string]: Promise<WidgetManifest>;
    };
    getWidgetClass(widgetId: string): React.ComponentClass<WidgetProps>;
    deleteWidgetClass(widgetId: string): void;
    loadWidgetClass(widgetId: string): Promise<React.ComponentClass<WidgetProps>>;
    loadWidgetClass(widgetJson: IMWidgetJson): Promise<React.ComponentClass<WidgetProps>>;
    loadRawClass(widgetJson: IMWidgetJson): Promise<WidgetRawClassInfo>;
    /**
     * Do not load the default string messages
     * @param widgetJson
     */
    loadWidgetTranslation(widgetJson: WidgetJson): Promise<I18nMessages>;
    openWidget(widgetId: string): void;
    closeWidget(widgetId: string): void;
    appWidgetClassWrapperExtension(WidgetClass: React.ComponentClass<WidgetProps>, widgetJson: IMWidgetJson, messages: any): React.ComponentClass<WidgetProps>;
    /**
     *
     * @param widgetJson Only `id` and `uri` is required
     */
    handleNewWidgetJson(widgetJson: WidgetJson): Promise<WidgetJson>;
    /**
     *
     * @param widgetId the new widget id
     * @param existedWidgetId the existed widget id of the same widget
     * @param params like {config: {}, label: {}}
     */
    createWidgetJsonFromExistedWidget(widgetId: string, existedWidgetId: string, params?: any): WidgetJson;
    loadWidgetManifest(widgetJson: WidgetJson): Promise<WidgetManifest>;
    processWidgetManifest(widgetJson: WidgetJson): Promise<WidgetManifest>;
    registerManifestProps(widgetJson: IMWidgetJson): Promise<void>;
    unRegisterManifestProps(widgetId: string): void;
    loadWidgetConfig(widgetJson: WidgetJson): Promise<any>;
    upgradeWidgetConfig(widgetJson: WidgetJson, oldConfig: any): Promise<any>;
    tryLoadWidgetConfig(widgetJson: WidgetJson): Promise<any>;
    loadWidgetDependency(widgetJson: IMWidgetJson, flag?: 'runtime' | 'setting'): Promise<void>;
    createDataSourcesForWidget(widgetId: string, state: IMState): Promise<any>;
    injectWidgetProps(WrappedComponent: any, i18nMessages: I18nMessages, widgetId: string): Promise<React.ComponentClass<WidgetProps>>;
    private onStoreChange;
}
export {};
