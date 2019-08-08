/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface PluginHeaderProps {
    className?: string;
    text?: string;
    onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare class PluginHeader extends React.PureComponent<PluginHeaderProps> {
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
