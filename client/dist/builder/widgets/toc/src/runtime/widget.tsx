/** @jsx jsx */
import {
  BaseWidget, IMPageJson, IMState, AllWidgetProps, appConfigUtils, React, Immutable,
 Selection, IMAppConfig, ImmutableObject, BrowserSizeMode, polished, PageType
} from 'jimu-core';
import {getAppConfigAction, builderAppSync, appConfigUtils as appConfigUtilsForBuilder} from 'jimu-for-builder';
import { css, jsx, ThemeVariables, SerializedStyles } from 'jimu-core';
import { Icon, Button } from 'jimu-ui';
import PageList from './components/page-toc-list';
import defaultMessages from './translations/default';
import OutlineList, { OutlineType, OutlineItemJson, TocItemIdSplite } from './components/outline-list';

interface ExtraProps{
  currentPageId: string;
  currentDialogId: string;
  appConfig: IMAppConfig;
  browserSizeMode: BrowserSizeMode;
}

interface WState{
  editablePageItemId: string;
  editableOutlineItemId: string;
  isTemplatePopoverOpen: boolean;
}

export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, WState>{

  popoverRef: any;
  chooseTemplateStr: string;
  newPageStr: string;
  contentUpperStr: string;
  pagesUpperStr: string;
  bodyUpperStr: string;
  loadingStr: string;
  addPageStr: string;
  addLinkStr: string;
  addFolderStr: string;

  constructor(props){
    super(props);
    this.state = {
      editablePageItemId: '',
      editableOutlineItemId: '',
      isTemplatePopoverOpen: false
    }
    this.popoverRef = React.createRef();
    this.chooseTemplateStr = this.props.intl.formatMessage({id: 'chooseTemplate', defaultMessage: defaultMessages.chooseTemplate});
    this.newPageStr = this.props.intl.formatMessage({id: 'newPage', defaultMessage: defaultMessages.newPage});
    this.pagesUpperStr = this.props.intl.formatMessage({id: 'pages_upper', defaultMessage: defaultMessages.pages_upper});
    this.contentUpperStr = this.props.intl.formatMessage({id: 'content_upper', defaultMessage: defaultMessages.content_upper});
    this.bodyUpperStr = this.props.intl.formatMessage({id: 'body_upper', defaultMessage: defaultMessages.body_upper});
    this.loadingStr = this.props.intl.formatMessage({id: 'tocLoading', defaultMessage: defaultMessages.tocLoading});
    this.addPageStr = this.props.intl.formatMessage({id: 'addPage', defaultMessage: defaultMessages.addPage});
    this.addLinkStr = this.props.intl.formatMessage({id: 'addLink', defaultMessage: defaultMessages.addLink});
    this.addFolderStr = this.props.intl.formatMessage({id: 'addFolder', defaultMessage: defaultMessages.addFolder});

  }

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      currentPageId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentPageId,
      currentDialogId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentDialogId,
      appConfig: state.appStateInBuilder && state.appStateInBuilder.appConfig,
      browserSizeMode: state.appStateInBuilder && state.appStateInBuilder.browserSizeMode
    }
  }

  emptyLayout = {};

  handleOutlineItemClick = (itemJson: OutlineItemJson) => {
    if(itemJson.type === OutlineType.Label){
      return;
    }else if(itemJson.type === OutlineType.Section || itemJson.type === OutlineType.Widget){
      this.changeWidgetOrSection(itemJson)
    }else if(itemJson.type === OutlineType.View){
      this.changeView(itemJson);
    }else if(itemJson.type === OutlineType.Layout){
      this.changeLayout(itemJson);
    }
  }

  changeCurrentPage = (pageId: string) => {

    this.changeSelection(null);
    builderAppSync.publishPageChangeToApp(pageId);
  }

  changeEditablePageId = (pageId: string) => {
    if(pageId !== this.state.editablePageItemId){
      this.setState({
        editablePageItemId: pageId
      })
    }
  }

  movePageIntoPage = (subPageId: string, parentPageId: string) => {
    if (subPageId === parentPageId) return;
    getAppConfigAction().movePageIntoPage(subPageId, parentPageId).exec();
    const {appConfig} = this.props;
    const pageJson = appConfig.pages[subPageId];
    if(pageJson.type !== PageType.Normal)return;
    this.changeCurrentPage(subPageId);
  }

  removePage = (pageId: string) => {
    let pageJson = this.props.appConfig.pages[pageId];

    let changeToPageId;
    this.props.appConfig.pageStructure.some((ps, i) => {
      let pId = Object.keys(ps)[0];
      if(pId === pageId)return false;
      if(appConfigUtilsForBuilder.isRealPage(this.props.appConfig, pId)){
        changeToPageId = pId;
        return true;
      }
    })
    if(!changeToPageId){
      this.props.appConfig.pageStructure.some((ps, i) => {
        let pId = Object.keys(ps)[0];
        if(pId === pageId) return false;
        let subPs = ps[pId];
        return !!subPs.some((subPId) => {
          if(subPId === pageId) return false;
          if(appConfigUtilsForBuilder.isRealPage(this.props.appConfig, subPId)){
            changeToPageId = subPId;
            return true;
          }
        })

      })
    }
    if(!changeToPageId)return;

    builderAppSync.publishPageChangeToApp(changeToPageId);
    getAppConfigAction().removePage(pageId).exec();

    if(pageJson.isDefault){
      getAppConfigAction().setHomePage(changeToPageId).exec();
    }
  }

  setHomePage = (pageId: string) => {
    getAppConfigAction().replaceHomePage(pageId).exec();
    // builderAppSync.publishPageChangeToApp(pageId);
  }

  duplicatePage = (pageId: string) => {
    const newPageId = appConfigUtils.getUniqueId(this.props.appConfig, 'page');
    getAppConfigAction().duplicatePage(pageId, newPageId).exec();
    const pageJson = this.props.appConfig.pages[pageId];
    if(pageJson.type !== PageType.Folder && pageJson.type !== PageType.Link)
      this.changeCurrentPage(newPageId);
  }

  renamePage = (pageId: string, newName: string) => {
    if(!newName || newName === '')return false;
    getAppConfigAction().editPageProperty(pageId, 'label', newName).exec();
    this.changeEditablePageId('');
    return true;
  }

  orderPageBelowPage = (pageId: string, topPageId: string, dropType: 'top' | 'bottom') => {
    getAppConfigAction().orderPageToPage(pageId, topPageId, dropType).exec();
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  addPageWithType = (type: 'page' | 'link' | 'folder', templatePageJson?: ImmutableObject<any>): IMPageJson => {
    let pageJson;
    switch(type){
      case 'page':
        pageJson = this.loadPageTemplate(templatePageJson);
        // switch to main device mode
        builderAppSync.publishChangeBrowserSizeModeToApp(getAppConfigAction().appConfig.mainSizeMode);
        return pageJson;
      case 'link':
        pageJson = Immutable({}).merge({
          id: appConfigUtils.getUniqueId(this.props.appConfig, 'page'),
          type: PageType.Link,
          label: appConfigUtils.getUniqueLabel(this.props.appConfig, 'page', this.formatMessage('link')),
          linkUrl: '#',
          isVisible: true,
        }) as IMPageJson;
        getAppConfigAction().addPage(pageJson).exec();
        break;

      case 'folder':
        pageJson = Immutable({}).merge({
          id: appConfigUtils.getUniqueId(this.props.appConfig, 'page'),
          type: PageType.Folder,
          label: appConfigUtils.getUniqueLabel(this.props.appConfig, 'page', this.formatMessage('folder')),
          isVisible: true,
        }) as IMPageJson
        getAppConfigAction().addPage(pageJson).exec();
        break;
    }
    // this.changeCurrentPage(pageJson.id);
    this.changeEditablePageId(pageJson.id);
    return pageJson;
  }

  loadPageTemplate = (templatePageJson?: ImmutableObject<any>): IMPageJson => {
    if(!templatePageJson || !templatePageJson.layout || !templatePageJson.layouts || Object.keys(templatePageJson.layouts).length < 1)return undefined;
    return this.parsePageTemplate(templatePageJson, this.props.appConfig);
  }


  parsePageTemplate = (templatePageJson: ImmutableObject<any>, appConfig: IMAppConfig): IMPageJson => {

    const length = Object.keys(templatePageJson.layouts).length;
    const ids = this.getUniqueIds(appConfig, 'layout', length);
    Object.keys(templatePageJson.layouts).forEach((lId, index) => {
      const lJson = templatePageJson.layouts[lId];
      templatePageJson = templatePageJson.setIn(['layouts', lId], lJson.set('id', ids[index]));
    })

    Object.keys(templatePageJson.layout).forEach(device => {
      const lId = templatePageJson.layout[device];
      templatePageJson = templatePageJson.setIn(['layout', device], templatePageJson.layouts[lId].id);
    })

    const layouts = templatePageJson.layouts && Object.keys(templatePageJson.layouts).map(id => templatePageJson.layouts[id]);

    // Set default height of the page
    const pageHeight = {};
    const appLoaderElement = document.querySelector('div[data-widgetid="app-loader"]') as HTMLElement;
    if (appLoaderElement) {
      const appLoaderRect = appLoaderElement.getBoundingClientRect();
      pageHeight[this.props.browserSizeMode] = Math.round(appLoaderRect.height - 70); // minus header and resize handler
    }

    templatePageJson = templatePageJson.without('name', 'thumbnail', 'id', 'widgets', 'views', 'sections', 'layouts', 'description');
    const pageJson = Immutable({}).merge({
      id: appConfigUtils.getUniqueId(this.props.appConfig, 'page'),
      label: appConfigUtils.getUniqueLabel(this.props.appConfig, 'page', this.formatMessage('page')),
      type: PageType.Normal,
      isVisible: true,
      heightInBuilder: pageHeight,
    }).merge(templatePageJson) as IMPageJson
    getAppConfigAction().addPage(pageJson, layouts).exec();
    this.changeCurrentPage(pageJson.id);
    this.changeEditablePageId(pageJson.id);
    return pageJson;
  }

  getUniqueIds = (appConfig: IMAppConfig, type: 'page' | 'layout' | 'widget' | 'section' | 'view', size: Number) : string[] => {
    const ids: string[] = [];
    for(let i = 0; i < size; i ++){
      const id = appConfigUtils.getUniqueId(appConfig, type);
      ids.push(id);
      appConfig = appConfig.setIn([type + 's', id], {id: id} as any);
    }
    return ids;
  }

  getUniqueLabels = (appConfig: IMAppConfig, type: 'page' | 'layout' | 'section' | 'view', size: Number) : string[] => {
    const labels: string[] = [];
    for(let i = 0; i < size; i ++){
      const id = appConfigUtils.getUniqueId(appConfig, type);
      const label = appConfigUtils.getUniqueLabel(appConfig, type, type);
      labels.push(label);
      appConfig = appConfig.setIn([type + 's', id], {id: id, label: label} as any);
    }
    return labels;
  }

  changeSelection = (selection: Selection) => {
    builderAppSync.publishChangeSelectionToApp(selection);
  }

  changeWidgetOrSection = (itemJson: OutlineItemJson) => {
    const strs = itemJson.id.split(TocItemIdSplite);
    this.changeSelection({layoutId: strs[0], layoutItemId: strs[1]});
  }

  changeView = (itemJson: OutlineItemJson) => {
    const strs = itemJson.id.split(TocItemIdSplite); // layoutId layoutItemId sectionId viewId
    builderAppSync.publishViewChangeToApp(strs[0], strs[1])
  }

  changeLayout = (itemJson: OutlineItemJson) => {

  }

  getCurrentPageId = (): string => {
    let changeToPageId;
    this.props.appConfig.pageStructure.some((ps, i) => {
      let pId = Object.keys(ps)[0];
      if(appConfigUtilsForBuilder.isRealPage(this.props.appConfig, pId)){
        changeToPageId = pId;
        return true;
      }
    })
    if(!changeToPageId){
      this.props.appConfig.pageStructure.some((ps, i) => {
        let pId = Object.keys(ps)[0];
        let subPs = ps[pId];
        return subPs.some((subPId) => {
          if(appConfigUtilsForBuilder.isRealPage(this.props.appConfig, subPId)){
            changeToPageId = subPId;
            return true;
          }
        })

      })
    }
    builderAppSync.publishPageChangeToApp(changeToPageId);
    return changeToPageId;
  }

  renderActionBtn = (title: string, icon: React.ComponentClass<React.SVGAttributes<SVGElement>>, actionFunc: () => void) => {
    return <Button title={title} size={'sm'} color={'link'} className=" rounded icon page-action-btn" onClick={actionFunc}><Icon size={12} icon={icon} ></Icon></Button>
  };

  PageListWrapper = () => {
    //let pId = pageJson.id;
    return <PageList  appConfig={this.props.appConfig} onDefaultClick={this.setHomePage} addPageWithType={this.addPageWithType}
                     editablePageItemId={this.state.editablePageItemId} theme={this.props.theme} changeEditablePageItemId={this.changeEditablePageId}
                     currentPageItemId={this.props.currentPageId} removePage={this.removePage} intl={this.props.intl}
                     duplicatePage={this.duplicatePage} renamePage={this.renamePage} reOrderPage={this.orderPageBelowPage}
                     onClickPage={this.changeCurrentPage} movePageIntoPage={this.movePageIntoPage} browserSizeMode={this.props.browserSizeMode} />;
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      overflow: hidden;

      .page-toc {
        background-color: ${polished.rgba(theme.colors.grays.gray100, 0.7)};
      }

      .outline-toc {
        background-color: ${theme.colors.grays.gray100};
        border: 0;
        border-top: 1px solid ${theme.colors.grays.gray300};
      }

      .toc-list-header{
        padding: 10px 16px;
        &.header{
          padding-bottom: 0;
          padding-top: 10px;
        }
        &.footer{
          padding-bottom: 0;
          padding-top: 10px;
        }
        .page-action-btn {
          margin-left:0.5rem;
          >.jimu-icon{
            fill: ${theme.colors.grays.gray800};
            margin: auto;
          }
          &:hover {
            color: ${theme.colors.black};
            cursor: pointer;
            svg {
              fill: ${theme.colors.black};
            }
          }

          &:active {
            color: ${theme.colors.black};
            svg {
              fill: ${theme.colors.black};
            }
          }

        }

        .btn-primary {
          background-color: ${theme.colors.cyans.cyan300};
          border-color: ${theme.colors.cyans.cyan300};
        }

        .btn-primary:hover {
          background-color: ${theme.colors.cyans.cyan200};
          border-color: ${theme.colors.cyans.cyan200};
        }
        .add-page-btn {
          font-size: 0.7rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          &:hover {
            svg {
              fill: ${theme.colors.black};
            }
          }
        }
      }

    `
  }

  render(){
    const {PageListWrapper} = this;
    const {appConfig, currentPageId, browserSizeMode} = this.props;

    return <div css={this.getStyle(this.props.theme)} className="jimu-widget widget-builder-toc bg-white w-100 h-100">
            <div className="page-toc h-50">
              <PageListWrapper />
            </div>
            <div className="outline-toc h-50">
              <OutlineList appConfig={appConfig} currentPageId={currentPageId} browserSizeMode={browserSizeMode}
                onClickItem={this.handleOutlineItemClick}
                editableOutlineItemId={this.state.editableOutlineItemId} theme={this.props.theme} intl={this.props.intl}/>
            </div>

          </div>;
  }
}


