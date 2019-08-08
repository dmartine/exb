/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
interface Props {
    label: string;
    value: any;
    marked: boolean;
    className?: string;
    style?: any;
    onChange?: (value: any) => void;
    theme: ThemeVariables;
}
export declare class MarkableItem extends React.PureComponent<Props, any> {
    constructor(props: any);
    handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
