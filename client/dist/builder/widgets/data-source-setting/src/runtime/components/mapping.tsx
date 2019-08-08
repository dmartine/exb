import {React, IMDataSourceJson, DataSource, DataSourceSchema, Immutable, uuidv1, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {ExternalDataSourceChooser, AppDataSourceManager, getAppConfigAction} from 'jimu-for-builder';
import {DataSourceTypes} from 'jimu-arcgis/arcgis-data-source';

import {getMappedDsJson, getElementPosition, getUsedDsSchema} from '../utils';
import defaultMessages from '../translations/default';

import DsMapping from './ds-mapping';
import FieldMapping from './field-mapping';
import MappingWarning from './mapping-warning';
/* import MappingBreadcrumbs from './mapping-breadcrumbs'; */

interface Props{
  ds: DataSource;
  portalUrl: string;
  dispatch: any;
  intl: InjectedIntl;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  hideMapping: () => void;
}

interface State{
  newDs: DataSource;
  mappedSchema: DataSourceSchema;
  mappingHistory: DataSource[];
  isExternalDsShown: boolean;
  isDone: boolean;
  isMappingReady: boolean;
  isWarning: boolean;
}
export default class Mapping extends React.PureComponent<Props, State>{
  __unmount = false;
  rootDom: HTMLElement;
  dataChooser: HTMLElement;
  creatingDsId: string;
  constructor(props){
    super(props);
    this.state = {
      newDs: null,
      mappedSchema: this.props.ds && this.props.ds.isDataSourceSet ? {childSchemas: {}} : {},
      mappingHistory: this.props.ds ? [this.props.ds] : [],
      isExternalDsShown: true,
      isDone: false,
      isMappingReady: false,
      isWarning: false
    }
  }

  componentDidMount(){
    this.__unmount = false;
    if(this.rootDom && this.dataChooser){
      this.moveDataChooser();
    }

    if(this.props.ds){
      this.createSameDsWithDiffId(this.props.ds.dataSourceJson).then(ds => {
        if(!this.__unmount){
          this.setState({
            newDs: ds,
            mappedSchema: getUsedDsSchema(ds, f => {
              delete f.alias;
              return f;
            }),
            isMappingReady: true,
            isWarning: false
          });
        }
      }, e => {
        if(!this.__unmount){
          console.error(e);
          this.setState({
            isMappingReady: true,
            isWarning: true
          });
        }
      });
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State){
    if(this.rootDom && this.dataChooser){
      this.moveDataChooser();
    }
    if(prevState.newDs !== this.state.newDs){
      prevState.newDs && this.destoryDs(prevState.newDs.id);
    }
    if(!this.state.newDs && this.props.ds){
      this.setState({isMappingReady: false});
      this.createSameDsWithDiffId(this.props.ds.dataSourceJson).then(ds => {
        if(!this.__unmount){
          this.setState({
            newDs: ds,
            mappedSchema: getUsedDsSchema(ds, f => {
              delete f.alias;
              return f;
            }),
            isMappingReady: true,
            isWarning: false
          });
        }
      }, e => {
        if(!this.__unmount){
          console.error(e);
          this.setState({
            isMappingReady: true,
            isWarning: true
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.__unmount = true;
    this.state.newDs && this.destoryDs(this.state.newDs.id);
    this.creatingDsId && this.destoryDs(this.creatingDsId);
  }
  moveDataChooser(){
    const rootPosition = getElementPosition(this.rootDom);
    if(rootPosition){
      this.dataChooser.style.left = `${rootPosition.x + this.rootDom.offsetWidth}px`;
      this.dataChooser.style.top = `${rootPosition.y - 10}px`;
      this.dataChooser.style.width = `${document.body.offsetWidth - rootPosition.x - this.rootDom.offsetWidth}px`;
      this.dataChooser.style.height = `${document.body.offsetHeight - 100}px`;
    }
  }

  createSameDsWithDiffId = (dsJson: IMDataSourceJson): Promise<DataSource> => {
    if(!dsJson || !dsJson.id){
      return Promise.reject('Pass a wrong data source');
    }
    const newDsId = this.getTempDsId(dsJson.id);
    const newDsJson = dsJson.set('id', newDsId).without('schema');
    this.creatingDsId = newDsId;

    return AppDataSourceManager.getInstance().createDataSource(newDsJson).then(ds => {
      this.creatingDsId = null;
      return ds;
    });
  }

  destoryDs = (dsId: string) => {
    if(!dsId || dsId === this.props.ds.id){
      return;
    }

    AppDataSourceManager.getInstance().destroyDataSource(dsId);
  }

  updateMappingHistory = (newHistory: DataSource[]) => {
    this.setState({mappingHistory: newHistory});
  }

  hideMapping = () => {
    this.state.newDs && this.destoryDs(this.state.newDs.id);
    this.creatingDsId && this.destoryDs(this.creatingDsId);
    this.props.hideMapping();
  }

  hideExternalDs = () => {
    this.setState({isExternalDsShown: false});
  }

  getTempDsId = (dsId: string): string => {
    return `${dsId}-${uuidv1()}`;
  }

  toggleExternalDs = (isShown: boolean) => {
    this.setState({isExternalDsShown: isShown});
  }

  onSelectExternalDs = (dsJsons: IMDataSourceJson[]) => {
    // TODO: select a layer service which contains multiple layers
    const dsJson = dsJsons[0];
    if(!dsJson){
      this.setState({isWarning: true});
      return;
    }

    this.setState({isMappingReady: false});

    this.createSameDsWithDiffId(dsJson).then(ds => {
      if(!this.__unmount){
        this.setState({
          newDs: ds,
          isMappingReady: true,
          isWarning: false
        });
      }
    }, e => {
      if(!this.__unmount){
        console.error(e);
        this.setState({
          isMappingReady: true,
          isWarning: true
        });
      }
    });
  }

  onRemoveExternalDs = (dsJsons: IMDataSourceJson[]) => {
    const dsJson = dsJsons[0];
    if(!dsJson){
      this.setState({isWarning: true});
    }
    this.setState({
      newDs: null
    });
  }

  onMappingFinished(dsJson: IMDataSourceJson);
  onMappingFinished(curDs: DataSource, mappedSchema: DataSourceSchema);
  onMappingFinished(dsInfo: IMDataSourceJson | DataSource, mappedSchema?: DataSourceSchema){
    if(!dsInfo || !this.state.newDs){
      return;
    }

    let dsJson;

    if(!dsInfo.dataSourceJson){
      dsJson = dsInfo;
    }else if(dsInfo.dataSourceJson && mappedSchema){
      dsJson = getMappedDsJson(this.props.ds.dataSourceJson, this.state.newDs.dataSourceJson, mappedSchema);
    }
    getAppConfigAction().editDataSource(dsJson).exec();
    this.setState({mappedSchema: dsJson.schema});
    this.hideMapping();
  }
  render(){
    if(!this.props.ds){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }
    return(
      <div className="ds-mapping" ref={d => this.rootDom = d}>
        {/* <MappingBreadcrumbs history={this.state.mappingHistory} /> */}
        {
          this.props.ds.isDataSourceSet ?
          <div className="ds-mapping-ds-container">
            <DsMapping curDs={this.props.ds} newDs={this.state.newDs} isRoot={true} intl={this.props.intl}
              onMappingFinished={this.onMappingFinished.bind(this)} defaultMappedSchema={this.state.mappedSchema}
              hideMapping={this.hideMapping} toggleExternalDs={this.toggleExternalDs} isWarning={this.state.isWarning}
              isExternalDsShown={this.state.isExternalDsShown} isMappingReady={this.state.isMappingReady}
              mappingHistory={this.state.mappingHistory} updateMappingHistory={this.updateMappingHistory}
              widgets={this.props.widgets}
            />
          </div> : null
        }

        {
          !this.props.ds.isDataSourceSet ?
          <div className="ds-mapping-field-container">
            <FieldMapping curDs={this.props.ds} newDs={this.state.newDs} onMappingFinished={this.onMappingFinished.bind(this)}
              defaultMappedSchema={this.state.mappedSchema} hideMapping={this.hideMapping} isWarning={this.state.isWarning}
              isMappingReady={this.state.isMappingReady} isExternalDsShown={this.state.isExternalDsShown} isLast={true}
              toggleExternalDs={this.toggleExternalDs} mappingHistory={this.state.mappingHistory} intl={this.props.intl}
              widgets={this.props.widgets}
            />
          </div> : null
        }

        {
          !this.state.isMappingReady ?
          <div className="jimu-small-loading"></div> : null
        }

        {
          this.state.isExternalDsShown ?

          <div className="ds-mapping-external-data" ref={d => this.dataChooser = d}>
            <ExternalDataSourceChooser portalUrl={this.props.portalUrl} onSelect={this.onSelectExternalDs} onRemove={this.onRemoveExternalDs}
              onCancel={this.hideExternalDs} isRadio={true} types={this.props.ds ? Immutable([this.props.ds.type as DataSourceTypes]) : Immutable([])}
            />
          </div> : null
        }

        {
          this.state.isWarning ?
          <MappingWarning warning={this.props.intl.formatMessage({id: 'createFailedWarning', defaultMessage: defaultMessages.createFailedWarning})} /> : null
        }
      </div>
    );
  }
}