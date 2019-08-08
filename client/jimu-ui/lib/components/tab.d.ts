/// <reference types="react" />
import { React } from 'jimu-core';
import { TabStyle } from './nav';
interface TabProps {
    active?: boolean;
    key?: string;
    title: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
}
export declare class Tab extends React.PureComponent<TabProps> {
    render(): any;
}
interface TabsProps {
    tabStyle?: TabStyle;
    fill?: boolean;
    className?: string;
    onTabSelect?: (title: string) => void;
}
interface TabsState {
    activeTab: string;
}
export declare class _Tabs extends React.PureComponent<TabsProps, TabsState> {
    constructor(props: any);
    selectTab(tab: any): void;
    render(): JSX.Element;
}
export declare const Tabs: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
