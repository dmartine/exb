import { IMAppConfig, AppMode, Selection, LayoutItemConstructorProps, BrowserSizeMode } from 'jimu-core';
export declare function publishAppConfigChangeToApp(appConfig: IMAppConfig): void;
export declare function publishAppModeChangeToApp(appMode: AppMode): void;
export declare function publishInSelectModeChangeToApp(enabled: boolean): void;
export declare function publishPageChangeToApp(pageId: string): void;
export declare function publishDialogChangeToApp(dialogId: string): void;
export declare function publishViewChangeToApp(sectionId: string, viewId: string): void;
export declare function publishChangeSelectionToApp(selection: Selection): void;
export declare function publishWidgetsStatePropChange(alterState: {
    widgetId: string;
    propKey: string;
    value: any;
}): void;
export declare function publishDraggingWidgetToApp(draggingWidget: LayoutItemConstructorProps & {
    uid: number;
}): void;
export declare function publishEndDragWidgetToApp(): void;
export declare function publishKeyboardToApp(event: KeyboardEvent): void;
export declare function publishChangeBrowserSizeModeToApp(mode: BrowserSizeMode): void;
export declare function listenAppEvents(): void;
