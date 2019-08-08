/// <reference types="react" />
/// <reference types="react-intl" />
/** @jsx jsx */
import { React, ThemeVariables, InjectedIntl } from 'jimu-core';
import { UnitTypes } from 'jimu-ui';
interface Props {
    unit?: UnitTypes;
    units?: Array<UnitTypes>;
    onChange?: (unit: UnitTypes) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    style?: any;
}
interface ExtraProps {
    intl?: InjectedIntl;
    theme: ThemeVariables;
}
interface State {
    show: boolean;
}
export declare class _UnitChooser extends React.PureComponent<Props & ExtraProps, State> {
    domNode: React.RefObject<HTMLDivElement>;
    static defaultProps: Partial<Props>;
    constructor(props: any);
    handleChange: (newUnit: any) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    nls: (id: string) => string;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export declare const UnitChooser: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<any, string | number | symbol> & React.ClassAttributes<React.Component<Pick<any, string | number | symbol>, any, any>>, "theme">>;
export {};
