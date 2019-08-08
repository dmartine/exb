/// <reference types="react-intl" />
/// <reference types="react" />
import { React, InjectedIntl } from 'jimu-core';
import { TextFormatType, TextFormats } from 'jimu-ui';
interface Props {
    className?: string;
    formats?: TextFormatType;
    onClick?: (key: TextFormats, value: boolean) => any;
}
interface ExtraProps {
    intl?: InjectedIntl;
}
export declare const _BIUS: ({ formats, onClick, className, intl }: Props & ExtraProps) => JSX.Element;
export declare const BIUS: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & ExtraProps & React.Attributes, "theme">>;
export {};
