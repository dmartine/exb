import {React, DataSource, IMDataSourceJson, DataSourceSchema, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {Button} from 'jimu-ui';

import DSMappingItem from './ds-mapping-item';
import FieldMapping from './field-mapping';
import MappingInfo from './mapping-info';

import {getWhetherMappingIsDone, getUsedDsSchema, getMappedDsJson, getDsSchema, getMappedSchemaFromNewSchema,
  getAutoMappedSetSchema, getWhetherChildMappingIsDone, getSortedKeys, getIsLastFieldMapping} from '../utils';
import defaultMessages from '../translations/default';

interface Props{
  curDs: DataSource;
  newDs: DataSource;
  isRoot: boolean;
  isMappingReady: boolean;
  isExternalDsShown: boolean;
  isWarning: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  defaultMappedSchema: DataSourceSchema;
  mappingHistory: DataSource[];
  intl: InjectedIntl;
  hideMapping: () => void;
  toggleExternalDs: (isShown: boolean) => void;
  updateMappingHistory: (history: DataSource[]) => void;
  onMappingFinished?: (dsJson: IMDataSourceJson) => void;
  updateMappedSchema?: (schema: DataSourceSchema, curDs: DataSource) => void;
  traverseParentDsMapping?: () => void;
  reverseTraverseParentDsMapping?: () => void;
  onDsMappingFinished?: () => void;
}

interface State{
  newChildDs: DataSource;
  curChildDs: DataSource;
  curSchema: DataSourceSchema;
  newSchema: DataSourceSchema;
  mappedSchema: DataSourceSchema;
  isDone: boolean;
  isChildMappingDone: boolean;
}

export default class DsMapping extends React.PureComponent<Props, State>{
  __unmount = false;

  constructor(props){
    super(props);
    this.state = {
      newChildDs: null,
      curChildDs: null,
      curSchema: this.props.curDs && this.props.curDs.isDataSourceSet ? getUsedDsSchema(this.props.curDs) : null,
      newSchema: this.props.newDs && this.props.newDs.isDataSourceSet ? getDsSchema(this.props.newDs) : null,
      mappedSchema: this.props.defaultMappedSchema || null,
      isDone: false,
      isChildMappingDone: false
    }
  }

  componentDidMount(){
    this.__unmount = false;
    if(!this.state.mappedSchema || Object.keys(this.state.mappedSchema).length === 0){
      const curConfigSchema = this.props.curDs && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson.schema;
      this.setState({mappedSchema: getMappedSchemaFromNewSchema(this.state.curSchema, this.state.newSchema, curConfigSchema)});
    }
    this.setState({
      isDone: this.getIsDoneStatus(),
      isChildMappingDone: this.getIsChildMappingDoneStatus()
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State){
    if(prevProps.curDs !== this.props.curDs && this.props.curDs && this.props.curDs.isDataSourceSet){
      this.setState({curSchema: getUsedDsSchema(this.props.curDs)});
    }
    if(prevProps.newDs !== this.props.newDs && this.props.newDs && this.props.newDs.isDataSourceSet){
      this.setState({newSchema: getDsSchema(this.props.newDs)});
    }
    if(prevState.newSchema !== this.state.newSchema){
      const curConfigSchema = this.props.curDs && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson && this.props.curDs.dataSourceJson.schema;
      this.setState({mappedSchema: getMappedSchemaFromNewSchema(this.state.curSchema, this.state.newSchema, curConfigSchema)});
    }
    if(prevState.curSchema !== this.state.curSchema || prevState.mappedSchema !== this.state.mappedSchema ||
      prevState.newSchema !== this.state.newSchema){
      this.setState({
        isDone: this.getIsDoneStatus(),
        isChildMappingDone: this.getIsChildMappingDoneStatus()
      });
    }
    if(prevProps.isRoot !== this.props.isRoot && this.props.isRoot){
      this.props.toggleExternalDs(true);
    }
  }

  componentWillMount(){
    this.__unmount = true;
  }

  updateMappedChildSchema = (curDs: DataSource, newDs: DataSource) => {
    let mappedSchema = {...this.state.mappedSchema};
    let mappedChildSchema;
    let curSchema = getDsSchema(curDs);
    let jimuChildId = curSchema && curSchema.jimuChildId;
    let curConfigSchema = curDs && curDs.dataSourceJson && curDs.dataSourceJson && curDs.dataSourceJson.schema;

    mappedChildSchema = getMappedSchemaFromNewSchema(getUsedDsSchema(curDs), getDsSchema(newDs), curConfigSchema);
    mappedSchema.childSchemas[jimuChildId] = mappedChildSchema;

    this.setState({mappedSchema});
  }

  updateMappedSchema = (schema: DataSourceSchema, curDs: DataSource) => {
    let mappedSchema = {...this.state.mappedSchema};
    let curSchema = getDsSchema(curDs);
    let jimuChildId = curSchema && curSchema.jimuChildId;
    mappedSchema.childSchemas[jimuChildId] = {...mappedSchema.childSchemas[jimuChildId] , ...schema};

    this.setState({mappedSchema});
  }

  setChildDs = (curDs: DataSource, newDs: DataSource) => {
    this.setState({
      curChildDs: curDs,
      newChildDs: newDs
    });
  }

  getIsDoneStatus = (): boolean => {
    let isDone;
    if(getWhetherMappingIsDone(this.state.curSchema, this.state.mappedSchema)){
      isDone = true;
    }else{
      isDone = false;
    }

    return isDone;
  }

  getIsChildMappingDoneStatus = (): boolean => {
    let isChildMappingDone;
    if(getWhetherChildMappingIsDone(this.state.curSchema, this.state.mappedSchema)){
      isChildMappingDone = true;
    }else{
      isChildMappingDone = false;
    }

    return isChildMappingDone;
  }

  getSelectedNewDs = (jimuChildId: string): DataSource => {
    if(!this.state.mappedSchema || !this.state.mappedSchema.childSchemas || !this.state.mappedSchema.childSchemas[jimuChildId] || !this.props.newDs){
      return null;
    }
    const id = this.state.mappedSchema.childSchemas[jimuChildId].childId;
    return id ? this.props.newDs.getChildDataSource(id) : null;
  }

  getDefaultMappedFieldSchema = (): DataSourceSchema => {
    const schema = getDsSchema(this.props.curDs);
    if(!this.props.defaultMappedSchema || !schema){
      return null;
    }
    return this.props.defaultMappedSchema.childSchemas[schema.jimuChildId];
  }

  getWhetherHaveChildDssToMap = (): boolean => {
    return this.state.curSchema && this.state.curSchema.childSchemas && Object.keys(this.state.curSchema.childSchemas).length !== 0;
  }

  onFieldMappingFinished = (curDs: DataSource, schema: DataSourceSchema, isLast: boolean) => {
    let mappedSchema = {...schema};

    this.props.updateMappedSchema &&
    this.props.updateMappedSchema(mappedSchema, this.props.curDs);

    if(isLast){
      this.props.onDsMappingFinished();
    }else{
      this.props.traverseParentDsMapping &&
      this.props.traverseParentDsMapping();
    }
  }

  onDsMappingFinished = () => {
    if(!this.props.newDs){
      return;
    }
    let mappedSchema = {...this.state.mappedSchema};
    this.props.newDs.getChildDataSources().forEach(childDs => {
      mappedSchema = getAutoMappedSetSchema(mappedSchema, getDsSchema(childDs));
    });
    this.setState({mappedSchema}, () => {
      if(!this.props.isRoot){
        this.props.updateMappedSchema &&
        this.props.updateMappedSchema(this.state.mappedSchema, this.props.curDs);
      }else{
        let mappedDsJson = getMappedDsJson(this.props.curDs.dataSourceJson, this.props.newDs.dataSourceJson, this.state.mappedSchema);

        this.props.onMappingFinished &&
        this.props.onMappingFinished(mappedDsJson);
      }
      this.props.hideMapping();
    });
  }

  traverseDsMapping = () => {
    const curDsJimuChildId = getSortedKeys(this.state.curSchema.childSchemas)
      .find(id => this.props.mappingHistory.every(ds => !getDsSchema(ds).jimuChildId || getDsSchema(ds).jimuChildId !== id));
    const curChildDs = this.props.curDs.getChildDataSource(curDsJimuChildId);
    const newChildDs = this.getSelectedNewDs(curDsJimuChildId);
    if(curChildDs){ // one child data source of current data source has not been mapped, go to map the child data source
      this.setChildDs(curChildDs, newChildDs);
      this.props.updateMappingHistory(this.props.mappingHistory.concat(curChildDs));
    }else{ // all child data source of current data source have been mapped, go to map sibling data source
      if(this.props.traverseParentDsMapping){ // current data source has siblings
        this.props.traverseParentDsMapping();
      }else{ // current data source is the root data source
        this.setChildDs(null, null);
        this.onDsMappingFinished();
      }
    }
  }

  reverseTraverseDsMapping = () => {
    const prevCurDs = this.props.mappingHistory.length > 1 ? this.props.mappingHistory.slice(this.props.mappingHistory.length - 2)[0] : null;
    const prevCurDsJimuChildId = getDsSchema(prevCurDs) && getDsSchema(prevCurDs).jimuChildId;
    const prevNewDs = this.getSelectedNewDs(prevCurDsJimuChildId);
    if(prevCurDs){
      this.setChildDs(prevCurDs, prevNewDs);
      this.props.updateMappingHistory(this.props.mappingHistory.slice(0, this.props.mappingHistory.length - 1));
    }
  }

  render(){
    if(!this.props.curDs){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }

    return (
      <>
      {
        this.state.curChildDs && this.state.newChildDs ?

        <DsMapping newDs={this.state.newChildDs} curDs={this.state.curChildDs} defaultMappedSchema={this.state.mappedSchema}
          isRoot={false} isExternalDsShown={this.props.isExternalDsShown} isMappingReady={this.props.isMappingReady}
          hideMapping={this.props.hideMapping} toggleExternalDs={this.props.toggleExternalDs} isWarning={this.props.isWarning}
          mappingHistory={this.props.mappingHistory} updateMappedSchema={this.updateMappedSchema}
          traverseParentDsMapping={this.traverseDsMapping} updateMappingHistory={this.props.updateMappingHistory}
          reverseTraverseParentDsMapping={this.reverseTraverseDsMapping} widgets={this.props.widgets}
          onDsMappingFinished={this.onDsMappingFinished} intl={this.props.intl}
        /> :

        <div className="w-100 h-100 ds-mapping-ds">
          {
            !this.props.curDs.isDataSourceSet ?

            <div className="ds-mapping-field-container">
              <FieldMapping curDs={this.props.curDs} newDs={this.props.newDs} onMappingFinished={this.onFieldMappingFinished}
                defaultMappedSchema={this.getDefaultMappedFieldSchema()} isExternalDsShown={this.props.isExternalDsShown}
                hideMapping={this.props.hideMapping} isLast={getIsLastFieldMapping(this.props.curDs, this.props.curDs.parentDataSource, this.props.mappingHistory)}
                toggleExternalDs={this.props.toggleExternalDs} isMappingReady={this.props.isMappingReady}
                mappingHistory={this.props.mappingHistory.concat(this.props.curDs)} isWarning={this.props.isWarning}
                backToPreviouseMapping={this.props.reverseTraverseParentDsMapping} intl={this.props.intl}
                widgets={this.props.widgets}
              />
            </div> :

            <div>
              <MappingInfo curDs={this.props.curDs} newDs={this.props.newDs} hideMapping={this.props.hideMapping}
                toggleExternalDs={this.props.toggleExternalDs} isMappingReady={this.props.isMappingReady}
                isExternalDsShown={this.props.isExternalDsShown} intl={this.props.intl}
              />

              {
                this.getWhetherHaveChildDssToMap() ?
                  <div>
                    <h5 className="m-2 in-use-related-widgets">
                      {this.props.intl.formatMessage({id: 'inUse', defaultMessage: defaultMessages.inUse})}
                    </h5>
                    {
                      getSortedKeys(this.state.curSchema.childSchemas).map((id, index) =>
                        <DSMappingItem curDs={this.props.curDs.getChildDataSource(id)} selectedNewDs={this.getSelectedNewDs(id)}
                          key={index} newParentDs={this.props.newDs} updateMappedSchema={this.updateMappedChildSchema}
                          isDone={getWhetherMappingIsDone(this.state.curSchema.childSchemas[id], this.state.mappedSchema.childSchemas[id])}
                          widgets={this.props.widgets} intl={this.props.intl}
                        />
                      )
                    }
                  </div>
                : <div className="p-2">
                  {this.props.intl.formatMessage({id: 'noChildDssToMap', defaultMessage: defaultMessages.noChildDssToMap})}
                </div>
              }

              <div className="fixed-bottom ds-mapping-buttons">
                <Button disabled={this.props.mappingHistory.length === 1 || !this.props.isMappingReady || this.props.isWarning} outline onClick={this.reverseTraverseDsMapping}>
                  {this.props.intl.formatMessage({id: 'previous', defaultMessage: defaultMessages.previous})}
                </Button>
                <Button outline onClick={this.traverseDsMapping} disabled={!this.state.isChildMappingDone || !this.props.isMappingReady || this.props.isWarning} className="bg-primary ml-2">
                  {
                    this.getWhetherHaveChildDssToMap()
                    ? this.props.intl.formatMessage({id: 'next', defaultMessage: defaultMessages.next})
                    : this.props.intl.formatMessage({id: 'done', defaultMessage: defaultMessages.done})
                  }
                </Button>
              </div>

            </div>
          }
        </div>
      }
      </>
    );
  }
}
