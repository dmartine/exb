import { TreeItemJson } from './tree-item';
export declare const defaultMatcher: (filterText: string, item: TreeItemJson) => boolean;
export declare const findNode: (item: TreeItemJson, filter: string, matcher: any) => any;
export declare const filterTree: (item: TreeItemJson, filter: string, matcher?: (filterText: string, item: TreeItemJson) => boolean) => TreeItemJson;
export declare const expandFilteredNodes: (item: TreeItemJson, filter: string, matcher?: (filterText: string, item: TreeItemJson) => boolean) => TreeItemJson;
export declare const expandNodesByExpandIds: (item: TreeItemJson, expandIds: string[]) => TreeItemJson;
export declare const activeAndExpandNodesByActiveIds: (item: TreeItemJson, activeIds: string[]) => TreeItemJson;
export declare const fetchAllExpandIds: (item: TreeItemJson) => string[];
