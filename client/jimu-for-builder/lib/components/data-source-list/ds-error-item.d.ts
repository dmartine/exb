/// <reference types="react-intl" />
/// <reference types="react" />
import { React, DataSource, ImmutableArray, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId } from './ds-types';
interface DataSourceWithRootId extends DataSource {
    rootDataSourceId?: string;
}
interface Props {
    dsId: string;
    intl: InjectedIntl;
    onSelect?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    onRemove?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    selectedDsIds?: ImmutableArray<string>;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
interface State {
    subDataSources: DataSourceWithRootId[];
}
export default class DataSourceErrorItem extends React.PureComponent<Props, State> {
    constructor(props: any);
    getWhetherSelected: () => boolean;
    getDsJsonWithRootId: () => DataSourceJsonWithRootId;
    onItemClick: (e: any) => void;
    render(): JSX.Element;
}
export {};
