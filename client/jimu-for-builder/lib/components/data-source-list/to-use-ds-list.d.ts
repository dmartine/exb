/// <reference types="react-intl" />
/// <reference types="react" />
import { DataSource, React, ImmutableArray, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId } from './ds-types';
interface State {
    isTypeDropdownOpen: boolean;
    selectedErrorDss: string[];
}
interface Props {
    toUseRootDss: DataSource[];
    toUseChildDss: {
        [rootDsId: string]: DataSource[];
    };
    rootDss: DataSource[];
    selectedDsIds: ImmutableArray<string>;
    showErrorDss: boolean;
    intl: InjectedIntl;
    onSelect: (selectedDsJson: DataSourceJsonWithRootId) => void;
    changeHasErrorSelectedDss?: (hasErrorDss: boolean) => void;
    onRemove?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
export default class ToUseDsList extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    getWhetherShowRootDss: () => boolean;
    getWhetherShowChildDss: () => boolean;
    getRootDsById: (id: string) => DataSource;
    getSelectedErrorDss: () => string[];
    render(): JSX.Element;
}
export {};
