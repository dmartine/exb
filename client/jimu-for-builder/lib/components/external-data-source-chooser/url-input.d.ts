/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, IMDataSourceJson, InjectedIntl } from 'jimu-core';
interface DataSourceUrlType {
    label: string;
}
interface Props {
    intl: InjectedIntl;
    getDsId: () => string;
    onAdded: (dsJsons: IMDataSourceJson[]) => void;
    onRemoved: (dsJsons: IMDataSourceJson) => void;
}
interface State {
    url: string;
    selectedDataSourceUrlType: DataSourceUrlType;
    isSupported: boolean;
}
export default class extends React.PureComponent<Props, State> {
    dataSourceUrlTypes: DataSourceUrlType[];
    constructor(props: any);
    componentDidMount(): void;
    onUrlTypesClicked: (e: any) => void;
    onInputUrl: (e: any) => void;
    onAdded: () => void;
    changeDsJsons: (dsJsons: import("seamless-immutable").ImmutableObject<import("jimu-core").DataSourceJson>[]) => void;
    render(): JSX.Element;
}
export {};
