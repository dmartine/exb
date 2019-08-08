/** @jsx jsx */
import {css, jsx, React, Immutable, IMPageJson, IMState, IMAppConfig, LinkType, themeUtils, ThemeVariables, SerializedStyles} from 'jimu-core';
import {Input, Button, Icon} from 'jimu-ui';
import {getAppConfigAction, SettingSection, SettingRow, LinkSettingPopup, LinkParam} from 'jimu-for-builder';


interface Props{
  dispatch: any;
  pageId: string;
  appConfig: IMAppConfig;
  currentImgUrlInput?: string;
  isSetImageUrl?: boolean;
  currentUrl?: string;
  formatMessage: (id: string) => string
}

interface State{
  isSetImageUrl: boolean;
  currentImgUrlInput: string;
  isShowLinkSetting: boolean;
  currentUrl: string;
  currentLinkName: string
}

let IconClose = require('jimu-ui/lib/icons/close.svg');
let IconCheck = require('jimu-ui/lib/icons/right.svg');
let IconRefesh = require('jimu-ui/lib/icons/link-12.svg');
let linkParam : LinkParam = {
  value: '',
  openType : undefined,
  linkType: LinkType.WebAddress
};

class _LinkSetting extends React.PureComponent<Props & {theme: ThemeVariables}, State>{
  fileInput: any;

  constructor(props){
    super(props);
    this.state = {
      isSetImageUrl: false,
      currentImgUrlInput: '',
      isShowLinkSetting: false,
      currentUrl: this.props.currentUrl || '',
      currentLinkName: this.getCurrentPageName(props)
    };
    this.fileInput = React.createRef();
  }

  componentWillReceiveProps(nextProps){
    let {appConfig, pageId} = nextProps;
    if(pageId !== this.props.pageId || appConfig !== this.props.appConfig){
      this.setState({
        currentLinkName: this.getCurrentPageName(nextProps)
      })
    }
  }

  getCurrentPageName = (props) => {
    const {appConfig, pageId} = props;
    const pageJson = appConfig.pages[pageId];
    return pageJson.label || '';
  }

  resetLinkParam() {
    linkParam.value = '';
    linkParam.openType = undefined;
    let link = this.props.appConfig.pages[this.props.pageId];
    // this.setState({currentUrl: ''});
    if(link && link.linkUrl && link.linkUrl != '#'){
      linkParam.value = link.linkUrl;
      // this.setState({currentUrl: linkParam.value});
    }
    if(link && link.openTarget){
      linkParam.openType = link.openTarget;
    }
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      //pageId: state.builder.currentPageId
      pageId: state.appRuntimeInfo.currentPageId
    }
  }

  onNameChange = value => {
    if(!value || value.trim() === ''){
      this.setState({
        currentLinkName: this.getCurrentPageName(this.props)
      })
      return;
    };
    const previousPageJson = this.props.appConfig.pages[this.props.pageId];
    let pageJson = Immutable(previousPageJson).merge({
      label: value
    }) as IMPageJson;
    getAppConfigAction().editPage(pageJson).exec();
  }

  openBrowseImage = () => {
    let files = this.fileInput.current.files;
    if (!files || !files[0]) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      let fileInfo = e.target as any;
      this.changeIcon(fileInfo.result);
    }
  }

  setImageUrl = () => {
    let {currentImgUrlInput} = this.state;
    if (currentImgUrlInput == '') {
      return;
    } else {
      this.setState({isSetImageUrl: false});
      this.changeIcon(currentImgUrlInput);
    }
  }

  getPageType = (id: string) => {
    const {pages} = this.props.appConfig;
    for(let index in pages){
      let page = pages[index];
      if(page.id === id){
        return page;
      }
    }
    return {};
  }

  settingLinkConfirm = (linkResult: LinkParam) => {
    this.setState({
      isShowLinkSetting: false
    });
    if(linkResult.value || linkResult.value === ''){
      this.setState({currentUrl: linkResult.value});
    }
    //console.log(linkResult);
    this.changeUrl(linkResult.value, linkResult.openType);
  }

  changeUrl = (value, target) => {
    const previousPageJson = this.props.appConfig.pages[this.props.pageId];
    let pageJson = Immutable(previousPageJson).merge({
      linkUrl: value ? value : '#',
      openTarget: target
    }) as IMPageJson;
    getAppConfigAction().editPage(pageJson).exec();
    linkParam.value = value;
    linkParam.openType = target;
  }

  changeIcon = value => {
    const previousPageJson = this.props.appConfig.pages[this.props.pageId];
    let pageJson = Immutable(previousPageJson).merge({
      icon: value
    }) as IMPageJson;
    getAppConfigAction().editPage(pageJson).exec();
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  getStyle(theme: ThemeVariables): SerializedStyles{
    return css`
    .image-setting-input {
      opacity: 0;
      position: absolute;
      left: 88px;
      width: 70px !important;
      height: 30px !important;
    }
    `;
  }

  render(){
    const {isSetImageUrl, currentImgUrlInput, isShowLinkSetting} = this.state;
    this.resetLinkParam();
    //console.log(this.props);

    return (
      <div className="setting-pane widget-builder-page-setting widget-setting-image">
        {/* <h4 className="jimu-widget-setting--header">
          {this.formatMessage('linkSetting')}
        </h4> */}
        <SettingSection>
          {/* <SettingRow label={this.formatMessage('name')}>
            <Input id="page-name" type="text" onAcceptValue={this.onNameChange}
              onChange={(event) => {this.setState({currentLinkName : event.target.value}); }}
              value={currentLinkName}/>
          </SettingRow> */}

          {/* <SettingRow label="Icon">
          <div css={this.getStyle(this.props.theme)} className="d-flex justify-content-between align-items-center">
            <Button color="primary" style={{width: '48%'}}
              className="text-dark d-flex justify-content-center">Browse
              <input className="w-100 h-100 image-setting-input" accept="image/*"
                ref={this.fileInput} type="file" onChange={this.openBrowseImage}>
              </input>
            </Button>
            <Button color="primary" style={{width: '48%'}} className="text-dark"
              onClick={() => {this.setState({isSetImageUrl: true})}}>URL
            </Button>
          </div>
        </SettingRow> */}

        {isSetImageUrl && <SettingRow>
          <div className="d-flex flex-row justify-content-around border w-100 align-items-center">
            <Input className="border-0 w-100" value={currentImgUrlInput} placeholder={`${this.formatMessage('urlIsHere')}...`}
              onChange={(event) => {this.setState({currentImgUrlInput: event.target.value}); }}
              onKeyUp={this.setImageUrl}></Input>
            <div className="btn btn-light pl-1 pr-1 h-100" onClick={this.setImageUrl}>
              <Icon icon={IconCheck} className="float-right"/>
            </div>
            <div className="btn btn-light pl-1 pr-1 h-100" 
              onClick={() => {this.setState({isSetImageUrl: false})}}>
              <Icon icon={IconClose} className="float-right"/>
            </div>
          </div>
        </SettingRow>}

        <SettingRow>
          <Button className="w-100 text-dark set-link-btn" color="secondary"
            onClick={() => { this.setState({ isShowLinkSetting: !isShowLinkSetting}); }}>
            <Icon icon={IconRefesh} className="mr-3"/>Set link
          </Button>
          {/* <div>Current: {currentUrl}</div> */}
        </SettingRow>

        </SettingSection>

        {isShowLinkSetting && 
        <LinkSettingPopup showDialog={isShowLinkSetting}
          isLinkPageSetting={true}
          linkParam={linkParam}
          onSettingCancel={() => {this.setState({ isShowLinkSetting: false}); }}
          onSettingConfirm={this.settingLinkConfirm}>
        </LinkSettingPopup>}
      </div>
    );
  }

}

const LinkSetting = themeUtils.withTheme(_LinkSetting);
export default LinkSetting;
