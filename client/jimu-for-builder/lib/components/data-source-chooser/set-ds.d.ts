/// <reference types="react-intl" />
/// <reference types="react" />
import { React, IMDataSourceJson, ThemeVariables, ImmutableObject, ImmutableArray, DataSourceManager, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId, AllDataSourceTypes } from '../data-source-list/ds-types';
import AppDataSourceManager from '../../app-data-source-manager';
interface State {
    isDsListShown: boolean;
    isDataSourceInited: boolean;
    isErrorToastShown: boolean;
}
interface Props {
    types: ImmutableArray<AllDataSourceTypes>;
    selectedDataSourceIds?: ImmutableArray<string>;
    modalStyle?: object;
    isMultiple?: boolean;
    onSelect?: (selectedDsJsons: DataSourceJsonWithRootId[], selectedDsJson?: DataSourceJsonWithRootId) => void;
    onRemove?: (selectedDsJsons: DataSourceJsonWithRootId[], removedDsJson?: DataSourceJsonWithRootId) => void;
    disableSelection?: (selectedDsJsons: DataSourceJsonWithRootId[]) => boolean;
    disableRemove?: (selectedDsJsons: DataSourceJsonWithRootId[]) => boolean;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: InjectedIntl;
}
interface StateExtraProps {
    dataSources: ImmutableObject<{
        [dsId: string]: IMDataSourceJson;
    }>;
}
export default class SetDs extends React.PureComponent<Props & ExtraProps & StateExtraProps, State> {
    panelWidth: string;
    defaultModalStyle: {
        position: string;
        top: string;
        bottom: string;
        right: string;
        left: string;
        width: string;
        height: string;
        zIndex: string;
        borderRight: string;
    };
    modalStyle: object;
    __unmount: boolean;
    dsManager: AppDataSourceManager | DataSourceManager;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props & ExtraProps & StateExtraProps): void;
    componentWillUnmount(): void;
    initDss: () => void;
    changeInitStatus: (isInited: boolean) => void;
    disableSelection: () => boolean;
    disableRemove: () => boolean;
    getDssWithRootId: (dataSourceIds: string[]) => DataSourceJsonWithRootId[];
    getModalStyle: () => {
        position: string;
        top: string;
        bottom: string;
        right: string;
        left: string;
        width: string;
        height: string;
        zIndex: string;
        borderRight: string;
    };
    getDsLabel: (dsId: string) => string;
    onDsListClose: () => void;
    onDsSelected: (selectedDsJson: DataSourceJsonWithRootId) => void;
    onDsRemoved: (removedDsJson: DataSourceJsonWithRootId) => void;
    toggleDsList: () => void;
    render(): JSX.Element;
}
export {};
