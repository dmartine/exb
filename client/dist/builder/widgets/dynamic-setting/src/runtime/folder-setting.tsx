/** @jsx jsx */
import {css, jsx, React, Immutable, IMPageJson, IMState, IMAppConfig } from 'jimu-core';
import {Input, Icon} from 'jimu-ui';
import {getAppConfigAction, SettingSection, SettingRow} from 'jimu-for-builder';


interface Props{
  dispatch: any,
  pageId: string;
  appConfig: IMAppConfig,
  currentImgUrlInput?: '',
  isSetImageUrl?: false,
  formatMessage: (id: string) => string
}

interface State{
  isSetImageUrl: boolean;
  currentImgUrlInput: string;
  currentPageName: string
}


let IconClose = require('jimu-ui/lib/icons/close.svg');
let IconCheck = require('jimu-ui/lib/icons/right.svg');

export default class LinkSetting extends React.PureComponent<Props, State>{
  fileInput: any;

  constructor(props){
    super(props);
    this.state = {
      isSetImageUrl: false,
      currentImgUrlInput: '',
      currentPageName: this.getCurrentPageName(props)
    };
    this.fileInput = React.createRef();
  }

  componentWillReceiveProps(nextProps){
    let {appConfig, pageId} = nextProps;
    if(pageId !== this.props.pageId || appConfig !== this.props.appConfig){
      this.setState({
        currentPageName: this.getCurrentPageName(nextProps)
      })
    }
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      //pageId: state.builder.currentPageId
      pageId: state.appRuntimeInfo.currentPageId
    }
  }

  getCurrentPageName = (props) => {
    const {appConfig, pageId} = props;
    const pageJson = appConfig.pages[pageId];
    return pageJson.label || '';
  }

  onNameChange = value => {
    if(!value || value.trim() === ''){
      this.setState({
        currentPageName: this.getCurrentPageName(this.props)
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

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
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

  changeIcon = value => {
    const previousPageJson = this.props.appConfig.pages[this.props.pageId];
    let pageJson = Immutable(previousPageJson).merge({
      icon: value
    }) as IMPageJson;
    getAppConfigAction().editPage(pageJson).exec();
  }

  getStyle () {
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
    // const currentPageName = pageJson.label || '';
    const {isSetImageUrl, currentImgUrlInput} = this.state;
    //console.log(this.props);

    return (
      <div className="setting-pane widget-builder-page-setting widget-setting-image">
        {/* <h4 className="jimu-widget-setting--header">
          {this.formatMessage('folderSetting')}
        </h4> */}
        <SettingSection>
          <Input placeholder={this.formatMessage('noSettingOptions')} disabled style={{border: 0, background: 'transparent', userSelect: 'none'}} />
          {/* <SettingRow label={this.formatMessage('name')}>
            <Input id="page-name" type="text" onAcceptValue={this.onNameChange}
              onChange={(event) => {this.setState({currentPageName : event.target.value}); }}
              value={currentPageName}/>
          </SettingRow> */}

          {/* <SettingRow label="Icon">
          <div css={this.getStyle()} className="d-flex justify-content-between" style={{width: '70%'}}>
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

        </SettingSection>
      </div>
    );
  }

}
