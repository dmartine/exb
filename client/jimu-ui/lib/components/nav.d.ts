/// <reference types="react" />
import { React, ThemeVariables } from 'jimu-core';
import { NavProps as BSNavProps } from './reactstrap';
import { DrawerProps } from './drawer';
export declare type TabStyle = 'underline' | 'tab';
export declare type NavColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light' | 'white';
export declare type NavMode = 'default' | 'toggle';
interface NavProps extends BSNavProps {
    tabStyle?: TabStyle;
    textColor?: NavColor | string;
    activeColor?: NavColor | string;
    right?: boolean;
    theme?: ThemeVariables;
    gap?: string;
    textAlign?: 'left' | 'center' | 'right';
    mode?: NavMode;
    drawer?: DrawerProps;
    isMobileMenuOpen?: boolean;
    onToggleClick?: (e: any) => {};
    onMobileMenuClose?: (e: any) => {};
}
export declare class _Nav extends React.PureComponent<NavProps> {
    static defaultProps: NavProps;
    constructor(props: any);
    onToggleClick(e: any): void;
    onMenuModalClose(e: any): void;
    render(): JSX.Element;
}
export declare const Nav: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
