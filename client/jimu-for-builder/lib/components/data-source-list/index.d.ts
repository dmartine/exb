/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, ImmutableArray, InjectedIntl } from 'jimu-core';
import { AllDataSourceTypes, DataSourceJsonWithRootId } from './ds-types';
export { AllDataSourceTypes, DataSourceJsonWithRootId };
interface State {
    isExternalDsShown: boolean;
}
interface Props {
    isDataSourceInited: boolean;
    types: ImmutableArray<AllDataSourceTypes>;
    selectedDsIds: ImmutableArray<string>;
    isMultiple?: boolean;
    disableSelection?: boolean;
    disableRemove?: boolean;
    onSelect?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    onRemove?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    onClose?: () => void;
    changeInitStatus?: (isInited: boolean) => void;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: InjectedIntl;
}
export declare class _DataSourceList extends React.PureComponent<Props & ExtraProps, State> {
    externalDsStyle: {
        width: string;
        height: string;
        maxWidth: string;
        margin: number;
    };
    fontSizeStyle: {
        fontSize: string;
    };
    titleStyle: {
        height: string;
        borderBottom: string;
    };
    constructor(props: any);
    showExternalDs: () => void;
    onSelectDataFinished: (dsJsons: import("seamless-immutable").ImmutableObject<import("jimu-core").DataSourceJson>[]) => void;
    onSelectDataCanceled: () => void;
    onToggleExternalDs: () => void;
    ExternalDs: JSX.Element;
    render(): JSX.Element;
}
declare const DataSourceList: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<any, string | number | symbol> & React.ClassAttributes<React.Component<Pick<any, string | number | symbol>, any, any>>, "theme">>;
export default DataSourceList;
