import * as React from 'react';
import { IMWidgetJson } from 'jimu-core';
import { WidgetSettingProps, WidgetItemSettingProps } from './props';
import { i18n } from 'jimu-core';
export interface WidgetRawSettingClassInfo {
    clazz: any;
    i18nMessages: i18n.I18nMessages;
}
export declare function loadLocaleMessagesForSetting(widgetJson: IMWidgetJson, settingClass: any): Promise<WidgetRawSettingClassInfo>;
export default class WidgetSettingManager {
    static instance: WidgetSettingManager;
    static getInstance(): WidgetSettingManager;
    constructor();
    widgetSettingClasses: {
        [widgetId: string]: React.ComponentClass<WidgetSettingProps>;
    };
    widgetSettingClassesPromise: {
        [widgetId: string]: Promise<React.ComponentClass<WidgetSettingProps>>;
    };
    widgetItemSettingClasses: {
        [widgetId: string]: React.ComponentClass<WidgetItemSettingProps>;
    };
    widgetRawSettingClasses: {
        [widgetName: string]: Promise<WidgetRawSettingClassInfo>;
    };
    widgetItemRawSettingClasses: {
        [widgetName: string]: Promise<WidgetRawSettingClassInfo>;
    };
    getWidgetSettingClass(widgetId: string): React.ComponentClass<WidgetSettingProps, any>;
    deleteWidgetSettingClass(widgetId: string): void;
    getItemSettingClass(widgetId: string): React.ComponentClass<WidgetItemSettingProps, any>;
    deleteAllWidgetClasses(): void;
    loadWidgetSettingClass(widgetId: string): Promise<React.ComponentClass<WidgetSettingProps>>;
    loadWidgetSettingClass(widgetJson: IMWidgetJson): Promise<React.ComponentClass<WidgetSettingProps>>;
    loadRawSettingClass(widgetJson: IMWidgetJson): Promise<WidgetRawSettingClassInfo>;
    loadItemSettingClass(widgetId: string): Promise<React.ComponentClass<WidgetItemSettingProps>>;
    loadItemSettingClass(widgetJson: IMWidgetJson): Promise<React.ComponentClass<WidgetItemSettingProps>>;
    loadRawItemSettingClass(widgetJson: IMWidgetJson): Promise<WidgetRawSettingClassInfo>;
    injectWidgetSettingProps(WrappedComponent: any, i18nMessages: any, widgetId: string): React.ComponentClass<WidgetSettingProps>;
    private onStoreChange;
}
