/// <reference types="react" />
/// <reference types="react-intl" />
import { WidgetJsonWithoutConfig, IMDataSourceJson, IMUseDataSource, ImmutableArray, ImmutableObject, UrlParameters, Size, IMUser, InjectedIntl, IMThemeVariables, IMLayoutItemJson, LayoutInfo, BoundingBox } from 'jimu-core';
export declare type AllWidgetSettingProps<T> = WidgetSettingProps & WidgetSettingInjectedProps<T>;
export interface SettingChangeFunction {
    (settingOptions: SettingOptions): void;
}
export interface SettingOptions {
    widgetId: string;
    config?: any;
    useDataSources?: ImmutableArray<IMUseDataSource>;
    outputDataSourcesJson?: ImmutableArray<IMDataSourceJson>;
    icon?: string;
    label?: string;
    visible?: boolean;
    index?: number;
    size?: Size;
}
export interface WidgetSettingProps extends React.HTMLAttributes<HTMLDivElement> {
    onSettingChange: SettingChangeFunction;
}
export interface WidgetItemSettingProps {
    layout: IMLayoutItemJson;
    onSettingChange: (layoutInfo: LayoutInfo, setting: any) => void;
    onPosChange: (layoutInfo: LayoutInfo, bbox: BoundingBox) => void;
}
export declare type IMUseDataSourcesJson = ImmutableArray<ImmutableObject<{
    dataSourceJson: IMDataSourceJson;
    rootDataSourceId?: string;
    fields?: string[];
}>>;
export declare type WidgetSettingInjectedProps<T> = WidgetJsonWithoutConfig & {
    dispatch: any;
    queryObject: ImmutableObject<UrlParameters>;
    config: T;
    locale: string;
    appI18nMessages: any;
    intl: InjectedIntl;
    token?: string;
    user?: IMUser;
    theme: IMThemeVariables;
    portalUrl?: string;
    portalSelf?: any;
};
