/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, DataSource, ImmutableArray, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId } from './ds-types';
interface DataSourceWithRootId extends DataSource {
    rootDataSourceId?: string;
}
interface Props {
    dispatch: any;
    intl: InjectedIntl;
    onSelect?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    ds: DataSourceWithRootId;
    onRemove?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    selectedDsIds?: ImmutableArray<string>;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
interface State {
    subDataSources: DataSourceWithRootId[];
}
export default class DataSourceItem extends React.PureComponent<Props, State> {
    constructor(props: any);
    getWhetherSelected: () => boolean;
    getDsJsonWithRootId: () => {
        dataSourceJson: import("seamless-immutable").ImmutableObject<import("jimu-core").DataSourceJson>;
        rootDataSourceId: string;
    };
    onItemClick: (e: any) => void;
    render(): JSX.Element;
}
export {};
