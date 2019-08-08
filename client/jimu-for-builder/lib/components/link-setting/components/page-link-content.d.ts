/// <reference types="react-intl" />
/// <reference types="react" />
import { React, IMAppConfig, InjectedIntl } from 'jimu-core';
import { LinkParam } from '../link-setting-types';
interface Props {
    linkParam: LinkParam;
    originLinkParam: LinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    intl: InjectedIntl;
    selectAreaMaxHeight?: string;
}
export default class Widget extends React.PureComponent<Props, {}> {
    constructor(props: any);
    componentDidMount(): void;
    getInitLinkParam: () => LinkParam;
    getPageData: () => {
        id: string;
        name: string;
    }[];
    setLinkParam: (newSelectItem: any) => void;
    render(): JSX.Element;
}
export {};
