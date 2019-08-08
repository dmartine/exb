/// <reference types="react" />
import { React, LayoutInfo, IMLayoutItemJson, AppMode, IMRuntimeInfo, IMSizeModeLayoutJson, IMThemeVariables, LayoutItemConstructorProps, LayoutContextToolProps, IMLayoutJson, BrowserSizeMode } from 'jimu-core';
import { ImageShapeType } from 'jimu-ui';
export interface Position {
    x?: number;
    y?: number;
    w: number;
    h: number;
}
export declare enum IconTextSize {
    Small = "SMALL",
    Medium = "MEDIUM",
    Large = "LARGE"
}
export interface LayoutItemDisplaySetting {
    displayMode: WidgetDisplayMode;
    icon?: {
        size: IconTextSize;
        shape: ImageShapeType;
        showText?: boolean;
    };
}
export interface CommonLayoutSetting {
    className?: string;
    style?: any;
    order?: number;
}
export interface CommonLayoutItemSetting {
    lockParent?: boolean;
    style?: any;
}
export interface FixedLayoutSetting extends CommonLayoutSetting {
    gridSize?: number;
}
export interface FlowLayoutSetting extends CommonLayoutSetting {
    gutter?: number;
}
export interface FlowLayoutItemSetting extends CommonLayoutItemSetting {
    width?: number;
    autoHeight?: boolean;
    offsetX?: number;
    offsetY?: number;
}
export declare enum WidgetDisplayMode {
    Normal = "NORMAL",
    Icon = "ICON",
    IconText = "ICON_TEXT",
    Custom = "CUSTOM"
}
export interface FixedLayoutItemSetting extends CommonLayoutItemSetting {
    autoProps: {
        left?: boolean;
        right?: boolean;
        top?: boolean;
        bottom?: boolean;
        width?: boolean;
        height?: boolean;
    };
}
export declare const enum OrderAdjustType {
    BringForward = 0,
    SendBackward = 1,
    BringToFront = 2,
    SendToBack = 3
}
export interface LayoutProps {
    layouts: IMSizeModeLayoutJson;
    className?: string;
    style?: any;
    isInSection?: boolean;
    isInWidget?: boolean;
    isPageItem?: boolean;
    itemDisplaySetting?: LayoutItemDisplaySetting;
    itemDraggable?: boolean;
    itemResizable?: boolean;
    itemSelectable?: boolean;
    droppable?: boolean;
    onItemClick?: (e: React.MouseEvent<MouseEvent>, widgetId: string) => void;
    ignoreMinHeight?: boolean;
}
export interface LayoutItemProps {
    layoutId: string;
    layoutItemId: string;
    draggable?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    className?: string;
    style?: any;
    onClick?: (e: React.MouseEvent<MouseEvent>, widgetId: string) => void;
    itemDisplaySetting?: LayoutItemDisplaySetting;
}
export interface StateToLayoutProps {
    appMode: AppMode;
    inSelectMode: boolean;
    layout: IMLayoutJson;
    dispatch?: any;
    theme?: IMThemeVariables;
    mainSizeMode: BrowserSizeMode;
    browserSizeMode: BrowserSizeMode;
    draggingWidgetInfo?: LayoutItemConstructorProps;
    canDrop?: boolean;
}
export interface StateToLayoutItemProps {
    layoutItem: IMLayoutItemJson;
    appMode: AppMode;
    inSelectMode: boolean;
    theme?: IMThemeVariables;
    selected: boolean;
    isLayoutWidget?: boolean;
    widgetName?: string;
    browserSizeMode: BrowserSizeMode;
    dispatch?: any;
}
export interface WidgetProps {
    runtimeInfo: IMRuntimeInfo;
    widgetState: any;
    supportInlineEditing: boolean;
    supportRepeat: boolean;
}
export interface SectionProps {
    views: string[];
    activeView: string;
}
export interface ToolItemConfig {
    icon?: React.ComponentClass<React.SVGAttributes<SVGElement>>;
    title?: string | ((props: LayoutContextToolProps & {
        formatMessage: (id: string) => string;
    }) => string);
    size?: number;
    label?: string | ((props: LayoutContextToolProps & {
        formatMessage: (id: string) => string;
    }) => string);
    disabled?: boolean | ((props: LayoutContextToolProps) => boolean);
    checked?: boolean | ((props: LayoutContextToolProps) => boolean);
    visible?: boolean | ((props: LayoutContextToolProps) => boolean);
    rotate?: number;
    onClick?: (props: LayoutContextToolProps, evt?: React.MouseEvent<any>) => void;
    settingPanel?: React.ComponentClass;
    widgetId?: string;
}
export declare type ToolbarConfig = (ToolItemConfig | ToolItemConfig[])[];
export interface DropHandlers {
    onDragEnter?: (draggingItem: LayoutItemConstructorProps | LayoutInfo) => void;
    onDragOver?: (draggingItem: LayoutItemConstructorProps | LayoutInfo, draggingElement: HTMLElement, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number) => void;
    onDragLeave?: (draggingItem: LayoutItemConstructorProps | LayoutInfo) => void;
    onDrop?: (draggingItem: LayoutItemConstructorProps | LayoutInfo, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number) => void;
}
