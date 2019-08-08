import {React, IMAppConfig, Immutable, IMHeaderJson, appConfigUtils, lodash, BrowserSizeMode, LayoutType, getAppStore, IMPageJson, IMFooterJson} from 'jimu-core';
import {Collapse, Input, Switch, } from 'jimu-ui';
import { getAppConfigAction, SettingSection, SettingRow, ColorChooser} from 'jimu-for-builder';

interface Props{
  pageId: string;
  dispatch: any;
  pagePart: 'body' | 'header' | 'footer';
  emptyLayout: any;
  browserSizeMode: BrowserSizeMode;
  formatMessage: (id: string) => string;

  pageJson?: IMPageJson;
  header?: IMHeaderJson;
  footer?: IMFooterJson
}

interface State{
  isOpen: boolean;
}

const DEFAULT_HEADER_HEIGHT = 75;

export default class Widget extends React.PureComponent<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      isOpen: this.isOpen()
    }
  }

  getAppConfig(): IMAppConfig{
    return getAppStore().getState().appStateInBuilder && getAppStore().getState().appStateInBuilder.appConfig || {pages: {empty: {}}} as any;
  }

  isOpen = () => {
    const {pagePart, pageId} = this.props
    const appConfig = this.getAppConfig();
    return pagePart === 'body' || !!(appConfig && appConfig.pages[pageId] && appConfig[pagePart] && appConfig.pages[pageId][pagePart])
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pageId !== this.props.pageId){
      let {pageJson, pagePart} = nextProps;
      this.setState({
        isOpen: pagePart === 'body' || (pageJson && pageJson[pagePart])
      })
    }
  }

  onSwitchChange = () => {
    let {pageId, pagePart, /* dispatch, */ emptyLayout, browserSizeMode} = this.props;
    const appConfig = this.getAppConfig();
    let pageJson = appConfig.pages[pageId];

    let partJson = appConfig[pagePart];
    let appConfigAction = getAppConfigAction();
    if(!partJson){
      let layoutId = appConfigUtils.getUniqueId(appConfig, 'layout');
      let layoutJson = Immutable({...emptyLayout, id: layoutId, type: LayoutType.FlowLayout});
      partJson = Immutable({})
        .setIn(['layout', browserSizeMode], layoutId)
        .setIn(['height', browserSizeMode], DEFAULT_HEADER_HEIGHT) as IMHeaderJson;
      pagePart === 'header' ? appConfigAction.editHeader(partJson, [layoutJson]) :
        appConfigAction.editFooter(partJson, [layoutJson]);
    }

    let newPageJson = pageJson.set(pagePart, !pageJson[pagePart]);
    appConfigAction.editPage(newPageJson).exec();

    this.setState({isOpen: newPageJson[pagePart]});
  }

  onHeightChange = (value: string) => {
    let h = value;
    let {pagePart, browserSizeMode} = this.props;
    const appConfig = this.getAppConfig();
    if(pagePart === 'header'){
      getAppConfigAction().editHeader(appConfig.header.setIn(['height', browserSizeMode], h)).exec();
    }else{
      getAppConfigAction().editFooter(appConfig.footer.setIn(['height', browserSizeMode], h)).exec();
    }
  }

  onBackgroundColorChange = (color: string) => {
    let {pageId, pagePart} = this.props;
    const appConfig = this.getAppConfig();
    let pageJson = appConfig.pages[pageId];
    if(pagePart === 'body'){
      getAppConfigAction().editPage(pageJson.set('bodyBackgroundColor', color)).exec();
    }else if(pagePart === 'header'){
      getAppConfigAction().editHeader(appConfig.header.set('backgroundColor', color)).exec();
    }else{
      getAppConfigAction().editFooter(appConfig.footer.set('backgroundColor', color)).exec();
    }
  }

  render(){
    const title = {
      body: this.formatMessage('body'),
      header: this.formatMessage('header'),
      footer: this.formatMessage('footer')
    };
    let {pageId, pagePart, browserSizeMode} = this.props;
    const appConfig = this.getAppConfig();
    let pageJson = appConfig.pages[pageId];
    let backgroundColor, emptyColor = '#eee';

    if(pagePart === 'body'){
      backgroundColor = pageJson.bodyBackgroundColor || emptyColor;
    }else{
      backgroundColor = appConfig[pagePart] ? appConfig[pagePart].backgroundColor || emptyColor : emptyColor;
    }

    let sectionTitle = <div className="setting-title d-flex justify-content-between">
      <div>
        <span>{title[this.props.pagePart]}</span>
      </div>
      <div className="d-flex align-items-center">
        {pagePart === 'body' ? null : <Switch checked={this.isOpen()} onChange={this.onSwitchChange} />}
      </div>
    </div>;

    const height = lodash.getValue(appConfig, `${pagePart}.height.${browserSizeMode}`, DEFAULT_HEADER_HEIGHT);

    return (
      <SettingSection title={sectionTitle}>
        <Collapse isOpen={this.state.isOpen}>
            {
              pagePart === 'body' ? null :
                  <SettingRow label={`${this.formatMessage('height')}(px)`}>
                    <Input className="setting-input-select" type="text" value={height}
                      onAcceptValue={this.onHeightChange}/>
                  </SettingRow>
            }

          <SettingRow label={this.formatMessage('fill')}>
            <div style={{width: '50px', height: '20px'}}>
              <ColorChooser color={backgroundColor} onChange={this.onBackgroundColorChange}></ColorChooser>
            </div>
          </SettingRow>

          {/* <SettingRow label="Image">
            <div>{pageJson.backgroundIMage}</div>
          </SettingRow>

          <SettingRow label="position">
            <div>{pageJson.backgroundPosition}</div>
          </SettingRow> */}
        </Collapse>
      </SettingSection>

    );
  }
}
