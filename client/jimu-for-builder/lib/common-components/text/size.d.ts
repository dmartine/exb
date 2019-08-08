/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
interface Props {
    className?: string;
    style?: React.CSSProperties;
    value: string;
    onChange?: (value: string) => void;
}
export declare class Size extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    toFix2: (number: number) => string;
    getStyle: () => import("jimu-core").SerializedStyles;
    convertValue: (value: string | LinearUnit) => string | {
        distance: any;
        unit: any;
    };
    convertToRem: (number: number) => any;
    convertToPx: (number: number) => number;
    handleChange: (value: LinearUnit) => void;
    render(): JSX.Element;
}
export {};
