/// <reference types="react" />
import { React } from 'jimu-core';
import { InputProps } from './reactstrap';
export interface SwichBaseProps extends InputProps {
}
export interface SwichBaseStates {
    focus: boolean;
    checked: boolean;
    disabled: boolean;
}
export declare class SwitchBase extends React.PureComponent<SwichBaseProps, SwichBaseStates> {
    switchType: 'checkbox' | 'radio';
    switchInput: any;
    constructor(props: SwichBaseProps);
    focus(): void;
    onClick(evt: React.MouseEvent<HTMLInputElement>): void;
    onFocus(evt: React.FocusEvent<HTMLInputElement>): void;
    onBlur(evt: React.FocusEvent<HTMLInputElement>): void;
    onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    componentDidUpdate(prevProps: SwichBaseProps): void;
    render(): JSX.Element;
}
