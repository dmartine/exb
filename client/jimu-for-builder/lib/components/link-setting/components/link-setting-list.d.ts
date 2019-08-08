/// <reference types="react" />
import { React } from 'jimu-core';
import { LinkParam } from '../link-setting-types';
interface Props {
    datas: any[];
    linkParam: LinkParam;
    onClick: any;
}
interface State {
}
export default class Widget extends React.PureComponent<Props, State> {
    constructor(props: any);
    itemOnClick: (newSelectItem: any) => void;
    getListContent(): JSX.Element[];
    render(): JSX.Element;
}
export {};
