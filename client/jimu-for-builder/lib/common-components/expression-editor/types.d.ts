import { ExpressionPart } from 'jimu-core';
export interface ExpSelection {
    partId: string;
    type: ExpSelectionType;
    toStart?: boolean;
    startOffset?: number;
}
export interface InnerExpSelection {
    partId: string;
    startOffset: number;
    contentLength: number;
}
export interface RemovePartResult {
    parts: ExpressionPart[];
    isExpRemoved: boolean;
    editedPart: ExpressionPart;
    editedPartId: string;
}
export interface AddPartResult {
    parts: ExpressionPart[];
    isPartAdded: boolean;
    editedParts: ExpressionPart[];
    editedPartIds: string[];
}
export interface NewPartsInfo {
    [index: string]: string;
}
export interface PopoverItem {
    id: string;
    content: string;
    type: PopoverType;
}
export declare const EXP_PART_PREFIX = "part";
export declare const EXP_CONTAINER_PREFIX = "expression";
export declare enum ExpSelectionType {
    Part = "PART",
    Char = "CHAR"
}
export declare enum PopoverType {
    Field = "FIELD",
    DataSource = "DATASOURCE",
    Function = "FUNCTION"
}
