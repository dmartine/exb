/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { DataSource, React, ImmutableArray, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId, AllDataSourceTypes } from './ds-types';
interface State {
    selectedTypes: AllDataSourceTypes[];
    toUseRootDss: DataSource[];
    toUseChildDss: {
        [rootDsId: string]: DataSource[];
    };
    rootDss: DataSource[];
    childDss: {
        [rootDsId: string]: DataSource[];
    };
    hasErrorSelectedDss: boolean;
}
interface Props {
    isDataSourceInited: boolean;
    types: ImmutableArray<AllDataSourceTypes>;
    selectedDsIds: ImmutableArray<string>;
    intl: InjectedIntl;
    onSelect: (selectedDsJson: DataSourceJsonWithRootId) => void;
    onRemove?: (selectedDsJson: DataSourceJsonWithRootId) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
}
export default class DataSourceAddedData extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillUnmount(): void;
    initData: () => void;
    setHasErrorDss: (hasErrorDss: boolean) => void;
    setToUseDataSources: (toUseTypes: any) => void;
    setDataSources: () => void;
    setSelectedType: (types: (import("jimu-core").DataSourceTypes | import("../../../../jimu-arcgis/arcgis-data-source-type").ArcGISDataSourceTypes | import("../../../../hub-common/hub-data-source-type").HubDataSourceTypes)[]) => void;
    getRootDss: () => DataSource[];
    getToUseRootDss: (toUseTypes: import("seamless-immutable").ImmutableArray<string>) => DataSource[];
    getToUseChildDss: (toUseTypes: import("seamless-immutable").ImmutableArray<string>) => Promise<{
        [rootDsId: string]: DataSource[];
    }>;
    getConfiguredTypes: () => string[];
    getWhetherShowList: () => boolean;
    getWhetherShowRootDss: () => boolean;
    getWhetherShowChildDss: () => boolean;
    render(): JSX.Element;
}
export {};
