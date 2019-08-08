import { ThemeVariables } from 'jimu-core';
export declare function buttonSize(paddingY: any, paddingX: any, fontSize: any, lineHeight: any, borderRadius?: any): string;
export interface IButtonStyle {
    color?: string;
    outline?: boolean;
    icon?: boolean;
    rounded?: boolean;
    circled?: boolean;
    text?: boolean;
    size?: any;
    theme?: ThemeVariables;
}
export declare const buttonStyles: (props: IButtonStyle) => import("jimu-core").SerializedStyles;
