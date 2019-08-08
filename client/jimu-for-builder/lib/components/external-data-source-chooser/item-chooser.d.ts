/// <reference types="react-intl" />
/// <reference types="react" />
import { React, InjectedIntl } from 'jimu-core';
import { IItem } from '@esri/arcgis-rest-types';
import { ItemCategory, ItemTypes, SortField, SortOrder } from '../item-chooser';
interface Props {
    intl: InjectedIntl;
    portalUrl: string;
    isRadio: boolean;
    itemType: ItemTypes;
    selectedItems: IItem[];
    partSelectedItems: IItem[];
    onSelect: (allSelectedItems: IItem[], latestSelectedItem: IItem) => void;
    onRemove: (allSelectedItems: IItem[], latestRemovedItem: IItem) => void;
    getRootDomPosition: () => {
        t: string;
        b: string;
        l: string;
        r: string;
        h: string;
        w: string;
    };
}
interface State {
    activeCategory: ItemCategory;
    searchValue: string;
    selectedSortField: SortField;
    selectedSortOrder: SortOrder;
    isSearchValueDone: boolean;
}
export default class extends React.PureComponent<Props, State> {
    itemCategory: {
        [ItemCategory.MyContent]: string;
        [ItemCategory.MyOrganization]: string;
        [ItemCategory.Public]: string;
    };
    sortField: {
        [SortField.Modified]: string;
        [SortField.Title]: string;
        [SortField.Views]: string;
    };
    searchValueWhenDone: string;
    constructor(props: any);
    onCategoryChange: (cat: ItemCategory) => void;
    onSearchInputKeyDown: (evt: any) => void;
    doSearch: () => void;
    onSearchChange: (e: any) => void;
    onSortFieldChange: (e: any) => void;
    onSortOrderChange: () => void;
    onItemAdded: (allSelectedItems: IItem[], latestSelectedItem?: IItem) => void;
    onItemRemoved: (allSelectedItems: IItem[], latestRemovedItem?: IItem) => void;
    render(): JSX.Element;
}
export {};
