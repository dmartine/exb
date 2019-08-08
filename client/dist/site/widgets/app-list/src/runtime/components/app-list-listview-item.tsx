import {React, classNames, SessionManager, InjectedIntl, getAppStore, FormattedDate} from 'jimu-core';
import {IItem} from '@esri/arcgis-rest-types';
import {Icon, Row, Col, Button} from 'jimu-ui';
import EditDropDown from './app-list-editdropdown';
import defaultMessages from '../translations/default';
import AlertPopup from './alert-popup';

interface State{
  tooltipOpen: boolean;
  itemSelected: boolean;
  isShowAlertPopup: boolean;
}

interface Props{
  itemIdx: number;
  appItem: IItem;
  folderUrl: string;
  portalUrl: string;
  intl?: InjectedIntl;
}

let IconPlay = require('jimu-ui/lib/icons/app-launch.svg');
//let IconPeople = require('jimu-ui/lib/icons/people.svg');

export default class Widget extends React.PureComponent<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
      itemSelected: false,
      isShowAlertPopup: false
    }
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  handleItemClick = () => {
    if (this.checkIsOwner()) {
      let to = window.jimuConfig.mountPath + 'builder' + '?id=' + this.props.appItem.id;
      // jimuHistory.browserHistory.push(to);
      window.location.href = to;
    } else {
      this.setState({
        isShowAlertPopup: true
      })
    }
  }

  appLaunch = (e) => {
    e.stopPropagation();
  }

  checkIsOwner = () => {
    let user = getAppStore().getState().user;
    if (user && this.props.appItem.owner && user.username === this.props.appItem.owner) {
      return true;
    } else {
      return false;
    }
  }

  handleToggle = () => {
    this.setState({
      isShowAlertPopup: !this.state.isShowAlertPopup
    });
  }

  render(){
    let thumbnail = this.props.appItem.thumbnail;
    if (thumbnail) {
      thumbnail = this.props.portalUrl + '/sharing/rest/content/items/' + this.props.appItem.id + '/info/' 
        + thumbnail + '?token=' + SessionManager.getInstance().getSession().token;
    } else {
      thumbnail = this.props.folderUrl + './dist/runtime/assets/defaultthumb.png';
    }
    
    return <Row onClick={this.handleItemClick} style={{cursor: 'pointer'}} 
      className={classNames('mt-3 mb-3 ml-0 mr-0 app-item-backcolor border listview-item', 
      {'border-primary': this.state.itemSelected})} 
      onMouseEnter={() => {this.setState({itemSelected: true})}} 
      onMouseLeave={() => {this.setState({itemSelected: false})}}>
      <Col className="p-0" sm="2">
        <div className="app-list-listview-pic" style={{backgroundImage: 'url(' + thumbnail + ')'}}>
        </div>
      </Col>
      <Col sm="3" className="d-flex align-items-center">
        <div className="app-list-h2" style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} 
        title={this.props.appItem.title}>{this.props.appItem.title}</div>
      </Col>
      <Col sm="2" className="d-flex align-items-center">
        <div className="app-list-h3"><FormattedDate value={new Date(this.props.appItem.modified)}/></div>
      </Col>
      <Col sm="2" className="d-flex align-items-center">
        <div className="app-list-h3 app-list-listview-name" title={this.props.appItem.owner}>{this.props.appItem.owner}</div>
      </Col>
      <Col sm="1" className="d-flex align-items-center">
        <div className="app-list-h3 app-list-listview-view">{this.props.appItem.numViews + ' ' + (this.props.intl ? 
          this.props.intl.formatMessage({id: 'views', defaultMessage: defaultMessages.views}) : defaultMessages.views)}</div>
      </Col>
      <Col sm="2" className="d-flex align-items-center justify-content-end">
        <div className="d-flex align-items-center">
          <a href={window.jimuConfig.useStructuralUrl ?
            `../stemapp/${this.props.appItem.id}/` : `../stemapp/?id=${this.props.appItem.id}`}  rel="noreferrer" target="_blank">
            <Button title={this.props.intl ? this.props.intl.formatMessage({id: 'launchApp', defaultMessage: defaultMessages.launchApp}) : defaultMessages.launchApp} 
              className="float-right ml-1 mr-1 btn app-item-backcolor app-item-launch border-0" onClick={this.appLaunch}>
              <Icon className="app-list-iconfill mr-0" icon={IconPlay}/>
            </Button>
          </a>
          <EditDropDown className="float-right" portalUrl={this.props.portalUrl} intl={this.props.intl}
            appItem={this.props.appItem} folderUrl={this.props.folderUrl} isOwner={this.checkIsOwner()}></EditDropDown>
        </div>
      </Col>
      <AlertPopup isOpen={this.state.isShowAlertPopup} 
          title={this.props.intl ? this.props.intl.formatMessage({id: 'popUpTitle', defaultMessage: defaultMessages.popUpTitle}) : defaultMessages.popUpTitle} 
          hideCancel toggle={this.handleToggle}>
          <div style={{ fontSize: '1rem' }}>
            {this.props.intl ? this.props.intl.formatMessage({id: 'popUpDiscription1', defaultMessage: defaultMessages.popUpDiscription1}) : defaultMessages.popUpDiscription1}
          </div>
          <div style={{ fontSize: '1rem' }} className="mt-4">
            {this.props.intl ? this.props.intl.formatMessage({id: 'popUpDiscription2', defaultMessage: defaultMessages.popUpDiscription2}) : defaultMessages.popUpDiscription2}
          </div>
        </AlertPopup>
    </Row>;
  }
}