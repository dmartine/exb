/// <reference types="react-intl" />
/// <reference types="react" />
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { ListValue } from 'jimu-ui';
interface Props {
    className?: string;
    list?: ListValue;
    onClick?: (value: ListValue | boolean) => void;
    theme?: ThemeVariables;
}
interface ExtraProps {
    intl?: InjectedIntl;
}
export declare const _List: ({ list, onClick, className, intl }: Props & ExtraProps) => JSX.Element;
export declare const List: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & ExtraProps & React.Attributes, "theme">>;
export {};
