/// <reference types="react" />
import { React } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
declare type VariableInputType = 'font-family' | 'font-size' | 'color';
declare type InputValueType = string | LinearUnit;
interface ICSSVariableProps {
    name: string;
    value: string;
    inputType: VariableInputType;
    variable: string;
    label?: string;
    disabled?: boolean;
    onInputChange?: (name: string, variable: string, value: string) => void;
}
interface InputState {
    value: InputValueType;
}
export declare class CSSVarInput extends React.PureComponent<ICSSVariableProps, InputState> {
    private _handleItemChange;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
