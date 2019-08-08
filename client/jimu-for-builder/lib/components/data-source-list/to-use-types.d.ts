/// <reference types="react-intl" />
/// <reference types="react" />
import { React, InjectedIntl } from 'jimu-core';
import { AllDataSourceTypes } from './ds-types';
interface State {
}
interface Props {
    toUseTypes: AllDataSourceTypes[];
    selectedTypes: AllDataSourceTypes[];
    intl: InjectedIntl;
    onTypeSelected: (types: AllDataSourceTypes[]) => void;
}
export default class ToUseTypes extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    getWhetherdisableSelectionType: (types: (import("jimu-core").DataSourceTypes | import("../../../../jimu-arcgis/arcgis-data-source-type").ArcGISDataSourceTypes | import("../../../../hub-common/hub-data-source-type").HubDataSourceTypes)[]) => boolean;
    onTypeSelected: (e: any) => void;
    render(): JSX.Element;
}
export {};
