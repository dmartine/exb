/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, SerializedStyles } from 'jimu-core';
import { DataSourceJsonWithRootId } from '../data-source-list/ds-types';
interface Props {
    dsJsonWithRootId: DataSourceJsonWithRootId;
    onRemove: (dsJson: DataSourceJsonWithRootId) => void;
    disableRemove?: boolean;
}
export default class DsItem extends React.PureComponent<Props & {
    theme: ThemeVariables;
}, {}> {
    constructor(props: any);
    getStyle: (theme: ThemeVariables) => SerializedStyles;
    onRemove: () => void;
    render(): JSX.Element;
}
export {};
