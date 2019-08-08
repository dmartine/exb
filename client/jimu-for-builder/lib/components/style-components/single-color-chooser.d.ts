/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { ThemeColors } from 'jimu-ui';
interface ColorItem {
    name: string;
    value: string;
    background?: string;
}
interface Props {
    color?: ThemeColors | string;
    colors: Array<ColorItem>;
    onChange?: (color: string) => void;
    className?: string;
    style?: any;
    showTip?: boolean;
}
interface ExtraProps {
    theme?: ThemeVariables;
}
export declare class _SingleColorChooser extends React.PureComponent<Props & ExtraProps> {
    domNode: React.RefObject<HTMLDivElement>;
    static defaultProps: Partial<Props>;
    constructor(props: any);
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const SingleColorChooser: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_SingleColorChooser>, "theme">>;
export {};
