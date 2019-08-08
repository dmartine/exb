/// <reference types="react" />
import { React } from 'jimu-core';
import { NavbarProps as BSNavbarProps } from './reactstrap';
interface NavbarProps {
    border?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
}
export declare class _Navbar extends React.PureComponent<NavbarProps & BSNavbarProps> {
    render(): JSX.Element;
}
export declare const Navbar: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
