/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, IMDataSourceJson, Immutable, InjectedIntl } from 'jimu-core';
interface Props {
    onAdded: (dsJson: IMDataSourceJson) => void;
    onRemoved: (dsJson: IMDataSourceJson) => void;
    portalUrl: string;
    intl: InjectedIntl;
}
interface State {
    hubEventDsJson: IMDataSourceJson;
    hubAnnoDsJson: IMDataSourceJson;
    selectedDsJsons: IMDataSourceJson[];
}
export default class extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getHubEventDsJson: () => Immutable.ImmutableObject<import("jimu-core").DataSourceJson>;
    getHubAnnoDsJson: () => Immutable.ImmutableObject<import("jimu-core").DataSourceJson>;
    getWhetherDsSelected: (dsJson: Immutable.ImmutableObject<import("jimu-core").DataSourceJson>) => boolean;
    onItemClick: (dsJson: Immutable.ImmutableObject<import("jimu-core").DataSourceJson>) => void;
    Item: ({ dsJson, active, title, onClick }: {
        dsJson: Immutable.ImmutableObject<import("jimu-core").DataSourceJson>;
        active: boolean;
        title: string;
        onClick: (dsJson: Immutable.ImmutableObject<import("jimu-core").DataSourceJson>) => void;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
