/** @jsx jsx */
import {React, jsx, css, ThemeVariables, SerializedStyles, themeUtils, injectIntl, InjectedIntl} from 'jimu-core';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'jimu-ui';
import defaultMessages from '../translations/default';

interface props {
  theme: ThemeVariables;
  intl: InjectedIntl;
  isOpen?: boolean;
  title?: string;
  hideOK?: boolean;
  hideCancel?: boolean;
  toggle?: (isOk?: boolean) => void;
}

class _AlertPopup extends React.PureComponent<props, {isOpen: boolean}>{

  constructor(props){
    super(props);
    this.state = {
      isOpen: !!props.isOpen
    }
  }

  componentWillReceiveProps(nextProps){
    const {isOpen} = this.props;
    if(isOpen !== undefined && nextProps.isOpen === undefined){
      this.setState({
        isOpen: nextProps.isOpen
      })
    }
  }

  handleCloseBtn = () => {
    this.setState({
      isOpen: false
    })
    const {toggle, isOpen} = this.props
    if(isOpen === undefined) return;

    if(toggle){
      toggle(false);
    }
  }

  handleOkBtn = () => {
    this.setState({
      isOpen: false
    })

    const {toggle, isOpen} = this.props;
    if(isOpen === undefined) return;
    if(toggle){
      toggle(true);
    }
  }

  handleToggle = () => {
    this.setState({
      isOpen: false
    })
    const {toggle, isOpen} = this.props
    if(isOpen === undefined) return;
    if(toggle){
      toggle(false);
    }
  }

  getStyle = (): SerializedStyles => {
    let theme = this.props.theme;

    return css`
      .modal-header {
        border-bottom: 1px solid ${theme.colors.secondary};
        padding: 0.7rem 1rem;
        .close {
          color: ${theme.colors.grays.gray700};
          opacity: 1;
          padding: 0;
          margin: 0;
          transition: color .15s ease-in-out;
          &:not(:disabled):not(.disabled):hover,
          &:not(:disabled):not(.disabled):focus {
            opacity: 1;
          }
        }
      }
      .modal-body{
        overflow-y: auto;
        max-height: 360px;
        padding: 1rem 1rem;
      }
      .modal-content{
        width: auto;
        background-color: ${theme.colors.grays.gray100};
        border: 1px solid ${theme.colors.grays.gray300};
        border-radius: 0;
      }
      .modal-footer{
        padding: 1rem;

        .btn {
          min-width: 80px;
          + .btn {
            margin-left: 10px;
          }
        }
      }
      &.modal-dialog{
        width: auto;
      }
    `
  }

  render(){
    let {isOpen} = this.props;
    isOpen = isOpen === undefined ? this.state.isOpen : isOpen;
    return(
    <Modal css={this.getStyle()} className="d-flex justify-content-center"
      isOpen={isOpen} centered={true} toggle={this.handleToggle}>
      <ModalHeader tag="h4" toggle={this.handleCloseBtn}>
        {this.props.title}
      </ModalHeader>

      <ModalBody>
        <div>
          {this.props.children}
        </div>
      </ModalBody>
      <ModalFooter>
        {!this.props.hideOK && <Button color="primary" onClick={this.handleOkBtn}>
          {this.props.intl.formatMessage({id: 'popUpOk', defaultMessage: defaultMessages.popUpOk})}
        </Button>}
        {!this.props.hideCancel && <Button outline color="secondary" onClick={this.handleCloseBtn}>
          {this.props.intl.formatMessage({id: 'popUpCancel', defaultMessage: defaultMessages.popUpCancel})}
        </Button>}
      </ModalFooter>
    </Modal>

    )
  }
}

export default themeUtils.withTheme(injectIntl(_AlertPopup));
