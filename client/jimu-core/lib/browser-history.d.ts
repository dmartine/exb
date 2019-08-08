import * as React from 'react';
import { History } from 'history';
import { Location } from './types/common';
export declare const browserHistory: History<any>;
export declare const HistoryProvider: (props: any) => JSX.Element;
export declare function withHistory<T extends React.ComponentClass<any, any>>(Component: any): T;
/**
 *
 * @param queryObject can be partial of query object
 */
export declare function changeQueryObject(queryObject: any, replace?: boolean): void;
/**
 *
 * @param queryObject can be partial of query object
 */
export declare function replaceQueryObject(queryObject: any, replace?: boolean): void;
export declare function changePage(pageId: string): void;
export declare function changeView(sectionId: string, viewId: string): void;
export declare function changeDialog(dialogId: string): void;
export { History, Location };
