import {React, DataSource, FieldSchema, DataSourceSchema, Immutable, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {Button} from 'jimu-ui';

import {FieldType} from '@esri/arcgis-rest-types';

import FieldMappingItem from './field-mapping-item';
import MappingInfo from './mapping-info';

import {getUsedDsSchema, getWhetherMappingIsDone, getDsSchema, getMappedFieldsFromNewSchema, getMappedFieldFromNewField,
  getAutoMappedSchema, getSortedKeys} from '../utils';
import defaultMessages from '../translations/default';

interface Props{
  curDs: DataSource;
  newDs: DataSource;
  defaultMappedSchema: DataSourceSchema;
  isMappingReady: boolean;
  isLast: boolean;
  isExternalDsShown: boolean;
  isWarning: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  mappingHistory: DataSource[];
  intl: InjectedIntl;
  onMappingFinished: (curDs: DataSource, mappedSchema: DataSourceSchema, isLast: boolean) => void;
  hideMapping: () => void;
  toggleExternalDs: (isShown: boolean) => void;
  backToPreviouseMapping?: () => void;
}

interface State{
  curSchema: DataSourceSchema;
  newSchema: DataSourceSchema;
  mappedSchema: DataSourceSchema;
  isDone: boolean;
}

export default class FieldMapping extends React.PureComponent<Props, State>{
  __unmount = false;

  constructor(props){
    super(props);
    this.state = {
      curSchema: getUsedDsSchema(this.props.curDs),
      newSchema: getDsSchema(this.props.newDs),
      mappedSchema: this.props.defaultMappedSchema && this.props.defaultMappedSchema.fields ?
        Immutable(this.props.defaultMappedSchema).asMutable({deep: true}) : null,
      isDone: false
    }
  }

  componentDidMount(){
    this.__unmount = false;
    if(!this.getCanSelectNewDs()){
      this.props.toggleExternalDs(false);
    }else{
      this.props.toggleExternalDs(true);
    }
    if(!this.state.mappedSchema || !this.state.mappedSchema.fields || Object.keys(this.state.mappedSchema.fields).length === 0){
      const curConfigSchema = this.props.curDs && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson.schema;
      this.setState({mappedSchema: {fields: getMappedFieldsFromNewSchema(this.state.curSchema, this.state.newSchema, curConfigSchema)}});
    }
    this.setState({isDone: this.getIsDoneStatus()});
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.curDs !== this.props.curDs){
      this.setState({curSchema: getUsedDsSchema(this.props.curDs)});
    }
    if(prevProps.newDs !== this.props.newDs){
      this.setState({newSchema: getDsSchema(this.props.newDs)});
    }
    if(prevState.newSchema !== this.state.newSchema || prevState.curSchema !== this.state.curSchema){
      if(this.props.defaultMappedSchema && this.props.defaultMappedSchema.fields && Object.keys(this.props.defaultMappedSchema.fields).length > 0){
        this.setState({mappedSchema: Immutable(this.props.defaultMappedSchema).asMutable({deep: true})});
      }else{
        const curConfigSchema = this.props.curDs && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson.schema;
        const mappedSchema = {fields: getMappedFieldsFromNewSchema(this.state.curSchema, this.state.newSchema, curConfigSchema)};
        this.setState({mappedSchema});
      }
    }
    if(prevState.curSchema !== this.state.curSchema || prevState.mappedSchema !== this.state.mappedSchema ||
      prevState.newSchema !== this.state.newSchema){
      this.setState({isDone: this.getIsDoneStatus()});
    }
  }

  componentWillMount(){
    this.__unmount = true;
  }

  updateMappedSchema = (curField: FieldSchema, newField: FieldSchema) => {
    let mappedSchema: DataSourceSchema = {...this.state.mappedSchema};
    let curConfigSchema = this.props.curDs && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson.schema;
    let mappedField: FieldSchema = getMappedFieldFromNewField(curField, newField, curConfigSchema);

    mappedSchema.fields[mappedField.jimuName] = mappedField;
    this.setState({mappedSchema});
  }

  getIsDoneStatus = (): boolean => {
    let isDone;
    if(getWhetherMappingIsDone(this.state.curSchema, this.state.mappedSchema) && this.props.newDs){
      isDone = true
    }else{
      isDone = false;
    }
    return isDone;
  }

  getCanSelectNewDs = (): boolean => {
    return !this.props.newDs || this.props.newDs.id === this.props.curDs.id;
  }

  getSelectedNewField = (jimuName: string, esriType: FieldType): FieldSchema => {
    if(!this.state.newSchema || !this.state.newSchema.fields || !this.state.mappedSchema || !this.state.mappedSchema.fields
      || !this.state.mappedSchema.fields[jimuName]){
      return null;
    }

    const selectedField = this.state.newSchema.fields[this.state.mappedSchema.fields[jimuName].name];
    return selectedField && selectedField.esriType === esriType ? selectedField : null;
  }

  onNextClicked = () => {
    let mappedSchema = {...this.state.mappedSchema};

    this.state.newSchema && this.state.newSchema.fields && Object.keys(this.state.newSchema.fields).forEach(jimuName => {
      mappedSchema = getAutoMappedSchema(mappedSchema, this.state.newSchema.fields[jimuName]);
    });
    this.setState({mappedSchema}, () => {
      this.props.onMappingFinished(this.props.curDs, this.state.mappedSchema, this.props.isLast);
    });
  }

  onPreviousClicked = () => {
    this.props.backToPreviouseMapping();
  }

  render(){
    if(!this.props.curDs){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }

    return (
      <div className="ds-mapping-field">
        <MappingInfo curDs={this.props.curDs} newDs={this.props.newDs} hideMapping={this.props.hideMapping}
          isOpenSelectDataBtnHide={!this.getCanSelectNewDs()} toggleExternalDs={this.props.toggleExternalDs}
          isMappingReady={this.props.isMappingReady} isExternalDsShown={this.props.isExternalDsShown} intl={this.props.intl}
        />

        {
          this.state.curSchema && this.state.curSchema.fields && Object.keys(this.state.curSchema.fields).length > 0 ?
          getSortedKeys(this.state.curSchema.fields)
            .map((jimuName, index) =>
              <FieldMappingItem curField={this.state.curSchema.fields[jimuName]} newSchema={this.state.newSchema}
                updateMappedSchema={this.updateMappedSchema}
                selectedNewField={this.getSelectedNewField(jimuName, this.state.curSchema.fields[jimuName].esriType)} key={index}
              />
            )
          : <div className="ml-4 mt-2">
            {this.props.intl.formatMessage({id: 'noUsedFieldToMap', defaultMessage: defaultMessages.noUsedFieldToMap})}
          </div>
        }

        <div className="fixed-bottom ds-mapping-buttons">
          {
            this.props.curDs.parentDataSource &&
            <Button outline onClick={this.onPreviousClicked} disabled={!this.props.isMappingReady || this.props.isWarning}>
              {this.props.intl.formatMessage({id: 'previous', defaultMessage: defaultMessages.previous})}
            </Button>
          }
          <Button disabled={!this.state.isDone || !this.props.isMappingReady || this.props.isWarning} onClick={this.onNextClicked} className="bg-primary ml-2">
            {
              this.props.isLast
              ? this.props.intl.formatMessage({id: 'done', defaultMessage: defaultMessages.done})
              : this.props.intl.formatMessage({id: 'next', defaultMessage: defaultMessages.next})
            }
          </Button>
        </div>

      </div>
    );
  }
}
