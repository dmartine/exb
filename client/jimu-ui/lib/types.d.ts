import { ImmutableObject } from 'jimu-core';
import { ImageParam } from 'jimu-ui';
export declare enum LineType {
    SOLID = "solid",
    DASHED = "dashed",
    DOTTED = "dotted",
    DOUBLE = "double"
}
export declare enum ThemeColors {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    LIGHT = "light",
    DANGER = "danger",
    DARK = "dark",
    WHITE = "white"
}
export declare enum FillType {
    FIT = "fit",
    FILL = "fill",
    CENTER = "center",
    TILE = "tile",
    STRETCH = "stretch"
}
export declare enum UnitTypes {
    PIXEL = "px",
    REM = "rem",
    EM = "em",
    PERCENTAGE = "%"
}
export declare enum BorderSides {
    TL = "TL",
    TR = "TR",
    BR = "BR",
    BL = "BL"
}
export declare enum Sides {
    T = "T",
    R = "R",
    B = "B",
    L = "L"
}
export interface LinearUnit {
    distance: number;
    unit: UnitTypes;
}
export declare type IMLinearUnit = ImmutableObject<LinearUnit>;
export interface FourSidesUnit {
    unit: UnitTypes;
    number: Array<number>;
}
export interface BorderStyle {
    type: LineType;
    color: string;
    width: LinearUnit;
}
export declare enum BoxShadowValues {
    OffsetX = "OFFSETX",
    OffsetY = "OFFSETY",
    BlurRadius = "BLUERADIUS",
    SpreadRadius = "SPREADRADIUS"
}
export interface BoxShadowStyle {
    offsetX: LinearUnit;
    offsetY: LinearUnit;
    blur: LinearUnit;
    spread: LinearUnit;
    color: string;
}
export interface WidthStyle {
    value?: LinearUnit;
}
export interface BackgroundStyle {
    color?: string;
    fillType: FillType;
    image?: ImageParam;
}
export declare type HeightStyle = WidthStyle;
export interface StyleSettings {
    backgroundColor?: string;
    background?: BackgroundStyle;
    margin?: FourSidesUnit;
    padding?: FourSidesUnit;
    border?: BorderStyle;
    boxShadow?: BoxShadowStyle;
    borderRadius?: FourSidesUnit;
    width?: WidthStyle;
    height?: HeightStyle;
    text?: SingleTextStyle;
}
export declare enum TextFormats {
    BOLD = "bold",
    ITALIC = "italic",
    UNDERLINE = "underline",
    STRIKE = "strike",
    ALIGN = "align",
    BACKGROUND = "background",
    COLOR = "color",
    FONT = "font",
    BLOCKQUOTE = "blockquote",
    CODE = "code",
    DIRECTION = "direction",
    HEADER = "header",
    INDENT = "indent",
    LINK = "link",
    LIST = "list",
    SCRIPT = "script",
    SIZE = "size",
    LETTERSPACE = "letterspace",
    LINESPACE = "linespace",
    EXPRESSION = "expression",
    Clear = "clear"
}
export interface SingleTextStyle {
    [TextFormats.BOLD]?: boolean;
    [TextFormats.ITALIC]?: boolean;
    [TextFormats.UNDERLINE]?: boolean;
    [TextFormats.STRIKE]?: boolean;
    [TextFormats.FONT]?: FontFamilyValue;
    [TextFormats.SIZE]?: string;
    [TextFormats.COLOR]?: string;
    [TextFormats.BACKGROUND]?: string;
    [TextFormats.ALIGN]?: AlignValue;
    [TextFormats.LINK]?: LinkType;
}
export declare enum ListValue {
    BULLET = "bullet",
    ORDERED = "ordered"
}
export declare enum AlignValue {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
    JUSTIFY = "justify"
}
export declare enum IndentValue {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8
}
export declare enum DirectionValue {
    RTL = "rtl"
}
export declare enum FontFamilyValue {
    AVENIRNEXT = "Avenir Next W01",
    CALIBRI = "Calibri",
    PMINGLIU = "PmingLiu",
    IMPACT = "Impact",
    GEORGIA = "Georgia",
    ARIAL = "Arial",
    TIMESNEWROMAN = "Times New Roman",
    SIMHEI = "SimHei",
    MICROSOFTYAHEI = "Microsoft YaHei"
}
export interface LinkType {
    href: string;
    target: string;
}
export interface TextFormatType {
    [TextFormats.BOLD]?: boolean;
    [TextFormats.ITALIC]?: boolean;
    [TextFormats.UNDERLINE]?: boolean;
    [TextFormats.STRIKE]?: boolean;
    [TextFormats.ALIGN]?: AlignValue;
    [TextFormats.FONT]?: FontFamilyValue;
    [TextFormats.SIZE]?: string;
    [TextFormats.COLOR]?: string;
    [TextFormats.BACKGROUND]?: string;
    [TextFormats.INDENT]?: IndentValue;
    [TextFormats.DIRECTION]?: DirectionValue;
    [TextFormats.CODE]?: boolean;
    [TextFormats.LINK]?: LinkType;
    [TextFormats.LIST]?: ListValue;
    [TextFormats.EXPRESSION]?: string;
    [TextFormats.LETTERSPACE]?: string;
    [TextFormats.LINESPACE]?: string;
}
