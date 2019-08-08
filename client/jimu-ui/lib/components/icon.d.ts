/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface SVGIconProps {
    icon: React.ComponentClass<React.SVGProps<SVGElement>> | string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
    className?: string;
    color?: string;
    rotate?: number | string;
    flip?: 'horizontal' | 'vertical';
}
export declare class _Icon extends React.PureComponent<SVGIconProps> {
    render(): JSX.Element;
}
export declare const Icon: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
