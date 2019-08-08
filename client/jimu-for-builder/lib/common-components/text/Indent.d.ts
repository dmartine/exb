/// <reference types="react-intl" />
/// <reference types="react" />
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { IndentValue } from 'jimu-ui';
interface Props {
    className?: string;
    value?: IndentValue;
    onClick?: (value: IndentValue) => any;
    theme?: ThemeVariables;
}
interface ExtraProps {
    intl?: InjectedIntl;
}
export declare const _Indent: ({ value, onClick, className, intl }: Props & ExtraProps) => JSX.Element;
export declare const Indent: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & ExtraProps & React.Attributes, "theme">>;
export {};
