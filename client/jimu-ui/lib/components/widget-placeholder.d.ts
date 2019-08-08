/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
export interface OwnProps {
    widgetId: string;
    icon: string;
    message: string;
    style?: any;
}
export interface StateProps {
    isSelected: boolean;
}
export interface ThemeProps {
    theme: ThemeVariables;
}
export declare type Props = OwnProps & StateProps & ThemeProps;
export declare class _WidgetPlaceholder extends React.PureComponent<Props> {
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const WidgetPlaceholder: React.ComponentClass<OwnProps, any>;
