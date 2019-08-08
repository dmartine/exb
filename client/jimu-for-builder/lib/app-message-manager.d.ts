/// <reference types="react" />
import { React, MessageType, MessageAction, ActionSettingProps, IMActionJson, IMWidgetJson } from 'jimu-core';
import { WidgetRawSettingClassInfo } from './widget-setting-manager';
export default class AppMessageManager {
    static instance: AppMessageManager;
    static getInstance(): AppMessageManager;
    private actionSettingClasses;
    actionRawSettingClasses: {
        [uri: string]: Promise<WidgetRawSettingClassInfo>;
    };
    getAllActions(): MessageAction[];
    getFilteredActions(messageType: MessageType): MessageAction[];
    getActionSettingClassUri: (actionId: string) => string;
    loadActionSettingClass(actionJson: IMActionJson): Promise<React.ComponentClass<ActionSettingProps<{}>>>;
    loadRawSettingClass(actionWidgetJson: IMWidgetJson, uri: string): Promise<WidgetRawSettingClassInfo>;
    injectActionSettingProps(WrappedComponent: any, i18nMessages: any, actionWidgetId: string): React.ComponentClass<ActionSettingProps<{}>>;
    registerActionRawSettingClassInfo(uri: string, rawSettingClassInfo: WidgetRawSettingClassInfo): void;
    getActionRawSettingClassInfo(uri: string): Promise<WidgetRawSettingClassInfo>;
}
