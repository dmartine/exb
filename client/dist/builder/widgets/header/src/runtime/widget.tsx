/** @jsx jsx */
import {BaseWidget, AllWidgetProps, jimuHistory, React, FormattedMessage, 
  css, jsx, SessionManager, IMState, polished} from 'jimu-core';
import {builderActions, AlertPopup} from 'jimu-for-builder';
import {appServices} from 'builder/common';
import {IMConfig} from '../config';
import {Icon, Popover, PopoverBody, Button, Image} from 'jimu-ui';
import defaultMessages from './translations/default';
import ToolList from './tool-list';
import ReactResizeDetector from 'react-resize-detector';

let IconAdd = require('jimu-ui/lib/icons/add-10.svg');
let IconAccount = require('jimu-ui/lib/icons/account.svg');
let IconArrowDown = require('jimu-ui/lib/icons/arrow-down-8.svg');
let IconEdit = require('jimu-ui/lib/icons/tool-edit.svg');

interface ExtraProps {
  currentPageId: string;
}

interface State{
  appTaskDropdown: boolean;
  titleText: string;
  titleLength: number;
  menuPopoverOpen: boolean;
  accountPopoverOpen: boolean;
  isShowAlertPopup: boolean;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, State>{

  titleTextInput = React.createRef<HTMLInputElement>();
  // span is designed for textInput auto resize function 
  spanTextInput = React.createRef<HTMLSpanElement>();
  isToolListSaved: boolean = true;

  constructor(props) {
    super(props);

    this.appTaskToggle = this.appTaskToggle.bind(this);
    this.state = {
      appTaskDropdown: false,
      titleText: '',
      titleLength: 0,
      menuPopoverOpen: false,
      accountPopoverOpen: false,
      isShowAlertPopup: false
    };
  }

  getStyle() {
    // with font_size_root theme variable can't be get, so define font_size_root temporarily
    let theme = this.props.theme;
    let font_size_root = 14;

    return css`
      .widget-builder-header {
        background-color: ${theme.colors.grays.gray200};
        border: 1px solid ${theme.colors.white};
        padding-left: ${polished.rem(16)};
      
        .header-logo {
          .header-logo-item {
            height: ${polished.rem(24)};
            width: ${polished.rem(24)};
          }

          .header-logo-container {
            display: block;
            position: relative;

            .header-logo-container-beta {
              position: absolute;
              right: -30px;
              color:  #A6A6A6;
              font-size: 10px;
              bottom: 8px;
              font-weight: 900;
              display: block;
              height: 11px;
            }
          }
      
          .header-logo-label {
            font-size: 14px;
            color: ${theme.colors.black};
          }

          .header-logo-label:after {
            color:  #A6A6A6;
            font-size: 10px;
            font-weight: 900;
            content: 'BETA'
          }

          .header-logo-label:not(:disabled):not(.disabled):active {
            color: ${theme.colors.black};
          }

          @media only screen and (max-width: 760px) {
            .header-logo-label-screen {
              width: ${polished.rem(50)};
              display: block;
              over-flow: hidden;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }


        .header-title-maxwidth-screen {
          max-width: ${polished.rem(220)};
        }

        @media only screen and (max-width: 970px) {
          .header-title-maxwidth-screen {
            max-width: ${polished.rem(58)};
          }
        }

        @media only screen and (max-width: 760px) {
          .header-title-maxwidth-screen {
            visibility: hidden;
          }
        }

        .header-title-position-screen {
          transform: translateX(-100%);
        }

        @media only screen and (min-width: 970px) {
          .header-title-position-screen {
            transform: translateX(-50%);
          }
        }
      
        .header-title {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          input {
            background-color: transparent;
            &:focus {
              background-color: ${theme.colors.white};
            }
          }
          .btn.text-btn.btn-dark {
            color: ${theme.colors.grays.gray600};
            &:hover,
            &:focus {
              color: ${theme.colors.grays.gray700};
            }
          }
        }

        .header-title-icon {
          color: ${theme.colors.grays.gray600};

          &:hover {
            color: ${theme.colors.black};
          }
        }
      
        .header-title-input {
          border: none;
          text-align: center;
          min-width: ${50 / font_size_root}rem;
          cursor: pointer;
          color: ${theme.colors.black};
      
          &:hover {
            border: 1px solid ${theme.colors.grays.gray300};
          }
        }
      
        .header-dropdown {
          float: left;
          color: ${theme.colors.black};
          padding-left: ${polished.rem(16)};
          padding-right: ${polished.rem(16)};

          &:hover {
            background-color: ${theme.colors.grays.gray100};
          }
        }

        .header-account {
          float: left;
          color: ${theme.colors.black};
          padding-right: ${polished.rem(16)};
          padding-left: ${polished.rem(16)};

          div {
            background-color: initial;
          }

          &:hover {
            background-color: ${theme.colors.white};
          }
        }
      
        .header-login {
          cursor: pointer;
          fill: ${theme.colors.black};
        }

        .header-login-username {
          color: ${theme.colors.black}; 
          margin-left: 5px;
          font-size: 14px;
        }

        .header-drop-label {
          font-size: 14px;
          color: ${theme.colors.black};
        }

        @media only screen and (max-width: 600px) {
          .header-drop-label {
            width: ${polished.rem(50)};
            display: block;
            over-flow: hidden;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .header-drop-icon {
          fill: ${theme.colors.black};
        }

        .header-dropdown {
          user-select: none;
          transition: none;
        }

        .toollist-seperateline {
          margin-left: ${polished.rem(16)};
          border: 1px solid ${theme.colors.grays.gray300};
          height: 30px;
        }
      }
      
      .popover-item {
        padding: 0.75rem ${polished.rem(16)};

        .popover-item-icon {
          fill: ${theme.colors.black};
          color: ${theme.colors.black};
        }

        .popover-item-label {
          color: ${theme.colors.black}
        }

        &:hover {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.black}
        }
      }`;
  }

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      currentPageId: state.appRuntimeInfo && state.appRuntimeInfo.currentPageId,
    };
  }

  componentDidMount() {
    if (this.props.queryObject.id) {
      this.refreshTitle(this.props.queryObject.id);
    }
  }

  componentWillReceiveProps (newProps) {
    // listen to queryObjectId change, so update the widget titleText timely
    if (newProps.queryObject.id && this.props.queryObject.id !== newProps.queryObject.id) {
      this.setState({
        titleText: ''
      })

      this.refreshTitle(newProps.queryObject.id);
    }
  }

  appTaskToggle() {
    this.setState(prevState => ({
      appTaskDropdown: !prevState.appTaskDropdown
    }));
  }

  focusEditTitle = () =>  {
    this.titleTextInput.current.select();
  }

  editTitle = () => {
    const currentTitle = this.titleTextInput.current.value;

    appServices.updateAppItem({
      id: this.props.queryObject.id,
      title: currentTitle
    }).then(() => {
      this.props.dispatch(builderActions.refreshAppListAction(true));
    }, err => {
      console.error(err);
    })
  }

  refreshTitle = (id: string) => {
    appServices.searchAppById(id).then(appItem => {
      this.setState({
        titleText: appItem.title
      })
    }, err => {
      console.error(err);
    });
  }

  titleTextChange = (event) => {
    const currentTitle = event.target.value;
    this.setState({
      titleText: currentTitle
    });
  }

  newApp = () => {
    this.setState({
      menuPopoverOpen: false
    });

    if (this.isToolListSaved) {
      jimuHistory.changePage('template');
      jimuHistory.replaceQueryObject({}, true);
    } else {
      this.setState({
        isShowAlertPopup: true
      });
    }
  }

  signOut = () => {
    this.setState({
      accountPopoverOpen: false
    })

    SessionManager.getInstance().signOut();
  }

  handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      this.titleTextInput.current.blur();
    } else {
      return
    }
  }

  componentDidUpdate() {
    if (this.spanTextInput.current && this.state.titleLength !== this.spanTextInput.current.offsetWidth) {
      this.setState({
        titleLength: this.spanTextInput.current.offsetWidth + 2
      });
    }
  }

  toggleMenu = () => {
    this.setState({
      menuPopoverOpen: !this.state.menuPopoverOpen
    });
  }

  toggleAccount = () => {
    this.setState({
      accountPopoverOpen: !this.state.accountPopoverOpen
    });
  }

  onTitleContainerResize = (width, height) => {
    this.setState({
      titleLength: this.spanTextInput.current.offsetWidth + 2
    });
  }

  handleToggle = (isOk) => {
    this.setState({
      isShowAlertPopup: !this.state.isShowAlertPopup
    });

    if (isOk) {
      jimuHistory.changePage('template');
      jimuHistory.replaceQueryObject({}, true);
    } else {
      return;
    }
  }

  render() {
    let userThumbnail = null;
    if (this.props.user && this.props.user.thumbnail) {
      userThumbnail = this.props.portalUrl + '/sharing/rest/community/users/' + this.props.user.username + '/info/' 
      + this.props.user.thumbnail + '?token=' + SessionManager.getInstance().getSession().token;
    }

    const pageId = this.props.currentPageId;
    let showTitle = true;
    if (pageId === 'template') {
      showTitle = false;
    }

    let modifiers = {
      preventOverflow: {
        escapeWithReference: true
      },
      offset: { offset: '0, 1' }
    };

    let theme = this.props.theme;

    return <div css={this.getStyle()} className="h-100">
    <div className="widget-builder-header d-flex justify-content-between h-100 pr-0 border-left-0 border-right-0 border-top-0">
      <div className="header-logo d-flex align-items-center">
        <img className="header-logo-item mr-2 d-block" src={require('./assets/exb-logo.png')}/>
        <div><h4 className="mb-0 font-weight-normal header-logo-container">
          <a className="header-logo-label px-0 header-logo-label-screen" href={`${window.jimuConfig.mountPath}`}>ArcGIS Experience Builder   </a>
          </h4>
        </div>
      </div>
      {showTitle && <div className="header-title d-flex align-items-center header-title-maxwidth-screen header-title-position-screen" onClick={this.focusEditTitle}>
        <input ref={this.titleTextInput} className="header-title-input px-1 font-weight-normal" title={this.state.titleText} 
          style={{width: `${this.state.titleLength}px`, fontSize: '16px'}}
          value={this.state.titleText} onBlur={this.editTitle} onChange={this.titleTextChange}
          onKeyDown ={ (e) => {this.handleKeydown(e)}}>
        </input>
        <Button size="sm" color="dark" text icon className="ml-1">
          <Icon icon={IconEdit} className="header-title-icon"/>
        </Button>
      </div>}
      <div style={{position: 'absolute', top: '-30px'}}>
        <div style={{zIndex: -1, position: 'relative'}}>
          <span className="px-1 border font-weight-normal" style={{fontSize: '16px', position: 'relative', opacity: 0, whiteSpace: 'pre', zIndex: -1}} ref={this.spanTextInput}>
            {this.state.titleText}
          </span>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onTitleContainerResize} />
      </div>
      <div className="d-flex align-items-center">
        {showTitle && <ToolList intl={this.props.intl} onSaveStatusChanged={(isToolListSaved) => {this.isToolListSaved = isToolListSaved}}/>}
        <div className="float-right d-flex h-100 justify-content-end">
          {showTitle && <div className="d-flex">
              <div className="toollist-seperateline border-bottom-0 border-top-0 border-left-0 mt-1 mb-1"></div>
              <div id="menuPopover" onClick={this.toggleMenu} 
              className="header-dropdown float-left d-flex align-items-center" 
            style={{cursor: 'pointer'}}>
            <span className="header-drop-label mr-2">
              {this.props.intl ? this.props.intl.formatMessage({id: 'createNew', defaultMessage: defaultMessages.createNew}) : defaultMessages.createNew}
            </span>
            <Icon className="header-drop-icon" icon={IconArrowDown} width={10} height={10}/>
            <Popover css={this.getStyle()} className="mt-0" style={{backgroundColor: theme && theme.colors ? theme.colors.grays.gray200 : '', boxShadow: '0 0 8px 0 rgba(0,0,0,0.50)'}} 
              hideArrow modifiers={modifiers} placement="bottom-start" isOpen={this.state.menuPopoverOpen} target="menuPopover" toggle={this.toggleMenu}>
              <PopoverBody className="pb-0 pt-0 popover-item">
                <div style={{height: '40px', fontSize: '14px', cursor: 'pointer'}} className="d-flex align-items-center" onClick={this.newApp}>
                  <Icon icon={IconAdd} className="d-block float-left pl-1 popover-item-icon"/>
                  <div className="d-block float-left ml-1 popover-item-label" style={{fontSize: '.8rem'}}>
                    <FormattedMessage id="createNew" defaultMessage={defaultMessages.createNew}/>
                  </div>
                </div>
              </PopoverBody>
            </Popover>
          </div></div>
          }
          <div id="accountPopover" onClick={this.toggleAccount} className="header-account float-left d-flex align-items-center" style={{cursor: 'pointer'}}>
            {userThumbnail && <Image src={userThumbnail} width={16} height={16} shape="circle" className="d-block float-left header-login"/>}
            {!userThumbnail && <Icon icon={IconAccount} width={16} height={16} className="d-block float-left header-login"/>}
            <div className="d-flex align-items-center header-login-username">
              {this.props.user && this.props.user.firstName ? this.props.user.firstName : ''}
            </div>
            <Popover css={this.getStyle()} className="mt-0" style={{backgroundColor: theme && theme.colors ? theme.colors.grays.gray200 : '', boxShadow: '0 0 8px 0 rgba(0,0,0,0.50)'}}
              hideArrow modifiers={modifiers} placement="bottom-start" isOpen={this.state.accountPopoverOpen} target="accountPopover" toggle={this.toggleAccount}>
              <PopoverBody className="pb-0 pt-0 popover-item">
                <div style={{height: '40px', fontSize: '14px', cursor: 'pointer'}} className="d-flex align-items-center" onClick={this.signOut}>
                  <div className="d-block float-left ml-1 popover-item-label" style={{fontSize: '.8rem'}}>
                    <FormattedMessage id="signOut" defaultMessage={defaultMessages.signOut}/>
                  </div>
                </div>
              </PopoverBody>
            </Popover>
          </div>
        </div>
      </div>
      <AlertPopup isOpen={this.state.isShowAlertPopup} okLabel={this.props.intl ? 
        this.props.intl.formatMessage({id: 'headerLeave', defaultMessage: defaultMessages.headerLeave}) : defaultMessages.headerLeave}
        title={this.props.intl ? this.props.intl.formatMessage({id: 'headerLeaveSite', defaultMessage: defaultMessages.headerLeaveSite}) : defaultMessages.headerLeaveSite} 
        toggle={this.handleToggle}>
        <div style={{ fontSize: '1rem' }}>
          {this.props.intl ? this.props.intl.formatMessage({id: 'headerLeaveDescription', defaultMessage: defaultMessages.headerLeaveDescription}) : defaultMessages.headerLeaveDescription}
        </div>
      </AlertPopup>
    </div></div>
  }
}
