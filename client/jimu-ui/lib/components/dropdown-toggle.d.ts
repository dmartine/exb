/// <reference types="react" />
import { React, ThemeVariables } from 'jimu-core';
import { DropdownToggleProps as BSDropdownToggleProps } from './reactstrap';
interface DropdownToggleProps extends BSDropdownToggleProps {
    theme?: ThemeVariables;
    text?: boolean;
}
export declare class _DropdownToggle extends React.PureComponent<DropdownToggleProps> {
    render(): JSX.Element;
}
export declare const DropdownToggle: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
