/// <reference types="react" />
import { React } from 'jimu-core';
export declare type ImageType = 'fluid' | 'thumbnail';
export declare type ImageShapeType = 'circle' | 'rectangle';
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    type?: ImageType;
    shape?: ImageShapeType;
    placeholder?: string;
    cover?: boolean;
}
export interface ImageStates {
}
export declare class _Image extends React.PureComponent<ImageProps, ImageStates> {
    readonly defaultCircledImageSize = 100;
    readonly defaultCoveredImageHeight = 160;
    render(): JSX.Element;
}
export declare const Image: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
