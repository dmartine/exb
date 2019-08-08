/// <reference types="react" />
import { React, ImmutableArray, Expression } from 'jimu-core';
import { LinkParam } from '../link-setting-types';
interface Props {
    linkParam: LinkParam;
    originLinkParam: LinkParam;
    onLinkParamChange: any;
    selectAreaMaxHeight?: string;
    dataSourceIds?: ImmutableArray<string>;
}
interface State {
    isExpPopupOpen: boolean;
}
export default class Widget extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    getInitLinkParam: () => LinkParam;
    webAddressInputChange: (v: string) => void;
    webAddressExpressionChange: (e: Expression) => void;
    openExpPopup: () => void;
    closeExpPopup: () => void;
    render(): JSX.Element;
}
export {};
