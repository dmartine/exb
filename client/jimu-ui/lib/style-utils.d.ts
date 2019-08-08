import { StyleSettings, BorderStyle, FourSidesUnit, BoxShadowStyle, WidthStyle, SingleTextStyle, BackgroundStyle } from './types';
export declare const expandStyleArray: (dataArray: number[]) => [number, number, number, number];
export declare const toCSSBorder: (borderStyle: BorderStyle) => string;
export declare const toCSSMargin: (marginStyle: FourSidesUnit) => string;
export declare const toCSSPadding: (paddingStyle: FourSidesUnit) => string;
export declare const toCSSBoxshadow: (boxShadow: BoxShadowStyle) => string;
export declare const toCSSBorderRadius: (borderRadius: FourSidesUnit) => string;
export declare const toCSSWidth: (widthStyle: WidthStyle) => string;
export declare const toCSSHeight: (heightStyle: WidthStyle) => string;
export declare const toCSSTextAlign: (text: SingleTextStyle) => any;
export declare const toCSSTextUnderLine: (text: SingleTextStyle) => string;
export declare const toCSSTextFont: (text: SingleTextStyle) => string;
export declare const toCSSTextColor: (text: SingleTextStyle) => string;
export declare const toCSSTextStyle: (text: SingleTextStyle) => {
    font: string;
    textDecoration: string;
    textAlign: any;
    color: string;
};
export declare const toCSSStyle: (styleSettings: StyleSettings) => {};
export declare const toBackgroundStyle: ({ color, image, fillType }: BackgroundStyle) => {
    backgroundImage: string;
    backgroundColor: string;
    backgroundPosition: string;
    backgroundRepeat: string;
    backgroundSize: string;
};
export declare const remToPixel: (pxValue: string, base?: string) => string;
