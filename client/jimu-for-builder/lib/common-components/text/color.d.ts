/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { ColorResult } from 'react-color';
interface Props {
    title?: string;
    icon?: React.ComponentClass<React.SVGAttributes<SVGElement>> | string;
    innerClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    color: string;
    presetColors?: string[];
    placement?: Popper.Placement;
    onChange?: (color: string) => void;
    onClick?: () => void;
    changeOnClose?: boolean;
    theme?: ThemeVariables;
}
interface State {
    color?: string;
    showPicker: boolean;
}
export declare class _Color extends React.PureComponent<Props, State> {
    static count: number;
    static defaultProps: Partial<Props>;
    blockNode: any;
    constructor(props: any);
    componentDidUpdate(prveProps: any, preveState: State): void;
    private getStyle;
    userSelectNone: () => import("jimu-core").SerializedStyles;
    toRgba: (color: ColorResult) => string;
    colorChange: (c: ColorResult) => void;
    onChange: (color: string) => void;
    private handleClick;
    render(): JSX.Element;
}
export declare const Color: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_Color>, "theme">>;
export {};
