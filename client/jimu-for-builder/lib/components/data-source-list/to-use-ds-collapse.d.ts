/// <reference types="react-intl" />
/// <reference types="react" />
import { DataSource, React, ImmutableArray, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId } from './ds-types';
interface State {
    isChildDssOpen: boolean;
}
interface Props {
    rootDs: DataSource;
    childDss: DataSource[];
    selectedDsIds: ImmutableArray<string>;
    intl: InjectedIntl;
    onSelect: (selectedDsJson: DataSourceJsonWithRootId) => void;
    onRemove?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
export default class ToUseDsCollapse extends React.PureComponent<Props, State> {
    constructor(props: any);
    toggleChildDss: () => void;
    render(): JSX.Element;
}
export {};
