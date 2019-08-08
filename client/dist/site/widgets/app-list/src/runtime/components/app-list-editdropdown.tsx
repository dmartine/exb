import {React, InjectedIntl} from 'jimu-core';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Icon, Modal} from 'jimu-ui';
import {AppListContext} from '../lib/app-list-context';
import {AppEditInfo} from '../components/app-list-editinfo';
import {IItem} from '@esri/arcgis-rest-types';
import defaultMessages from '../translations/default';

interface State{
  isOpen: boolean;
  isShownEditInfo: boolean;
}

interface Props{
  isOwner: boolean;
  portalUrl: string;
  className?: string;
  appItem: IItem;
  folderUrl: string;
  intl?: InjectedIntl;
}

let IconMoreHorizontal = require('jimu-ui/lib/icons/app-more.svg');

export default class Widget extends React.PureComponent<Props, State>{
  eidtInfoStyle = {width: '100%', height: '100%', maxWidth: '5000px', margin: 0};

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isShownEditInfo: false
    }
  }

  appLaunch = () => {
    let appUrl = window.jimuConfig.useStructuralUrl ? `../stemapp/${this.props.appItem.id}/` : `../stemapp/?id=${this.props.appItem.id}`;
    window.open(appUrl);
  }

  viewDetails = () => {
    let detailUrl = `${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`;
    window.open(detailUrl);
  }

  showEditInfo = () => {
    this.setState({isShownEditInfo: true});
  }

  onEditInfoCancel = () => {
    this.setState({isShownEditInfo: false});
  }

  render(){
    return <AppListContext.Consumer>
      {({deleteApp, refreshList, duplicateApp}) => (
        <div className={this.props.className} title={this.props.intl ? 
          this.props.intl.formatMessage({id: 'more', defaultMessage: defaultMessages.more}) : defaultMessages.more}>
          <Dropdown direction="right" size="sm" isOpen={this.state.isOpen} className="app-list-dropdown"
            onClick={evt => evt.stopPropagation()} toggle={() => this.setState({isOpen: !this.state.isOpen})}>
            <DropdownToggle text color="dark">
              <Icon icon={IconMoreHorizontal} className="app-list-iconfill app-list-icon-margin"></Icon>
            </DropdownToggle>
            <DropdownMenu className="app-list-dropdown">
              <DropdownItem className="pb-1" onClick={() => duplicateApp(this.props.appItem.id)} 
                title={this.props.intl.formatMessage({id: 'duplicate', defaultMessage: defaultMessages.duplicate})}>
                {this.props.intl.formatMessage({id: 'duplicate', defaultMessage: defaultMessages.duplicate})}
              </DropdownItem>
              {this.props.isOwner && <DropdownItem className="pb-1" onClick={this.showEditInfo}
                title={this.props.intl.formatMessage({id: 'editInfo', defaultMessage: defaultMessages.editInfo})}>
                {this.props.intl.formatMessage({id: 'editInfo', defaultMessage: defaultMessages.editInfo})}</DropdownItem>}
              <DropdownItem className="pb-1" onClick={this.viewDetails}
                title={this.props.intl.formatMessage({id: 'viewDetail', defaultMessage: defaultMessages.viewDetail})}>
                {this.props.intl.formatMessage({id: 'viewDetail', defaultMessage: defaultMessages.viewDetail})}</DropdownItem>
              {this.props.isOwner && <DropdownItem className="pb-1" onClick={() => deleteApp(this.props.appItem.id)}
                title={this.props.intl.formatMessage({id: 'delete', defaultMessage: defaultMessages.delete})}>
                {this.props.intl.formatMessage({id: 'delete', defaultMessage: defaultMessages.delete})}</DropdownItem>}
              {/* <DropdownItem href={`/api/download/${this.props.appItem.id}?portalUrl=${this.props.portalUrl}&token=${SessionManager.getInstance().getSession() ? 
                SessionManager.getInstance().getSession().token : ''}`}>
                {this.props.intl.formatMessage({id: 'download', defaultMessage: defaultMessages.download})}
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
          {this.state.isShownEditInfo && <Modal isOpen={this.state.isShownEditInfo} style={this.eidtInfoStyle} contentClassName="h-100 w-100">
              <AppEditInfo appItem={this.props.appItem} portalUrl={this.props.portalUrl} folderUrl={this.props.folderUrl} 
              onEditInfoCancel={this.onEditInfoCancel} intl={this.props.intl} 
              onEditInfoOk={() => {this.setState({isShownEditInfo: false}); refreshList()}}></AppEditInfo>
            </Modal>}
        </div>
      )}
    </AppListContext.Consumer>;
  }
}