/** @jsx jsx */
import {React, jsx, css, ThemeVariables, SerializedStyles, InjectedIntl} from 'jimu-core';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'jimu-ui';
import defaultMessages from '../translations/default';

interface props {
  theme: ThemeVariables,
  isOpen?: boolean,
  title: string,
  intl: InjectedIntl,
  onClosed?: (isOk: boolean) => void;
  toggle?: () => void,
}

export default class CommonModal extends React.PureComponent<props, {isOpen: boolean}>{

  isOkClick: boolean;
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
    this.isOkClick = false;
    this.setState({
      isOpen: false
    })
    const {toggle, isOpen} = this.props
    if(isOpen === undefined) return;
    
    if(toggle){
      toggle();
    }
  }

  handleOkClick = () => {
    this.isOkClick = true;
    this.setState({
      isOpen: false
    })
    
    const {toggle, isOpen} = this.props;
    if(isOpen === undefined) return;
    if(toggle){
      toggle();
    }
  }

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
    const {toggle, isOpen} = this.props
    if(isOpen === undefined) return;
    if(toggle){
      toggle();
    }
  }

  onModalClosed = () => {
    const {onClosed} = this.props;
    if(onClosed){
      onClosed(this.isOkClick);
    }
    this.isOkClick = false;
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  getStyle = (): SerializedStyles => {
    let theme = this.props.theme;
    let fontSizeRoot = 17;
    return css`
      .modal-header {
        .close {
          color: ${theme.colors.grays.gray700};
          opacity: 1;
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
      }
      .modal-content{
        width: auto;
      }
      .modal-footer{
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
      .choose-template-description{
        width: 100%;
        font-size: ${14 / fontSizeRoot}rem;
        user-select:none;
      }
    `
  }
  
  render(){
    let {isOpen} = this.props;
    isOpen = isOpen === undefined ? this.state.isOpen : isOpen;
    return(
    <Modal css={this.getStyle()}
      isOpen={isOpen} onClosed={this.onModalClosed} toggle={this.handleToggle} centered={true}>
      <ModalHeader tag="h4" toggle={this.handleCloseBtn}>
        {this.props.title}
      </ModalHeader>
      <ModalBody>
        <div style={{marginLeft: '10px'}}>
          {this.props.children}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.handleOkClick} >{this.formatMessage('certainly')}</Button>
        <Button outline color="secondary" onClick={this.handleCloseBtn}>{this.formatMessage('cancel')}</Button>
      </ModalFooter>
    </Modal>
        
    )
  }
}
