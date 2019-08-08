import * as React from 'react';
import { AllWidgetProps } from './types/props';
import { IMState } from './types/state';
import { DataSource } from './data-source/ds-base-types';
export default class BaseWidget<P extends AllWidgetProps<{}> = AllWidgetProps<{}>, S = {}> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetInjectedProps" will be injected into widget props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: AllWidgetProps<{}>) => any;
    /**
     * When widget is rendered in server side, to fetch data to render, we can use this method.
     *
     * This function can return some props, which are put in app store so it can be passed to client.
     * Please make sure the returned props are plain object.
     *
     * @param state
     * @param allProps
     * @param dataSources the widget required data sources. we can use the data source to load data.
     *      If we call `dataSource.load()`, the fechted data will be saved in app store and be passed to client as well.
     */
    static preloadData: (state: IMState, allProps: AllWidgetProps<{}>, dataSources: {
        [dsId: string]: DataSource;
    }) => Promise<any>;
}
