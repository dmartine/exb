export declare enum TextFormats {
    BOLD = "bold",
    ITALIC = "italic",
    UNDERLINE = "underline",
    STRIKE = "strike",
    ALIGN = "align",
    BACKGROUND = "background",
    COLOR = "color",
    FOUNT = "font",
    BLOCKQUOTE = "blockquote",
    CODE = "code",
    DIRECTION = "direction",
    HEADER = "header",
    INTENT = "indent",
    LINK = "link",
    LIST = "list",
    SCRIPT = "script",
    SIZE = "size",
    EXPRESSION = "expression"
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
export declare enum IntentValue {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8
}
export declare const FONTSIZE: number[];
export declare enum DirectionValue {
    RTL = "rtl"
}
export declare enum FontFamilyValue {
    AVENIRNEXT = "Avenir Next",
    CALIBRI = "Calibri",
    PMINGLIU = "PmingLiu",
    IMPACT = "Impact",
    GEORGIA = "Georgia",
    ARIAL = "Arial",
    TIMESNEWROMAN = "Times New Roman",
    SIMHEI = "SimHei",
    MICROSOFTYAHEI = "Microsoft YaHei"
}
export declare const FontFamilys: string[];
export interface FontSizeType {
    val: string;
    convert?: boolean;
}
export interface LinkType {
    href: string;
    target: string;
}
export interface TextFormatType {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    align?: AlignValue;
    font?: FontFamilyValue;
    size?: FontSizeType;
    color?: string;
    background?: string;
    intent?: IntentValue;
    direction?: DirectionValue;
    code?: boolean;
    link?: LinkType;
    list?: ListValue;
    expression?: string;
}
export declare const FONTFAMILYS: {
    value: FontFamilyValue;
    label: FontFamilyValue;
}[];
