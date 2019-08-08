/** @jsx jsx */
import {BaseWidget, AllWidgetProps, IMState, classNames as classnames, ReactDOM, lodash, utils as jimuUtils, Size, ReactRedux,
  IMAppConfig, AppMode, css, jsx, polished, BrowserSizeMode, IMLayoutItemJson, getAppStore, appActions, CONSTANTS, PageMode, PagePart, IMPageJson, IMThemeVariables} from 'jimu-core';
import {builderAppSync} from 'jimu-for-builder'
import {IMConfig} from '../config';
import {Icon, Button, Popover, PopoverBody, ButtonGroup} from 'jimu-ui';
import {InsertElements} from './components/insert-elements';
import {getAppConfigAction} from 'jimu-for-builder';
import defaultMessages from './translations/default';
import { ToolbarConfig } from 'jimu-layouts/common';
import { Toolbar } from 'jimu-layouts/layout-builder';

let IconElements = require('jimu-ui/lib/icons/elements.svg');
let IconClose = require('jimu-ui/lib/icons/close-16.svg');
let IconLarge = require('jimu-ui/lib/icons/desktop.svg');
let IconSmall = require('jimu-ui/lib/icons/mobile.svg');
let IconMedium = require('jimu-ui/lib/icons/pad.svg');
let IconArrowDown = require('jimu-ui/lib/icons/arrow-down-8.svg');
let IconPropertySetting = require('jimu-ui/lib/icons/setting-live-view.svg');

interface ExtraProps {
  currentPageId: string;
  currentViewId: string;
  appPath: string;
  appMode: AppMode;
  pageMode: PageMode;
  inSelectMode: boolean;
  // appConfig: IMAppConfig;
  browserSizeMode: BrowserSizeMode;
  portalUrl: string;
  viewportSize?: Size;
  pageHeightInBuilder: number;
  activePagePart: PagePart;
}

interface State {
  isInertElementPopupShown: boolean;
  isThemePopupShown: boolean;
  isCustomizeThemePopupShown: boolean;
  isDeviceChooseShow: boolean;
  isResolutionChooseShow: boolean;
  toolTipInsertOpen: boolean;
  toolTipSelectOpen: boolean;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, State>{
  appMode: string;
  selectTheme: string;
  insertElement: string;
  largeScreen: string;
  mediumScreen: string;
  smallScreen: string;
  editPageForLargeScreen: string;
  editPageForMediumScreen: string;
  editPageForSmallScreen: string;
  enableWidgetSetting: string;

  ref: HTMLElement;
  isInserElementClicked: boolean = false;

  constructor(props) {
    super(props);
    this.appMode = this.props.intl.formatMessage({id: 'appMode', defaultMessage: defaultMessages.appMode});
    this.selectTheme = this.props.intl.formatMessage({id: 'selectTheme', defaultMessage: defaultMessages.selectTheme});
    this.insertElement = this.props.intl.formatMessage({id: 'insertElement', defaultMessage: defaultMessages.insertElement});
    this.largeScreen = this.props.intl.formatMessage({id: 'largeScreen', defaultMessage: defaultMessages.largeScreen});
    this.mediumScreen = this.props.intl.formatMessage({id: 'mediumScreen', defaultMessage: defaultMessages.mediumScreen});
    this.smallScreen = this.props.intl.formatMessage({id: 'smallScreen', defaultMessage: defaultMessages.smallScreen});
    this.editPageForLargeScreen = this.props.intl.formatMessage({id: 'editPageForLargeScreen', defaultMessage: defaultMessages.editPageForLargeScreen});
    this.editPageForMediumScreen = this.props.intl.formatMessage({id: 'editPageForMediumScreen', defaultMessage: defaultMessages.editPageForMediumScreen});
    this.editPageForSmallScreen = this.props.intl.formatMessage({id: 'editPageForSmallScreen', defaultMessage: defaultMessages.editPageForSmallScreen});
    this.enableWidgetSetting = this.props.intl.formatMessage({id: 'enableWidgetSetting', defaultMessage: defaultMessages.enableWidgetSetting});

    this.state = {
      isInertElementPopupShown: false,
      isThemePopupShown: false,
      isCustomizeThemePopupShown: false,
      isDeviceChooseShow: false,
      isResolutionChooseShow: false,
      toolTipInsertOpen: false,
      toolTipSelectOpen: false,
    }

    this.onBrowserSizeModeChange.bind(this);
  }

  componentDidUpdate(prevProps: AllWidgetProps<IMConfig> & ExtraProps){
    if(prevProps.browserSizeMode !== this.props.browserSizeMode && !this.getWhetherHasBrowserSizeModeLayout()){
      this.setState({isInertElementPopupShown: false});
    }
  }

  getStyle() {
    let theme = this.props.theme;
    // with some theme variables can't be get, so define these variables temporarily
    let toolbar_blue_400 = theme.colors && theme.colors.blues ? theme.colors.blues.blue400 : '#03687a';
    let toolbar_black = theme.colors && theme.colors.black ? theme.colors.black : 'black';

    return css`
      .toolbar-tooltip {
        background-color: ${theme.colors.grays.gray100}
      }

      .resolution-choose {
        padding-right: ${polished.rem(10)};
        padding-left: ${polished.rem(10)};
        margin-right: ${polished.rem(20)};

        &:hover {
          background-color: ${theme.colors.white};
        }
      }

      .no-user-select {
        -o-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select :none;
        user-select: none;
      }

      .device-switch-group {
        margin-right: ${polished.rem(10)};
      }

      .no-animation {
        transition: none;
        -webkit-transition: none;
      }

      .device-switch-container {
        color: ${theme.colors.grays.gray600} !important;

        &:hover {
          color: ${theme.colors.black} !important;
          background-color: ${theme.colors.white} !important;
        }
      }

      .enable-setting-btn {
        height: ${polished.rem(28)};
        &:focus {
          outline: none;
          box-shadow: none !important;
        }
      }

      .device-switch {
        width: ${polished.rem(28)};
        height: ${polished.rem(28)};
        border-radius: 2px !important;
        border: 0;
        margin-left: 1px;
        margin-right: 1px;
        color: inherit !important;

        &:focus {
          outline: none;
          box-shadow: none !important;
        }
      }

      .device-active {
        background-color: ${theme.colors.cyans.cyan200} !important;
        color: ${theme.colors.black} !important;
      }

      .device-disactive {
        background-color: inherit !important;
      }

      .live-view-container {
        cursor: pointer;
        background-color: ${theme.colors.cyans.cyan100};
        border-radius: 20rem !important;
        color: ${theme.colors.cyans.cyan500};
        padding-right: 0.8rem;
        padding-left: 0.8rem;
        margin-right: ${polished.rem(16)};
        height: ${polished.rem(28)};
      }

      .edit-view-container {
        cursor: pointer;
        background-color: ${theme.colors.secondary};
        border-radius: 20rem !important;
        color: ${theme.colors.grays.gray700};
        padding-right: 0.8rem;
        padding-left: 0.8rem;
        margin-right: ${polished.rem(16)};
        height: ${polished.rem(28)};

        &:hover {
          color: ${theme.colors.black};

          .edit-view-icon {
            border: 1px solid ${theme.colors.black};
          }
        }
      }

      .live-view-icon {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${theme.colors.cyans.cyan500};
      }

      .edit-view-icon {
        width: 7px;
        height: 7px;
        border: 1px solid ${theme.colors.grays.gray700};
        border-radius: 50%;
      }

      .popover-item {

        background-color: ${polished.rgba(theme.colors.grays.gray100, 0.7)};

        .btn {
          &,
          &:hover,
          &.disabled,
          &:disabled {
            color: ${toolbar_black};
          }
          &[class*="btn-outline-"] {
            border-color: ${theme.colors.grays.gray400};
          }
        }

        .btn-outline-secondary {
          color: ${toolbar_black};
          &:hover {
            color: ${toolbar_black};
          }
        }

        .btn:not(:disabled):not(.disabled):active,
        .btn:not(:disabled):not(.disabled).active,
        .show > .btn.dropdown-toggle {
          color: ${toolbar_black};
        }

        .resolution-list-item {
          cursor: pointer;
          color: ${theme.colors.black};

          &:hover {
            background-color: ${theme.colors.primary};
          }
        }
      }

      .widget-builder-app-toolbar {
        background-color: ${polished.rgba(theme.colors.grays.gray100, 0.7)};
        height: 40px;

        > div {
          height: 100%;
          flex: 1;
          + div {
            border-width: 0 0 0 1px !important;
          }
        }

        .btn {
          &,
          &:hover,
          &.disabled,
          &:disabled {
            color: ${toolbar_black};
          }
          &[class*="btn-outline-"] {
            border-color: ${theme.colors.grays.gray400};
          }
        }

        .toggle-btn.select-tool {
          width: 30px;
          height: 26px;
          padding: 0;
          background-color: ${theme.colors.cyans.cyan200};
          border: none;
          border-radius: 2px;

          &.active, &:hover {
            .jimu-icon {
              color: ${theme.colors.black};
            }
            background-color: ${theme.colors.cyans.cyan100};
            border: 1px solid ${theme.colors.cyans.cyan400};
            box-shadow: inset 0 0 4px 0 rgba(0,0,0,0.90);
          }

          .jimu-icon {
            margin: 0;
            color: ${theme.colors.grays.gray600};
          }
        }

        .btn-outline-secondary {
          color: ${toolbar_black};
          &:hover {
            color: ${toolbar_black};
          }
        }

        .btn:not(:disabled):not(.disabled):active,
        .btn:not(:disabled):not(.disabled).active,
        .show > .btn.dropdown-toggle {
          color: ${toolbar_black};
        }

        .app-toolbar-viewmode {
          background-color: ${toolbar_blue_400};
        }

        .app-toolbar-insert {
          padding-top: 10px;
          padding-left: 10px;
          position: relative;

          .app-toolbar-insert-btn {
            width: 46px;
            height: 46px;
            border: 0;
            z-index: 2;
            position: relative;
            &:focus {
              outline: none;
              box-shadow: none !important;
              background-color: ${theme.colors.cyans.cyan100};
            }

            &:disabled {
              outline: none;
              box-shadow: none !important;
              background-color: ${theme.colors.secondary};
            }
          }

          &::after {
            opacity: 0;
            content: "";
            height: 66px; /* <-- set to fixed */
            width: 66px; /* <-- set to fixed */
            background: ${theme.colors.grays.gray100};
            position: absolute;
            left: -30%;
            top: 0;
            z-index: 1;
            border-radius: 0 100rem 100rem 0;
            box-shadow: 0 0 8px 0 rgba(0,0,0,0.50);
            transition-property: left;
            transition-timing-function: ease-out;
            transition-duration: .1s;
          }

          &.insert-active {
            &::after {
              opacity: 1;
              left: 0;
              transition-property: left;
            transition-timing-function: ease-out;
            transition-duration: .1s;
            }
          }
        }

        .device-drop-icon {
          fill: ${theme.colors.black};
        }

        .app-toolbar-toollist {
          > .btn {
            font-weight: 400;
          }

          .toollist-item {
            width: ${polished.rem(72)};
          }
        }

        .toollist-item-click:hover {
          background-color: ${theme.colors.grays.gray200};
        }

        .toollist-item-click:active {
          background-color: ${theme.colors.white};
        }

        .toollist-item-click:focus {
          outline: none;
          box-shadow: none !important;
        }
      }

      .viewport-size {
        .dropdown {
          height: 100%;
        }
        .dropdown-menu {
          background-color: ${theme.colors.grays.gray100}
        }
        .btn {
          height: 100%;
          background: transparent;
          border: none;
          font-size: 0.8125rem;

          &:hover {
            background: ${theme.colors.white};
          }
        }
      }
    `;
  }

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    let pageHeight: number;
    const browserSizeMode = state.appStateInBuilder && state.appStateInBuilder.browserSizeMode;
    let viewportSize;
    if (state.appStateInBuilder) {
      viewportSize = jimuUtils.findViewportSize(state.appStateInBuilder.appConfig, browserSizeMode);
    }
    const currentPageId = state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentPageId;
    let pageMode;
    if (currentPageId) {
      pageMode = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.mode`);
      const sizeModePageHeight = lodash.getValue(state, `appStateInBuilder.appConfig.pages.${currentPageId}.heightInBuilder`);
      if (sizeModePageHeight && sizeModePageHeight[browserSizeMode]) {
        pageHeight = sizeModePageHeight[browserSizeMode];
      }
    }
    return {
      viewportSize,
      currentPageId,
      pageMode,
      pageHeightInBuilder: pageHeight,
      currentViewId: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.currentViewId,
      appMode: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.appMode,
      inSelectMode: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.inSelectMode,
      // appConfig: state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appPath: state.appPath,
      browserSizeMode: state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
      portalUrl: state.portalUrl,
      activePagePart: state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.activePagePart
    };
  }

  onThemeToggle = () => {
    this.setState({
      isThemePopupShown: !this.state.isThemePopupShown
    });
  }

  onToggleInsertElementPopup = (isShown: boolean) => {
    this.isInserElementClicked = true;
    let appConfig = getAppStore().getState().appConfig;
    appConfig = appConfig.setIn(['widgets', 'left-sidebar', 'config', 'toggleBtn', 'visible'], !isShown);
    getAppStore().dispatch(appActions.appConfigChanged(appConfig));

    this.setState({
      isInertElementPopupShown: isShown,
      toolTipInsertOpen: false
    });
  }


  getAppConfig = () : IMAppConfig => {
    const appConfigAction = getAppConfigAction();
    if(appConfigAction && appConfigAction.appConfig){
      return appConfigAction.appConfig;
    }
    return null;
  }

  onAppModeChange = () => {
    if(!this.props){
      return;
    }

    if(this.props.appMode === AppMode.Run){
      builderAppSync.publishAppModeChangeToApp(AppMode.Design);
    }else{
      builderAppSync.publishAppModeChangeToApp(AppMode.Run);
    }
  }

  whetherInPage = () => {
    const appConfig = this.getAppConfig();
    // pages are loading
    if(!appConfig || !appConfig.pages || !this.props.currentPageId){
      return true;
    }
    return appConfig.pages[this.props.currentPageId] && appConfig.pages[this.props.currentPageId].layout;
  }

  onBrowserSizeModeChange(mode: BrowserSizeMode){
    // getAppConfigAction().createLayoutForSizeMode(mode, this.props.browserSizeMode).exec();
    builderAppSync.publishChangeBrowserSizeModeToApp(mode);

    if (mode !== this.props.browserSizeMode) {
      builderAppSync.publishChangeSelectionToApp(null);
    }

    this.setState({
      isDeviceChooseShow: false
    });
  }

  onToggleResolutionChoose = () => {
    this.setState({
      isResolutionChooseShow: !this.state.isResolutionChooseShow
    });
  }

  toggleSelectMode = () => {
    builderAppSync.publishInSelectModeChangeToApp(!Boolean(this.props.inSelectMode));
  }

  getWhetherHasBrowserSizeModeLayout = (): boolean => {
    const { currentPageId, browserSizeMode } = this.props;
    const appConfig = this.getAppConfig();

    // should always check page. should check header and footer if it is visible.
    const pageJson = lodash.getValue(appConfig, `pages.${currentPageId}`, null) as IMPageJson;
    let pageLayout = null;
    let headerLayout = null;
    let footerLayout = null;
    if (pageJson) {
      pageLayout = lodash.getValue(pageJson, `layout.${browserSizeMode}`, null);
      if (pageJson.header) {
        headerLayout = lodash.getValue(appConfig, `header.layout.${browserSizeMode}`, null);
      }
      if (pageJson.footer) {
        footerLayout = lodash.getValue(appConfig, `footer.layout.${browserSizeMode}`, null);
      }
    }
    return pageLayout !== null || headerLayout !== null || footerLayout !== null;
    // return !!(browserSizeMode && currentPageId && appConfig && appConfig.pages && appConfig.pages[currentPageId]
    //   && appConfig.pages[currentPageId].layout && appConfig.pages[currentPageId].layout[browserSizeMode]);
  }

  onToggleToolTipInsert = () => {
    this.setState({
      toolTipInsertOpen: !this.state.toolTipInsertOpen
    });
  }

  onToggleToolTipSelect = () => {
    this.setState({
      toolTipSelectOpen: !this.state.toolTipSelectOpen
    });
  }

  setViewportSize = (size) => {
    const appConfigAction = getAppConfigAction();
    appConfigAction.setViewportSize(this.props.browserSizeMode, size).exec();

    this.setState({
      isResolutionChooseShow: false
    });
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id, defaultMessage: defaultMessages[id] })
  }

  render() {
    const {appMode, theme, inSelectMode, browserSizeMode, viewportSize, pageHeightInBuilder, pageMode} = this.props;
    let isAppRun = appMode === AppMode.Run;
    let hasBrowserSizeModeLayout = this.getWhetherHasBrowserSizeModeLayout();

    const heightOfWorkArea = viewportSize ? (pageHeightInBuilder || viewportSize.height) : '';
    const viewportLabel = viewportSize ?
      `${viewportSize.width} × ${pageMode !== PageMode.FitWindow ? heightOfWorkArea : viewportSize.height}` : '';
    let sizemodeResolutions = CONSTANTS.SCREEN_RESOLUTIONS[browserSizeMode] || [];
    if (pageMode !== PageMode.FitWindow) {
      // remove the items with same width
      const widthMap = {};
      const uniqueResolutions = [];
      sizemodeResolutions.forEach((size) => {
        if (widthMap[size.width] == null) {
          uniqueResolutions.push(size);
          widthMap[size.width] = size;
        }
      });
      sizemodeResolutions = uniqueResolutions;
    }

    return <div css={this.getStyle()} ref={el => this.ref = el}>
      <div className={'widget-builder-app-toolbar d-flex flex-row'
      + ' align-items-center shadow'}>
      {isAppRun && <div className="d-flex align-items-center justify-content-start pl-2 pr-2 text-left"></div>}
      {!isAppRun && hasBrowserSizeModeLayout && <div className={classnames('app-toolbar-insert text-left',
        {'insert-active': this.state.isInertElementPopupShown})}
        id="tooltip_insert">
        <Button icon circled size="lg" disabled={!this.whetherInPage()} className={classnames('app-toolbar-insert-btn',
          {'insert-btn-active': this.state.isInertElementPopupShown})} title={this.insertElement}
          onClick={() => this.onToggleInsertElementPopup(!this.state.isInertElementPopupShown)}>
          <Icon icon={this.state.isInertElementPopupShown ? IconClose : IconElements} width={18} height={18} className={'app-toolbar-insert-icon'}/>
        </Button>
      </div>}
      {/* <Tooltip css={this.getStyle()} innerClassName="toolbar-tooltip" placement="right" isOpen={this.state.toolTipInsertOpen} target="tooltip_insert" hideArrow={false}
        toggle={this.onToggleToolTipInsert}>{'Insert element'}</Tooltip> */}
      <div className="app-toolbar-active-toollist d-flex flex-row align-items-center justify-content-center">
        {!isAppRun && <div className="d-flex align-items-center pr-2 h-100">
          <ConnectToolbar theme={theme}
          parentRef={this.ref}
          formatMessage={this.formatMessage}></ConnectToolbar>
        </div>}
        {isAppRun && <div className="d-flex align-items-center justify-content-start pl-2 pr-2 text-left">
          <Button icon className="d-flex align-items-center justify-content-center enable-setting-btn"
            title={this.enableWidgetSetting}
            outline={false}
            onClick={this.toggleSelectMode}
            active={inSelectMode}
            style={{
              border: `1px solid ${theme.colors.grays.gray300}`,
              backgroundColor: inSelectMode ? theme.colors.primary : 'transparent',
            }}
            id="tooltip_selectwidget">
            <Icon icon={IconPropertySetting}
            color={theme.colors.black} width={16} height={16}></Icon>
          </Button>
          {/* <Tooltip innerClassName="toolbar-tooltip"
          placement="right" isOpen={this.state.toolTipSelectOpen} target="tooltip_selectwidget" hideArrow={false}
        toggle={this.onToggleToolTipSelect}>{'Enable widget property settings'}</Tooltip> */}
        </div>
      }
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end">
        <ButtonGroup title={'Shift+Alt+X'} className="h-100 d-flex align-items-center device-switch-group">
          <div className="h-100 d-flex align-items-center device-switch-container no-animation">
            <Button icon color="light" outline active onClick={() => {this.onBrowserSizeModeChange(BrowserSizeMode.Large)}}
              className={classnames('device-switch d-flex align-items-center p-0', {
                'device-active': (!this.props.browserSizeMode || this.props.browserSizeMode === BrowserSizeMode.Large),
                'device-disactive': (this.props.browserSizeMode && this.props.browserSizeMode !== BrowserSizeMode.Large)
              })} title={this.editPageForLargeScreen}>
              <Icon icon={IconLarge}/>
            </Button>
          </div>
          <div className="h-100 d-flex align-items-center device-switch-container">
            <Button icon color="light" outline active onClick={() => {this.onBrowserSizeModeChange(BrowserSizeMode.Medium)}}
              className={classnames('device-switch d-flex align-items-center p-0 no-animation', {
                'device-active': (this.props.browserSizeMode === BrowserSizeMode.Medium),
                'device-disactive': !(this.props.browserSizeMode === BrowserSizeMode.Medium)
              })} title={this.editPageForMediumScreen}>
              <Icon icon={IconMedium}/>
            </Button>
          </div>
          <div className="h-100 d-flex align-items-center device-switch-container">
            <Button icon color="light" outline active onClick={() => {this.onBrowserSizeModeChange(BrowserSizeMode.Small)}}
              className={classnames('device-switch d-flex align-items-center p-0 no-animation', {
                'device-active': (this.props.browserSizeMode === BrowserSizeMode.Small),
                'device-disactive': !(this.props.browserSizeMode === BrowserSizeMode.Small)
              })} title={this.editPageForSmallScreen}>
              <Icon icon={IconSmall}/>
            </Button>
          </div>
         </ButtonGroup>
         {<div id="resolution-choose-popover" onClick={this.onToggleResolutionChoose}
          className="float-left d-flex align-items-center resolution-choose h-100" style={{cursor: 'pointer'}}>
          <div className="h-100 d-flex align-items-center no-user-select justify-content-center" style={{whiteSpace: 'nowrap', width: '76px'}}>{viewportLabel}</div>
          <Icon className="ml-1 device-drop-icon" icon={IconArrowDown} width={10} height={10}/>
          <Popover css={this.getStyle()} className="mt-0" style={{backgroundColor: theme && theme.colors ?
            theme.colors.grays.gray100 : '', boxShadow: '0 2px 6px 0 rgba(255, 255, 255, 0.2)'}}
            hideArrow modifiers={{
              preventOverflow: {
                escapeWithReference: true
              },
              offset: { offset: '8, 3' }
            }} placement="bottom-start" isOpen={this.state.isResolutionChooseShow} target="resolution-choose-popover" toggle={this.onToggleResolutionChoose}>
            <PopoverBody className="pb-0 pt-0 pl-0 pr-0 popover-item">
              <div>
                {sizemodeResolutions.map((size, index) => {
                  return <div key={index} className="resolution-list-item no-user-select p-2"
                    onClick={() => {this.setViewportSize(size)}}>
                    {`${size.width} × ${pageMode !== PageMode.FitWindow ? heightOfWorkArea : size.height}`}
                  </div>;
                })}
              </div>
            </PopoverBody>
          </Popover>
        </div>}
        {isAppRun && <div className="d-flex align-items-center live-view-container" onClick={this.onAppModeChange} title={'Shift+Alt+X'} style={{whiteSpace: 'nowrap'}}>
          <div className="live-view-icon mr-2"></div>
          <div className="d-flex align-items-center border-left-0 app-toolbar-mode">
            <span>{this.appMode}</span>
          </div>
        </div>}
        {!isAppRun && <div className="d-flex align-items-center edit-view-container" onClick={this.onAppModeChange} title={'Shift+Alt+X'} style={{whiteSpace: 'nowrap'}}>
          <div className="edit-view-icon mr-2"></div>
          <div className="d-flex align-items-center border-left-0 app-toolbar-mode">
            <span>{this.appMode}</span>
          </div>
        </div>}
      </div>
      {
        !isAppRun && this.isInserElementClicked && document && document.getElementById('default') && ReactDOM.createPortal(
          <InsertElements currentPageId={this.props.currentPageId}
            currentViewId={this.props.currentViewId} appPath={this.props.appPath}
            dispatch={this.props.dispatch} isOnScreen={this.state.isInertElementPopupShown}
            onTogglePopup={this.onToggleInsertElementPopup} browserSizeMode={this.props.browserSizeMode}
            appMode={appMode} intl={this.props.intl}
            activePagePart={this.props.activePagePart}
          />, document.getElementById('default')
        )
      }
    </div></div>
  }
}

interface ToolbarProps{
  theme: IMThemeVariables;
  parentRef: HTMLElement;
  formatMessage: any;
}
interface ToolbarStateProps{
  tools: ToolbarConfig;
  layoutId: string;
  layoutItem: IMLayoutItemJson;
}
const ToolbarWrapper = (props: ToolbarProps & ToolbarStateProps) => {
  return props.layoutItem && <Toolbar {...props}></Toolbar> || null;
}

const ConnectToolbar = ReactRedux.connect<ToolbarStateProps, {}, ToolbarProps>((state: IMState) => {
  const selection = state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo.selection;

  if (selection) {
    return {
      layoutId: selection.layoutId,
      layoutItem: lodash.getValue(
        state,
        `appStateInBuilder.appConfig.layouts.${selection.layoutId}.content.${selection.layoutItemId}`
      ),
      tools: state.builder.toolbarConfig
    }
  }else{
    return {
      layoutId: null,
      layoutItem: null,
      tools: state.builder.toolbarConfig
    }
  }
})(ToolbarWrapper)