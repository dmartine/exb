/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
interface Props {
    imageParam: ImageParam;
    toolTip?: string;
    altText?: string;
    useFadein?: boolean;
    onImageLoaded?: (imageWidth: number, imageHeight: number) => void;
}
export declare enum ImgSourceType {
    ByURL = "BY_URL",
    ByUpload = "BY_UPLOAD"
}
export interface ImageParam {
    url?: string;
    originalId?: string;
    originalUrl?: string;
    fileName?: string;
    originalName?: string;
    fileFormat?: string;
    imgSourceType?: ImgSourceType;
    cropParam?: CropParam;
}
export declare enum CropType {
    Real = "REAL",
    Fake = "FAKE"
}
export interface CropPosition {
    x: number;
    y: number;
}
interface CropPixel {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
export interface CropParam {
    cropPosition?: CropPosition;
    cropZoom?: number;
    svgViewBox?: string;
    svgPath?: string;
    cropShape?: string;
    cropPixel?: CropPixel;
    cropType?: CropType;
}
export declare const ImageWithParam: React.ComponentClass<Props, any>;
export {};
