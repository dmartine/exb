/// <reference types="react" />
import { React, IMAppConfig, BrowserSizeMode } from 'jimu-core';
import { LinkParam } from '../link-setting-types';
interface Props {
    linkParam: LinkParam;
    originLinkParam: LinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    browserSizeMode: BrowserSizeMode;
    selectAreaMaxHeight?: string;
}
interface States {
    viewLinkParamArr: string[];
    scrollToViewId: string;
}
interface ViewInfo {
    id: string;
    name: string;
}
export default class Widget extends React.PureComponent<Props, States> {
    noScroll: string;
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(newProps: any): void;
    getInitLinkParam: () => LinkParam;
    pageChange: (e: any) => void;
    viewChange: (viewId: string, sectionId: string) => void;
    viewRemove: (viewId: string) => void;
    onScrollToViewChange: (viewId: string) => void;
    getDefaultPageId: () => string;
    getSectionIdsFromPage: (pageId: string) => string[];
    getViewIdsFromPage: (pageId: string) => string[];
    getSectionIdsFromView: (viewId: string) => string[];
    getViewInfoFromSection: (sectionId: string) => ViewInfo[];
    getSelectedVeiwIds: () => string[];
    render(): JSX.Element;
}
export {};
