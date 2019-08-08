/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
export interface PickerOption {
    icon: React.ComponentClass<React.SVGAttributes<SVGElement>>;
    value: string;
    label?: string;
}
interface Props {
    value?: string;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (value: string) => void;
    theme?: ThemeVariables;
    options?: Array<PickerOption>;
}
interface State {
    showPicker?: boolean;
}
export declare class _Picker extends React.PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    domNode: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleClick: () => void;
    onOptionClick: (value: string) => void;
    getIconByValue: (value: string) => React.ComponentClass<React.SVGAttributes<SVGElement>, any>;
    getStyle: () => import("jimu-core").SerializedStyles;
    getLabel: (value: string) => string;
    render(): JSX.Element;
}
export declare const Picker: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_Picker>, "theme">>;
export {};
