/// <reference types="react" />
import { React } from 'jimu-core';
import { ButtonProps as BSButtonProps } from './reactstrap';
export interface ButtonProps {
    circled?: boolean;
    rounded?: boolean;
    icon?: boolean;
    text?: boolean;
    forwardedRef?: any;
}
export declare class _Button extends React.PureComponent<ButtonProps & BSButtonProps> {
    constructor(props: any);
    render(): JSX.Element;
}
export declare const Button: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
