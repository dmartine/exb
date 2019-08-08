/** @jsx jsx */
import {  IMState, classNames,
  FeatureQueryDataSource, css, jsx, polished, BaseWidget, AllWidgetProps,
  ThemeVariables, SerializedStyles, RepeatedDataSource, DataSourceComponent,
   DataSource, DataRecord, DataSourceTypes, DataSourceStatus, LayoutInfo, IMAppConfig, AppMode, utils, 
   BrowserSizeMode, appActions, DataQueryComponent, MessageManager, SpatialDataRecordsSelectionChangeMessage, DataRecordsSelectionChangeMessage} from 'jimu-core';
import {  WidgetPlaceholder, Button, Icon, Input } from 'jimu-ui';
import {  FeatureLayerDataSource, FeatureLayerViewDataSource } from 'jimu-arcgis/arcgis-data-source';
import {ArcGISDataSourceTypes} from 'jimu-arcgis/arcgis-data-source-type';
import { IMConfig, DirectionType, SelectionModeType, Status, LIST_CARD_PADDING, PageTransitonType, PageStyle, CardSize } from '../config';
import ListCard from './components/list-card';
import { LayoutViewer } from 'jimu-layouts/layout-runtime';
import defaultMessages from './translations/default';
const defaultConfig = require('../../config.json');
import Grid from 'react-virtualized/dist/commonjs/Grid'

const CSSClasses = {
  list: 'widget-list'
};


interface Props{
  selection: LayoutInfo,
  appConfig: IMAppConfig,
  appMode: AppMode,
  draggingWidget: any,
  browserSizeMode: BrowserSizeMode,
  builderStatus: Status,
  currentPageId: string,
}

interface States {
  LayoutBuilderClass: any;
  queryStart: number;
  datasource: FeatureLayerDataSource | FeatureQueryDataSource | FeatureLayerViewDataSource;
  sortOrder: 'desc' | 'asc';
  sortField: string;
  currentCardSize: CardSize;
  forceShowMask: boolean;
  showList: boolean;
  widgetRect: DOMRect | ClientRect;
}

interface QueryOptions {
  geometry?: any,
  sortField?: string,
  sortOrder?: string, 
  orderByFields?: string | string[],
  start?: number, 
  num?: number
}

const DefaultSortOrder = 'desc';
const DSTOOLH = 44;
function createQuery(props: AllWidgetProps<IMConfig>, ds: DataSource, options?: QueryOptions): any{
  if(options){
    if(options.sortField && ds){
      if(ds.type === ArcGISDataSourceTypes.FeatureLayer){
        options.orderByFields = `${options.sortField} ${options.sortOrder || DefaultSortOrder}`
      }else {
        options.orderByFields = [`${options.sortField} ${options.sortOrder || DefaultSortOrder}`]
      }
      delete options.sortField;
      delete options.sortOrder;
    }
  }
  
  
  let q = {
    where: '1=1',
    outFields: ['*'],
    returnGeometry: true,
    ...(options || {})
  } as any;
  
  return q;
}

function loadRecords(props: AllWidgetProps<IMConfig>, ds: DataSource, queryOptions: QueryOptions): Promise<DataRecord[]>{
  if(!ds)return Promise.resolve([]);

  let q = createQuery(props, ds);

  if(ds.type === ArcGISDataSourceTypes.FeatureLayer){
    return (ds as FeatureLayerDataSource).load(q);
  }else if(ds.type === DataSourceTypes.FeatureQuery){
    return (ds as FeatureQueryDataSource).load(q);
  }
}

function isDsConfigured(props: AllWidgetProps<IMConfig>): boolean{
  return props.useDataSourcesEnabled && props.useDataSources && !!props.useDataSources[0];
}

let lastWidgetSize = {
  height: 0,
  width: 0
}

export class Widget extends BaseWidget<AllWidgetProps<IMConfig> & Props, States>{
  lastSelectedIndex: number;
  canvas: HTMLCanvasElement;
  editCard: HTMLDivElement;
  gridRef: any;
  // editCard: HTMLDivElement;
  isMySelected: boolean;
  lastSelectedRecordIds: string[];
  belongToPageId: string;


  // dataSource: FeatureLayerDataSource | FeatureQueryDataSource | FeatureLayerViewDataSource;

  static mapExtraStateProps = (state: IMState, props: AllWidgetProps<IMConfig>): Props => {
    return {
      selection: state && state.appRuntimeInfo && state.appRuntimeInfo.selection,
      appConfig: state && state.appConfig,
      appMode: state && state.appRuntimeInfo && state.appRuntimeInfo.appMode,
      draggingWidget: state && state.appRuntimeInfo && state.appRuntimeInfo.draggingWidget,
      browserSizeMode: state && state.browserSizeMode,
      builderStatus: state && state.widgetsState && state.widgetsState[props.id] && state.widgetsState[props.id]['builderStatus'] || Status.Regular,
      currentPageId: state && state.appRuntimeInfo && state.appRuntimeInfo.currentPageId
    };
  };

  static preloadData = (state: IMState, allProps: AllWidgetProps<IMConfig> & Props, dataSources: {[dsId: string]: DataSource}): Promise<any> => {
    if(!isDsConfigured(allProps)){
      return Promise.resolve([]);
    }
    const {config} = allProps;
    let num = config.itemsPerPage;
    if(config.maxItems > 0){
      if(config.maxItems < num){
        num = config.maxItems;
      }
    }

    const queryOptions: QueryOptions = {sortOrder: DefaultSortOrder}
    if(config.sortOpen){
      if(config.sortFields){
        const sortFields = config.sortFields.split(',');
        if(sortFields && sortFields.length > 0){
          queryOptions.sortField = sortFields[0];
        }
      }
    }
    return loadRecords(allProps, dataSources[allProps.useDataSources[0].dataSourceId], queryOptions).then(records => {
      return []
    });
  };

  constructor(props) {
    super(props);
    const {config} = props;

    this.belongToPageId = props.currentPageId;
    let sortField = undefined;
    if(config.sortFields){
      const sortFields = config.sortFields.split(',');
      if(sortFields && sortFields.length > 0){
        sortField = sortFields[0];
      }
    }
    let stateObj: States = {
      LayoutBuilderClass: null,
      queryStart: 0, 
      datasource: undefined, 
      sortOrder: DefaultSortOrder,
      sortField: sortField,
      currentCardSize: this.getCardSize(props),
      forceShowMask: false,
      showList: true,
      widgetRect: undefined
    };
    this.selectSelf = this.selectSelf.bind(this);
    this.handleResizeCard = this.handleResizeCard.bind(this);
    if (window.jimuConfig.isInBuilder) {
      stateObj.LayoutBuilderClass = this.props.builderSupportModules.LayoutClass;
      const {config} = props;
      if(!config.isInitialed){
        const newConfig = config.merge(defaultConfig);
        this.editWidgetConfig(newConfig);
      }
    }else {
      stateObj.LayoutBuilderClass = LayoutViewer;
    }
    this.state = stateObj;
    // this.editWidgetConfig('builderStatus', Status.Regular);
  }

  componentWillReceiveProps(newProps){
    let {config, appMode, id, selection, builderSupportModules, appConfig, layouts, browserSizeMode, builderStatus, currentPageId} = this.props;
    
    if(currentPageId !== newProps.currentPageId && (currentPageId === this.belongToPageId || newProps.currentPageId === this.belongToPageId)){
      this.setState({
        showList: false
      }, () => {
        this.setState({
          showList: true
        })
      })
    }
    if(window.jimuConfig.isInBuilder){
      if(config.cardConfigs[Status.Selected].selectionMode !== newProps.config.cardConfigs[Status.Selected].selectionMode){
        this.selectRecords([])
      }
      if(newProps.appMode !== AppMode.Run){
        const {selectionInList, selectionIsSelf} = builderSupportModules.widgetModules;
        if(selection !== newProps.selection){
          //change status by toc
          if(selectionInList(newProps.selection, id, appConfig, true)){
            const status = Object.keys(layouts).find(status => utils.findLayoutId(layouts[status], browserSizeMode, appConfig.mainSizeMode) === newProps.selection.layoutId);
            if(status !== builderStatus){
              this.editBuilderAndSettingStatus(status as any);
            }
          }else if(!selectionIsSelf(newProps.selection, id, appConfig)){
            this.editStatus('showCardSetting', Status.None);
          }
        }

        const newCardSize = this.getCardSize(newProps);
        const oldCardSize = this.getCardSize(this.props);
        if(oldCardSize.width !== newCardSize.width || oldCardSize.height !== newCardSize.height){
          this.setState({
            currentCardSize: newCardSize
          }, () => {
            if(this.gridRef){
              this.gridRef.recomputeGridSize();
            }
          })
        }
      }
      
      if(newProps.appMode != appMode){
        if(newProps.appMode === AppMode.Run){
          this.editBuilderAndSettingStatus(Status.Regular);
        }else {
          if(this.gridRef){
            this.scrollToIndex(0)
          }
        }
      }
    }
  }

  componentDidUpdate(preProps){
    const { config, appMode, appConfig, layouts, builderStatus, browserSizeMode, builderSupportModules, currentPageId } = this.props;
    
    if(appConfig.forBuilderAttributes && preProps.appConfig.forBuilderAttributes &&
        appConfig.forBuilderAttributes.viewPortSize !== preProps.appConfig.forBuilderAttributes.viewPortSize && currentPageId === this.belongToPageId){
      setTimeout(() => {
        this.setState({
          showList: false
        }, () => {
          this.setState({
            showList: true
          })
        })
      }, 100);
    }
    if (this.gridRef) {
      if (!window.jimuConfig.isInBuilder || appMode === AppMode.Run) {
        if (this.state.datasource && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) {
          const { datasource } = this.state;
          const selectedRecordIds = datasource.getSelectedRecordIds();
          if (this.isMySelected) {
            this.isMySelected = false;
            this.lastSelectedRecordIds = selectedRecordIds || [];
            return;
          }
          if (selectedRecordIds && selectedRecordIds.length > 0) {
            let isSame = true;
            selectedRecordIds.some(recordId => {
              let hasDiff = false;
              if (this.lastSelectedRecordIds && this.lastSelectedRecordIds.length > 0) {
                this.lastSelectedRecordIds.some(lastRecordId => {
                  if (lastRecordId !== recordId) {
                    hasDiff = true;
                    return true;
                  }
                })
              } else {
                hasDiff = true;
              }
              if (hasDiff) {
                isSame = false;
                return true;
              }
            })
            if (!isSame) {
              const indexes = this.state.datasource.getSelectedRecordIndexes();
              if (indexes && indexes.length > 0) {
                const index0 = indexes[0];
                if (config.maxItems === 0 || index0 < config.maxItems) {
                  this.scrollToIndex(indexes[0])
                }
              }
            }
          }
          this.lastSelectedRecordIds = selectedRecordIds || [];
        }
      }else {
        const newLayout = appConfig.layouts[utils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)];
        const newLayoutType = newLayout && newLayout.type;

        const oldLayout = preProps.appConfig.layouts[utils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)];
        const oldLayoutType = oldLayout && oldLayout.type;

        if(oldLayoutType !== newLayoutType){
          const appConfigAction = builderSupportModules.appInBuilderLib.getAppConfigAction();
          Object.keys(layouts).forEach(name => {
            layouts[name] && Object.keys(layouts[name]).forEach(device => {
              appConfigAction.editLayoutType({layoutId: layouts[name][device]}, newLayoutType);
            })
          })
          appConfigAction.exec();
        }
      }
    }
    // this.initCanvas();
  }

  private selectRecords = (records: DataRecord[]) => {
    const {datasource} = this.state;
    if(datasource){
      if(datasource.getGeometryType()){
        MessageManager.getInstance().publishMessage(new SpatialDataRecordsSelectionChangeMessage(this.props.id, records));
      }else {
        MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, records));
      }
      
      if(records){
        this.isMySelected = true;
        datasource.selectRecordsByIds(
          records.map(record => record.getId())
        )
      }
    }
      
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  // call exec manuly
  editStatus = (name, value) => {
    const {dispatch, id} = this.props;
    dispatch(appActions.widgetStatePropChange(id, name, value));
  }

  editWidgetConfig = (newConfig) => {
    if(!window.jimuConfig.isInBuilder)return;


    const appConfigAction = this.props.builderSupportModules.appInBuilderLib.getAppConfigAction();
    appConfigAction.editWidgetConfig(this.props.id, newConfig).exec();
  }

  scrollToIndex = (index: number) => {
    if (this.gridRef) {
      const { config } = this.props;
      this.gridRef.scrollToCell(config.direction === DirectionType.Horizon ? { columnIndex: index, rowIndex: 0 } : { columnIndex: 0, rowIndex: index })
    }

  }

  private getCardSize = (props?: AllWidgetProps<IMConfig> & Props): CardSize => {
    props = props || this.props;
    const {config, builderStatus, browserSizeMode} = props;
    let cardConfigs = config.cardConfigs[builderStatus];
    if(!cardConfigs || !cardConfigs.cardSize){
      cardConfigs = config.cardConfigs[Status.Regular];
    }
    let cardSize = cardConfigs.cardSize[browserSizeMode];
    if(!cardSize){
      cardSize = cardConfigs.cardSize[Object.keys(cardConfigs.cardSize)[0]]
    }
    return cardSize;
  }

  // private moveFeatureCenter = (objectId: number) => {
  //   if(!this.dataSource)return;
  //   if(this.dataSource.type === ArcGISDataSourceTypes.FeatureLayerView ){
  //     (this.dataSource as FeatureLayerViewDataSource).moveFeatureToCenter(objectId + '');
  //   }else if(this.dataSource.type === ArcGISDataSourceTypes.FeatureLayer){
  //     let view = (this.dataSource as FeatureLayerDataSource).getLayerViewDataSource()
  //     if(view){
  //       (view as FeatureLayerViewDataSource).moveFeatureToCenter(objectId + '');
  //     }
  //   }

  // }

  isEditing = (): boolean => {
    const {builderSupportModules, selection, id, appConfig, appMode, config} = this.props;
    if(!window.jimuConfig.isInBuilder) return false;
    const {selectionIsSelf, selectionInList} = builderSupportModules.widgetModules;
    return (selectionIsSelf(selection, id, appConfig) || selectionInList(selection, id, appConfig))
          && window.jimuConfig.isInBuilder && appMode !== AppMode.Run && config.isItemStyleConfirm
  }

  private handleItemChange = (listItem: ListCard) => {
    const {config} = this.props;
    if(!this.state.datasource)return;
    const {providerData} = listItem.props;

    let itemRecord = undefined;
    if(Array.isArray(providerData)){
      itemRecord = providerData[0].record;
    }else{
      itemRecord = (providerData as RepeatedDataSource).record;
    }


    const {datasource} = this.state;
    let selectedRecordIds = this.state.datasource.getSelectedRecordIds();
    if(config.cardConfigs[Status.Selected].selectionMode && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None){
      const id = itemRecord.getId();
      if(config.cardConfigs[Status.Selected].selectionMode === SelectionModeType.Single){
        let index = selectedRecordIds.indexOf(id);
        if(index > -1) {
          this.selectRecords([])
        }else {
          this.selectRecords([itemRecord])
        }
      }else{
        let index = selectedRecordIds.indexOf(id);
        if(index > -1){
          this.selectRecords(datasource.getSelectedRecords().filter(record => record.getId() !== id))
        }else{
          this.selectRecords(datasource.getSelectedRecords().concat(datasource.getRecordById(id)));
        }
      }
    }
  }

  mouseClickTimeout: NodeJS.Timer;
  handleListClick = (evt) => {
    evt.stopPropagation();
    // this.editStatus('showCardSetting', Status.None);
  }

  handleListPointerDown = (evt) => {
    this.setState({
      forceShowMask: true
    })
    this.mouseClickTimeout = setTimeout(() => {
      this.setState({
        forceShowMask: false
      })
    }, 200);
  }

  handleScrollHandle = (event) => {
    const {appMode, config} = this.props;
    const {datasource} = this.state;
    if(event && window.jimuConfig.isInBuilder && appMode !== AppMode.Run){
      event.preventDefault();
    }
    if(event && config.pageStyle === PageStyle.Scroll && datasource && (!window.jimuConfig.isInBuilder || appMode === AppMode.Run)){
      const clientHOrW = config.direction === DirectionType.Vertical ? event.target.clientHeight : event.target.clientWidth;
      const scrollHOrW = config.direction === DirectionType.Vertical ? event.target.scrollHeight : event.target.scrollWidth;
      const scrollTOrL = config.direction === DirectionType.Vertical ? event.target.scrollTop : event.target.scrollLeft;
      const isBottom = (clientHOrW + scrollTOrL === scrollHOrW)
      if(datasource.getStatus() !== DataSourceStatus.Loading && isBottom){
        this.setState({
          queryStart : datasource.getRecords().length
        })
      }
    }
    
  }

  handleToolsMouseDown = evt => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  handleResizeCard(newCardSize, resizeEnd: boolean = false, isTop: boolean = false, isLeft: boolean, isEnd: boolean = false){

    if(resizeEnd){
      window.jimuConfig.isInBuilder && this.props.builderSupportModules.widgetModules.handleResizeCard(this.props, newCardSize, isTop, isLeft, isEnd);
    }else {
      this.setState({
        currentCardSize: newCardSize
      }, () => {
        if(this.gridRef){
          this.gridRef.recomputeGridSize();
        }
      })
    }
  }

  // sortTimeout: any = undefined;
  handleSortClick = evt => {
    const {sortOrder} = this.state;
    this.setState({
      sortOrder: sortOrder === 'desc' ? 'asc' : 'desc'
    })
    // if(this.sortTimeout){
    //   clearTimeout(this.sortTimeout);
    //   this.sortTimeout = undefined;
    // }
    // this.sortTimeout = setTimeout(() => {
      
    // }, 300);
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  getQueryOptions = (): QueryOptions => {
    const options: QueryOptions = {}
    const {config, stateProps} = this.props
    const {queryStart, sortField, sortOrder} = this.state
    if(stateProps && stateProps.queryExtent){
      options.geometry = stateProps.queryExtent
    }

    let num = config.itemsPerPage;
    if(config.maxItems > 0){
      if(config.maxItems < num + queryStart){
        num = num + queryStart - config.maxItems;
      }
    }
    // options.start = PageStyle.Scroll ? 0 : queryStart;
    // options.num = PageStyle.Scroll ? num + queryStart : num;
    if(config.sortOpen && config.sortFields){
      const sortFields = config.sortFields.split(',');
      options.sortField = sortFields.indexOf(sortField) > -1 && sortField;
      options.sortOrder = sortOrder || DefaultSortOrder;
    }
    return Object.keys(options).length > 0 ? options : undefined
  }

  selectCard = () => {
    const {id, appConfig, selection, builderSupportModules} = this.props;
    const {selectionInList} = builderSupportModules.widgetModules;
    if(selectionInList(selection, id, appConfig)){
      this.selectSelf();
    }
    // let {builderStatus} = this.props;

    // this.editStatus('showCardSetting', builderStatus === Status.Regular ? Status.None : builderStatus);
  }

  selectSelf(){
    window.jimuConfig.isInBuilder && this.props.builderSupportModules.widgetModules.selectSelf(this.props);
  }

  editBuilderAndSettingStatus = (status: Status) => {
    this.editStatus('showCardSetting', status === Status.Regular ? Status.None : status);
    this.editStatus('builderStatus', status);
  }

  onDs = (ds) => {
    this.setState({
      datasource: ds
    })
  }

  showSort = (): boolean => {
    const {config} = this.props;
    return config.sortOpen && config.sortFields && config.sortFields !== '';
  }

  initCanvas = () => {
    const {widgetRect} = this.state;
    const {editCard} = this;
    if(!this.canvas || !editCard || !widgetRect) return;
    
    const canvasRect = this.canvas.getBoundingClientRect();
    const cardRect = editCard.getBoundingClientRect();
    const clearX = cardRect.left - widgetRect.left;
    const clearY = cardRect.top - widgetRect.top;

    var context = this.canvas.getContext('2d');

    context.fillStyle = 'rgba(0,0,0,0.2)'

    context.clearRect(0, 0, canvasRect.width, canvasRect.height);

    context.fillRect(0, 0, canvasRect.width, canvasRect.height);

    context.clearRect(clearX, clearY, cardRect.width, cardRect.height);
  }

  renderOrderFields = () => {
    const {config} = this.props;
    const {datasource} = this.state;
    let options = [];
    const scheme = datasource && datasource.getSchema();
    if(scheme && config.sortFields){
      const fields = config.sortFields.split(',');
      let hasError = false;
      if(fields && fields.length > 0){
        options = fields.map(field => {
          if(scheme.fields[field])
            return <option key={field} value={field}>{scheme.fields[field].alias || scheme.fields[field].name}</option>
          else {
            hasError = true;
          }
        })
        if(hasError){
          options = [];
        }
      }
    }
    return [<option key={'_empty'} value="null">{this.formatMessage('pleaseSelect')}</option>].concat(options);
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    const {config, id, appMode} = this.props;
    
    return css`
      ${'&.list-widget-' + id} {
        overflow: visible;
        background-color: transparent;

        .list-with-mask {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-color: ${polished.rgba(theme.colors.black, 0)};
          z-index: 1;
        }

        .editing-mask {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .widget-list {
          overflow: ${(window.jimuConfig.isInBuilder && appMode !== AppMode.Run) ? 'hidden' : 'auto'};
          height: 100%;
          width: 100%;
          align-items: ${config.alignType};
          justify-content: ${config.alignType};
          ${
            config.direction === DirectionType.Horizon ?
            `
            overflow-y: hidden;
            ` :
            `
            overflow-x: hidden;
            `
          }
        }
      }
      
    `
  }

  renderDsList = (ds: DataSource) => {
    return this.renderList(ds, undefined, ds.getRecords());
  }
  // ds: DataSource, info: IMDataSourceInfo, fields?: string[]
  renderList = (ds: DataSource, queryStatus?: DataSourceStatus, records?: DataRecord[]) => {
    const {LayoutBuilderClass, sortField, sortOrder, widgetRect, currentCardSize} = this.state;
    const {config, theme, selection, appConfig, id, appMode, builderSupportModules, layouts, 
      builderStatus, browserSizeMode, draggingWidget, dispatch} = this.props;

    let showLoading = false;
    if((window.jimuConfig.isInBuilder && !LayoutBuilderClass) || (ds && 
      (ds.getStatus() === DataSourceStatus.Loading || ds.getStatus() === DataSourceStatus.Unloaded))){
      showLoading = true;
    }

    let selectedRecordIds = (!ds || !config.isItemStyleConfirm ?  [] : ds.getSelectedRecordIds()).map(v => v + '');
    if(!ds || !config.isItemStyleConfirm){
      records = [
        {} as any, {} as any, {} as any
      ]
    }else {
      if(!this.lastSelectedRecordIds){
        this.lastSelectedRecordIds = selectedRecordIds || [];
      }
      if(records && Array.isArray(records)){
        if (config.maxItems && config.maxItems > 0) {
          records = records.slice(0, config.maxItems);
        }
      }
    }
    if(!showLoading && (!records || records.length < 1 || (ds && (ds.getStatus() === DataSourceStatus.Error
     || ds.getStatus() === DataSourceStatus.Closed)))){
      return <div style={{color: '#000'}}>{this.formatMessage('listNoData')}</div>
    }
    
    let selectionInList, selectionIsSelf;
    if(window.jimuConfig.isInBuilder){
      selectionInList = builderSupportModules.widgetModules.selectionInList;
      selectionIsSelf = builderSupportModules.widgetModules.selectionIsSelf;
    }
    const selectionIsSelfB = selectionIsSelf && selectionIsSelf(selection, id, appConfig);
    const selectionIsInListB = selectionInList && selectionInList(selection, id, appConfig)

    const listStyle = (): SerializedStyles => {
      const {currentCardSize} = this.state;
      return css`
        &.list-container {
          position: relative;
          z-index: 0;
          overflow: visible;
          ${
            config.direction === DirectionType.Horizon ?
            `
            margin-left: ${LIST_CARD_PADDING + 'px'};
            height: 100%;
            width: calc(100% - ${LIST_CARD_PADDING + 'px'});
            ` :
            `
            margin-top: ${LIST_CARD_PADDING + 'px'};
            width: 100%;
            height: calc(100% - ${LIST_CARD_PADDING + 'px'});
            `
          }

          .editing-mask-list {
            position: absolute;
            top: ${config.direction === DirectionType.Vertical ? currentCardSize.height + (this.showSort() ? DSTOOLH : 0) : (this.showSort() ? DSTOOLH : 0)}px;
            left: ${config.direction === DirectionType.Horizon ? currentCardSize.width : 0}px;
            bottom: 0;
            right: 0;
            z-index: 10;
            background-color: ${polished.rgba(theme.colors.black, 0.2)};
          }

          .loading-mask-list {
            position: absolute;
            top: ${config.direction === DirectionType.Vertical ? (this.showSort() ? DSTOOLH : 0) : (this.showSort() ? DSTOOLH : 0)}px;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 10;
            padding-top: 20%;
            background-color: ${theme.colors.white};
          }
  
          .editing-mask-ds-tool {
            position: absolute;
            z-index: 10;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            pointer-events: none;
            background-color: ${polished.rgba(theme.colors.black, 0.2)};
          }

          .datasource-tools {
            width: 100%;
            position: relative;
            padding-left: 10px;
            height: ${DSTOOLH}px;
            .sort-fields-input {
              width: 200px;
              margin-left: 8px;
              margin-right: 16px;
            }
            svg {
              color: ${theme.colors.grays.gray600};
            }
          }
          
          .widget-list-list:focus {
            outline: none;
          }
          .widget-list-list {
            padding: 0;
            position: relative;
            ${(!window.jimuConfig.isInBuilder || appMode === AppMode.Run) ? 
              '' :
              'overflow: hidden !important;'
            }
            ${
              config.direction === DirectionType.Horizon ?
              `
                height: ${this.showSort() ? `calc(100% - ${DSTOOLH}px)` : '100%'} !important;
                width: 100% !important;
              ` :
              `
                height: ${this.showSort() ? `calc(100% - ${DSTOOLH}px)` : '100%'} !important;
                width: 100% !important;
              `
            }
            .ReactVirtualized__Grid__innerScrollContainer {
              ${
                config.direction === DirectionType.Horizon ?
                `
                  height: 100% !important;
                  max-height: 100% !important;
                ` :
                `
                  width: 100% !important;
                  max-width: 100% !important;
                `
              }
            }
            ${'.list-card-container-' + id}{
              padding: 0;
              ${
                config.direction === DirectionType.Horizon ?
                `
                  padding-right: ${config.space}px;
                  height: 100% !important;
                ` :
                `
                  padding-bottom: ${config.space}px;
                  width: 100% !important;
                `
              }
            }
            ${'.list-card-container-' + id}:last-of-type{
              ${
                config.direction === DirectionType.Horizon ?
                `
                  padding-right: 0;
                ` :
                `
                  padding-bottom: 0;
                `
              }
            }
          }
          &.animation {
            animation: ${config.pageTransition} 1s;
          }
          @keyframes ${PageTransitonType.Glide} {
            0% {
              ${
                config.direction === DirectionType.Horizon ?
                `
                  margin-left: -150px;
                ` :
                `
                  margin-top: -150px;
                `
              }
              
            }
            100% {
              ${
                config.direction === DirectionType.Horizon ?
                `
                  margin-left: ${LIST_CARD_PADDING + 'px'};
                ` :
                `
                  margin-top: ${LIST_CARD_PADDING + 'px'};
                `
              }
              
            }
          }
          @keyframes ${PageTransitonType.Fade} {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          @keyframes ${PageTransitonType.Float} {
            0% {
              opacity: 0;
              ${
                config.direction === DirectionType.Horizon ?
                `
                  margin-right: -150px;
                ` :
                `
                  margin-bottom: -150px;
                `
              }
            }
            100% {
              opacity: 1;
              ${
                config.direction === DirectionType.Horizon ?
                `
                  margin-right: 0px;
                ` :
                `
                  margin-bottom: 0px;
                `
              }
            }
          }
        }
      `
    }

    const isEditing = this.isEditing();
    const recordSizePerPage = widgetRect && currentCardSize && (config.direction === DirectionType.Horizon ? 
      (Math.ceil(widgetRect.width / currentCardSize.width) + 1) : (Math.ceil(widgetRect.height / currentCardSize.height) + 1)) || 1;
    const itemRender = ({
      columnIndex, // Horizontal (column) index of cell
      isScrolling, // The Grid is currently being scrolled
      isVisible,   // This cell is visible within the grid (eg it is not an overscanned cell)
      key,         // Unique key within array of cells
      parent,      // Reference to the parent Grid (instance)
      rowIndex,    // Vertical (row) index of cell
      style        // Style object to be applied to cell (to position it);
      // This must be passed through to the rendered cell element.
    }) => {
      const i = config.direction === DirectionType.Horizon ? columnIndex : rowIndex;
      const record = records[i];
      const isSelected = config.isItemStyleConfirm && ds && selectedRecordIds.indexOf(record.getData()[ds.getIdField()] + '') > -1;
      // const keyStr = i % recordSizePerPage
      return (
        <div style={style} className={`${'list-card-container-' + id}`} key={key}>
          <ListCard
            providerData={{
              widgetId: this.props.id,
              dataSourceId: config.isItemStyleConfirm ? (ds && ds.id) : undefined,
              recordIndex: i,
              record: config.isItemStyleConfirm ? record : undefined
            }}
            browserSizeMode={browserSizeMode}
            appConfig={appConfig}
            builderSupportModules={builderSupportModules}
            formatMessage={this.formatMessage}
            selection={selection}
            dispatch={dispatch}
            draggingWidget={draggingWidget}
            widgetId={id}
            interact={window.jimuConfig.isInBuilder && builderSupportModules.widgetModules.interact}
            selectCard={this.selectCard}
            handleResizeCard={this.handleResizeCard}
            appMode={appMode}
            selectionIsList={selectionIsSelfB}
            selectionIsInList={selectionIsInListB}
            onChange={this.handleItemChange}
            hoverLayoutOpen={config.cardConfigs[Status.Hover].enable}
            selectable={config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None}
            active={isSelected}
            direction={config.direction}
            theme={theme}
            isEditing={isEditing}
            builderStatus={builderStatus}
            LayoutBuilderClass={LayoutBuilderClass}
            layouts={layouts}
            cardConfigs={config.cardConfigs}
          />
        </div>

      )
    }
    let gridProperties = undefined;
    if (config.direction === DirectionType.Horizon) {
      gridProperties = {
        columnCount: records.length,
        overscanColumnCount: recordSizePerPage,
        rowCount: 1,
      };
    } else {
      gridProperties = {
        rowCount: records.length,
        overscanRowCount: recordSizePerPage,
        columnCount: 1
      }
    }
    return (
      <div className={`list-container animation`}
        css={listStyle()} >
        {this.showSort() &&
          <div className="datasource-tools d-flex align-items-center">
            {this.formatMessage('sort')}
            <Input disabled={this.isEditing() || appMode !== AppMode.Run || !ds || ds.getStatus() !== DataSourceStatus.Loaded } type="select" value={sortField} className="sort-fields-input"
                onChange={(e) => { this.setState({sortField: e.target.value})}} >
                {
                  this.renderOrderFields()
                }
            </Input>
            <Button disabled={this.isEditing() || appMode !== AppMode.Run || !ds || ds.getStatus() !== DataSourceStatus.Loaded} 
              size={'sm'} color="link" icon onMouseDown={this.handleToolsMouseDown}
              onClick={this.handleSortClick} >
              <Icon size={16} 
                icon={sortOrder === 'desc' ? require('jimu-ui/lib/icons/sort-down.svg') : require('jimu-ui/lib/icons/sort-up.svg')} />
            </Button>
            {window.jimuConfig.isInBuilder && this.isEditing() && 
              <div className="editing-mask-ds-tool" ></div>}
          </div>
        } 
        <Grid
          className="widget-list-list"
          ref={ref => this.gridRef = ref}
          cellRenderer={itemRender}
          rowHeight={({index}) => config.direction === DirectionType.Horizon ? 
            (widgetRect && (widgetRect.height) || 0) : (index === (records.length - 1) ? 
              currentCardSize.height : (currentCardSize.height + config.space) )}
          columnWidth={({index}) => config.direction === DirectionType.Horizon ? 
              (index === (records.length - 1) ? 
              currentCardSize.width : (currentCardSize.width + config.space)) : (widgetRect && (widgetRect.width) || 0)}
          width={widgetRect && (widgetRect.width) || lastWidgetSize.width}
          height={widgetRect && (widgetRect.height) || lastWidgetSize.height}
          {...gridProperties}
        />
        {window.jimuConfig.isInBuilder && this.isEditing() && 
              <div className="editing-mask-list" ></div>}
        {showLoading && <div className="loading-mask-list text-center">{this.formatMessage('listLoading')}...</div>}
      </div>
    )

  }

  render() {

    const {config, selection, appConfig, id, appMode, builderSupportModules, browserSizeMode,
      draggingWidget, useDataSources, builderStatus, layouts} = this.props;
    const {datasource, forceShowMask} = this.state;
    const isInBuilder = window.jimuConfig.isInBuilder;
    const classes = classNames(
      'jimu-widget',
      'list-widget-' + id
    );

    if(!config.itemStyle){
      return <WidgetPlaceholder widgetId={this.props.id} icon={require('./assets/icon.svg')} message="Please choose list template"/>;
    }
    
    let selectionInList, selectionIsSelf;
    if(isInBuilder){
      selectionInList = builderSupportModules.widgetModules.selectionInList;
      selectionIsSelf = builderSupportModules.widgetModules.selectionIsSelf;
    }
    
    const isInList = selectionInList && selectionInList(selection, id, appConfig);
    const isSelf = selectionIsSelf && selectionIsSelf(selection, id, appConfig);

    const queryOptions: QueryOptions = this.getQueryOptions();

    const currentLayout = appConfig.layouts[utils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)];
    const currentLayoutType = currentLayout && currentLayout.type;

    return <div className={classes} 
      ref={node => {
        if(!node)return;
        const {widgetRect} = this.state;
        const newRect = node.getBoundingClientRect();
        if(!widgetRect || (Math.abs(widgetRect.left - newRect.left) > 0.01) || 
        (Math.abs(widgetRect.right - newRect.right) > 0.01) || (Math.abs(widgetRect.top - newRect.top) > 0.01)
         || (Math.abs(widgetRect.bottom - newRect.bottom) > 0.01) )
          this.setState({widgetRect: newRect})
      }
      } css={this.getStyle(this.props.theme)} 
      onPointerDown={evt => isInBuilder && appMode !== AppMode.Run && !isSelf && !isInList && this.handleListPointerDown(evt)}
      onClick={evt => isInBuilder && appMode !== AppMode.Run && !isSelf && !isInList && this.handleListClick(evt)}  >
      
      <div className={`${CSSClasses.list} d-flex`}>
        {
          isDsConfigured(this.props) ?
          (
            queryOptions ? 
            <DataQueryComponent 
              query={createQuery(this.props, datasource, queryOptions)} 
              useDataSource={useDataSources && useDataSources[0]}
              onDataSourceCreated={this.onDs}
            >
              {this.renderList}
            </DataQueryComponent>
            :
            <DataSourceComponent 
              defaultQuery={createQuery(this.props, datasource)} 
              useDataSource={useDataSources && useDataSources[0]}
              onDataSourceCreated={this.onDs}
            >
              {this.renderDsList}
            </DataSourceComponent>
          ) :
          this.renderList(undefined)
        }
      </div>

      {/* {this.widget && window.jimuConfig.isInBuilder && this.isEditing() && 
        <canvas ref={node => this.canvas = node} className="editing-mask" width={this.widget.clientWidth} height={this.widget.clientHeight} ></canvas>} */}

      {/* {this.widget && window.jimuConfig.isInBuilder && this.isEditing() && 
        <div className="editing-mask" ></div>} */}
      
      {((isInBuilder && appMode !== AppMode.Run) && (forceShowMask || (!isInList && !isSelf && !draggingWidget) || (!config.isItemStyleConfirm && currentLayoutType))) && 
      <div
        className="list-with-mask"
      />}
    </div>
  }
}

export default Widget;

