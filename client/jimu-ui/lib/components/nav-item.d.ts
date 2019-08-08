/// <reference types="react" />
import { React } from 'jimu-core';
import { NavItemProps as BSNavItemProps } from './reactstrap';
import { NavMode } from './nav';
interface NavItemProps extends BSNavItemProps {
    dropdown?: boolean;
    isOpen?: boolean;
    toggle?: (e: any) => {};
    direction?: 'up' | 'down' | 'left' | 'right';
    disabled?: boolean;
    menuOpenMode?: 'click' | 'hover';
}
export declare class _NavItem extends React.PureComponent<NavItemProps> {
    static contextType: React.Context<{}>;
    constructor(props: any);
    toggle(e: any): {};
    getContextValue(): {
        toggle: (e: any) => {};
        isOpen: boolean;
        isDropdown: boolean;
        direction: import("reactstrap/lib/Dropdown").Direction;
        menuOpenMode: "click" | "hover";
        menuMode: NavMode;
    };
    render(): JSX.Element;
}
export declare const NavItem: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
