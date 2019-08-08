/// <reference types="react" />
import { React, IMAppConfig } from 'jimu-core';
import { LinkParam } from '../link-setting-types';
interface Props {
    linkParam: LinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    selectAreaMaxHeight?: string;
}
export default class Widget extends React.PureComponent<Props, {}> {
    constructor(props: any);
    render(): any;
}
export {};
