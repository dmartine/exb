import { React, Immutable } from 'jimu-core';
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Popover, PopoverHeader, PopoverBody,
  Tooltip
} from 'jimu-ui';

export class Page5 extends React.PureComponent<{}, any> {
  constructor(props) {
    super(props);

    this.state = {
      modal: Immutable({
        open: false
      }),
      popover: Immutable({
        open: false
      }),
      tooltip: Immutable({
        open: false
      })
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: this.state.modal.set('open', !prevState.modal.open)
    }))
  }

  togglePopover() {
    this.setState(prevState => ({
      popover: this.state.popover.set('open', !prevState.popover.open)
    }))
  }

  togglePopup() {
    this.setState(prevState => ({
      tooltip: this.state.tooltip.set('open', true)
    }))
  }

  render() {
    return (
      <div>
        <h2>Modal & Popover & Tooltip</h2>
        {/* MODAL: START */}
        <h6>Modal:</h6>
        <div className="mb-3">
          <Button color="primary" onClick={this.toggleModal}>Launch Modal</Button>
          <Modal isOpen={this.state.modal.open} toggle={this.toggleModal}>
            <ModalHeader tag="h2" toggle={this.toggleModal} >Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
              in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="white" onClick={this.toggleModal}>Cancel</Button>
              <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
        {/* MODAL: END */}
        {/* POPOVER: START */}
        <h6>Popover:</h6>
        <div className="mb-3">
          <Button color="primary" id="Popover1" onClick={this.togglePopover}>
            Launch Popover
          </Button>
          <Popover placement="auto" isOpen={this.state.popover.open} target="Popover1" toggle={this.togglePopover}>
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
          </Popover>
        </div>
        {/* POPOVER: EMND */}
        {/* POPUP: START */}
        <h6>Popup:</h6>
        <div>
          <p>Somewhere in here is a <a href="#" id="TooltipExample">tooltip</a>.</p>
          <Tooltip placement="right" isOpen={this.state.tooltip.open} target="TooltipExample" toggle={this.togglePopup}>
            Hello world!
          </Tooltip>
        </div>
        {/* POPUP: END */}
      </div>
    )
  }
}