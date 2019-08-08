/// <reference types="react" />
/** @jsx jsx */
import { InputProps } from './reactstrap';
import { React } from 'jimu-core';
interface SliderProps extends InputProps {
}
interface SliderStates {
    value: string | string[] | number;
}
export declare class _Slider extends React.PureComponent<SliderProps, SliderStates> {
    constructor(props: SliderProps);
    componentWillReceiveProps(nextProps: any): void;
    onChange(evt: any): void;
    private calcRatio;
    render(): JSX.Element;
}
export declare const Slider: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
