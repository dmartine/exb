import * as React from 'react';
import MapView = require('esri/views/MapView');
import { MapDataSource } from '../data-source';
interface Props {
    style?: any;
    itemId?: string;
    mapDataSource?: MapDataSource;
    onMapLoaded?: (mapView: MapView) => void;
}
export default class JimuMap extends React.PureComponent<Props, any> {
    mapContainer: any;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
