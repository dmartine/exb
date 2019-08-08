/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { NavIcon } from './types';
interface Props {
    color?: string;
    id?: string;
    icon?: NavIcon;
    disabled?: boolean;
    href?: string;
    target?: string;
    style?: React.CSSProperties;
    className?: string;
    active?: boolean;
    onClick?: (e: React.MouseEvent<any>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
    theme: ThemeVariables;
}
declare class _IconLink extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    private onClick;
    private getStyle;
    render(): JSX.Element;
}
export declare const IconLink: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_IconLink>, "theme">>;
export {};
