import { ImmutableObject } from 'seamless-immutable';
export interface UrlParameters {
    locale?: string;
    apiurl?: string;
    /** these are for buidler only */
    title?: string;
    tags?: string;
    summary?: string;
    webmap?: string;
    sharewithwebmap?: string;
    webscene?: string;
    sharewithwebscene?: string;
    folder?: string;
    id?: string;
    page?: string;
    /** end */
    views?: string;
    dlg?: string;
    /**
     * use this URL parameter to change the layout default setting.
     * format: layoutId:layoutItemId:settingKey:settingValue
     * example: layout1:1:toggleOn:true, layout1:2:visible:false
     */
    layouts?: string;
    /**
     * the data select, use this format: <dsId:selectIndex>
     * the select index can be:
     *    * <i>, means index <i> is selected.
     *    * <i1+i2+i3>, means index <i1, i2, i3> is selected.
     *    * <i1-i3>, means index <from i1 to i3> is selected.
     *    * <i1-i3>+<i8-i9>, means index <from i1 to i3> and <from i8 to i9>  is selected.
     */
    data_index?: string;
    /**
     * the data select, use this format: <dsId:selectId>
     * the select id can be:
     *    * <id>
     *    * <id1+id2+id3> this means the id must not contain "+"
     */
    data_id?: string;
    config?: string;
    app_config?: string;
    /**
     * embedded = <true | 1>
     */
    embedded?: string;
    diff_log?: string;
    /**
     * by default, app will load config from item data.
     * But before publish, the item data is empty, we can set draft=1 to load config from item resource
     * draft = <true | 1>
     */
    draft?: string;
    theme?: string;
    /**
     * this is for make widget to support custom URL parameters. the suggest pattern is: ?widget1=p1=v1,p2=v2, but every widget can define it's own pattern
     */
    [widgetId: string]: string;
}
export declare type IMUrlParameters = ImmutableObject<UrlParameters>;
