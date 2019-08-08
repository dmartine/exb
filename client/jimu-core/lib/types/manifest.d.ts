import { ImmutableObject } from 'seamless-immutable';
import { MessageType } from '../message/message-base-types';
import { Size, WidgetType } from './common';
import { ExtensionPoints } from '../extension-spec/extension-spec';
export interface Manifest {
    name: string;
    label: string;
    version: string;
    jimuVersion: string;
    i18nMessages: any;
    author?: string;
    description?: string;
    copyright?: string;
    license?: string;
}
export interface MessageActionProperty {
    name: string;
    uri: string;
    settingUri?: string;
    label: string;
}
export interface DataActionProperty {
    name: string;
    uri: string;
    label: string;
}
export interface WidgetManifest extends Manifest {
    properties?: WidgetManifestProperties;
    extensions?: ExtensionProperties[];
    publishMessages: MessageType[];
    messageActions: MessageActionProperty[];
    dataActions: DataActionProperty[];
    supportedLocales: string[];
    /**
     * Known dependency:
     *    arcgis:
     *
     * widgets don't need to declare the depent on "jimu-ui" because there is no addtion resources to loaded exclude the jimu-ui
     */
    dependency?: string | string[];
    settingDependency?: string | string[];
    defaultSize?: Size;
}
export interface ExtensionProperties {
    point: ExtensionPoints;
    uri: string;
    name: string;
    label: string;
}
export interface WidgetManifestProperties {
    hasMainClass: boolean;
    hasConfig: boolean;
    hasSettingPage: boolean;
    hasLayoutItemSettingPage: boolean;
    /**
     * If widget support inline edit, widget may not need to show setting page even it has config
     */
    hasConfigInSettingPage: boolean;
    hasVersionManager: boolean;
    isController: boolean;
    autoBindDataSource: boolean;
    supportInlineEditing: boolean;
    supportRepeat: boolean;
    hasEmbeddedLayout: boolean;
    hasBuilderSupportModule: boolean;
    type: WidgetType;
    layouts: Array<{
        name: string;
        label: string;
        type?: string;
    }>;
}
export declare type IMWidgetManifest = ImmutableObject<WidgetManifest>;
export interface ThemeStyleFilesProperty {
    css: boolean;
    js: boolean;
}
export interface ThemeManifest extends Manifest {
    styleFiles?: ThemeStyleFilesProperty;
}
export declare type IMThemeManifest = ImmutableObject<ThemeManifest>;
