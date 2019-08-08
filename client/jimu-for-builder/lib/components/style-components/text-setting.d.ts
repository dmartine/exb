/// <reference types="react-intl" />
/// <reference types="react" />
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { SingleTextStyle } from 'jimu-ui';
interface TextStyleProps {
    value?: SingleTextStyle;
    onChange?: (param: SingleTextStyle) => void;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: InjectedIntl;
}
export declare const TextSetting: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<TextStyleProps & ExtraProps, "theme" | "onChange" | "value"> & React.ClassAttributes<React.Component<Pick<TextStyleProps & ExtraProps, "theme" | "onChange" | "value">, any, any>>, "theme">>;
export {};
