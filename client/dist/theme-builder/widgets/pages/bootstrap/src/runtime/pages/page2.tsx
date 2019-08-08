/** @jsx jsx */
import { React, jsx, css, classNames } from 'jimu-core';
import {
  Button, ButtonGroup, ButtonDropdown,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Pagination, PaginationItem, PaginationLink,
  Icon, Switch
} from 'jimu-ui';

type buttonShadows = '' | 'default' | 'sm' | 'lg';
type buttonSize = 'default' | 'sm' | 'lg';
type buttonColors = 'light' | 'dark' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'white';

interface pageStates {
  dropdownOpen: boolean;
  dropdownButtonOpen: boolean;
  splitDropdownOpen: boolean;
  buttonRounded: boolean;
  buttonsShadow: buttonShadows;
  buttonRelativesShadow: buttonShadows;
  buttonRelativesOutlined: boolean;
  buttonRelativesColor: buttonColors;
  buttonRelativesSize: buttonSize;
}

const THEMECOLORS = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'white',
  'dark',
  'light',
  'link'
];

export class Page2 extends React.PureComponent<{}, pageStates> {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      dropdownButtonOpen: false,
      splitDropdownOpen: false,
      buttonRounded: false,
      buttonsShadow: '',
      buttonRelativesShadow: '',
      buttonRelativesOutlined: false,
      buttonRelativesColor: 'primary',
      buttonRelativesSize: 'default'
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleDropdownButton = this.toggleDropdownButton.bind(this);
    this.splitToggleDropdown = this.splitToggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleDropdownButton() {
    this.setState(prevState => ({
      dropdownButtonOpen: !prevState.dropdownButtonOpen
    }));
  }

  splitToggleDropdown() {
    this.setState(prevState => ({
      splitDropdownOpen: !prevState.splitDropdownOpen
    }));
  }
  
  createAllButtons(props) {
    let buttonNodes = [];
    THEMECOLORS && THEMECOLORS.forEach((color, index) => {
      buttonNodes.push(<Button 
        key={index} 
        outline={props && props.outline} 
        text={props && props.text} 
        className={props && props.classNames} 
        rounded={this.state.buttonRounded} 
        color={color}>{color}</Button>);
    })

    return buttonNodes;
  }

  render() {
    let buttonClasses = classNames(
      this.state.buttonsShadow ? 
      this.state.buttonsShadow === 'default' ? 'shadow' : 'shadow-' + this.state.buttonsShadow : '',
      'mb-2 mr-2'
    );

    let buttonRelativesClasses = classNames(
      this.state.buttonRelativesShadow ? 
      this.state.buttonRelativesShadow === 'default' ? 'shadow' : 'shadow-' + this.state.buttonRelativesShadow : '',
      'mb-2 mr-2'
    );

    return (
      <div>
        <h2 className="mb-3">Button
          <span className="float-right d-flex align-items-center">
            <small className="h5 font-weight-normal text-muted m-0 mr-3 ml-5">rounded:</small>
            <Switch checked={this.state.buttonRounded} onChange={evt => {
              this.setState({ buttonRounded: evt.target.checked })
            }}/>
            <small className="h5 font-weight-normal text-muted m-0 mr-3 ml-5">shadow:</small>
            <ButtonGroup size="sm" onClick={e => {
              let targetButton = e.target as HTMLButtonElement;
              this.setState({ buttonsShadow: targetButton.value as buttonShadows })
            }}>
              <Button value="" outline active={this.state.buttonsShadow === ''}>none</Button>
              <Button value="sm" outline active={this.state.buttonsShadow === 'sm'}>small</Button>
              <Button value="default" outline active={this.state.buttonsShadow === 'default'}>default</Button>
              <Button value="lg" outline active={this.state.buttonsShadow === 'lg'}>large</Button>
            </ButtonGroup>
          </span>
        </h2>
        {/* BUTTONS: START */}
        <h6>Default Button:</h6>
        <div className="mb-3">
          <Button className={buttonClasses} rounded={this.state.buttonRounded}>default</Button>
        </div>
        <h6>With Icons:</h6>
        <div className="mb-3">
          <Button className={buttonClasses} rounded={this.state.buttonRounded}><Icon icon={require('jimu-ui/lib/icons/heart.svg')} />before text</Button>
          <Button className={buttonClasses} rounded={this.state.buttonRounded}>after text <Icon className="right-icon" icon={require('jimu-ui/lib/icons/heart.svg')} /></Button>
        </div>
        <h6>With Colors:</h6>
        <div className="mb-3">
          {
            this.createAllButtons({
              classNames: buttonClasses
            })
          }
        </div>
        <h6>Outline Buttons:</h6>
        <div className="mb-3">
          {
            this.createAllButtons({
              classNames: buttonClasses,
              outline: true
            })
          }
        </div>
        <h6>Text Buttons:</h6>
        <div className="mb-3">
          {
            this.createAllButtons({
              classNames: buttonClasses,
              text: true
            })
          }
        </div>
        <h6>Sizes:</h6>
        <div className="mb-3">
          <Button size="lg" className={buttonClasses} rounded={this.state.buttonRounded} color="primary">Large Size</Button>{' '}
          <Button className={buttonClasses} rounded={this.state.buttonRounded} color="primary">Default Size</Button>{' '}
          <Button className={buttonClasses} rounded={this.state.buttonRounded} size="sm" color="primary">Small Size</Button>{' '}
        </div>
        <h6>Icon Button:</h6>
        <div className="mb-3">
            <Button icon rounded={this.state.buttonRounded} className={buttonClasses} size="lg"><Icon icon={require('jimu-ui/lib/icons/add.svg')}></Icon></Button>{' '}
            <Button icon rounded={this.state.buttonRounded} className={buttonClasses}><Icon icon={require('jimu-ui/lib/icons/add.svg')}></Icon></Button>{' '}
            <Button icon rounded={this.state.buttonRounded} className={buttonClasses} size="sm"><Icon icon={require('jimu-ui/lib/icons/add.svg')}></Icon></Button>
        </div>
        <hr />
        <h2 className="mb-3">Button Related Component:</h2>
        <div css={css`small > * {margin-left: .25rem;}`} className="d-flex align-items-center flex-wrap my-5">
          <small className="h5 font-weight-normal text-muted m-0 mr-5">outlined:
            <Switch checked={this.state.buttonRelativesOutlined} onChange={evt => {
              this.setState({ buttonRelativesOutlined: evt.target.checked })
            }}/>
          </small>
          <small className="h5 font-weight-normal text-muted m-0 mr-5">Size:
            <ButtonGroup size="sm" onClick={e => {
              let targetButton = e.target as HTMLButtonElement;
              this.setState({ buttonRelativesSize: targetButton.value as buttonSize })
            }}>
              <Button value="sm" outline active={this.state.buttonRelativesSize === 'sm'}>small</Button>
              <Button value="default" outline active={this.state.buttonRelativesSize === 'default'}>default</Button>
              <Button value="lg" outline active={this.state.buttonRelativesSize === 'lg'}>large</Button>
            </ButtonGroup>
          </small>
          <small className="h5 font-weight-normal text-muted m-0 mr-5">shadow:
            <ButtonGroup size="sm" onClick={e => {
              let targetButton = e.target as HTMLButtonElement;
              this.setState({ buttonRelativesShadow: targetButton.value as buttonShadows })
            }}>
              <Button value="" outline active={this.state.buttonRelativesShadow === ''}>none</Button>
              <Button value="sm" outline active={this.state.buttonRelativesShadow === 'sm'}>small</Button>
              <Button value="default" outline active={this.state.buttonRelativesShadow === 'default'}>default</Button>
              <Button value="lg" outline active={this.state.buttonRelativesShadow === 'lg'}>large</Button>
            </ButtonGroup>
          </small>
          <small className="h5 font-weight-normal text-muted m-0">color: {this.state.buttonRelativesColor}
            <ButtonGroup 
              css={css`
                .btn {
                  width: 2rem;
                  height: 1rem;
                  &.active {
                    outline: 4px solid #333;
                  }
                }
              `} 
              size="sm" onClick={e => {
                let targetButton = e.target as HTMLButtonElement;
                this.setState({ buttonRelativesColor: targetButton.value as buttonColors })
              }}>
              <Button value="primary" color="primary" active={this.state.buttonRelativesColor === 'primary'}></Button>
              <Button value="secondary" color="secondary" active={this.state.buttonRelativesColor === 'secondary'}></Button>
              <Button value="success" color="success" active={this.state.buttonRelativesColor === 'success'}></Button>
              <Button value="info" color="info" active={this.state.buttonRelativesColor === 'info'}></Button>
              <Button value="warning" color="warning" active={this.state.buttonRelativesColor === 'warning'}></Button>
              <Button value="danger" color="danger" active={this.state.buttonRelativesColor === 'danger'}></Button>
              <Button value="white" color="white" active={this.state.buttonRelativesColor === 'white'}></Button>
              <Button value="dark" color="dark" active={this.state.buttonRelativesColor === 'dark'}></Button>
              <Button value="light" color="light" outline active={this.state.buttonRelativesColor === 'light'}></Button>
            </ButtonGroup>
          </small>
          </div>
        <h6>Button Group:</h6>
        <div className="mb-3">
          <ButtonGroup className={buttonRelativesClasses}>
            <Button color={this.state.buttonRelativesColor} 
            size={this.state.buttonRelativesSize} 
            outline={this.state.buttonRelativesOutlined}>Left</Button>
            <Button color={this.state.buttonRelativesColor} 
            size={this.state.buttonRelativesSize} 
            outline={this.state.buttonRelativesOutlined}>Middle</Button>
            <Button color={this.state.buttonRelativesColor} 
            size={this.state.buttonRelativesSize} 
            outline={this.state.buttonRelativesOutlined}>Right</Button>
          </ButtonGroup>
        </div>
        <h6>Button Dropdown:</h6>
        <div className="mb-3">
          <ButtonDropdown size={this.state.buttonRelativesSize} isOpen={this.state.dropdownButtonOpen} toggle={this.toggleDropdownButton} className={buttonRelativesClasses}>
            <DropdownToggle color={this.state.buttonRelativesColor} outline={this.state.buttonRelativesOutlined} caret>
              Button Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <div className="mb-3">
          <ButtonDropdown size={this.state.buttonRelativesSize}  isOpen={this.state.splitDropdownOpen} toggle={this.splitToggleDropdown} className={buttonRelativesClasses}>
            <Button color={this.state.buttonRelativesColor} id="caret" outline={this.state.buttonRelativesOutlined}>Split Dropdown</Button>
            <DropdownToggle caret color={this.state.buttonRelativesColor} outline={this.state.buttonRelativesOutlined}/>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <h6>Dropdown:</h6>
        <div className="mb-3">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret  size={this.state.buttonRelativesSize} color={this.state.buttonRelativesColor} className={buttonRelativesClasses} outline={this.state.buttonRelativesOutlined}>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem>Some Action</DropdownItem>
              <DropdownItem disabled>Action (disabled)</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Foo Action</DropdownItem>
              <DropdownItem>Bar Action</DropdownItem>
              <DropdownItem>Quo Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <h6>Pagination:</h6>
        <div>
          <Pagination>
            <PaginationItem className={buttonRelativesClasses}>
              <PaginationLink href="#">
                <Icon icon={require('jimu-ui/lib/icons/arrow-left.svg')} size={12}></Icon>
              </PaginationLink>        
            </PaginationItem>
            <PaginationItem className={buttonRelativesClasses}>
              <PaginationLink href="#">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active className={buttonRelativesClasses}>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={buttonRelativesClasses}>
              <PaginationLink href="#">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={buttonRelativesClasses}>
              <PaginationLink href="#">
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={buttonRelativesClasses}>
              <PaginationLink href="#">
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled className={buttonRelativesClasses}>
              <PaginationLink next href="#">
                <Icon icon={require('jimu-ui/lib/icons/arrow-right.svg')} size={12}></Icon>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
        {/* BUTTONS: END */}
      </div>
    )
  }
}