/// <reference types="react" />
/** @jsx jsx */
import { ThemeVariables, IMUseDataSource } from 'jimu-core';
interface Props {
    onChange?: (expression: string, useDataSource?: IMUseDataSource) => void;
    dataSourceIds?: string[];
    theme?: ThemeVariables;
}
export declare const _Expression: ({ onChange, dataSourceIds, theme }: Props) => JSX.Element;
export declare const Expression: import("react").FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & import("react").Attributes, "theme">>;
export {};
