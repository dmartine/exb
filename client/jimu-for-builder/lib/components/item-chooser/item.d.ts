/// <reference types="react" />
import { React } from 'jimu-core';
import { IItem } from '@esri/arcgis-rest-types';
interface Props {
    item: IItem;
    portalUrl: string;
    onShowDetailClicked: (evt: React.MouseEvent<HTMLElement>, item: IItem) => void;
    onAddDataClicked: (evt: React.MouseEvent<HTMLElement>, item: IItem) => void;
    onRemoveDataClicked: (evt: React.MouseEvent<HTMLElement>, item: IItem) => void;
    selected: boolean;
    partSelected: boolean;
}
interface State {
}
export default class Item extends React.PureComponent<Props, State> {
    constructor(props: any);
    onItemClicked: (e: any) => void;
    onShowDetailClicked: (e: any) => void;
    render(): JSX.Element;
}
export {};
