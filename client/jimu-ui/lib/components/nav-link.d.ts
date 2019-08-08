/// <reference types="react" />
import { React } from 'jimu-core';
import { LinkProps } from './link';
interface NavLinkProps extends LinkProps {
    tag?: React.ElementType;
    disabled?: boolean;
    active?: boolean;
    className?: string;
    href?: any;
    innerRef?: React.Ref<HTMLElement>;
    icon?: React.ComponentClass<React.SVGProps<SVGElement>> | string;
    iconPosition?: 'start' | 'end';
    caret?: boolean;
    dropdowToggle?: boolean;
}
export declare class _NavLink extends React.PureComponent<NavLinkProps> {
    static contextType: React.Context<{}>;
    static defaultProps: NavLinkProps;
    constructor(props: any);
    onClick(e: any): void;
    onEnter(e: any): void;
    onLeave(e: any): void;
    render(): JSX.Element;
}
export declare const NavLink: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
