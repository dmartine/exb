/** @jsx jsx */
import { React, css, jsx } from 'jimu-core';
import {
  Nav, NavItem, NavLink, NavMenu,
  Breadcrumb, BreadcrumbItem,
  Navbar,
  Collapse,
  NavbarBrand,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem ,
  InputGroup, Input, ButtonGroup, Button, InputGroupAddon,
  Icon, Switch, Slider
} from 'jimu-ui';

type navbarColors = '' | 'dark' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'light';

interface pageStates {
  navbarColor: navbarColors;
  navLinksVertical: boolean;
  navPillsVertical: boolean;
  navTabsVertical: boolean;
  navTabsIsRight: boolean;
  navGap: number;
  navbarMenu1Open: boolean;
  navbarMenu2Open: boolean;
  navbarSubMenu1Open: boolean;
}

const sampleIcon1 = require('jimu-ui/lib/icons/home.svg');
const sampleIcon2 = require('jimu-ui/lib/icons/map-pin.svg');

export class Page4 extends React.PureComponent<{}, pageStates> {

  constructor(props) {
    super(props);

    this.state = {
      navbarColor: '',
      navLinksVertical: false,
      navPillsVertical: false,
      navTabsVertical: false,
      navTabsIsRight: false,
      navGap: 5,
      navbarMenu1Open: false,
      navbarMenu2Open: false,
      navbarSubMenu1Open: false
    };
  }

  render() {
    return (
      <div>
        <style>{`
          .nav.flex-column {
            max-width: 200px;
          }
        `}</style>
        <h2>Navs 
          <span className="float-right d-flex align-items-center">
          <small className="h5 font-weight-normal text-muted m-0 mr-3 ml-5">color: {this.state.navbarColor === '' ? '(default)' : this.state.navbarColor}</small>
            <ButtonGroup 
              css={css`
                .btn {
                  width: 1.5rem;
                  height: 1rem;
                  &.active {
                    outline: 4px solid #333;
                  }
                }
              `} 
              size="sm" onClick={e => {
                let targetButton = e.target as HTMLButtonElement;
                this.setState({ navbarColor: targetButton.value as navbarColors })
              }}>
              <Button value="dark" color="dark" active={this.state.navbarColor === 'dark'}></Button>
              <Button value="primary" color="primary" active={this.state.navbarColor === 'primary'}></Button>
              <Button value="secondary" color="secondary" active={this.state.navbarColor === 'secondary'}></Button>
              <Button value="success" color="success" active={this.state.navbarColor === 'success'}></Button>
              <Button value="info" color="info" active={this.state.navbarColor === 'info'}></Button>
              <Button value="warning" color="warning" active={this.state.navbarColor === 'warning'}></Button>
              <Button value="danger" color="danger" active={this.state.navbarColor === 'danger'}></Button>
              <Button value="light" color="light" outline active={this.state.navbarColor === 'light'}></Button>
              <Button value="white" color="white" active={this.state.navbarColor === 'white'}></Button>
            </ButtonGroup>
            <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">Gap:</small>
            <Slider style={{width: 100}} min={0} max={30} value={this.state.navGap} onChange={e => {
              this.setState({
                navGap: e.target.value
              })
            }}></Slider> <small className="h5 ml-2 text-muted">{this.state.navGap}px</small>
          </span>
        </h2>
        {/* Navs: START */}
        <h4 className="mt-5 mb-3">Links:
          <span className="float-right d-flex align-items-center">
            <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">Vertical:</small>
            <Switch checked={this.state.navLinksVertical} onChange={evt => {
              this.setState({ navLinksVertical: evt.target.checked })
            }}/>
          </span>
        </h4>

        <Nav color={this.state.navbarColor} gap={`${this.state.navGap}px`} className="mb-3" vertical={this.state.navLinksVertical}>
          <NavItem>
            <NavLink icon={sampleIcon1} active>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink icon={sampleIcon2} iconPosition="end" to={{linkType: 'VIEW', value: 'default,jimu-ui'}}>Jimu UI</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="http://www.esri.com">Esri.com</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <h4 className="mt-5 mb-3">Tabs:
          <span className="float-right d-flex align-items-center">
            <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">Vertical:</small>
            <Switch checked={this.state.navTabsVertical} onChange={evt => {
              this.setState({ navTabsVertical: evt.target.checked })
            }} />
            <span style={{display: this.state.navTabsVertical ? '' : 'none'}}>
              <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">Right:</small>
              <Switch checked={this.state.navTabsIsRight} onChange={evt => {
                this.setState({ navTabsIsRight: evt.target.checked })
              }}/>
            </span>
          </span>
        </h4>
        <Nav color={this.state.navbarColor} gap={`${this.state.navGap}px`} tabs className="mb-3" vertical={this.state.navTabsVertical} right={this.state.navTabsIsRight}>
          <NavItem>
            <NavLink href="#" active>Link</NavLink>
          </NavItem>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <h4 className="mt-5 mb-3"><span className="text-muted">tabStyle="tab"</span>:</h4>
        <Nav color={this.state.navbarColor} gap={`${this.state.navGap}px`} tabs className="mb-3" tabStyle="tab">
          <NavItem>
            <NavLink href="#" active>Link</NavLink>
          </NavItem>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <h4 className="mt-5 mb-3">Pills:
          <span className="float-right d-flex align-items-center">
            <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">Vertical:</small>
            <Switch checked={this.state.navPillsVertical} onChange={evt => {
              this.setState({ navPillsVertical: evt.target.checked })
            }}/>
          </span>
        </h4>
        <Nav color={this.state.navbarColor} gap={`${this.state.navGap}px`} pills className="mb-3" vertical={this.state.navPillsVertical}>
          <NavItem>
            <NavLink href="#" active>Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <h4 className="mt-5 mb-3">Breadcrumb:</h4>
        <Breadcrumb>
          <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
          <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
          <BreadcrumbItem active>Data</BreadcrumbItem>
        </Breadcrumb>
        {/* NAVS: END */}
        <hr/>
        {/* NAVBAR: START */}
        <h2>Navbar</h2>
        <div>
          <Navbar color={this.state.navbarColor} borderBottom>
            <NavbarBrand>
            <img src="https://via.placeholder.com/64x32/CFDBE7/131314?text=LOGO" />
            </NavbarBrand>
            <Collapse navbar>
              <Nav navbar className="flex-grow-1">
                <NavItem>
                  <NavLink>Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <InputGroup style={{width: 'auto'}} className="mr-4">
                <Input bsSize="lg" style={{maxWidth: 200}} placeholder="search"/>
                <InputGroupAddon addonType="append">
                  <Button color="white" icon><Icon icon={require('jimu-ui/lib/icons/search.svg')} /></Button>
                </InputGroupAddon>
              </InputGroup>
              <Nav navbar>
                <NavItem>
                  <NavLink><Icon size="24" icon={require('jimu-ui/lib/icons/account.svg')} />User</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <h2 className="mt-5 mb-3">Navbar (with Drawer)</h2>
        <div>
          <Navbar className="justify-content-between" color={this.state.navbarColor} borderBottom>
            <NavbarBrand>
            <img src="https://via.placeholder.com/64x32/CFDBE7/131314?text=LOGO" />
            </NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink>Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>GitHub</NavLink>
              </NavItem>
              <Dropdown nav isOpen={this.state.navbarMenu1Open} toggle={e => {this.setState({navbarMenu1Open: !this.state.navbarMenu1Open})}} >
                <DropdownToggle nav caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu appendToBody>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem dropdown menuOpenMode="hover" isOpen={this.state.navbarMenu2Open} toggle={e => {this.setState({navbarMenu2Open: !this.state.navbarMenu2Open})}} >
                <NavLink dropdowToggle icon={sampleIcon1} caret>Custom Nav Link</NavLink>
                <NavMenu>
                  <NavItem>
                    <NavLink>Option 1</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>Option 2</NavLink>
                  </NavItem>
                  <NavItem dropdown direction="right" menuOpenMode="hover" isOpen={this.state.navbarSubMenu1Open} toggle={e => {this.setState({navbarSubMenu1Open: !this.state.navbarSubMenu1Open})}} >
                    <NavLink dropdowToggle icon={sampleIcon2} caret>Option 3</NavLink>
                    <NavMenu>
                      <NavItem>
                        <NavLink>Option 1</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink>Option 2</NavLink>
                      </NavItem>
                    </NavMenu>
                  </NavItem>
                </NavMenu>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
        {/* NAVBAR: END */}
        </div>
    )
  }
}