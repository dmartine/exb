/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { BorderStyle } from 'jimu-ui';
interface BorderStyleProps {
    value?: BorderStyle;
    onChange?: (param: BorderStyle) => void;
}
interface ExtraProps {
    theme?: ThemeVariables;
    intl: InjectedIntl;
}
export declare class _BorderSetting extends React.PureComponent<BorderStyleProps & ExtraProps> {
    static defaultProps: Partial<BorderStyleProps & ExtraProps>;
    _updateBorder(key: string, newValue: any): void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const BorderSetting: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<BorderStyleProps & ExtraProps, "theme" | "onChange" | "value"> & React.ClassAttributes<React.Component<Pick<BorderStyleProps & ExtraProps, "theme" | "onChange" | "value">, any, any>>, "theme">>;
export {};
