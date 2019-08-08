/// <reference types="react" />
import { React } from 'jimu-core';
interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
    appendTo?: HTMLElement;
    appendToBody?: boolean;
    right?: boolean;
    className?: string;
    modifiers?: any;
    flip?: boolean;
    tag?: React.ElementType;
}
export declare class _NavMenu extends React.PureComponent<NavMenuProps> {
    static defaultProps: NavMenuProps;
    static contextType: React.Context<{}>;
    constructor(props: any);
    onDocumentClick(e: any): void;
    onLeave(e: any): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare const NavMenu: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
