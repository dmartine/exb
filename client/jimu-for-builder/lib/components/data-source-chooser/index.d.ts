/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, IMDataSourceJson, ThemeVariables, SerializedStyles, ImmutableObject, InjectedIntl, ImmutableArray, IMWidgetJson, IMLayoutJson, BrowserSizeMode } from 'jimu-core';
import { DataSourceJsonWithRootId, AllDataSourceTypes } from '../data-source-list/ds-types';
interface State {
}
interface Props {
    types: ImmutableArray<AllDataSourceTypes>;
    widgetId: string;
    selectedDataSourceIds?: ImmutableArray<string>;
    modalStyle?: object;
    isMultiple?: boolean;
    mustUseDataSource?: boolean;
    onSelect?: (allSelectedDss: DataSourceJsonWithRootId[], currentSelectedDs?: DataSourceJsonWithRootId) => void;
    onRemove?: (allSelectedDss: DataSourceJsonWithRootId[], currentRemovedDs?: DataSourceJsonWithRootId) => void;
    disableSelection?: (allSelectedDss: DataSourceJsonWithRootId[]) => boolean;
    disableRemove?: (allSelectedDss: DataSourceJsonWithRootId[]) => boolean;
}
interface StateExtraProps {
    dataSources: ImmutableObject<{
        [dsId: string]: IMDataSourceJson;
    }>;
    layouts: ImmutableObject<{
        [layoutId: string]: IMLayoutJson;
    }>;
    widgets: ImmutableObject<{
        [widgetId: string]: IMWidgetJson;
    }>;
    browserSizeMode: BrowserSizeMode;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: InjectedIntl;
}
export declare class _DataSourceChooser extends React.PureComponent<Props & StateExtraProps & ExtraProps, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    getStyle: (theme: ThemeVariables) => SerializedStyles;
    toggleDataUse: (isEnabled: boolean) => void;
    onSelect: (allSelectedDss: DataSourceJsonWithRootId[], currentSelectedDs?: DataSourceJsonWithRootId) => void;
    onRemove: (allSelectedDss: DataSourceJsonWithRootId[], currentRemovedDs?: DataSourceJsonWithRootId) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Props, any>;
export default _default;
