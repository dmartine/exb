/// <reference types="react" />
/// <reference types="react-intl" />
/** @jsx jsx */
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { UnitTypes } from 'jimu-ui';
interface PxRem {
    px: number;
    rem: number;
}
interface Props {
    title?: string;
    sizes: Array<PxRem>;
    className?: string;
    style?: React.CSSProperties;
    value: string;
    onChange?: (value: string) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
interface ExtraProps {
    intl?: InjectedIntl;
    theme?: ThemeVariables;
}
export declare class SizeRem extends React.PureComponent<Props & ExtraProps> {
    static defaultProps: Partial<Props & ExtraProps>;
    private onInputChange;
    onUnitChange: (unit: UnitTypes) => void;
    nls: (id: string) => string;
    getUnit: () => any;
    getNumber: () => any;
    getUnitedNumber: (unit: UnitTypes) => number;
    toFix2: (number: number) => string;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
