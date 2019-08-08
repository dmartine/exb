/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
interface Props {
    title?: string;
    id?: string;
    icon?: React.ComponentClass<React.SVGAttributes<SVGElement>> | string;
    className?: string;
    style?: React.CSSProperties;
    color: string;
    onClick?: () => void;
    theme?: ThemeVariables;
    innerRef?: (e: HTMLDivElement) => void;
}
export declare class _ColorBlock extends React.PureComponent<Props> {
    static count: number;
    id: string;
    static defaultProps: Partial<Props>;
    private getStyle;
    render(): JSX.Element;
}
export declare const ColorBlock: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_ColorBlock>, "theme">>;
export {};
