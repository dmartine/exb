/** @jsx jsx */
import {css, jsx, React, IMAppConfig, utils, getAppStore, LayoutType,
  PageMode, ReactRedux,
  BrowserSizeMode,
  IMThemeVariables,
  IMState,
  IMPageJson,
  IMHeaderJson,
  IMFooterJson} from 'jimu-core';
import {Input} from 'jimu-ui';
import {getAppConfigAction, SettingSection, SettingRow} from 'jimu-for-builder';
import SettingCollapse from './page-setting-collapse';
import { FlowLayoutSetting } from 'jimu-layouts/layout-builder';

interface Props{
  pageId: string;
  pageMode?: PageMode;
  maxWidth?: number;
  dispatch: any;
  currentImgUrlInput?: '';
  isSetImageUrl?: false;
  browserSizeMode: BrowserSizeMode;
  theme: IMThemeVariables;
  formatMessage: (id: string) => string;
}

interface StateProps{
  pageJson: IMPageJson;
  header: IMHeaderJson;
  footer: IMFooterJson
}

interface State{
  isSetImageUrl: boolean;
  currentImgUrlInput: string;
  pageWidthMode: number; // 0 for fixed width, 1 for auto
}

const emptyLayout = {};

export class _PageSetting extends React.PureComponent<Props & StateProps, State>{
  fileInput: any;

  constructor(props){
    super(props);
    let pageJson = props.pageJson;
    this.state = {
      isSetImageUrl: false,
      currentImgUrlInput: '',
      // currentPageName: this.getCurrentPageName(props),
      pageWidthMode: pageJson.maxWidth > 0 ? 0 : 1,
    };
    this.fileInput = React.createRef();
  }

  getAppConfig(): IMAppConfig{
    return getAppStore().getState().appStateInBuilder && getAppStore().getState().appStateInBuilder.appConfig || {pages: {empty: {}}} as any;
  }

  onMaxWidthChange = (e) => {
    let pageJson = this.props.pageJson;
    pageJson = pageJson.set('maxWidth', +e.currentTarget.value);
    getAppConfigAction().editPage(pageJson).exec();
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  layoutSetting() {
    const { pageId } = this.props;
    const appConfig = this.getAppConfig();
    const pageJson = appConfig.pages[pageId];
    if (pageJson && pageJson.layout) {
      const layoutId = utils.findLayoutId(
        pageJson.layout,
        getAppStore().getState().browserSizeMode,
        appConfig.mainSizeMode
      );
      const layout = appConfig.layouts[layoutId];
      if (layout && layout.type === LayoutType.FlowLayout) {
        return <FlowLayoutSetting layoutId={layoutId} formatMessage={this.props.formatMessage}/>;
      }
    }
  }

  getStyle () {
    const { theme } = this.props;
    return css`
    .image-setting-input {
      opacity: 0;
      position: absolute;
      left: 88px;
      width: 70px !important;
      height: 30px !important;
    }
    input, select {
      width: 130px;
      max-width: 130px;
    }
    .img-container {
      width: 109px;
      height: 70px;
      cursor: pointer;
      outline: 1px solid ${theme.colors.grays.gray400};
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
      &.active {
        outline: 2px solid ${theme.colors.cyans.cyan500};
      }
      .thumbnail {
        width: 107px;
      }
    }
    `;
  }

  setPageWidthModeAuto = () => {
    let pageJson = this.props.pageJson;
    pageJson = pageJson.without('maxWidth');
    getAppConfigAction().editPage(pageJson).exec();

    this.setState({
      pageWidthMode: 1,
    });
  }

  setPageWidthModeFixed = () => {
    let pageJson = this.props.pageJson;
    pageJson = pageJson.set('maxWidth', 1024);
    getAppConfigAction().editPage(pageJson).exec();

    this.setState({
      pageWidthMode: 0,
    });
  }

  render(){
    let { pageMode, maxWidth } = this.props;

    return (
      <div className="setting-pane widget-builder-page-setting" css={this.getStyle()}>
        {pageMode === PageMode.AutoScroll &&
          <SettingSection title={this.formatMessage('contentWidth')}>
            <SettingRow>
              <div className="d-flex w-100 justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <div className={`img-container ${this.state.pageWidthMode === 0 ? 'active' : ''}`}
                    onClick={this.setPageWidthModeFixed}>
                    <img className="thumbnail" src={require('./assets/Custom.svg')}/>
                  </div>
                  <span>{this.formatMessage('custom')}</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div className={`img-container ${this.state.pageWidthMode === 1 ? 'active' : ''}`}
                    onClick={this.setPageWidthModeAuto}>
                    <img className="thumbnail" src={require('./assets/Auto.svg')}/>
                  </div>
                  <span>{this.formatMessage('auto')}</span>
                </div>
              </div>
            </SettingRow>
            {this.state.pageWidthMode === 0 && <SettingRow label={this.formatMessage('maxWidth')}>
              <Input type="number" className="setting-input-select" min={300} onChange={this.onMaxWidthChange} value={isNaN(maxWidth) ? '' : maxWidth}/>
            </SettingRow>}
          </SettingSection>}

        <SettingCollapse
        formatMessage={this.formatMessage}
        emptyLayout={emptyLayout}
        dispatch={this.props.dispatch}
        pageId={this.props.pageId}
        pagePart="body"
        pageJson={this.props.pageJson}
        browserSizeMode={this.props.browserSizeMode}/>
        <SettingCollapse
        formatMessage={this.formatMessage}
        emptyLayout={emptyLayout}
        dispatch={this.props.dispatch}
        pageId={this.props.pageId}
        pagePart="header"
        pageJson={this.props.pageJson}
        header={this.props.header}
        browserSizeMode={this.props.browserSizeMode}/>
        <SettingCollapse
        formatMessage={this.formatMessage}
        emptyLayout={emptyLayout}
        dispatch={this.props.dispatch}
        pageJson={this.props.pageJson}
        pageId={this.props.pageId}
        pagePart="footer"
        footer={this.props.footer}
        browserSizeMode={this.props.browserSizeMode}/>


        {this.layoutSetting()}
      </div>
    );
  }

  // FOR DEMO:
  onToggleMe = () => {
    let rightToggle = document.getElementsByClassName('sidebar_handler_right');
    if(rightToggle) {
      (rightToggle[0] as HTMLElement).click();
    }
  }
  // TODO: REMOVE AFTER DEMO

}

const PageSetting = ReactRedux.connect((state: IMState, ownProps: Props) => {
  return {
    pageJson: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.pages[ownProps.pageId] || {},
    header: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.header,
    footer: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.footer,
  }
})(_PageSetting);

export default PageSetting;