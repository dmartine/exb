/** @jsx jsx */
import {
  BaseWidget, React, IMState, WidgetJson, UrlParameters, queryString, IMAppConfig, urlUtils,
  BrowserSizeMode, Immutable, lodash, Size, utils, SizeModePageHeightInBuilder, IMPageJson, AppMode,
  AllWidgetProps, appConfigUtils, WidgetManager, classNames, jsx, css, PageMode
} from 'jimu-core';
import {interact} from 'jimu-core/dnd';
import {ChooseWidgetPopup, builderActions, appStateActions, AppResourceManager, getAppConfigAction} from 'jimu-for-builder';
import { Icon } from 'jimu-ui';
import { getStyle } from './style';
import { SyncLayoutButton } from './components/sync-layout-button';
import defaultMessages from './translations/default';

interface ExtraProps{
  showChooseWidgetPopup: boolean;
  currentAppId: string;
  currentPageId: string;
  pageMode: PageMode;
  pageWidth: number;
  viewportSize: Size;
  pageHeightInBuilder: number;
  sizeModePageHeight: SizeModePageHeightInBuilder;
  // minHeight: number;
  currentDialogId: string;

  currentViewId: string;

  appConfig: IMAppConfig;
  appMode: AppMode;

  browserSizeMode: BrowserSizeMode;
}

interface State{
  zoomScale: number;
  appUrl: string;

  isPortrait: boolean;
}

//portrait
// const PHONE_SIZE = {
//   top: 60,
//   bottom: 40,
//   width: 340, // CONSTANTS.BREAK_POINTS[0],
//   height: 600
// }
// const PAD_SIZE = {
//   top: 60,
//   bottom: 40,
//   width: CONSTANTS.BREAK_POINTS[1],
//   height: 800
// }

// const minDesktopHeight = 800;

const iconDownArrow = require('jimu-ui/lib/icons/direction-down.svg');
const iconUpArrow = require('jimu-ui/lib/icons/direction-up.svg');

export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, State>{
  appIframe: HTMLIFrameElement;
  resizeRef: React.RefObject<HTMLDivElement>;
  deviceRef: React.RefObject<HTMLDivElement>;
  interactable: Interact.Interactable;

  static mapExtraStateProps = (state: IMState, ownProps?: AllWidgetProps<{}>): ExtraProps => {
    const currentPageId = lodash.getValue(state, 'appStateInBuilder.appRuntimeInfo.currentPageId');
    const browserSizeMode = state.appStateInBuilder && state.appStateInBuilder.browserSizeMode || BrowserSizeMode.Large;
    let sizeModePageHeight: SizeModePageHeightInBuilder;
    let pageHeight: number;
    let pageMode;
    let pageWidth;
    // let minHeight = 600;
    if (currentPageId) {
      sizeModePageHeight = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.heightInBuilder`);
      pageMode = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.mode`);
      pageWidth = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.width`);
    }
    if (sizeModePageHeight && sizeModePageHeight[browserSizeMode]) {
      pageHeight = sizeModePageHeight[browserSizeMode];
    }
    // switch (browserSizeMode) {
    //   case BrowserSizeMode.Phone:
    //     pageHeight = !pageHeight ? -1 : pageHeight;
    //     minHeight = PHONE_SIZE.height;
    //     break;
    //   case BrowserSizeMode.Pad:
    //     pageHeight = !pageHeight ? -1 : pageHeight;
    //     minHeight = PAD_SIZE.height;
    //     break;
    //   default:
    //     pageHeight = !pageHeight ? -1 : pageHeight;
    //     minHeight = minDesktopHeight;
    //     break;
    // }
    const viewportSize = utils.findViewportSize(
      lodash.getValue(state, 'appStateInBuilder.appConfig'),
      browserSizeMode);
    return {
      showChooseWidgetPopup: state.builder.showChooseWidgetPopup,
      currentViewId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentViewId,
      currentDialogId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentDialogId,
      currentPageId,
      pageMode,
      pageWidth,
      viewportSize,
      sizeModePageHeight,
      pageHeightInBuilder: pageHeight,
      // minHeight,
      appConfig: state.appStateInBuilder && state.appStateInBuilder.appConfig,
      currentAppId: state.builder.currentAppId,
      browserSizeMode,
      appMode: lodash.getValue(state, 'appStateInBuilder.appRuntimeInfo.appMode'),
    }
  };

  constructor(props){
    super(props);
    this.state = {zoomScale: 1, appUrl: null, isPortrait: true};
    this.resizeRef = React.createRef<HTMLDivElement>();
    this.deviceRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount(){
    this.setAppUrl();
    this.bindResizeHandler();
  }

  componentDidUpdate(){
    this.setAppUrl();
  }

  componentWillUnmount() {
    this.removeResizeHandler();
  }

  bindResizeHandler = () => {
    let initHeight, dh;
    const refObj = this.resizeRef;
    this.interactable = interact(refObj.current)
      .origin('parent')
      .resizable({
        inertia: false,
        edges: {
          bottom: '.resize-handler-bottom',
        },
        onstart: (event: Interact.InteractEvent) => {
          event.stopPropagation();
          dh = 0;
          initHeight = this.deviceRef.current.getBoundingClientRect().height;
        },
        onmove: (event: Interact.ResizeEvent) => {
          event.stopPropagation();
          const deltaRect = event.deltaRect;
          dh += deltaRect.height;
          if (!this.props.viewportSize || dh + initHeight > this.props.viewportSize.height) {
            this.deviceRef.current.style.height = `${initHeight + dh}px`;
          } else {
            // end the current action
            event.interaction.end();
            // stop all further listeners from being called
            event.stopImmediatePropagation();
          }
        },
        onend: (event: Interact.ResizeEvent) => {
          event.stopPropagation();
          let height = Math.round(initHeight + dh);
          if (this.props.viewportSize && height < this.props.viewportSize.height) {
            height = this.props.viewportSize.height;
          }

          let sizemodePageHeight: any = this.props.sizeModePageHeight || Immutable({});
          sizemodePageHeight = sizemodePageHeight.set(this.props.browserSizeMode, height);
          getAppConfigAction()
          .editPageProperty(this.props.currentPageId, 'heightInBuilder', sizemodePageHeight)
          .exec();
        }
      });
  }

  removeResizeHandler = () => {
    if (this.interactable) {
      this.interactable.unset();
      this.interactable = null;
    }
  }

  formatMessage = (id: string, values?: any) => {
    return this.props.intl.formatMessage({ id, defaultMessage: defaultMessages[id] }, values);
  }

  setAppUrl(){
    let builderPageId = urlUtils.getAppIdPageIdFromUrl().pageId;

    if(builderPageId && builderPageId !== 'default'){
      return;
    }
    let appUrl = `../stemapp/`;
    let builderQo = this.props.queryObject;
    let appQo = {draft: 'true'} as UrlParameters;
    let currentApp; //id or config

    if(builderQo.id){
      currentApp = builderQo.id;
      appUrl += this.props.queryObject.id;
    }else if(builderQo.app_config){
      currentApp = builderQo.app_config;
      appQo.config = builderQo.app_config;
    }
    appQo = Object.assign(appQo, builderQo.without('id', 'config', 'views', 'theme'));

    appUrl += '?' + queryString.stringify(appQo);

    if(this.state.appUrl !== appUrl){
      if(this.props.currentAppId !== currentApp){
        let appResourceManager = AppResourceManager.getInstance();
        appResourceManager.clearResources(this.props.currentAppId);
        appResourceManager.clearResources(currentApp);
      }

      this.setState({appUrl: appUrl});
    }

    if(this.props.currentAppId !== currentApp){
      this.props.dispatch(appStateActions.inAppAppStateChanged(null));
    }
  }

  onChooseWidget = (widgetUri: string) => {
    let widgetId = appConfigUtils.getUniqueId(this.props.appConfig, 'widget');

    let widgetJson = {
      id: widgetId,
      uri: widgetUri,
      context: appConfigUtils.getWidgetContext(widgetUri)
    } as WidgetJson;

    WidgetManager.getInstance().handleNewWidgetJson(widgetJson).then(widgetJson => {
      //let imWidgetJson = Immutable(widgetJson) as IMWidgetJson;
      // getAppConfigAction().addWidget(imWidgetJson, this.props.selection).exec();
      this.props.dispatch(builderActions.closeChooseWidgetPopup());
    });
  }
  onPreviewScaleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    let scale = evt.currentTarget.value;
    let appHtml = this.appIframe.contentWindow.document.documentElement;
    appHtml.style.transform = `scale(${scale})`;
    this.setState({zoomScale: Number(scale)});
  }

  getButtonGroupStyle(){
    //TODO demo code
    return css`
      position: absolute !important;
      right: 20px;
      top: 15px;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.20);
      button {
        background: white !important;
        border: none !important;
      }

      button:focus{
        box-shadow: none !important;
      }

      button.active{
        background: #00A6B6 !important;
      }
    `;
  }

  syncLayoutHandler() {
    const { appConfig, appMode, currentPageId, browserSizeMode, viewportSize } = this.props;
    if (!appConfig || appMode !== AppMode.Design) {
      return null;
    }
    const mainSizeMode = appConfig.mainSizeMode;
    if (browserSizeMode === mainSizeMode) {
      return null;
    }
    const pageJson = lodash.getValue(appConfig, `pages.${currentPageId}`) as IMPageJson;
    const headerHeight = appConfig.header && (appConfig.header.height[browserSizeMode] || appConfig.header.height[mainSizeMode]) || 0;
    // const footerHeight = appConfig.footer && (appConfig.footer.height[browserSizeMode] || appConfig.footer.height[mainSizeMode]) || 0;

    return <div css={css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${viewportSize.width + 10}px;
    `} className="d-flex flex-column">
      {pageJson.header && <SyncLayoutButton
        isAuto={!Boolean(appConfig.header.layout[browserSizeMode])}
        formatMessage={this.formatMessage}
        theme={this.props.theme}
        pageId={currentPageId}
        browserSizeMode={browserSizeMode}
        mainSizeMode={appConfig.mainSizeMode}
        isHeader={true}
      ></SyncLayoutButton>}
      <SyncLayoutButton
        isAuto={!Boolean(pageJson.layout[browserSizeMode])}
        formatMessage={this.formatMessage}
        theme={this.props.theme}
        browserSizeMode={browserSizeMode}
        mainSizeMode={appConfig.mainSizeMode}
        pageId={currentPageId}
        style={{
          position: 'sticky',
          marginTop: `${Math.max(+headerHeight - 60, 20)}px`,
          top: 20,
        }}
      ></SyncLayoutButton>
      {pageJson.footer && <SyncLayoutButton
        isAuto={!Boolean(appConfig.footer.layout[browserSizeMode])}
        formatMessage={this.formatMessage}
        theme={this.props.theme}
        browserSizeMode={browserSizeMode}
        mainSizeMode={appConfig.mainSizeMode}
        pageId={currentPageId}
        isFooter={true}
        style={{
          position: 'absolute',
          bottom: 30,
        }}
      ></SyncLayoutButton>}
    </div>;
  }

  render(){
    let {appConfig, currentPageId, currentDialogId, theme, pageMode, appMode,
      pageHeightInBuilder, viewportSize} = this.props;
    // const {isPortrait} = this.state;
    const isFullScreenPage = pageMode === PageMode.FitWindow;
    return <div css={getStyle(isFullScreenPage, theme)}
      className="jimu-widget widget-builder-app-loader"
      style={{
        height: isFullScreenPage ? '100%' : (pageHeightInBuilder || viewportSize.height) + 1000,
        minHeight: isFullScreenPage ? viewportSize.height + 100 : null,
        width: `calc(${viewportSize.width}px + 3rem)`}}>
      {
          // browserSizeMode !== BrowserSizeMode.Desktop &&
          // <ButtonGroup css={this.getButtonGroupStyle()}>
          //   <Button icon color="light" className="border border-gray-500 button-device-portrait"
          //     active={this.state.isPortrait} onClick={() => {this.setState({isPortrait: true})}}>
          //     <Icon icon={require('jimu-ui/lib/icons/mobile.svg')} color={this.state.isPortrait ? 'white' : '#9fa4a7'}/>
          //   </Button>
          //   <Button icon color="light" className="border border-gray-500 button-device-landscape"
          //     active={!this.state.isPortrait} onClick={() => {this.setState({isPortrait: false})}}>
          //     <Icon icon={require('jimu-ui/lib/icons/mobile.svg')} rotate={90} color={!this.state.isPortrait ? 'white' : '#9fa4a7'}/>
          //   </Button>
          // </ButtonGroup>
        }
      <div className="top-section d-flex justify-content-end" style={{color: theme.colors.black, width: '100%'}}>
        <div className="page-name">
          { appConfig && currentPageId && appConfig.pages[currentPageId].label}
          { appConfig && currentDialogId && appConfig.dialogs[currentDialogId].label}
        </div>
      </div>
      <div ref={this.resizeRef} className={classNames('body-section shadow d-flex flex-column align-items-start justify-content-start')}
      >
        <div ref={this.deviceRef} className={classNames('device-frame d-flex flex-grow-1')} style={{...this.getDeviceSize()}}>
          {/* {this.renderDeviceTop()} */}
          <iframe name="_appWindow" src={this.state.appUrl} className="config-preview"
            ref={dom => this.appIframe = dom}></iframe>
          {/* {this.renderDeviceBottom()} */}
        </div>
        {pageMode !== PageMode.FitWindow && appMode === AppMode.Design && <div className="resize-handler-bottom"
        css={css`background: ${theme.colors.grays.gray800}; user-select: none;`}>
          <Icon icon={iconUpArrow} width={12} height={12} color={theme.colors.cyans.cyan200}></Icon>
          <Icon icon={iconDownArrow} width={12} height={12} color={theme.colors.cyans.cyan200}></Icon>
          <div className="label" css={css`color: ${theme.colors.grays.gray100}`}>
            {this.formatMessage('dragToResize')}
          </div>
        </div>}
        {this.syncLayoutHandler()}
      </div>
      <div className="bottom-section">
        <span>Scale: {this.state.zoomScale}</span>
        <input type="range" className="form-control-range" min={0.5} max={2} step={0.1} defaultValue="1" onChange={this.onPreviewScaleChange}/>
      </div>
      {this.props.showChooseWidgetPopup && <ChooseWidgetPopup onOK={this.onChooseWidget} title="Choose Widget"
        onCancel={() => this.props.dispatch(builderActions.closeChooseWidgetPopup())}></ChooseWidgetPopup>}
    </div>;
  }

  getDeviceSize(){
    const { pageHeightInBuilder, pageMode, viewportSize} = this.props;

    if (pageMode === PageMode.FitWindow) {
      return viewportSize;
    }
    return {
      width: viewportSize.width,
      minHeight: viewportSize.height,
      height: pageHeightInBuilder || viewportSize.height,
      overflow: 'hidden',
    };
  }
}
