/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutType, IMThemeVariables } from 'jimu-core';
export declare class LayoutChooser extends React.PureComponent<{
    layoutId: string;
    theme: IMThemeVariables;
    isInWidget?: boolean;
    isInSection?: boolean;
    layoutType?: LayoutType;
    style?: any;
    onSelect?: (type: LayoutType) => void;
}> {
    changeLayout(type: LayoutType): void;
    fixedLayoutCard(isEmbedded: boolean): JSX.Element;
    flowLayoutCard(isEmbedded: boolean): JSX.Element;
    getCardStyle(type: LayoutType, isEmbedded: boolean): import("jimu-core").SerializedStyles;
    getStyle(isEmbedded: boolean): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
