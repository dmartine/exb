import * as React from 'react';
import { ImmutableObject, ImmutableArray } from 'seamless-immutable';
import { IMAppConfig, IMWidgetJson } from './app-config';
import { WidgetJsonWithoutConfig } from './app-config';
import { IMRuntimeInfo, IMRuntimeInfos, IMUser } from './state';
import { UrlParameters } from './url-parameters';
import { InjectedIntl } from 'react-intl';
import { IMThemeVariables } from './theme';
import { IMRepeatedDataSource } from '../repeat-data-source-context';
import * as appInBuilderModules from 'jimu-for-builder/for-app-inbuilder';
import * as layoutForBuilder from 'jimu-layouts/lib/fixed-layout/builder/layout';
export declare type AllWidgetProps<T> = WidgetProps & WidgetInjectedProps<T>;
export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
}
export interface ControllerWidgetProps {
    widgetsJson: ImmutableObject<{
        [widgetId: string]: IMWidgetJson;
    }>;
    widgetsRuntimeInfo: IMRuntimeInfos;
}
export declare type IMControllerWidgetProps = ImmutableObject<ControllerWidgetProps>;
export declare type WidgetInjectedProps<T> = WidgetJsonWithoutConfig & IMRuntimeInfo & IMControllerWidgetProps & {
    dispatch: any;
    config: T;
    queryObject: ImmutableObject<UrlParameters>;
    portalUrl?: string;
    portalSelf?: any;
    locale: string;
    intl: InjectedIntl;
    theme: IMThemeVariables;
    appI18nMessages: any;
    /**
     * Widget can have internal state, and widget can put the state in this.state, or put the state
     * in app store by publish `widgetStatePropChange` action, the state props are mapped here.
     *
     * When should widget put state here?
     *  * Widget may have: main widget class, extensions, message actions, data actions, and all of these
     *    components may need to communicate. In this case, widget can put the shared data here to communicate
     *  * Widget can put any data here if it doesn't want to put in this.state.
     *
     */
    stateProps: any;
    repeatedDataSource: IMRepeatedDataSource | ImmutableArray<IMRepeatedDataSource>;
    /**
     * some objects are hard to make them mutable, we can put them here.
     */
    mutableStateProps: any;
    /**
     * this props is used to trigger re-render when the props are changed, because the props may be mutable, which can't trigger re-render.
     */
    mutableStatePropsVersion: number;
    token?: string;
    user?: IMUser;
    builderSupportModules?: {
        appInBuilderLib: typeof appInBuilderModules;
        LayoutClass?: typeof layoutForBuilder;
        widgetModules?: any;
    };
};
export interface LayoutStateProps {
    dispatch?: any;
    appConfig?: IMAppConfig;
    widgetsRuntimeInfo?: IMRuntimeInfos;
}
