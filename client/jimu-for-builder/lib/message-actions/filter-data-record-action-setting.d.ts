/// <reference types="react" />
/** @jsx jsx */
import { React, ActionSettingProps, SerializedStyles, DataSource, DataSourceSchema, IMFilterActionConfig } from 'jimu-core';
interface States {
    datasources: DataSource[];
}
export default class FilterDataRecordActionSettingclass extends React.PureComponent<ActionSettingProps<IMFilterActionConfig>, States> {
    constructor(props: any);
    getStyle(): SerializedStyles;
    componentDidMount(): void;
    componentDidUpdate(): void;
    datasourceChange: (e: any) => void;
    onSelectDataSourceField: (fieldName: string) => void;
    onSelectMessageField: (fieldName: string) => void;
    getDataSourceSchema: (datasourceId: any) => DataSourceSchema;
    static defaultProps: {
        config: {
            dataSourceId: any;
            messageField: any;
            dataSourceField: any;
        };
    };
    getMessageDataSourceId: () => string;
    checkIsConfigDisabled: (config: any) => boolean;
    formatMessage: (id: string) => string;
    render(): JSX.Element;
}
export {};
