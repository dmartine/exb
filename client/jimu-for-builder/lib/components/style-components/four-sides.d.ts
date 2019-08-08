/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, InjectedIntl, ThemeVariables } from 'jimu-core';
import { FourSidesUnit, BorderSides, Sides } from 'jimu-ui';
interface Props {
    value?: FourSidesUnit;
    onChange?: (value: FourSidesUnit) => void;
    disabled?: boolean;
    min?: number;
    max?: number;
    showTip?: boolean;
    sides?: Array<BorderSides | Sides>;
}
interface State {
    bindAll: boolean;
}
interface ExtraProps {
    intl?: InjectedIntl;
    theme?: ThemeVariables;
}
export declare class _FourSides extends React.PureComponent<Props & ExtraProps, State> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    _onSideValueChange: (val: any, index: number) => void;
    _onUnitChange: (newUnit: any) => void;
    _onAllSidesValueChange: (value: number) => void;
    _toggleBindAll: () => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    nls: (id: string) => string;
    render(): JSX.Element;
}
export declare const FourSides: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<any, string | number | symbol> & React.ClassAttributes<React.Component<Pick<any, string | number | symbol>, any, any>>, "theme">>;
export {};
