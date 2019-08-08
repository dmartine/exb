/// <reference types="react-intl" />
/// <reference types="react" />
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { AlignValue } from 'jimu-ui';
interface ExtraProps {
    intl?: InjectedIntl;
}
interface Props {
    className?: string;
    align?: AlignValue;
    onChange?: any;
    theme?: ThemeVariables;
}
export declare const _Align: ({ align, onChange, className, intl }: Props & ExtraProps) => JSX.Element;
export declare const Align: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & ExtraProps & React.Attributes, "theme">>;
export {};
