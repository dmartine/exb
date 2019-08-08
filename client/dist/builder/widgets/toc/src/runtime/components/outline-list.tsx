/** @jsx jsx */
import {React, jsx, ThemeVariables, css,
  IMAppConfig, Immutable, InjectedIntl, ReactRedux,
  IMLayoutJson, ContainerType, getAppStore, SerializedStyles, polished, LayoutItemType, utils, appActions, BrowserSizeMode, IMState} from 'jimu-core';
import {getAppConfigAction, appConfigUtils, builderAppSync} from 'jimu-for-builder';
import defaultMessages from '../translations/default';
import { DndTocItemJson, DndTocContent } from './dnd-toc-content';
import { MyDropDown } from './my-dropdown';
import SearchBox from './search-box';
import { Tree, TreeUtils as filters, Icon, Button, Collapse } from 'jimu-ui';

export const TocItemIdSplite = '-toc-'

const hideTreeRoot = true;

interface Props {
  intl: InjectedIntl,
  theme: ThemeVariables,
  appConfig: IMAppConfig,
  editableOutlineItemId: string,
  browserSizeMode: BrowserSizeMode,
  currentPageId: string,
  onClickItem: (itemJson: OutlineItemJson) => void
}

interface StateProps{
  currentSelectedItemId: string;
}

interface States{
  editableItemId: string;
  currentSelectedItemId: string,
  filterText: string
  itemJson: OutlineItemJson;
  showSearch: boolean;
}

export interface OutlineItemJson extends DndTocItemJson {
  type?: OutlineType
}

export interface OutLineCommonJson {
  id: string,
  layoutId?: string,
  layoutItemId?: string,
  sectionId?: string //for view
}

export enum OutlineType {
  Widget = 'WIDGET',
  Section = 'SECTION',
  View = 'View',
  Layout = 'LAYOUT',
  Label = 'Label'
}

export class _OutlineList extends React.PureComponent<Props & StateProps, States>{

  searchInput: HTMLInputElement;
  lastPageId: string;
  expandIds: Array<string>;

  constructor(props){
    super(props);
    this.state = {
      editableItemId: props.editableItemId,
      currentSelectedItemId: props.currentSelectedItemId,
      filterText: '',
      itemJson: undefined,
      showSearch: false
    }
    this.expandIds = [];
  }

  componentWillMount(){
    this.setState({
      itemJson: this.getItemJsonByAppConfig()
    })
  }

  componentWillReceiveProps(nextProps){
    const props = this.props;
    let stateHasChange = false;
    let alterState = undefined;
    if(nextProps.currentSelectedItemId !== this.state.currentSelectedItemId ||
      (nextProps.appConfig !== props.appConfig || nextProps.currentPageId !== props.currentPageId || 
        nextProps.browserSizeMode !== props.browserSizeMode)){

      stateHasChange = true;
      if((nextProps.appConfig !== props.appConfig || nextProps.currentPageId !== props.currentPageId || 
        nextProps.browserSizeMode !== props.browserSizeMode)
        && nextProps.currentSelectedItemId !== this.state.currentSelectedItemId ){

        const itemJson = filters.activeAndExpandNodesByActiveIds(
          this.getItemJsonByAppConfig(nextProps), [nextProps.currentSelectedItemId]);
        
        alterState = {
          currentSelectedItemId: nextProps.currentSelectedItemId,
          itemJson: itemJson
        };
        this.expandIds = filters.fetchAllExpandIds(itemJson);
      }else if(nextProps.currentSelectedItemId !== this.state.currentSelectedItemId){
        const itemJson = filters.activeAndExpandNodesByActiveIds(this.state.itemJson, [nextProps.currentSelectedItemId]);
        alterState = {
          currentSelectedItemId: nextProps.currentSelectedItemId,
          itemJson: itemJson
        };
        this.expandIds = filters.fetchAllExpandIds(itemJson);
        
      }else {
        alterState = {
          itemJson: this.getItemJsonByAppConfig(nextProps)
        };
      }
      if(stateHasChange){
        // let {isFind, total} = this.getTotalNumOverItem(nextProps.currentSelectedItemId, alterState.itemJson);
        // if(isFind){
        //   if(hideTreeRoot){
        //     total --;
        //   }
        // }
        this.setState(alterState)
      }
    }

  }

  getTotalExpandedNumOverItem = (id: string, itemJson: OutlineItemJson): {isFind: boolean, total: number} => {
    let tmpTotal = 0, tmpFind = false;
    if(itemJson.id === id)return {isFind: true, total: tmpTotal};
    let {children, isExpand} = itemJson;
    
    isExpand && children && children.find(child => {
      tmpTotal ++;
      const {isFind, total} = this.getTotalExpandedNumOverItem(id, child);
      if(isFind){
        tmpFind = true;
        tmpTotal += total;
        return true;
      }
      tmpTotal += total;
    })
    return {isFind: tmpFind, total: tmpTotal};
  }



  singleAndDoubleClickTimeout: any = undefined;

  handleOnTocDoubleClick = (itemJson, evt) => {
    if(this.singleAndDoubleClickTimeout){
      clearTimeout(this.singleAndDoubleClickTimeout);
      this.singleAndDoubleClickTimeout = undefined;
    }
    if(!itemJson.allowEditable) return;
    this.setState({
      editableItemId: itemJson.id
    })
  }

  handleClickItem = (itemJson, evt) => {
    if(this.singleAndDoubleClickTimeout){
      clearTimeout(this.singleAndDoubleClickTimeout);
      this.singleAndDoubleClickTimeout = undefined;
    }
    this.singleAndDoubleClickTimeout = setTimeout(() => {
      if(itemJson.type === OutlineType.Label || itemJson.type === OutlineType.Layout || itemJson.type === OutlineType.View){//title
        this.handleExpand(itemJson)
        // this.setState({
        //   currentSelectedItemId: this.state.currentSelectedItemId,
        //   itemJson: filters.activeNodesByActiveIds(this.state.itemJson, [this.state.currentSelectedItemId])
        // })
        return;
      }
      const {currentSelectedItemId} = this.state;
      if(currentSelectedItemId !== itemJson.id){
        if(itemJson.type === OutlineType.Label || itemJson.type === OutlineType.Layout || itemJson.type === OutlineType.View){
          this.setState({
            itemJson: Object.assign({}, this.state.itemJson)
          }, () => {
            this.props.onClickItem(itemJson);
          })
        }else {
          this.setState({
            currentSelectedItemId: itemJson.id,
            itemJson: filters.activeAndExpandNodesByActiveIds(this.state.itemJson, [itemJson.id])
          }, () => {
            this.props.onClickItem(itemJson);
          })
        }
        
      }else {
        this.handleExpand(itemJson);
      }
    }, 200);
    
  }

  handleExpand = (itemJson) => {
    const {expandIds} = this;
    if(!itemJson.isExpand){
      if(expandIds.indexOf(itemJson.id) < 0){
        expandIds.push(itemJson.id)
      }
    }else {
      if(expandIds.indexOf(itemJson.id) > -1){
        expandIds.splice(expandIds.indexOf(itemJson.id), 1);
      }
    }
    this.setState({
      itemJson: filters.expandNodesByExpandIds(this.state.itemJson, expandIds)
    })
  }

  handleArrowClick = (itemJson) => {
    this.handleExpand(itemJson)
  }

  handleRemove = (itemJson: OutlineItemJson) => {
    if(itemJson.type === OutlineType.Widget){
      getAppConfigAction().removeWidget(itemJson.data.id, true).exec();
    }else if(itemJson.type === OutlineType.Section){
      getAppConfigAction().removeSection(itemJson.data.id, true).exec();
    }else if(itemJson.type === OutlineType.View){
      const index = itemJson.id.indexOf(TocItemIdSplite);
      if(index < 0) return;
      getAppConfigAction().removeView(itemJson.data.id, itemJson.id.substring(0, index), false).exec();
    }
  }

  handleDuplicate = (itemJson: OutlineItemJson) => {
    const strs = itemJson.id.split(TocItemIdSplite);
    if(itemJson.type === OutlineType.Widget){
      let appConfigAction = getAppConfigAction();
      let newLayoutInfo = appConfigAction.duplicateWidget(itemJson.data.id, strs[0]);
      appConfigAction.exec();
      if(newLayoutInfo){
        getAppStore().dispatch(appActions.selectionChanged(newLayoutInfo));
      }
    }else if(itemJson.type === OutlineType.Section){
      let appConfigAction = getAppConfigAction();
      let newLayoutInfo = appConfigAction.duplicateSection(itemJson.data.id, strs[0]);
      appConfigAction.exec();
      if(newLayoutInfo){
        getAppStore().dispatch(appActions.selectionChanged(newLayoutInfo));
      }
    }else if(itemJson.type === OutlineType.View){
      getAppConfigAction().duplicateView(strs[1], strs[0]).exec();
    }
  }

  handleRename = (itemJson: OutlineItemJson, newName: string) => {
    this.setState({
      editableItemId: ''
    })
    if(!newName || newName === '')return false;
    if(itemJson.type === OutlineType.Widget){
      getAppConfigAction().editWidgetProperty(itemJson.data.id, 'label', newName).exec();
    }else if(itemJson.type === OutlineType.Section){
      getAppConfigAction().editSectionProperty(itemJson.data.id, 'label', newName).exec();
    }else if(itemJson.type === OutlineType.View){
      getAppConfigAction().editView(itemJson.data.set('label', newName)).exec();
    }
    return true;
  }

  handleSearchTextChange = (searchText) => {
    this.setState({
      filterText: searchText
    }, () => {
      this.setState({
        itemJson: this.getItemJsonByAppConfig()
      })
    })
  }

  handleSearchSubmit = (searchText) => {
    this.setState({
      filterText: searchText
    }, () => {
      this.setState({
        itemJson: this.getItemJsonByAppConfig()
      })
    })
  }

  handleSearchBtnClick = (evt) => {
    evt.stopPropagation();
    const showSearch = this.state.showSearch;
    if(showSearch){// will hide
      this.handleSearchTextChange('');
    }
    this.setState({
      showSearch: !this.state.showSearch
    })
  }

  handleSearchOpened = () => {
    if(this.searchInput){
      this.searchInput.select();
      this.searchInput.focus();
    }
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }


  getItemJsonByCommonJson = (commonContent: OutLineCommonJson, index, level, type: OutlineType, props: Props) : OutlineItemJson => {
    let commonJson = undefined;
    const {appConfig} = props;
    if(type === OutlineType.Widget){
      commonJson = appConfig.widgets[commonContent.id];
    }else if(type === OutlineType.Section){
      commonJson = appConfig.sections[commonContent.id];
    }else if(type === OutlineType.View) {
      commonJson = appConfig.views[commonContent.id];
    }
    const {currentSelectedItemId} = this.state;
    const itemId = getOutlineItemId(commonContent, type);
    const {expandIds} = this;
    const isExpand = expandIds.indexOf(itemId) > -1;
    const itemJson: OutlineItemJson = {
      id: itemId,
      data: commonJson,
      label: commonJson.label,
      index: index,
      level: level,
      type: type,
      allowEditable: true,
      isExpand: isExpand,
      isActive: currentSelectedItemId === itemId,
      renderItem: this.renderOutlineContent
    };
    itemJson.icon = commonJson.icon;
    if(!commonJson.icon){
      itemJson.isIconSvg = true;
      if(type === OutlineType.Widget){ // widget
        itemJson.icon = require('jimu-ui/lib/icons/widget.svg');
      }else if(type === OutlineType.Section){ // section
        itemJson.icon = require('jimu-ui/lib/icons/section.svg');
      }else if(type === OutlineType.View) { //view
        itemJson.icon = require('jimu-ui/lib/icons/section.svg');
      }
    }
    return itemJson;
  }

  getItemJsonByView = (viewId: string, sectionId: string, index, level, props: Props) : OutlineItemJson => {
    const itemJson = this.getItemJsonByCommonJson({id: viewId, sectionId: sectionId}, index, level, OutlineType.View, props);
    itemJson.allowEditable = false;
    // if allow section is referenced by list, the logic must be change.
    const {widgets, sections} = this.getWidgetsAndSectionsInContainer(ContainerType.View, viewId, props);
    itemJson.children = this.getItemJsonsBySectionsAndWidgets(sections, widgets, itemJson.level + 1, props);
    return itemJson;
  }

  getItemJsonBySection = (section: OutLineCommonJson, index, level, props: Props) : OutlineItemJson => {
    const {appConfig} = props
    const itemJson = this.getItemJsonByCommonJson(section, index, level, OutlineType.Section, props);
    const sectionJson = appConfig.sections[section.id];
    if(sectionJson.views){
      itemJson.children = sectionJson.views.map((viewId, i) => {
        return this.getItemJsonByView(viewId, sectionJson.id, i, level + 1, props);
      })
    }
    return itemJson;
  }

  getItemJsonBySizeLayouts = (sizeLayouts, label, index, level, props: Props) : OutlineItemJson => {
    const {appConfig, browserSizeMode} = props;
    const layoutId = utils.findLayoutId(sizeLayouts, browserSizeMode, appConfig.mainSizeMode)
    const {expandIds} = this;
    const {currentSelectedItemId} = this.state;
    const isExpand = expandIds.indexOf(layoutId) > -1;
    const itemJson: OutlineItemJson = {
      id: layoutId,
      label: label,
      index: index,
      level: level,
      icon: require('jimu-ui/lib/icons/layout-12.svg'),
      isIconSvg: true,
      type: OutlineType.Layout,
      isExpand: isExpand,
      isActive: currentSelectedItemId === layoutId,
      renderItem: this.renderOutlineContent
    }
    const widgets = this.getWidgetsInLayout(appConfig.layouts[layoutId]) || [];
    const sections = this.getSectionsInLayout(appConfig.layouts[layoutId]) || [];
    itemJson.children = this.getItemJsonsBySectionsAndWidgets(sections, widgets, itemJson.level + 1, props);
    return itemJson;
  }

  getItemJsonByWidget = (widget: OutLineCommonJson, index, level, props: Props) : OutlineItemJson => {
    const {appConfig} = props
    const itemJson = this.getItemJsonByCommonJson(widget, index, level, OutlineType.Widget, props);
    const widgetJson = appConfig.widgets[widget.id];
    if(widgetJson.layouts){
      //hide layout if widget has one layout only
      if(Object.keys(widgetJson.layouts).length === 1){
        const sizeLayouts = widgetJson.layouts[Object.keys(widgetJson.layouts)[0]];
        itemJson.children = this.getItemJsonBySizeLayouts(sizeLayouts, '', 0, level, props).children;
      }else {
        if(widgetJson.manifest.name === 'list'){
          const sizeLayouts = widgetJson.layouts[widgetJson.manifest.properties.layouts[0].name];
          itemJson.children = this.getItemJsonBySizeLayouts(sizeLayouts, '', 0, level, props).children;
          
        }else {
          itemJson.children = Object.keys(widgetJson.layouts).map((key, i) => {
            const sizeLayouts = widgetJson.layouts[key];
            let label = key;
            if(widgetJson.manifest.properties.layouts && widgetJson.manifest.properties.layouts.length > 0){
              const layout = widgetJson.manifest.properties.layouts.find(layout => layout.name === key);
              if(layout){
                label = layout.label;
              }
            }
            return this.getItemJsonBySizeLayouts(sizeLayouts, label, i, level + 1, props)
          })
        }
      }
    }
    return itemJson;
  }

  getWidgetsInLayout(layoutJson: IMLayoutJson): OutLineCommonJson[] {
    if(!layoutJson || !layoutJson.content){
      return [];
    }
    return Object.keys(layoutJson.content)
                  .filter(itemId => layoutJson.content[itemId].type === LayoutItemType.Widget && layoutJson.content[itemId].widgetId && !layoutJson.content[itemId].isPending)
                  .map(itemId => {
                    return {
                      id: layoutJson.content[itemId].widgetId,
                      layoutId: layoutJson.id,
                      layoutItemId: itemId
                    }
                  });
  }
  
  getSectionsInLayout(layoutJson: IMLayoutJson): OutLineCommonJson[] {
    if(!layoutJson || !layoutJson.content){
      return [];
    }
    return Object.keys(layoutJson.content)
                  .filter(itemId => layoutJson.content[itemId].type === LayoutItemType.Section && layoutJson.content[itemId].sectionId && !layoutJson.content[itemId].isPending)
                  .map(itemId => {
                    return {
                      id: layoutJson.content[itemId].sectionId,
                      layoutId: layoutJson.id,
                      layoutItemId: itemId
                    }
                  });
  }

  getWidgetsAndSectionsInContainer = (containerType: ContainerType, containerId: string, props: Props): {widgets: OutLineCommonJson[], sections: OutLineCommonJson[]} => {
    let widgets, sections;
    const {appConfig, browserSizeMode} = props;
    if(containerType === ContainerType.Header || containerType === ContainerType.Footer){
      if(appConfig[containerType]){
        const layoutId = utils.findLayoutId(appConfig[containerType].layout, browserSizeMode, appConfig.mainSizeMode);
        widgets = this.getWidgetsInLayout(appConfig.layouts[layoutId]) || [];
        sections = this.getSectionsInLayout(appConfig.layouts[layoutId]) || [];
      }else{
        widgets = [];
        sections = [];
      }
    }else{
      if(appConfig[containerType] && appConfig[containerType][containerId]){
        const layoutId = utils.findLayoutId(appConfig[containerType][containerId].layout, browserSizeMode, appConfig.mainSizeMode);
        widgets = this.getWidgetsInLayout(appConfig.layouts[layoutId]) || [];
        sections = this.getSectionsInLayout(appConfig.layouts[layoutId]) || [];
      }else{
        widgets = [];
        sections = [];
      }
    }

    return {widgets, sections};
  }

  getItemJsonByAppConfig = (props?: Props) : OutlineItemJson => {
    props = props || this.props;
    let itemJsons: OutlineItemJson[] = []
    const labels = [this.formatMessage('header'), this.formatMessage('body'), this.formatMessage('footer')]
    const {filterText} = this.state;
    let {expandIds} = this;
    const {appConfig, currentPageId} = props
    const {currentSelectedItemId} = this.state;
    let rootItemJson: OutlineItemJson = {
      id: 'ROOT',
      type: OutlineType.Label,
      children: itemJsons,
      label: ''
    };
    
    for (let i = 0; i < 3 ; i ++) {
      const id = i + '-' + labels[i] ;
      const isActive = currentSelectedItemId === id;
      if(isActive){
        if(expandIds.indexOf(id) < 0){
          expandIds.push(id);
        }
      }
      const isExpand = expandIds.indexOf(id) > -1;
      const itemJson: OutlineItemJson = {
        label: labels[i],
        id: id,
        index: i,
        level: 0,
        mustShowArrow: true,
        isActive: isActive,
        isExpand: isExpand,
        type: OutlineType.Label,
        className: 'outline-title-item',
        renderRightContent: this.renderTitleRightContent,
        arrowIcon: (itemJson) => <div></div>
      }
      itemJsons.push(itemJson);
    }
    if(!appConfig){
      return rootItemJson;
    }
    itemJsons.forEach(itemJson => {
      let containerType, containerId;
      if(itemJson.label === this.formatMessage('header')){
        containerType = ContainerType.Header;
        containerId = 'header';
      }else if(itemJson.label === this.formatMessage('body')){
        containerType = ContainerType.Page;
        containerId = currentPageId;
        if(!appConfigUtils.isRealPage(appConfig, currentPageId)){
          containerId = this.lastPageId;
        }else {
          this.lastPageId = currentPageId;
        }
        
      }else {
        containerType = ContainerType.Footer;
        containerId = 'footer';
      }
      const {widgets, sections} = this.getWidgetsAndSectionsInContainer(containerType, containerId, props);
      itemJson.children = this.getItemJsonsBySectionsAndWidgets(sections, widgets, itemJson.level, props);
      if(itemJson.children && itemJson.children.length > 0){
        itemJson.isExpand = true;
        if(expandIds.indexOf(itemJson.id) < 0){
          expandIds.push(itemJson.id);
        }
      }
    })

    if(filterText && filterText !== ''){
      let filtered = filters.filterTree(rootItemJson, filterText.trim());
      rootItemJson = filters.expandFilteredNodes(filtered, filterText.trim());
      expandIds = filters.fetchAllExpandIds(rootItemJson);
      builderAppSync.publishChangeSelectionToApp(null);
    }

    return rootItemJson;
  }

  getItemJsonsBySectionsAndWidgets = (sections, widgets, level, props: Props) => {
    const itemJsons: OutlineItemJson[] = [];
    itemJsons.push(...sections.map((section, j) => {
      return this.getItemJsonBySection(section, j, level, props)
    }))
    itemJsons.push(...widgets.map((widget, j) => {
      return this.getItemJsonByWidget(widget, j, level, props)
    }))
    return itemJsons;
  }

  getDropDownItems = (itemJson) => {
    if(!(itemJson.type === OutlineType.Section || itemJson.type === OutlineType.View || itemJson.type === OutlineType.Widget)){
      return [];
    }
    let dropDownItems = [];

    let removeItem = Immutable({
      label: this.formatMessage('remove'),
      event: (evt) => {this.handleRemove(itemJson); evt.stopPropagation(); },
      visible: true
    })
    dropDownItems.push(removeItem);

    let duplicateItem = Immutable({
      label: this.formatMessage('duplicate'),
      event: (evt) => {this.handleDuplicate(itemJson); evt.stopPropagation(); },
      visible: true
    })
    dropDownItems.push(duplicateItem);

    let renameItem = Immutable({
      label: this.formatMessage('rename'),
      event: (evt) => {this.handleOnTocDoubleClick(itemJson, evt)},
      visible: true
    })

    dropDownItems.push(renameItem);
    return dropDownItems;
  }

  renderTitleRightContent = (itemJson) => {
    const {theme} = this.props;
    const rightCss = css`
      margin-right:calc(16px - ${theme.components.button.sizes.sm.paddingX});
      .btn {
        color: ${theme.colors.grays.gray600};
      }
      .btn:hover {
        color: ${theme.colors.black};
      }
      .title-arrow {
        transform-origin: center;
        transform: ${`rotate(${itemJson.isExpand ? 180 : 0}deg)`};
        transition: transform .5s;
      }

    `

    return (
      <div css={rightCss}>
        <Button title={itemJson.isExpand ? this.formatMessage('unexpand') : this.formatMessage('expand')} icon color="link" size={'sm'}>
          <Icon className={'title-arrow'} icon={require('jimu-ui/lib/icons/arrow-down-14.svg')} size={14} />
        </Button>
      </div>
    )
  }

  renderCommonRightContent = (itemJson) => {
    const {theme} = this.props;

    let dropDownItems = this.getDropDownItems(itemJson);
    if(dropDownItems.length < 1){
      return <div></div>
    }

    const rightCss = css`
      margin-right:calc(16px - ${theme.components.button.sizes.sm.paddingX});
      .dropDown {
        visibility: hidden;
        .btn {
          color: ${theme.colors.grays.gray600};
        }
        .btn:hover {
          color: ${theme.colors.black};
        }
      }
      

    `

    return (
      <div className="d-flex" css={rightCss}>
        <div title={this.formatMessage('more')} className="dropDown page-item-icon">
          <MyDropDown uId={itemJson.id} theme={theme} items={dropDownItems} />
        </div>
      </div>
    )
  }

  renderOutlineContent = (itemJson) => {
    const {intl, theme} = this.props;
    const {editableItemId} = this.state;
    const tocCss = css`
      :hover {
        .dropDown {
          visibility: visible;
          z-index: 2;
        }
      }
    `
    return (
      <DndTocContent intl={intl} itemJson={itemJson} onArrowClick={this.handleArrowClick}
      editable={editableItemId === itemJson.id} theme={theme}
       renameItem={this.handleRename}  tocCss={tocCss}
      />
    )
  }

  getStyle = (): SerializedStyles => {
    const {theme} = this.props;
    const {showSearch} = this.state;
    const paddingLR = 16;
    // >div {
    //   overflow: hidden;
    //   >div {
    //     overflow-x: scroll;
    //     margin-bottom: -10px;
    //     >.collapse {
    //       min-width: max-content;
    //     }
    //     >.show {
    //       padding-bottom: 10px;
    //     }
    //   }
    //   >div::-webkit-scrollbar {
    //     display: none;
    //   }
    // }
    const topH = 44;
    const topHWithSearch = 82;
    return css`
      height: 100%;
      padding-bottom: 10px;
      .outline-list-top {
        height: ${showSearch ? topHWithSearch : topH};
        padding: 10px ${paddingLR}px;
        .outline-top-btns {
          margin-right: -${theme.components.button.sizes.sm.paddingX};
          .outline-title {
            user-select: none;
          }
          .btn-link:hover {
            svg {
              color: ${theme.colors.black};
            }
          }
        }
        .toc-search-input {
          margin-top: calc(12px - ${theme.components.button.sizes.sm.paddingY});
          background: transparent;
        }
      }
      .outline-tree-container {
        height: calc(100% - ${showSearch ? topHWithSearch : topH}px);
        overflow-y: auto;
        margin-top: 6px;
        .outline-tree {
          >div {
            overflow: hidden;
            >div {
              overflow-x: auto;
              >.collapse {
                min-width: fit-content;
              }
            }
          }
          .tree-item-common {
            padding-left: ${paddingLR - 8}px;
          }
          .outline-title-item {
            .tree-item-common {
              background-color:${polished.rgba(theme.colors.grays.gray200, 0.6)};
            }
            .tree-item-common:hover {
              background-color:${polished.rgba(theme.colors.grays.gray200, 0.6)};
            }
          }
          .toc-item-dropzone {
            .toc-item {
              padding-left: calc(${paddingLR}px - ${theme.components.button.sizes.sm.paddingX});
            }
          }
        }
      }
      
    `
  }

  render() {
    const {itemJson, showSearch} = this.state;
    const {theme} = this.props;
    return(
      <div css={this.getStyle()}>
        <div className="outline-list-top">
          <div className="d-flex justify-content-between">
            <div className="outline-title h4">{this.formatMessage('outline')}</div>
            <div className="d-flex outline-top-btns">
              <Button title={this.formatMessage('search')} size={'sm'} color={'link'} icon className="search-btn" onClick={this.handleSearchBtnClick}>
                <Icon className="search-icon" size={16} color={theme.colors.grays.gray500} icon={require('jimu-ui/lib/icons/search-16.svg')} />
              </Button>
            </div>
          </div>
          <Collapse isOpen={showSearch} onEntered={this.handleSearchOpened}>
            <SearchBox 
              theme={theme} 
              placeholder={this.formatMessage('search')} 
              searchText={this.state.filterText}
              onSearchTextChange={this.handleSearchTextChange} 
              onSubmit={this.handleSearchSubmit}
              hideSearchIcon={true}
              inputRef={node => this.searchInput = node}
            />
          </Collapse>
        </div>
        
        <div className="w-100 outline-tree-container">
          <Tree 
            hideRoot={hideTreeRoot}
            className="outline-tree"
            itemJson={Immutable(itemJson)} 
            onClickItem={this.handleClickItem}
            handleExpand={this.handleExpand}
          />
        </div>
        
      </div>
    )
  }
}

export default ReactRedux.connect<StateProps, {}, Props>((state: IMState) => {
  let selection = state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.selection;
  let appConfig = state.appStateInBuilder && state.appStateInBuilder.appConfig;
  let layoutItem = selection && appConfig.layouts[selection.layoutId] &&
    appConfig.layouts[selection.layoutId].content && appConfig.layouts[selection.layoutId].content[selection.layoutItemId];
  let currentSelectedItemId = undefined;
  if(layoutItem){
    if(layoutItem.type === LayoutItemType.Section){
      currentSelectedItemId = getOutlineItemId({id: layoutItem.sectionId, ...selection}, OutlineType.Section)
    }else if(layoutItem.type === LayoutItemType.Widget){
      currentSelectedItemId = getOutlineItemId({id: layoutItem.widgetId, ...selection}, OutlineType.Widget);
    }
  }

  return {
    currentSelectedItemId
  }
})(_OutlineList);

export function getOutlineItemId(outlineCommonJson: OutLineCommonJson, type: OutlineType): string{
  if(type === OutlineType.Widget){ // widget
    return outlineCommonJson.layoutId + TocItemIdSplite + outlineCommonJson.layoutItemId + TocItemIdSplite + outlineCommonJson.id
  }else if(type === OutlineType.Section){ // section
    return outlineCommonJson.layoutId + TocItemIdSplite + outlineCommonJson.layoutItemId + TocItemIdSplite + outlineCommonJson.id
  }else if(type === OutlineType.View) { //view
    return outlineCommonJson.sectionId + TocItemIdSplite + outlineCommonJson.id
  }
  else {
    return outlineCommonJson.id
  }
}