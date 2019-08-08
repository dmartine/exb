/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { DataSource, React, IMWidgetJson, ImmutableArray, InjectedIntl } from 'jimu-core';
import { DataSourceJsonWithRootId, AllDataSourceTypes } from './ds-types';
interface State {
    selectedType: AllDataSourceTypes;
    selectedWidgetId: string;
    toUseRootDss: {
        [widgetId: string]: DataSource[];
    };
    toUseChildDss: {
        [rootDsId: string]: DataSource[];
    };
    rootDss: {
        [widgetId: string]: DataSource[];
    };
    childDss: {
        [rootDsId: string]: DataSource[];
    };
    toUseWidgets: IMWidgetJson[];
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
export default class DataSourceWidgetOutputs extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillUnmount(): void;
    initData: () => void;
    setToUseDataSources: (usedTypes: any) => void;
    setDataSources: () => void;
    setSelectedType: (types: (import("jimu-core").DataSourceTypes | import("../../../../jimu-arcgis/arcgis-data-source-type").ArcGISDataSourceTypes | import("../../../../hub-common/hub-data-source-type").HubDataSourceTypes)[]) => void;
    setSelectedWidgetId: (widgetId: string) => void;
    getRootDss: () => {
        [widgetId: string]: DataSource[];
    };
    getToUseWidgets: (toUseRootDss: {
        [widgetId: string]: DataSource[];
    }, toUseChildDss: {
        [rootDsId: string]: DataSource[];
    }) => import("seamless-immutable").ImmutableObject<import("jimu-core").WidgetJson>[];
    geToUseRootDss: (usedTypes: import("seamless-immutable").ImmutableArray<string>) => {
        [widgetId: string]: DataSource[];
    };
    getToUseChildDss: (usedTypes: import("seamless-immutable").ImmutableArray<string>) => Promise<{
        [rootDsId: string]: DataSource[];
    }>;
    getToUseChildDssByWidgetId: (wId: string) => {
        [rootDsId: string]: DataSource[];
    };
    getToUseTypes: () => (import("jimu-core").DataSourceTypes | import("../../../../jimu-arcgis/arcgis-data-source-type").ArcGISDataSourceTypes | import("../../../../hub-common/hub-data-source-type").HubDataSourceTypes)[];
    getWhetherShowList: () => boolean;
    onWidgetClick: (e: any, wId: string) => void;
    onBackClick: () => void;
    render(): JSX.Element;
}
export {};
