/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
interface Props {
    draggable?: boolean;
    className?: string | Function;
    onMouseOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onMouseLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
}
export declare class PopperHeader extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    getStyle: (draggable: any) => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
