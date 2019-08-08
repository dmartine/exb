/** @jsx jsx */
import {React, jsx, IMPageJson, ThemeVariables, css,
  IMAppConfig, Immutable, InjectedIntl, ImmutableObject, PageType, BrowserSizeMode, LinkType} from 'jimu-core';
import {utils, getAppConfigAction, appConfigUtils, LinkSettingPopup, LinkParam} from 'jimu-for-builder';
import {Button, Icon} from 'jimu-ui'
import defaultMessages from '../translations/default';
import { DndTocItemJson, DndTocContent } from './dnd-toc-content';
import { MyDropDown } from './my-dropdown';
import SearchBox from './search-box';
import { Tree, TreeUtils as filters } from 'jimu-ui';
import TemplatePopover from './template-chooser';
import CommonModal from './common-modal';
import { interact } from 'jimu-core/dnd';

export interface PageItemJson extends DndTocItemJson{
  showDefault?: boolean
}

interface props {
  intl: InjectedIntl,
  theme: ThemeVariables,
  appConfig: IMAppConfig,
  editablePageItemId: string,
  currentPageItemId: string,
  browserSizeMode: BrowserSizeMode,
  changeEditablePageItemId: (pageId: string) => void,
  onDefaultClick: (pageId: string) => void,
  removePage: (pageId: string) => void,
  duplicatePage: (pageId: string) => void,
  renamePage: (pageId: string, newName: string) => boolean,
  onClickPage: (pageId: string) => void,
  movePageIntoPage: (subPageId: string, parentPageId: string) => void,
  reOrderPage: (pageId: string, topPageId: string, dropType: 'top' | 'bottom') => void,
  addPageWithType: (type: 'page' | 'link' | 'folder', templatePageJson?: ImmutableObject<any>) => IMPageJson,
}

interface States{
  currentSelectedItemId: string,
  filterText: string,
  itemJson: PageItemJson,
  showSearch: boolean,
  isTemplatePopoverOpen: boolean, 
  isRemovePopoverOpen: boolean, 
  isTocDragging: boolean,
  tocDraggingStatus: 'bottom' | 'top' | 'on',
  willRemovePage: IMPageJson,
  isShowLinkSetting: boolean,
}

const HideRoot = true;
let linkParam : LinkParam = {
  value: '',
  openType : undefined,
  linkType: LinkType.WebAddress
};
let settingLinkId: string = undefined
export default class OutlineList extends React.PureComponent<props, States>{

  searchInput: HTMLInputElement;
  expandIds: Array<string>;
  dropZoneRef: any;
  dropZoneInteractable: any;
  treeRef: HTMLDivElement;

  constructor(props){
    super(props);
    this.expandIds = [];
    this.state = {
      currentSelectedItemId: props.currentPageItemId,
      filterText: '',
      itemJson: undefined,
      showSearch: false,
      isTemplatePopoverOpen: false,
      isTocDragging: false,
      isRemovePopoverOpen: false,
      willRemovePage: undefined,
      tocDraggingStatus: 'on',
      isShowLinkSetting: false
    }
  }

  componentWillMount(){
    this.setState({
      itemJson: this.getItemJsonByAppConfig(this.props.appConfig)
    })
  }

  componentWillUnmount() {
    if (this.dropZoneInteractable) {
      this.dropZoneInteractable.unset();
      this.dropZoneInteractable = null;
    }
  }

  componentWillReceiveProps(nextProps){

    let stateHasChange = false;
    let alterState = {};
    
    if(nextProps.currentPageItemId !== this.props.currentPageItemId 
        || nextProps.appConfig !== this.props.appConfig 
        || nextProps.editablePageItemId !== this.props.editablePageItemId){
      stateHasChange = true;
      if((nextProps.appConfig !== this.props.appConfig || nextProps.editablePageItemId !== this.props.editablePageItemId)
         && nextProps.currentPageItemId !== this.props.currentPageItemId){
        
        const itemJson = filters.activeAndExpandNodesByActiveIds(this.getItemJsonByAppConfig(nextProps.appConfig), [nextProps.currentPageItemId]);
        alterState = {
          currentSelectedItemId: nextProps.currentPageItemId,
          itemJson: itemJson
        }
        this.expandIds = filters.fetchAllExpandIds(itemJson);
      }else if(nextProps.currentPageItemId !== this.props.currentPageItemId){
        const itemJson = filters.activeAndExpandNodesByActiveIds(this.state.itemJson, [nextProps.currentPageItemId]);
        alterState = {
          currentSelectedItemId: nextProps.currentPageItemId,
          itemJson: filters.activeAndExpandNodesByActiveIds(this.state.itemJson, [nextProps.currentPageItemId])
        }
        this.expandIds = filters.fetchAllExpandIds(itemJson);
      }else {
        alterState = {
          itemJson: this.getItemJsonByAppConfig(nextProps.appConfig)
        }
      }
    }
    if(stateHasChange){
      this.setState(alterState);
    }
  }

  componentDidMount() {
    if (this.dropZoneRef) {
      this.dropZoneInteractable = interact(this.dropZoneRef)
        .dropzone({
          // only accept elements matching this CSS selector
          accept: '.toc-item-drag',
          overlap: 'pointer',
          ondropactivate: event => {
          },
          ondropmove: event => {
          },
          ondragenter: event => {
            // console.log('enter page-toc-list')
            const {itemJson} = this.state;
            if(!itemJson) return;
            if(this.treeRef){
              const { relatedTarget, dragEvent } = event;
              const treeTop = this.treeRef.getBoundingClientRect().top;
              const draggingItemJson = JSON.parse(relatedTarget.getAttribute('itemJson'));
              const clientOffset = dragEvent.client;
              if(clientOffset.y < treeTop){
                const firstItemJson = this.getFirstItemJson()
                if(firstItemJson.data.id !== draggingItemJson.data.id){
                  this.handleOnTocDraggingStatusChange('top');
                }
              }else {
                let lastItemJson = this.getLastParentItemJson();
                if(lastItemJson.data.id !== draggingItemJson.data.id){
                  this.handleOnTocDraggingStatusChange('bottom');
                }
              }
            }
          },
          ondragleave: event => {
            this.setState({
              tocDraggingStatus: 'on',
              itemJson: this.getItemJsonByAppConfig(this.props.appConfig)
            })
            // console.log('leave page-toc-list')
            // this.onDropHover('none');
          },
          ondrop: event => {
            
            const dropStatus = this.state.tocDraggingStatus;
            if (dropStatus === 'on') return;
            let targetItemJson = undefined;
            if(dropStatus === 'bottom'){
              let lastItemJson = this.getLastParentItemJson();
              targetItemJson = lastItemJson;
            }else {
              targetItemJson = this.getFirstItemJson()
            }
            const dragElement = event.relatedTarget;
            const dragItemJson = JSON.parse(dragElement.getAttribute('itemJson'));
            this.onDidDrop(dragItemJson, targetItemJson, dropStatus);
            // onDidDrop && onDidDrop(dragItemJson, itemJson, dropType as any);
            // this.onDropHover('none');
            this.handleOnTocDraggingStatusChange('on');
          },
          ondropdeactivate: event => {

          }
        })
    }
  }

  handleOnTocDragStatusChange = (isDragging: boolean) => {
    this.setState({
      isTocDragging: isDragging,
      itemJson: this.getItemJsonByAppConfig(this.props.appConfig)
    })
  }

  handleOnTocDraggingStatusChange = (status) => {
    this.setState({
      tocDraggingStatus: status,
      itemJson: this.getItemJsonByAppConfig(this.props.appConfig)
    })
  }

  handleChooseTemplate = (templagePageJson) => {
    this.setState({
      isTemplatePopoverOpen: false
    })
    this.props.addPageWithType('page', templagePageJson);
  }

  handleToggleTemplatePopover = () => {
    this.setState({
      isTemplatePopoverOpen: !this.state.isTemplatePopoverOpen
    })
    // this.props.addPageWithType('page', Immutable({
    //   layout: {
    //     DESKTOP: 'default-layout-desktop'
    //   },
    //   layouts: {
    //     'default-layout-desktop': {
    //     }
    //   }
    // }));
  }

  handleRemovePage = (pageJson: IMPageJson) => {
    const {appConfig} = this.props;
    const ps = appConfig.pageStructure.find(ps => ps[pageJson.id] && ps[pageJson.id].length > 0);
    if(ps){
      this.setState({
        willRemovePage: pageJson
      })
      this.handleToggleRemovePopover();
    }else {
      if(settingLinkId === pageJson.id){
        this.setState({
          isShowLinkSetting: false
        })
      }
      this.props.removePage(pageJson.id);
    }
  }

  handleToggleRemovePopover = () => {
    this.setState({
      isRemovePopoverOpen: !this.state.isRemovePopoverOpen
    })
  }

  singleAndDoubleClickTimeout: any = undefined;

  handleClickItem = (itemJson) => {
    if(itemJson.data.type === PageType.Folder || itemJson.data.type === PageType.Link)return;
    if(this.singleAndDoubleClickTimeout){
      clearTimeout(this.singleAndDoubleClickTimeout);
      this.singleAndDoubleClickTimeout = undefined;
    }
    this.singleAndDoubleClickTimeout = setTimeout(() => {
      this.setState({
        currentSelectedItemId: itemJson.id,
        itemJson: filters.activeAndExpandNodesByActiveIds(this.state.itemJson, [itemJson.id])
      }, () => {
        this.props.onClickPage(itemJson.data.id);
      })
    }, 200);
    
  }

  handleOnTocDoubleClick = (itemJson, evt) => {
    if(this.singleAndDoubleClickTimeout){
      clearTimeout(this.singleAndDoubleClickTimeout);
      this.singleAndDoubleClickTimeout = undefined;
    }
    this.props.changeEditablePageItemId(itemJson.id);
    evt.stopPropagation();
  }

  handleOnSetLinkClick = (itemJson, evt) => {
    if(settingLinkId && itemJson.data.id === settingLinkId && this.state.isShowLinkSetting) return;
    settingLinkId = itemJson.data.id;
    this.resetLinkParam(settingLinkId);
    if(this.state.isShowLinkSetting){
      this.setState({
        isShowLinkSetting: false
      }, () => {
        this.setState({
          isShowLinkSetting: true
        })
      })
    }else {
      this.setState({
        isShowLinkSetting: true
      })
    }
    evt.stopPropagation();
  }

  handleExpand = (itemJson) => {
    if((!itemJson.children || itemJson.children.length < 1) && !itemJson.mustShowArrow)return;
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

  handleSearchTextChange = (searchText) => {
    this.setState({
      filterText: searchText
    }, () => {
      this.setState({
        itemJson: this.getItemJsonByAppConfig(this.props.appConfig)
      })
    })
  }

  handleSearchSubmit = (searchText) => {
    this.setState({
      filterText: searchText
    }, () => {
      this.setState({
        itemJson: this.getItemJsonByAppConfig(this.props.appConfig)
      })
    })
  }

  handleSearchBtnClick = (evt) => {
    evt.stopPropagation();
    if(this.state.showSearch){// will hide
      this.handleSearchTextChange('');
    }else {
      if(this.searchInput){
        this.searchInput.focus();
        this.searchInput.select();
      }
    }
    this.setState({
      showSearch: !this.state.showSearch
    })
  }

  handleSettingLinkConfirm = (linkResult: LinkParam) => {
    this.setState({
      isShowLinkSetting: false
    });
    //console.log(linkResult);
    this.changeUrl(linkResult.value, linkResult.openType);
  }

  changeUrl = (value, target) => {
    const {appConfig} = this.props;
    const previousPageJson = appConfig.pages[settingLinkId]
    let pageJson = Immutable(previousPageJson).merge({
      linkUrl: value ? value : '#',
      openTarget: target
    }) as IMPageJson;
    getAppConfigAction().editPage(pageJson).exec();
    linkParam.value = value;
    linkParam.openType = target;
  }

  resetLinkParam(linkId: string) {
    const {appConfig} = this.props;
    linkParam.value = '';
    linkParam.openType = undefined;
    let link = appConfig.pages[linkId]
    // this.setState({currentUrl: ''});
    if(link && link.linkUrl && link.linkUrl != '#'){
      linkParam.value = link.linkUrl;
      // this.setState({currentUrl: linkParam.value});
    }
    if(link && link.openTarget){
      linkParam.openType = link.openTarget;
    }
  }

  renamePage = (itemJson, newName) : boolean => {
    this.props.changeEditablePageItemId('');
    return this.props.renamePage(itemJson.data.id, newName);
  }

  getFirstItemJson = (): PageItemJson => {
    const {itemJson} = this.state;
    return itemJson.children[0]
  }

  getLastItemJson = (): PageItemJson => {
    const {itemJson} = this.state;
    let lastItemJson = itemJson.children[itemJson.children.length - 1]
    if(lastItemJson.isExpand && lastItemJson.children && lastItemJson.children.length > 0){
      lastItemJson = lastItemJson.children[lastItemJson.children.length - 1]
    }
    return lastItemJson
  }

  getLastParentItemJson = (): PageItemJson => {
    const {itemJson} = this.state;
    let lastItemJson = itemJson.children[itemJson.children.length - 1]
    return lastItemJson
  }

  onDidDrop = (itemJson: ImmutableObject<DndTocItemJson>, droppedItemJson: ImmutableObject<DndTocItemJson>, dropType: 'moveInto' | 'top' | 'bottom') => {
    if(dropType === 'moveInto'){
      this.props.movePageIntoPage(itemJson.data.id, droppedItemJson.data.id);
    }else{
      this.props.reOrderPage(itemJson.data.id, droppedItemJson.data.id, dropType);
    }
    const {expandIds} = this;
    if(expandIds.indexOf(itemJson.id) < 0){
      expandIds.push(itemJson.id);
      this.setState({
        itemJson: filters.expandNodesByExpandIds(this.state.itemJson, expandIds)
      })
    }
  }

  canDragFunc = (pageJson): boolean => {
    return true;
  }

  canDropFunc = (pageJson, dragPageJson): boolean => {
    return pageJson.id !== dragPageJson.id;
  }

  canDropIntoFunc = (sourcePageJson, targetPageJson) => {
    return appConfigUtils.isFirstLevelPage(this.props.appConfig, targetPageJson.id) &&
    !appConfigUtils.isPageHasSubPage(this.props.appConfig, sourcePageJson.id) && sourcePageJson.type !== PageType.Folder ;
  }

  canOrderFunc = (sourcePageJson, targetPageJson) => {
    return !(sourcePageJson.type === PageType.Folder && !appConfigUtils.isFirstLevelPage(this.props.appConfig, targetPageJson.id));
  }

  formatMessage = (id: string, values?: {[key: string]: ReactIntl.MessageValue}) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]}, values)
  }

  getItemJsonByPageJson = (pageJson: IMPageJson, index, level, appConfig: IMAppConfig) : DndTocItemJson => {
    const id = pageJson.id;
    const {expandIds} = this;
    const {currentPageItemId} = this.props;
    const isExpand = expandIds.indexOf(id) > -1;
    const itemJson: PageItemJson = {
      id: id,
      data: pageJson,
      label: pageJson.label,
      index: index,
      level: level,
      isActive: currentPageItemId === id,
      isExpand: isExpand,
      mustShowArrow: pageJson.type === PageType.Folder,
      showDefault: appConfigUtils.isRealPage(appConfig, pageJson.id),
      allowEditable: true,
      renderItem: this.renderPageContent
    };
    itemJson.icon = pageJson.icon;
    if(!pageJson.icon){
      itemJson.isIconSvg = true;
      itemJson.icon = utils.getDefaultTocPageIcon(pageJson);
    }
    return itemJson;
  }

  getItemJsonByAppConfig = (appConfig: IMAppConfig) => {
    
    let rootItemJson: PageItemJson = {
      id: 'ROOT',
      children: [],
      label: ''
    };
    if(!appConfig){
      return rootItemJson;
    }
    let itemJsons = appConfig.pageStructure.map( (p, i) => {
      let pId = Object.keys(p)[0];
      let pageJson = appConfig.pages[pId];
      const itemJson = this.getItemJsonByPageJson(pageJson, i, 0, appConfig);
      const pages = p[pId];
      itemJson.children = [];
      pages.forEach((subPageId, j) => {
        const subPageJson = appConfig.pages[subPageId];
        const subItemJson = this.getItemJsonByPageJson(subPageJson, j, 1, appConfig);
        itemJson.children.push(subItemJson)
      })
      return itemJson;
    })
    rootItemJson.children = itemJsons;
    
    const {filterText} = this.state;
    if(filterText && filterText !== ''){
      let filtered = filters.filterTree(rootItemJson, filterText.trim());
      rootItemJson = filters.expandFilteredNodes(filtered, filterText.trim())
    }
    return rootItemJson;

  }

  getMoreDropDownItems = (itemJson) => {
    const pageJson = itemJson.data;
    const dropDownItems = [];

    const setLinkItem = Immutable({
      label: this.formatMessage('setLink'),
      event: (evt) => {this.handleOnSetLinkClick(itemJson, evt)},
      visible: pageJson.type === PageType.Link
    })
    dropDownItems.push(setLinkItem);

    const restRealPageCount = appConfigUtils.getRealPageCountExcludeOnePage(this.props.appConfig, pageJson.id);
    const dropDownNotRemove = restRealPageCount < 1;
    const removeItem = Immutable({
      label: this.formatMessage('remove'),
      event: (evt) => {this.handleRemovePage(pageJson); evt.stopPropagation(); },
      visible: !dropDownNotRemove
    })
    dropDownItems.push(removeItem);

    const duplicateItem = Immutable({
      label: this.formatMessage('duplicate'),
      event: (evt) => {
        evt.stopPropagation(); 
        this.props.duplicatePage(pageJson.id); 
      },
      visible: true
    })
    dropDownItems.push(duplicateItem);

    const renameItem = Immutable({
      label: this.formatMessage('rename'),
      event: (evt) => {this.handleOnTocDoubleClick(itemJson, evt)},
      visible: true
    })
    dropDownItems.push(renameItem);

    return dropDownItems;
  }

  getAddPageDropDownItems = () => {
    const {addPageWithType} = this.props;
    const dropDownItems = [];
    const addLinkItem = Immutable({
      label: this.formatMessage('addLink'),
      event: (evt) => {
        settingLinkId = addPageWithType('link').id; 
        this.resetLinkParam(settingLinkId);
        this.setState({
          isShowLinkSetting: true
        })
        evt.stopPropagation(); 

      },
      visible: true
    })
    dropDownItems.push(addLinkItem);

    const addFolderItem = Immutable({
      label: this.formatMessage('addFolder'),
      event: (evt) => {addPageWithType('folder'); evt.stopPropagation(); },
      visible: true
    })
    dropDownItems.push(addFolderItem);
    return dropDownItems;
  }

  renderPageItemRightContent = (itemJson) => {
    const {theme, onDefaultClick} = this.props;
    const {data, id} = itemJson;
    const visibleIcon = require('jimu-ui/lib/icons/visible.svg');
    const inVisibleIcon = require('jimu-ui/lib/icons/invisible.svg');

    let dropDownItems = this.getMoreDropDownItems(itemJson);

    const rightCss = css`
      margin-right: calc(16px - ${theme.components.button.sizes.sm.paddingX});
      .page-item-visible-btn {
        display: ${data.isVisible ? 'none' : 'inline-flex'};
        color: ${!data.isVisible ? theme.colors.black : theme.colors.grays.gray600};
      }

      .page-item-visible-btn:hover {
        color: ${theme.colors.black};
      }

      .page-item-home-btn {
        display: ${itemJson.showDefault && data.isDefault ? 'inline-flex' : 'none'};
        color: ${itemJson.showDefault && data.isDefault ?  theme.colors.black : theme.colors.grays.gray600};
      }

      .page-item-home-btn:hover {
        color:${theme.colors.black};
      }

      .dropDown {
        display: inline-flex;
        .btn {
          color: ${theme.colors.grays.gray600};
          display: none;
        }
        .btn:hover {
          color: ${theme.colors.black};
        }
      }

    `

    return (
      <div className="d-flex" css={rightCss}>
        <Button title={this.formatMessage('makeHome')} size={'sm'} icon
          color={'link'} className=" page-item-home-btn page-item-icon"
          onClick={evt => {
            evt.stopPropagation();
            if (data.isDefault) return;
            onDefaultClick(data.id)
          }}>
          <Icon size={12} icon={require('jimu-ui/lib/icons/home.svg')} />
        </Button>
        <Button title={data.isVisible ? this.formatMessage('hideFromMenu') : this.formatMessage('showFromMenu')} size={'sm'} color={'link'}
          className="page-item-visible-btn page-item-icon" icon
          onClick={evt => {
            evt.stopPropagation();
            getAppConfigAction().editPageProperty(data.id, 'isVisible', !itemJson.data.isVisible).exec();
          }}>
          <Icon size={12} icon={data.isVisible ? visibleIcon : inVisibleIcon} />
        </Button>
        <div title={this.formatMessage('more')} className="dropDown page-item-icon">
          <MyDropDown uId={id} theme={theme} items={dropDownItems} />
        </div>
      </div>
    )
  }

  renderPageContent = (itemJson) => {
    const {intl, theme, editablePageItemId} = this.props;
    const {isTocDragging, tocDraggingStatus} = this.state;
    const tocCss = css`
      :hover {
        .dropDown {
          .btn {
            display: ${isTocDragging ? 'none' : 'inline-flex'};
          }
          z-index: 2;
        }
        .page-item-visible-btn {
          display: ${isTocDragging ? 'none' : 'inline-flex'};
          z-index: 2;
        }
        .page-item-home-btn {
          display: ${itemJson.showDefault ? (isTocDragging ? 'none' : 'inline-flex') : 'none'};
          z-index: 2;
        }
      }
    `
    return (
      <DndTocContent intl={intl} itemJson={itemJson} theme={theme} canDnd={true} keepWidthInParent={true} isFirstItem={this.getFirstItemJson().id === itemJson.id}
        editable={editablePageItemId === itemJson.id} tocCss={tocCss} onArrowClick={this.handleArrowClick} isLastItem={this.getLastItemJson().id === itemJson.id}
        isTocDragging={isTocDragging} onTocDragStatusChage={this.handleOnTocDragStatusChange} tocDraggingStatus={tocDraggingStatus}
        renderRightContent={this.renderPageItemRightContent} renameItem={this.renamePage} parentBoundRect={this.treeRef ? this.treeRef.getBoundingClientRect() : undefined}
        canDropIntoFunc={this.canDropIntoFunc} onDidDrop={this.onDidDrop} canDragFunc={this.canDragFunc}
        canDropFunc={this.canDropFunc} canOrderFunc={this.canOrderFunc} onDoubleClick={this.handleOnTocDoubleClick}
      />
    )
  }

  render() {
    const {itemJson, showSearch, willRemovePage, isShowLinkSetting} = this.state;
    const {theme, appConfig} = this.props;
    const paddingLR = 16;
    const style = css`
      height: 100%;
      position: relative;
      .toc-dropzone {
        position: absolute;
        pointer-events: none;
      }
      .page-list-top {
        padding: 10px ${paddingLR}px;
        .page-top-btns {
          margin-right: -${theme.components.button.sizes.sm.paddingX};
          .page-title {
            user-select: none;
          }
          .btn-link:hover {
            svg {
              color: ${theme.colors.black};
            }
            .add-page-icon {
              color: ${theme.colors.cyans.cyan500};
            }
          }
          .my-dropdown {
            margin-left: -5px;
            margin-right: 5px;
          }
        }
        .search-btn:hover {
          svg {
            color: ${theme.colors.black};
          }
        }
        .toc-search-input {
          border-color: ${showSearch ? theme.colors.grays.gray300 : 'transparent'};
          background: transparent;
          opacity: ${showSearch ? 1 : 0};
          width: 150px;
        }
        .toc-search-input:focus {
          border-color: ${theme.colors.primary};
        }
        .top-line {
          height: 1px;
          width: 100%;
          background-color: ${theme.colors.grays.gray200};
          margin-top: 16px;
        }
      }
      .page-tree {
        height: calc(100% - 65px);
        overflow-y: auto;
        margin-top: 6px;
        .toc-item-dropzone {
          .toc-item {
            padding-left: calc(${paddingLR}px - ${theme.components.button.sizes.sm.paddingX});
          }
        }
      }
    `
    return(
      <div css={style}>
        <div ref={dom => this.dropZoneRef = dom}
          className={`toc-dropzone h-100 w-100`}
        />
        <div className="page-list-top">
          <div className="d-flex justify-content-between w-100">
            {/* <div className="page-title h4">{this.formatMessage('page')}</div> */}
            <div className="d-flex">
              <Button title={this.formatMessage('search')} icon size={'sm'} color={'link'} className="search-btn" onClick={this.handleSearchBtnClick}>
                <Icon className="search-icon" size={16} color={theme.colors.grays.gray500} icon={require('jimu-ui/lib/icons/search-16.svg')} />
              </Button>
              <SearchBox theme={theme}
                placeholder={this.formatMessage('search')}
                searchText={this.state.filterText}
                onSearchTextChange={this.handleSearchTextChange}
                onSubmit={this.handleSearchSubmit}
                hideSearchIcon={true}
                inputRef={(node: HTMLInputElement) => this.searchInput = node}
                onFocus={evt => this.setState({ showSearch: true })}
              />
            </div>

            <div className="d-flex page-top-btns">
              {/* <Button
              ref={this.popoverRef}
              onClick={this.onExportClick} size={'sm'} color={'link'} className="add-page-btn">
              test
            </Button> */}
              <Button
                icon
                disabled={!appConfig}
                onClick={this.handleToggleTemplatePopover}
                title={this.formatMessage('addPage')} size={'sm'} color={'link'} className="add-page-btn">
                <Icon className="add-page-icon" size={16} color={theme.colors.cyans.cyan400} icon={require('jimu-ui/lib/icons/add-16.svg')} />
              </Button>
              <MyDropDown
                items={this.getAddPageDropDownItems()}
                theme={theme}
                disabled={!appConfig}
                uId={'add-page-type'}
                direction="bottom-start"
                icon={<Icon className="add-page-more-icon" size={8} color={theme.colors.grays.gray600} icon={require('jimu-ui/lib/icons/arrow-down-8.svg')}
                />}
              />
            </div>
          </div>
          <div className="top-line" />
        </div>
        <Tree
          forwardRef={(ref: HTMLDivElement) => {this.treeRef = ref}}
          className="page-tree"
          hideRoot={HideRoot}
          itemJson={Immutable(itemJson)}
          onClickItem={this.handleClickItem}
          handleExpand={this.handleExpand}
        />
        
        {
          appConfig &&
          <TemplatePopover theme={theme} toggle={this.handleToggleTemplatePopover}
            title={this.formatMessage('newPage')} description={this.formatMessage('chooseTemplate')}
            isOpen = {this.state.isTemplatePopoverOpen} template={appConfig.template}
            onSelected={this.handleChooseTemplate} intl={this.props.intl} />
        }
        {willRemovePage && 
          <CommonModal theme={theme} toggle={this.handleToggleRemovePopover}
            onClosed={(isOK: boolean) => {
              if(settingLinkId === willRemovePage.id){
                this.setState({
                  isShowLinkSetting: false
                })
              }
              isOK && willRemovePage && this.props.removePage(willRemovePage.id)
            }}
            title={this.formatMessage('tip')}
            isOpen = {this.state.isRemovePopoverOpen} intl={this.props.intl}>
              <div style={{ fontSize: theme.typography.fontSizeSm }}>
                {this.formatMessage('removePageTip', {subCount: this.getWillRemovePageSubCount(), label: willRemovePage.label})}
              </div>
          </CommonModal>
        }
        {isShowLinkSetting && 
        <LinkSettingPopup showDialog={isShowLinkSetting}
          isLinkPageSetting={true}
          title={appConfig.pages[settingLinkId].label}
          pisition="right"
          linkParam={linkParam}
          onSettingCancel={() => {this.setState({ isShowLinkSetting: false}); }}
          onSettingConfirm={this.handleSettingLinkConfirm}>
        </LinkSettingPopup>}
      </div>

    )
  }

  getWillRemovePageSubCount = () => {
    const {appConfig} = this.props;
    const {willRemovePage} = this.state;
    if(!appConfig || !willRemovePage)return 0;
    const ps = appConfig.pageStructure.find(ps => Object.keys(ps)[0] === willRemovePage.id);
    if(!ps)return 0;
    return ps[willRemovePage.id].length;
  }

  onExportClick = (evt) => {
    let {appConfig, currentPageItemId} = this.props;
    const pageJson = appConfig.pages[currentPageItemId];
    // for page remplates
    const pageTemplates = [
      {
        layout: pageJson.layout,
        layouts: appConfig.layouts,
        widgets: appConfig.widgets,
        views: appConfig.views,
        sections: appConfig.sections,
        name: 'Column layout',
        description: 'Align widgets by columns',
        thumbnail: './thumbnails/image2.png'
      }
    ]

    const template0 = pageTemplates[0];
    template0.layouts && Object.keys(template0.layouts).forEach(layoutId => {
      let layoutJson = template0.layouts[layoutId].without('id');
      layoutJson.content && Object.keys(layoutJson.content).forEach(lEId => {
        const lEJson = (layoutJson.content[lEId] as any).without('id');
        layoutJson = layoutJson.setIn(['content', lEId], lEJson);
      })
      template0.layouts = template0.layouts.set(layoutId, layoutJson);
    })

    template0.widgets && Object.keys(template0.widgets).forEach((wId, index) => {
      const wJson = template0.widgets[wId];
      template0.widgets = template0.widgets.set(wId, wJson.without('context', 'icon', 'label', 'manifest', '_originManifest',
       'version', 'useDataSources', 'id', 'useDataSourcesEnabled'))
    })

    template0.sections && Object.keys(template0.sections).forEach((sId, index) => {
      const sJson = template0.sections[sId];
      template0.sections = template0.sections.set(sId, sJson.without('id', 'label'));
    })

    template0.views && Object.keys(template0.views).forEach((vId, index) => {
      const vJson = template0.views[vId];
      template0.views = template0.views.set(vId, vJson.without('id', 'label'));
    })
    console.log(JSON.stringify({pages: pageTemplates}));
  }
}