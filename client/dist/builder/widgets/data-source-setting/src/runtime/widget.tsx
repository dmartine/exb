/** @jsx jsx */
import {BaseWidget, AllWidgetProps, IMDataSourceJson, DataSource, jsx, SessionManager,
  ImmutableObject, IMState, esri, IMWidgetJson} from 'jimu-core';
import {Modal, Icon, Button, Toast, ToastType} from 'jimu-ui';
import {ExternalDataSourceChooser, getAppConfigAction, ItemDetail, AppDataSourceManager} from 'jimu-for-builder';
import {ArcGISDataSourceTypes} from 'jimu-arcgis/arcgis-data-source-type';

import {IItem} from '@esri/arcgis-rest-types';
import {ISearchOptions} from '@esri/arcgis-rest-portal';

import DsList from './components/ds-list';
import FieldList from './components/field-list';
import DsListItem from './components/ds-list-item';
import DsListErrorItem from './components/ds-list-error-item';
import Mapping from './components/mapping';

import {getElementPosition, getDsSchema, getSortedArrayByLabel} from './utils';
import defaultMessages from './translations/default';

import {getStyle} from './style';

const IconArrowLeft = require('jimu-ui/lib/icons/arrow-left.svg');
const IconAdd = require('jimu-ui/lib/icons/add-12.svg');

interface State{
  isDataSourceInited: boolean;
  isExternalDsShown: boolean;
  isErrorToastShown: boolean;
  mappingDs: DataSource;
  dsHistory: DataSource[];
  item: IItem;
  moreOptionsDsId: string;
}
interface ExtraProps{
  dataSources: ImmutableObject<{ [dsId: string]: IMDataSourceJson }>;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
}
export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, State>{
  __unmount = false;
  externalDsStyle = {width: '100%', height: '100%', maxWidth: '5000px', margin: 0};
  rootDom: HTMLElement;
  rootPosition: {x: number, y: number};

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      dataSources: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.dataSources,
      widgets: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.widgets
    }
  };

  constructor(props){
    super(props);
    this.state = {
      isDataSourceInited: false,
      isExternalDsShown: false,
      isErrorToastShown: false,
      mappingDs: null,
      item: null,
      dsHistory: [],
      moreOptionsDsId: null
    };
  }

  componentDidMount(){
    this.__unmount = false;
    this.rootPosition = getElementPosition(this.rootDom);
    if(!this.state.isDataSourceInited){
      this.initDss();
    }
  }
  componentDidUpdate(prevProps: AllWidgetProps<{}> & ExtraProps){
    if(this.props.dataSources !== prevProps.dataSources){
      if(!this.__unmount){
        this.setState({isDataSourceInited: false});
      }
    }
    if(!this.state.isDataSourceInited){
      this.initDss();
    }
  }
  componentWillUnmount(){
    this.__unmount = true;
  }

  initDss = () => {
    AppDataSourceManager.getInstance().createAllDataSources().then(dss => {
      if(!this.__unmount){
        this.setState({isDataSourceInited: true});
      }
    }, e => {
      if(!this.__unmount){
        this.setState({
          isDataSourceInited: true,
          isErrorToastShown: true
        }, () => {
          setTimeout(() => {
            this.setState({
              isErrorToastShown: false
            })
          }, 3000);
        });
        console.error(e);
      }
    });
  }

  addToDsHistory = (ds: DataSource) => {
    this.setState({
      dsHistory: this.state.dsHistory.concat(ds)
    });
  }

  removeFromDsHistory = () => {
    let newDsHistory = [];
    if(this.state.dsHistory.length > 0){
      newDsHistory = this.state.dsHistory.slice(0, this.state.dsHistory.length - 1);
    }

    this.setState({
      dsHistory: newDsHistory
    });
  }

  getItemId = (ds: DataSource): string => {
    switch (ds.type){
      case ArcGISDataSourceTypes.WebScene:
      case ArcGISDataSourceTypes.WebMap:
        return ds.dataSourceJson.itemId;
      case ArcGISDataSourceTypes.FeatureLayer:
        return getDsSchema(ds).childId;
      default:
        return null;
    }
  }

  getSearch = (ds: DataSource): ISearchOptions => {
    return {
      q: `id: ${this.getItemId(ds)}`,
      authentication: SessionManager.getInstance().getSession()
    };
  }

  getNewDsById = (dsId: string): DataSource => {
    if(!dsId){
      return null;
    }
    return AppDataSourceManager.getInstance().getDataSource(dsId);
  }

  getListUsedDs = (ds: DataSource): DataSource => {
    if(!ds){
      return null;
    }
    // update data source of ds-list and field-list after data sources are inited
    return this.state.isDataSourceInited ? this.getNewDsById(ds.id) : ds;
  }

  onBackClicked = () => {
    this.removeFromDsHistory();
  }

  onSelectDataFinished = (dsJsons: IMDataSourceJson[]) => {
    if(!dsJsons){
      this.setState({isExternalDsShown: false});
      return;
    }
    getAppConfigAction().addDataSources(dsJsons).exec();

    this.setState({isExternalDsShown: false, isDataSourceInited: false});
  }

  onSelectDataCanceled = () => {
    this.setState({isExternalDsShown: false});
  }

  onMappingClicked = (ds: DataSource) => {
    this.setState({mappingDs: ds});
  }

  onShowDetailClicked = (ds: DataSource) => {
    this.setState({isDataSourceInited: false});
    const search = this.getSearch(ds);
    search && esri.restPortal.searchItems(search).then(items => {
      if(!this.__unmount){
        this.setState({
          item: items.results[0],
          isDataSourceInited: true
        });
      }
    }, e => {
      if(!this.__unmount){
        console.error(e);
        this.setState({isDataSourceInited: true});
      }
    });
  }

  onCloseDetailClicked = () => {
    this.setState({
      item: null
    });
  }

  onToggleMoreOptions = (dsId: string) => {
    this.setState({
      moreOptionsDsId: this.state.moreOptionsDsId === dsId ? null : dsId
    });
  }

  onToggleExternalDs = () => {
    this.setState({isExternalDsShown: !this.state.isExternalDsShown});
  }

  resetSelectedMoreOptions = e => {
    if(e.currentTarget.className && e.currentTarget.className.indexOf && e.currentTarget.className.indexOf('widget-ds-setting') > -1){
      this.setState({
        moreOptionsDsId: null
      });
    }
  }

  hideMapping = () => {
    this.setState({mappingDs: null});
  }

  showExternalDs = () => {
    this.setState({isExternalDsShown: true});
  }

  ExternalDs = <ExternalDataSourceChooser portalUrl={this.props.portalUrl} onCancel={this.onSelectDataCanceled}
    onFinish={this.onSelectDataFinished} />

  AddDataSourceBtn = <div className="d-flex m-3">
    <Button color="primary" className="text-truncate flex-grow-1 text-center add-data" onClick={this.showExternalDs}>
      <Icon icon={IconAdd} size={12} />
      {this.props.intl.formatMessage({id: 'addData', defaultMessage: defaultMessages.addData})}
    </Button>
  </div>

  render(){
    return (
      <div css={getStyle(this.props.theme)} className="w-100 h-100">
        <div className="jimu-widget widget-ds-setting setting-pane" ref={d => this.rootDom = d} onClick={this.resetSelectedMoreOptions}>

          {
            this.state.mappingDs ?
            <Mapping portalUrl={this.props.portalUrl} ds={this.state.mappingDs} widgets={this.props.widgets}
              dispatch={this.props.dispatch} hideMapping={this.hideMapping} intl={this.props.intl}/> :

            <div>

              {
                this.state.dsHistory.length > 0 ?
                  <div className="border-color-gray-300 jimu-widget-setting--header">
                    <div className="text-dark ds-back" onClick={this.onBackClicked}>
                      <Icon icon={IconArrowLeft} />
                      <span className="align-middle ml-2">
                        {this.props.intl.formatMessage({id: 'back', defaultMessage: defaultMessages.back})}
                      </span>
                    </div>
                  </div> :
                <div className="w-100">
                  {/* <div className="border-color-gray-300 jimu-widget-setting--header">
                    <h3 className="mb-0">{this.props.intl.formatMessage({id: 'dataSource', defaultMessage: defaultMessages.dataSource})}</h3>
                  </div> */}
                  {
                    this.AddDataSourceBtn
                  }
                </div>
              }

              {
                this.props.dataSources && this.state.dsHistory.length === 0 ?
                getSortedArrayByLabel(
                  Object.keys(this.props.dataSources)
                    .filter(dsId => !this.props.dataSources[dsId].isOutputFromWidget && !this.props.dataSources[dsId].parentDataSource && this.props.dataSources[dsId].label)
                    .map(dsId => this.props.dataSources[dsId])
                ).map((dsJson, i) => {
                  if(dsJson && dsJson.id){
                    const ds = AppDataSourceManager.getInstance().getDataSource(dsJson.id);
                    if(ds && ds.id){
                      return <DsListItem ds={ds} key={i} onDsClicked={this.addToDsHistory} intl={this.props.intl} widgets={this.props.widgets}
                      onMappingClicked={this.onMappingClicked} isMoreOptionsShown={this.state.moreOptionsDsId === ds.id}
                      onToggleMoreOptions={this.onToggleMoreOptions} isDataSourceInited={this.state.isDataSourceInited} portalUrl={this.props.portalUrl} />
                    }else{
                      return <DsListErrorItem dsJson={dsJson} key={i} intl={this.props.intl} widgets={this.props.widgets} isMoreOptionsShown={this.state.moreOptionsDsId === dsJson.id}
                      isDataSourceInited={this.state.isDataSourceInited} onToggleMoreOptions={this.onToggleMoreOptions} dataSources={this.props.dataSources}/>
                    }
                  }
                  return null
                }) : null
              }

              {
                this.props.dataSources && this.state.dsHistory.length > 0 && !this.state.dsHistory[this.state.dsHistory.length - 1].isDataSourceSet ?
                <FieldList onShowDetailClicked={this.onShowDetailClicked} isDataSourceInited={this.state.isDataSourceInited}
                  ds={this.getListUsedDs(this.state.dsHistory[this.state.dsHistory.length - 1])} widgets={this.props.widgets}
                  onMappingClicked={this.onMappingClicked} intl={this.props.intl} portalUrl={this.props.portalUrl}
                /> : null
              }

              {
                this.props.dataSources && this.state.dsHistory.length > 0 && this.state.dsHistory[this.state.dsHistory.length - 1].isDataSourceSet ?
                <DsList onDsItemClicked={this.addToDsHistory} portalUrl={this.props.portalUrl} dispatch={this.props.dispatch}
                  ds={this.getListUsedDs(this.state.dsHistory[this.state.dsHistory.length - 1])}
                  onMappingClicked={this.onMappingClicked} isDataSourceInited={this.state.isDataSourceInited}
                  onShowDetailClicked={this.onShowDetailClicked} intl={this.props.intl} widgets={this.props.widgets}
                /> : null
              }
            </div>
          }

          {
            !this.state.isDataSourceInited ?
            <div className="jimu-small-loading"></div> : null
          }

        </div>

        {
          this.state.item && this.rootDom ?
          <ItemDetail item={this.state.item} portalUrl={this.props.portalUrl} onClose={this.onCloseDetailClicked}
          style={{
            position: 'fixed',
            top: '99px',
            bottom: 0,
            width: '300px',
            left: `${this.rootPosition.x + this.rootDom.offsetWidth}px`
          }}/> : null
        }

        {
          this.state.isExternalDsShown ?
          <Modal isOpen={this.state.isExternalDsShown} style={this.externalDsStyle} toggle={this.onToggleExternalDs} contentClassName="border-0 h-100"
            className="widget-ds-setting-add-data-popup">
            {
              this.ExternalDs
            }
          </Modal> : null
        }

        {
          this.state.isErrorToastShown ?
          <Toast type={ToastType.Error} text={this.props.intl.formatMessage({id: 'creatingDataSourceFailed', defaultMessage: defaultMessages.creatingDataSourceFailed})} /> : null
        }
      </div>
    );
  }
}
