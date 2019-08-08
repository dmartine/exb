/// <reference types="react-intl" />
/// <reference types="react" />
import { React, ImmutableArray, ExpressionFunctions, Expression, DataSourceManager, FieldSchema, InjectedIntl, ImmutableObject } from 'jimu-core';
import AppDataSourceManager from '../../../app-data-source-manager';
interface Props {
    dataSourceIds: ImmutableArray<string>;
    expression: Expression | ImmutableObject<Expression>;
    intl: InjectedIntl;
    onChange: (expression: Expression) => void;
}
interface State {
    selectedDsId: string;
    selectedJimuFieldName: string;
    selectedFunction: ExpressionFunctions;
}
export default class StatisticsTab extends React.PureComponent<Props, State> {
    dsManager: AppDataSourceManager | DataSourceManager;
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    getWhetherExpressionIsLegal: () => boolean;
    getDefaultDsId: () => string;
    getDefaultFunc: () => ExpressionFunctions;
    getDefaultJimuName: (fields: {
        [jimuName: string]: FieldSchema;
    }) => string;
    getDataSourceId: () => string;
    getSelectedFieldName: (fields: {
        [jimuName: string]: FieldSchema;
    }, fieldJimuName: string) => string;
    getSelectedFunction: () => string;
    getNumberFields: (dsId: string) => {
        [jimuName: string]: FieldSchema;
    };
    getDsLabel: (dsId: string) => string;
    onDsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFunctionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: () => void;
    render(): JSX.Element;
}
export {};
