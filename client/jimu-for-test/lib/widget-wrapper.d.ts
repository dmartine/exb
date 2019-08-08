/// <reference types="react" />
import { WidgetProps, React, WidgetContext, WidgetManifest, IMUseDataSource, ImmutableArray, DataSource, i18n, ImmutableObject, UrlParameters, ThemeVariables } from 'jimu-core';
import { InjectedIntl } from 'react-intl';
interface Props {
    id?: string;
    icon?: string;
    label?: string;
    visible?: boolean;
    index?: number;
    uri?: string;
    itemId?: string;
    context?: WidgetContext;
    manifest?: WidgetManifest;
    version?: string;
    useDataSources?: ImmutableArray<IMUseDataSource>;
    dataSources?: {
        [dsId: string]: DataSource;
    };
    outputDataSource?: string[];
    outputDataSources?: string[];
    dispatch?: any;
    config?: any;
    messages?: i18n.I18nMessages;
    intl?: InjectedIntl;
    isClassLoaded?: boolean;
    state?: 'opened' | 'active' | 'closed';
    windowState?: 'normal' | 'minimized' | 'maximized';
    queryObject?: ImmutableObject<UrlParameters>;
    theme?: Partial<ThemeVariables>;
}
export declare function wrapWidget(WidgetClass: React.ComponentClass<WidgetProps & {
    intl: any;
}>, props?: Props): React.ComponentClass<WidgetProps>;
export {};
