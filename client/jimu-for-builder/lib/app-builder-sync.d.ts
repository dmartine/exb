import { ResourceItemInfo } from './app-resource-manager';
import { ToolbarConfig } from 'jimu-layouts/common';
export declare function listenBuilderEvents(): void;
export declare function publishAppStateChangeToBuilder(): void;
export declare function letBuilderPopupChooseWidget(layoutId: string, layoutItemId: string): void;
export declare function letBuilderAddResource(resourceItemInfo: ResourceItemInfo): void;
export declare function letBuilderClearResource(appId: string): void;
export declare function letBuilderResponseToKeyboard(event: KeyboardEvent): void;
export declare function letBuilderShowLayoutToolbar(tools: ToolbarConfig): void;
