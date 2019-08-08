/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LinearUnit, UnitTypes } from 'jimu-ui';
interface Props {
    units?: Array<UnitTypes>;
    value?: LinearUnit;
    disabled?: boolean;
    min?: number;
    max?: number;
    onChange?: (value: LinearUnit) => void;
    className?: string;
    style?: any;
}
export declare class InputUnit extends React.PureComponent<Props, any> {
    static defaultProps: Partial<Props>;
    _onInputChange: (val: number) => void;
    _onUnitChange: (newUnit: any) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    getTitle: (value: LinearUnit) => string;
    render(): JSX.Element;
}
export {};
