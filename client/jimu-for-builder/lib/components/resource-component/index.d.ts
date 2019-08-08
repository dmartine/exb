/// <reference types="react" />
import { React } from 'jimu-core';
import { ResourceItemInfo, ResourceType } from '../../app-resource-manager';
interface Props {
    widgetId: string;
    className?: string;
    style?: React.CSSProperties;
    color?: string;
    label?: string;
    onChange?: (resourceInfo: ResourceItemInfo) => void;
    onResourceNotSupported?: () => void;
    disabled?: boolean;
    type?: ResourceType;
    resourceName?: string;
}
export default class ResourceComponent extends React.PureComponent<Props, {}> {
    fileInput: any;
    supportedResourceSuffix: {
        IMAGE: string[];
    };
    static defaultProps: {
        type: ResourceType;
        style: {};
    };
    constructor(props: any);
    getFileFromBrowse: () => void;
    getAccept: (type: ResourceType) => any;
    render(): JSX.Element;
}
export {};
