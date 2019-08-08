/** @jsx jsx */
import {BaseWidget, AllWidgetProps, jimuHistory, React, FormattedMessage, 
  css, jsx, SessionManager, polished} from 'jimu-core';
import {IMConfig} from '../config';
import {Icon, Popover, PopoverBody, Image} from 'jimu-ui';
import defaultMessages from './translations/default';

let IconAccount = require('jimu-ui/lib/icons/account.svg');

interface State{
  appTaskDropdown: boolean;
  titleText: string;
  titleLength: number;
  menuPopoverOpen: boolean;
  accountPopoverOpen: boolean;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{

  titleTextInput = React.createRef<HTMLInputElement>();
  // span is designed for textInput auto resize function 
  spanTextInput = React.createRef<HTMLSpanElement>();

  constructor(props) {
    super(props);

    this.appTaskToggle = this.appTaskToggle.bind(this);
    this.state = {
      appTaskDropdown: false,
      titleText: '',
      titleLength: 0,
      menuPopoverOpen: false,
      accountPopoverOpen: false
    };
  }

  getStyle() {
    // with font_size_root theme variable can't be get, so define font_size_root temporarily
    let theme = this.props.theme;

    return css`
      .widget-site-header {
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
        }
      
        .header-dropdown {
          float: left;
          color: ${theme.colors.black};
      
          div {
            background-color: ${theme.colors.grays.gray100};
          }

          &:hover {
            background-color: ${theme.colors.white};
          }
        }

        .header-login {
          cursor: pointer;
          fill: ${theme.colors.black};
        }

        .header-dropdown {
          user-select: none;
          transition: none;
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

  componentWillReceiveProps (newProps) {
    // listen to queryObjectId change, so update the widget titleText timely
    if (newProps.queryObject.id && this.props.queryObject.id !== newProps.queryObject.id) {
      this.setState({
        titleText: ''
      })

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
    jimuHistory.changePage('template');
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

  render() {
    let userThumbnail = null;
    if (this.props.user && this.props.user.thumbnail) {
      userThumbnail = this.props.portalUrl + '/sharing/rest/community/users/' + this.props.user.username + '/info/' 
      + this.props.user.thumbnail + '?token=' + SessionManager.getInstance().getSession().token;
    }

    let modifiers = {
      preventOverflow: {
        escapeWithReference: true
      },
      offset: { offset: '0, 1' }
    };

    let theme = this.props.theme;

    return <div css={this.getStyle()} className="h-100">
    <div className="widget-site-header d-flex justify-content-between h-100 border-left-0 border-right-0 border-top-0">
      <div className="header-logo d-flex align-items-center">
        <img className="header-logo-item mr-2 d-block" src={require('./assets/exb-logo.png')}/>
        <div><h4 className="mb-0 font-weight-normal header-logo-container">
          <a className="header-logo-label px-0" href={`${window.jimuConfig.mountPath}`}>ArcGIS Experience Builder   </a>
          </h4>
        </div>
      </div>
      <span className="px-1 border font-weight-normal" style={{fontSize: '16px', position: 'absolute', opacity: 0, whiteSpace: 'pre', zIndex: -1}} ref={this.spanTextInput}>
        {this.state.titleText}
      </span>
      <div className="float-right d-flex">
        <div id="accountPopover" onClick={this.toggleAccount} className="header-account float-left d-flex align-items-center" 
          style={{cursor: 'pointer'}}>
          {userThumbnail && <Image src={userThumbnail} width={16} height={16} shape="circle" className="d-block float-left header-login"/>}
          {!userThumbnail && <Icon icon={IconAccount} width={16} height={16} className="d-block float-left header-login"/>}
          <div className="d-flex align-items-center" style={{marginLeft: '5px', fontSize: '14px'}}>
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
    </div></div>
  }
}
