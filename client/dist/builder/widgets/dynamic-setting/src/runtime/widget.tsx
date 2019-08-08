/** @jsx jsx */
import {BaseWidget, IMState, AllWidgetProps, IMRuntimeInfos, Selection, LayoutInfo, lodash,
  LayoutItemType, IMAppConfig, css, jsx, urlUtils, PageType, polished, PageMode, BrowserSizeMode, getAppStore} from 'jimu-core';
import WidgetSetting from './widget-setting';
import PageSetting from './page-setting';
import LinkSetting from './link-setting';
import FolderSetting from './folder-setting';
import SectionSetting from './section-setting';
import LayoutItemSetting from './layout-item-setting';
import {MessageSetting} from './action-setting';
import {Tabs, Tab, Icon, Button} from 'jimu-ui';
import {getAppConfigAction} from 'jimu-for-builder';
import {layoutUtils} from 'jimu-layouts/common';
import defaultMessages from './translations/default';
import React = require('react');

interface ExtraProps{
  widgetsSettingRuntimeInfo: IMRuntimeInfos;
  currentPageId: string;
  pageMode: PageMode;
  maxPageWidth: number;
  currentDialogId: string;
  currentViewId: string;
  selection: Selection;
  browserSizeMode: BrowserSizeMode;
}

interface Stats {
  titleLength: number;
  titleText: string;
}

export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, Stats>{

  titleTextInput = React.createRef<HTMLInputElement>();
  spanTextInput = React.createRef<HTMLSpanElement>();


  static mapExtraStateProps = (state: IMState): ExtraProps => {
    const currentPageId = state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentPageId;
    let pageMode;
    let maxPageWidth;
    if (currentPageId) {
      pageMode = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.mode`);
      maxPageWidth = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.maxWidth`);
    }
    return {
      currentPageId,
      pageMode,
      maxPageWidth,
      widgetsSettingRuntimeInfo: state.builder.widgetsSettingRuntimeInfo,
      currentDialogId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentDialogId,
      selection: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.selection,
      currentViewId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentViewId,
      browserSizeMode: state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
    }
  };

  constructor(props){
    super(props);
    this.titleTextInput = React.createRef();
    this.spanTextInput = React.createRef();
    const alterState = {
      titleLength: 0,
      titleText: undefined
    }

    const {selection, appConfig, editingSectionId, currentPageId} = props;
    if(selection){
      let layoutItem = layoutUtils.findLayoutItem(appConfig, selection);

      if(layoutItem){
        if(layoutItem.type === LayoutItemType.Widget){
          if(layoutItem.widgetId){
            alterState.titleText = appConfig.widgets[layoutItem.widgetId].label;
          }
        }else if(layoutItem.type === LayoutItemType.Section){
          alterState.titleText = appConfig.sections[layoutItem.sectionId].label;
        }
      }
    }else {
      if(!editingSectionId && currentPageId){
        alterState.titleText = appConfig.pages[currentPageId].label;
      }
    }
    this.state = alterState;
  }

  componentDidUpdate(){
    if (this.spanTextInput.current && this.state.titleLength !== this.spanTextInput.current.offsetWidth) {
      this.setState({
        titleLength: this.spanTextInput.current.offsetWidth + 2
      });
    }
  }

  componentWillReceiveProps(nextProps){
    const {selection, editingSectionId, currentPageId} = nextProps;
    const appConfig = this.getAppConfig();
    if(selection){
      let layoutItem = layoutUtils.findLayoutItem(appConfig, selection);

      if(layoutItem){
        if(layoutItem.type === LayoutItemType.Widget){
          if(layoutItem.widgetId){
            this.setState({
              titleText: appConfig.widgets[layoutItem.widgetId].label
            })
          }
        }else if(layoutItem.type === LayoutItemType.Section){
          this.setState({
            titleText: appConfig.sections[layoutItem.sectionId].label
          })
        }
      }
    }else {
      if(!editingSectionId && currentPageId && appConfig){
        this.setState({
          titleText: appConfig.pages[currentPageId].label
        })
      }
    }
  }

  getCss(){
    const {theme} = this.props;
    const tabH = 40;
    return css`
      height: 100%;
      overflow: hidden;
      overflow-x: hidden;
      .jimu-widget-setting--row {
        label {
          user-select: none;
        }
      }
      .jimu-widget-setting--section-header {
        user-select: none;
      }
      .tab-content {
        height: calc(100% - ${polished.rem(tabH)});
        overflow: auto;
        overflow-x: hidden;
      }
      .tab-pane{
        width: 100%;
      }

      .tab-title-item{
        width: 30%;
      }

      .header-title-input {
        border: none;
        min-width: ${polished.rem(20)};
        width: ${this.state.titleLength}px;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 0;
        text-overflow: ellipsis;
        cursor: pointer;
        color: ${theme.colors.black};
        background-color: transparent;
        max-width: ${polished.rem(200)};
        &:focus {
          background-color: ${theme.colors.white};
        }

        &:hover {
          border: 1px solid ${theme.colors.grays.gray300};
        }
      }

      .setting-container {
        overflow: auto;
      }
    `;
  }

  onLayoutSettingChanged = (layoutInfo: LayoutInfo, setting) => {
    getAppConfigAction().editLayoutItemSetting(layoutInfo, setting).exec();
  }

  onLayoutPosChanged = (layoutInfo: LayoutInfo, bbox) => {
    getAppConfigAction().editLayoutItemBBox(layoutInfo, bbox).exec();
  }

  getPageType = (id: string, pages: any) => {
    for(let index in pages){
      let page = pages[index];
      if(page.id === id){
        return page;
      }
    }
    return {};
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  handleTitleInputBlur = (e: any, id: string, type: 'widget' | 'section' | 'page') => {
    this.editTitle(id, e.target.value, type);
  }

  editTitle = (id: string, newTitle: string , type: 'widget' | 'section' | 'page') => {
    if(type === 'widget'){
      getAppConfigAction().editWidgetProperty(id, 'label', newTitle).exec();
    }else if(type === 'section'){
      getAppConfigAction().editSectionProperty(id, 'label',  newTitle).exec();
    }else if(type === 'page'){
      getAppConfigAction().editPageProperty(id, 'label',  newTitle).exec();
    }
  }

  handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      this.titleTextInput.current.blur()
    } else {
      return
    }
  }

  focusEditTitle = (e) => {
    if(this.titleTextInput.current){
      this.titleTextInput.current.select();
      this.titleTextInput.current.focus();
    }
  }

  getAppConfig(): IMAppConfig{
    return getAppStore().getState().appStateInBuilder && getAppStore().getState().appStateInBuilder.appConfig;
  }

  render(){
    const appConfig = this.getAppConfig();
    const {selection} = this.props;
    if(!appConfig){
      return <div css={this.getCss()} className="builder-dynamic-setting bg-gray-100">
        {<PageSetting dispatch={this.props.dispatch} formatMessage={this.formatMessage} theme={this.props.theme}
        pageId={'empty'} browserSizeMode={this.props.browserSizeMode}
        ></PageSetting>}
      </div>;
    }


    let display = {
      widget: false,
      section: false,
      layoutItem: false,
      page: false,
      link: false,
      folder: false,
      dialog: false,
      noSelection: false,
    }

    if(selection){
      let layoutItem = layoutUtils.findLayoutItem(appConfig, selection);

      if(layoutItem){
        if(layoutItem.type === LayoutItemType.Widget){
          if(layoutItem.widgetId){
            display.widget = true;
          }else{
            //it's place holder
            display.layoutItem = true;
          }
        }else if(layoutItem.type === LayoutItemType.Section){
          display.section = true;
        }else{
          display.layoutItem = true;
        }
      }else{
        display.noSelection = true;
      }
    }

    if(!selection){
      if(this.props.currentPageId){
        display.page = true;
        display.link = this.getPageType(this.props.currentPageId, appConfig.pages).type === PageType.Link;
        display.folder = this.getPageType(this.props.currentPageId, appConfig.pages).type === PageType.Folder;
      }else if(this.props.currentDialogId){
        display.dialog = true;
      }else{
        display.noSelection = true;
      }
    }


    let settingContent;
    if(display.widget){
      let layoutItem = layoutUtils.findLayoutItem(appConfig, selection);
      if(!appConfig.widgets[layoutItem.widgetId]){
        settingContent = <div>{this.formatMessage('noSelection')}</div>;
      }else{
        let widgetManifest = appConfig.widgets[layoutItem.widgetId].manifest;
        if(widgetManifest.properties.hasConfig && widgetManifest.properties.hasConfigInSettingPage){
          settingContent = <Tabs key="widget-setting" className="flex-grow-1 w-100 h-100" fill>
            <Tab title={this.formatMessage('content')} active={true} className="tab-title-item">
              <WidgetSetting formatMessage={this.formatMessage} dispatch={this.props.dispatch} widgetId={layoutItem.widgetId}
                widgetsSettingRuntimeInfo={this.props.widgetsSettingRuntimeInfo}>
              </WidgetSetting>
            </Tab>

            <Tab title={this.formatMessage('style')} className="tab-title-item">
              <div style={{overflow: 'auto', overflowX: 'hidden'}}>
                <LayoutItemSetting layoutId={selection.layoutId} layoutItemId={selection.layoutItemId}
                formatMessage={this.formatMessage}
                onSettingChanged={this.onLayoutSettingChanged} onPosChanged={this.onLayoutPosChanged}/>
              </div>
            </Tab>

            <Tab title={this.formatMessage('action')} className="tab-title-item">
              <div style={{overflow: 'auto', overflowX: 'hidden'}}>
                <MessageSetting widgetId={layoutItem.widgetId} formatMessage={this.formatMessage}
                  pageId={urlUtils.getAppIdPageIdFromUrl().pageId}/>
              </div>
            </Tab>
          </Tabs>;
        }else{
          settingContent = <div className="h-100">
            <LayoutItemSetting layoutId={selection.layoutId} layoutItemId={selection.layoutItemId}
            formatMessage={this.formatMessage}
            onSettingChanged={this.onLayoutSettingChanged} onPosChanged={this.onLayoutPosChanged}/>
          </div>;
        }

        settingContent = <div className="w-100 h-100 d-flex flex-column">
          <div className="jimu-widget-setting--header d-flex align-items-center">
            <input className="header-title-input h4" ref={this.titleTextInput}
              value={this.state.titleText}
              onChange={evt => this.setState({titleText: evt.target.value})}
              onBlur={e => this.handleTitleInputBlur(e, layoutItem.widgetId, 'widget')}
              onKeyDown ={ (e) => this.handleKeydown(e) }>
            </input>
            <Button size="sm" color="dark" text icon className="ml-2" onClick={this.focusEditTitle}>
              <Icon icon={require('jimu-ui/lib/icons/tool-edit.svg')} className="header-title-icon"/>
            </Button>
            <span className="px-1 border font-weight-normal h4" style={{position: 'absolute', opacity: 0, whiteSpace: 'nowrap', zIndex: -1}} ref={this.spanTextInput}>
              {this.state.titleText}
            </span>
          </div>
          {/* <h4 className="jimu-widget-setting--header">
            {appConfig.widgets[layoutItem.widgetId].label}
          </h4> */}
          <div className="bg-gray-100" style={{height: 'calc(100% - 51px)'}}>{settingContent}</div>
        </div>
      }
    }

    if(display.layoutItem){
      let title = this.formatMessage('layout');

      settingContent = <div className="w-100 h-100 d-flex flex-column">
          <h4 className="jimu-widget-setting--header">
            {title}
          </h4>
          <div className="h-100" style={{overflow: 'auto', overflowX: 'hidden'}}>
            <LayoutItemSetting layoutId={selection.layoutId} layoutItemId={selection.layoutItemId}
            formatMessage={this.formatMessage}
            onSettingChanged={this.onLayoutSettingChanged} onPosChanged={this.onLayoutPosChanged}/>
          </div>
      </div>;
    }
    if(display.section){
      const layoutItem = layoutUtils.findLayoutItem(appConfig, selection);
      const section = appConfig.sections[layoutItem.sectionId];
      settingContent = <Tabs className="flex-grow-1 h-100" fill>
        <Tab key="section-setting" title={this.formatMessage('content')} active={true}>
          <SectionSetting formatMessage={this.formatMessage} theme={this.props.theme} dispatch={this.props.dispatch} sectionId={section.id}>
          </SectionSetting>
        </Tab>

        <Tab title={this.formatMessage('general')}>
        <div className="h-100" style={{overflow: 'auto', overflowX: 'hidden'}}>
          <LayoutItemSetting layoutId={selection.layoutId} layoutItemId={selection.layoutItemId}
          formatMessage={this.formatMessage}
          onSettingChanged={this.onLayoutSettingChanged} onPosChanged={this.onLayoutPosChanged}/>
        </div>

        </Tab>
      </Tabs>;
      settingContent = <div className="w-100 h-100 d-flex flex-column">
        <div className="jimu-widget-setting--header d-flex align-items-center">
          <input className="header-title-input h4" ref={this.titleTextInput}
            value={this.state.titleText}
            onChange={evt => this.setState({titleText: evt.target.value})}
            onBlur={e => this.handleTitleInputBlur(e, section.id, 'section')}
            onKeyDown ={ (e) => this.handleKeydown(e) }>
          </input>
          <Button size="sm" color="dark" text icon className="ml-2" onClick={this.focusEditTitle}>
            <Icon icon={require('jimu-ui/lib/icons/tool-edit.svg')} className="header-title-icon"/>
          </Button>
          <span className="px-1 border font-weight-normal h4" style={{position: 'absolute', opacity: 0, whiteSpace: 'nowrap', zIndex: -1}} ref={this.spanTextInput}>
              {this.state.titleText}
            </span>
        </div>
        {/* <h4 className="jimu-widget-setting--header">
          {appConfig.sections[section.id].label}
        </h4> */}
        <div style={{overflow: 'auto', overflowX: 'hidden'}}>{settingContent}</div>
      </div>;
    }
    if(display.page){
      settingContent = <PageSetting dispatch={this.props.dispatch} formatMessage={this.formatMessage}
      pageId={this.props.currentPageId} pageMode={this.props.pageMode} maxWidth={this.props.maxPageWidth}
      browserSizeMode={this.props.browserSizeMode} theme={this.props.theme}></PageSetting>;
      if(display.link){
        settingContent = <LinkSetting dispatch={this.props.dispatch} appConfig={appConfig} formatMessage={this.formatMessage} pageId={this.props.currentPageId}></LinkSetting>;
      }else if(display.folder){
        settingContent = <FolderSetting dispatch={this.props.dispatch} appConfig={appConfig} formatMessage={this.formatMessage} pageId={this.props.currentPageId}></FolderSetting>;
      }
      const {currentPageId} = this.props;
      settingContent = <div className="w-100 h-100 d-flex flex-column">
        <div className="jimu-widget-setting--header d-flex align-items-center">
          <input className="header-title-input h4" ref={this.titleTextInput}
            value={this.state.titleText}
            onChange={evt => this.setState({titleText: evt.target.value})}
            onBlur={e => this.handleTitleInputBlur(e, currentPageId, 'page')}
            onKeyDown ={ (e) => this.handleKeydown(e) }>
          </input>
          <Button size="sm" color="dark" text icon className="ml-2" onClick={this.focusEditTitle}>
            <Icon icon={require('jimu-ui/lib/icons/tool-edit.svg')} className="header-title-icon"/>
          </Button>
          <span className="px-1 border font-weight-normal h4" style={{ position: 'absolute', opacity: 0, whiteSpace: 'nowrap', zIndex: -1}} ref={this.spanTextInput}>
              {this.state.titleText}
            </span>
        </div>
        {/* <h4 className="jimu-widget-setting--header">
          {appConfig.sections[section.id].label}
        </h4> */}
        <div className="h-100" style={{overflow: 'auto', overflowX: 'hidden'}}>{settingContent}</div>
      </div>;
    }
    if(display.dialog){
      settingContent = <div className="h-100">dialog</div>;
    }
    if(display.noSelection){
      settingContent = <div className="h-100">{this.formatMessage('noSelection')}</div>;
    }

    return <div css={this.getCss()} className="builder-dynamic-setting bg-gray-100">
      {settingContent}
    </div>;
  }

  // FOR DEMO:
  onToggleMe = () => {
    let rightToggle = document.getElementsByClassName('sidebar_handler_right');
    if(rightToggle) {
      (rightToggle[0] as HTMLElement).click();
    }
  }

}
