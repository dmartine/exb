/// <reference types="react" />
import { React } from 'jimu-core';
export interface CollapsibleTextProps {
    text: string;
    limit?: number;
}
export interface CollapsibleTextState {
    collapsed: boolean;
}
export declare class CollapsibleText extends React.PureComponent<CollapsibleTextProps, CollapsibleTextState> {
    toggle(): void;
    constructor(props: any);
    _processText(text: string, limit: number): JSX.Element;
    render(): string | JSX.Element;
}
