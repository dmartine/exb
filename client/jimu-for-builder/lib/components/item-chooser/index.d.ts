/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export declare enum ItemTypes {
    WebMap = "Web Map",
    WebScene = "Web Scene",
    FeatureService = "Feature Service"
}
export declare enum ItemCategory {
    MyContent = "MY_CONTENT",
    MyOrganization = "MY_ORGANIZATION",
    Public = "PUBLIC"
}
export declare enum SortField {
    Modified = "modified",
    Title = "title",
    Views = "numViews"
}
export declare enum SortOrder {
    Desc = "desc",
    Asc = "asc"
}
declare const ItemChooser: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<any, string | number | symbol> & React.ClassAttributes<React.Component<Pick<any, string | number | symbol>, any, any>>, "theme">>;
export default ItemChooser;
