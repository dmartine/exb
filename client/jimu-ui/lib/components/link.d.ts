/// <reference types="react" />
/** @jsx jsx */
import { jimuHistory, IMUrlParameters, React, LinkTo, ThemeVariables } from 'jimu-core';
import { ButtonProps as BSButtonProps } from './reactstrap';
import { ButtonProps } from './button';
export interface LinkProps {
    tag?: React.ElementType;
    onClick?: (evt: React.MouseEvent<HTMLLinkElement>) => void;
    target?: string;
    replace?: boolean;
    history?: jimuHistory.History;
    to?: LinkTo;
    queryObject?: IMUrlParameters;
    innerRef?: React.Ref<HTMLElement>;
    title?: string;
    className?: string;
    customStyle?: CustromStyle;
    themeStyle?: ButtonProps & BSButtonProps;
}
interface CustromStyle {
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    visitedStyle?: React.CSSProperties;
}
export declare class _Link extends React.PureComponent<LinkProps & {
    theme: ThemeVariables;
}, {
    isPopperOpen: boolean;
}> {
    static count: number;
    href: string;
    id: string;
    constructor(props: any);
    isToWebAddress: () => boolean;
    handleClick: (event: any) => void;
    render(): JSX.Element;
}
export declare const Link: React.ComponentClass<any, any>;
export {};
