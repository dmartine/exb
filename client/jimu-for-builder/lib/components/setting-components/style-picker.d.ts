/// <reference types="react" />
import { React } from 'jimu-core';
interface StylePickerProps {
    styles: Object;
    value?: any;
    size?: 'small' | 'normal';
    onChange?: (value: any) => void;
}
interface StylePickerState {
    selectedValue: any;
}
export declare class StylePicker extends React.PureComponent<StylePickerProps, StylePickerState> {
    constructor(props: any);
    onStyleClick: (value: any) => void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    render(): JSX.Element;
}
export {};
