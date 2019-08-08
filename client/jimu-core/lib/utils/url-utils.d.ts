import { UrlParameters, IMUrlParameters } from '../types/url-parameters';
import { Location, LinkResult, LinkTo } from '../types/common';
export declare function parsePath(path: string): Location;
export declare function isAbsoluteUrl(url: string): boolean;
export interface DataSourceSelectionInfo {
    [dsId: string]: {
        selectionType: 'index' | 'id';
        selection: number[] | string[];
    };
}
export declare function getDataSourceInfosFromQueryObject(queryObject: UrlParameters): DataSourceSelectionInfo;
export declare function getAppIdPageIdFromUrl(location?: Location): {
    appId: string;
    pageId: string;
};
/**
 * the path may be:
 *  ->app id is null:
 *  :rootPath
 *  :rootPath/index.html
 *  :rootPath/page
 *  :rootPath/page/:pageId
 *  :rootPath/page/page => page id is "page"

    -> app is not null, page id is null
 *  :rootPath/:appId, this means we can't have a app whose id is "page"
 *  :rootPath/:appId/index.html => page id is null
 *  :rootPath/:appId/page => page id is null
 
    -> both are not null
 *  :rootPath/:appId/page/:pageId
 */
export declare function parseAppPath(pathName?: string): {
    appId: string;
    pageId: string;
};
export declare function getPageLink(pageId: string): {
    path: string;
    qo: {
        page: string;
    };
};
export declare function getPageLinkUrl(pageId: string, qo?: Partial<UrlParameters>): string;
export declare function getFolder(url: string): string;
export declare function getFixedRootPath(): string;
export declare function getAbsoluteRootUrl(): string;
export declare function createLocation(currentLocation: Location, to: string): Location;
export declare function createHref(location: Location): string;
export declare function getHrefFromLinkTo(linkResult: LinkTo, queryObject: IMUrlParameters, currentLocation?: Location): string;
export declare function getLinkResultFromHref(href: string): LinkResult;
