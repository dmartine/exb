import { ImmutableObject } from 'seamless-immutable';
import { IMLayoutItemJson, IMLayoutJson } from './app-config';
import { BrowserSizeMode } from './common';
export declare enum LayoutItemType {
    Unkown = "UNKNOWN",
    Widget = "WIDGET",
    Section = "SECTION"
}
export declare enum LayoutType {
    FixedLayout = "FIXED",
    FlowLayout = "FLOW"
}
export interface LayoutInfo {
    layoutId: string;
    layoutItemId?: string;
}
export interface LayoutContextToolProps {
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    clientRect: ClientRect;
}
export declare type Selection = LayoutInfo;
export declare type IMRuntimeLayoutInfo = ImmutableObject<{
    selection?: LayoutInfo;
}>;
export declare type LayoutTransformFunc = (layout: IMLayoutJson, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode) => IMLayoutJson;
export declare type LayoutItemTransformFunc = (item: IMLayoutItemJson, index: number, fromLayoutId: string, toLayoutId: string, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode) => {
    item: IMLayoutItemJson;
    index: number;
};
