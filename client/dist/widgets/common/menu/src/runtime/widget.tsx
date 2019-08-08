/** @jsx jsx */
import { jsx, css, BaseWidget, AllWidgetProps, urlUtils, IMState, IMPageJson, LinkType, IMAppConfig, PageType, BrowserSizeMode, LinkTo } from 'jimu-core';
import { Nav, Navbar, NavMenu, NavItem, NavLink } from 'jimu-ui';
import { IMConfig, Dir, NavStyle } from '../config';

export interface NavItemValue {
  id: string;
  to: LinkTo;
  icon: React.ComponentClass<React.SVGProps<SVGElement>> | string;
  target?: string;
  label: string;
  subs?: NavItemValue[];
}

let normalIcon = require('jimu-ui/lib/icons/toc-page.svg');
let linkIcon = require('jimu-ui/lib/icons/toc-link.svg');
let folderIcon = require('jimu-ui/lib/icons/toc-folder.svg');

const icons = { [PageType.Normal]: normalIcon, [PageType.Link]: linkIcon, [PageType.Folder]: folderIcon };

interface ExtraProps {
  browserSizeMode: BrowserSizeMode;
  currentId: string;
  appConfig: IMAppConfig;
}

interface State {
  isSubMenuOpen?: boolean;
  hoverMenu?: string;
  isMobileMenuOpen?: boolean;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, State>{
  delay: boolean;
  constructor(props) {
    super(props);
    this.state = {
      isSubMenuOpen: false,
      hoverMenu: '',
      isMobileMenuOpen: false
    }
  }
  static mapExtraStateProps = (state: IMState) => {
    const appPath = state.appPath as any;
    const appConfig = state.appConfig;
    const { pageStructure } = appConfig;

    let currentId = urlUtils.getAppIdPageIdFromUrl(appPath).pageId;

    if (!currentId && pageStructure && pageStructure.length) {
      currentId = Object.keys(pageStructure[0])[0];
    }

    return {
      browserSizeMode: state.browserSizeMode,
      currentId: currentId,
      appConfig: state.appConfig
    }
  };

  getNavItems = (): NavItemValue[] => {
    const { appConfig: { pageStructure, pages } } = this.props;
    const navItems = [];
    pageStructure.forEach(item => {
      var id = Object.keys(item)[0];
      const page = pages[id];
      if (!page.isVisible) {
        return;
      }
      const navItem = this.getNavItemValue(page);

      var subids = item[id];
      const subNavItems = [];
      subids.forEach(sid => {
        const spage = pages[sid];
        if (!spage.isVisible) {
          return;
        }
        subNavItems.push(this.getNavItemValue(spage));
      });
      navItem.subs = subNavItems;

      navItems.push(navItem);
    });
    return navItems;
  }

  getNavItemValue = (page: IMPageJson): NavItemValue => {
    return {
      id: page.id,
      to: this.getLinkTo(page),
      icon: page.icon || icons[page.type],
      target: page.openTarget,
      label: page.label
    }
  }

  getLinkTo = (page: IMPageJson) => {
    if (page.type === PageType.Folder) {
      return '#';
    } else if (page.type === PageType.Link) {
      return {
        linkType: LinkType.WebAddress,
        value: page.linkUrl
      }
    } else if (page.type === PageType.Normal) {
      return {
        linkType: LinkType.Page,
        value: page.id
      }
    }
    return '#';
  }

  getStyle = () => {
    const isMobile = this.isMobile();

    const mobileNavBar = css`
      .navbar {
        justify-content: center;
        padding: 0;
        .navbar-toggler {
          border: none;
        }
      }
    `;

    return css`
      overflow: hidden;
       *:focus{
        box-shadow: none !important;
      }
      .nav-ul {
        flex-wrap: nowrap;
      }
      ${isMobile && mobileNavBar}
    `;
  }

  subMenuToggle = () => {
    this.setState({
      isSubMenuOpen: !this.state.isSubMenuOpen
    });
  }

  isMobile = () => {
    return this.props.browserSizeMode === BrowserSizeMode.Small;
  }

  showSubMenu = (hoverMenu: string) => {
    this.delay = true;
    this.setState({ hoverMenu });
    this.setState({ isSubMenuOpen: true });
  }

  hideSubMenu = () => {
    this.setState({ isSubMenuOpen: false });
    this.setState({ hoverMenu: '' });
  }

  delayHideSubMenu = () => {
    this.delay = false;
    setTimeout(() => {
      if (this.delay) {
        this.delay = false;
        return;
      }
      this.hideSubMenu();
    }, 150);
  }

  toggleMobileMenu = () => {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  }

  closeMobileMenu = () => {
    this.setState({
      isMobileMenuOpen: false
    });
  }

  isLightOrDark = (light?: boolean) => {
    const { config: { style: { textColor } } } = this.props;
    return light ? textColor === 'light' : textColor === 'dark';
  }

  render() {
    const { config: { dir, style: { type, color, activeColor, textColor } }, currentId, theme } = this.props;
    const { config: { main: { textAlign, space, icon: { show, position } }, sub: { icon: { show: subShow, position: subPosition } } }, queryObject } = this.props;
    const { isSubMenuOpen, hoverMenu, isMobileMenuOpen } = this.state;
    const isMobile = this.isMobile();

    const vertical = dir === Dir.Down || dir === Dir.Up;
    const navItems = this.getNavItems();
    return <div className="widget-menu jimu-widget" css={this.getStyle()}>
      <Navbar color={color}
        light={this.isLightOrDark(false)}
        dark={this.isLightOrDark(true)}
        className="w-100 h-100" expand="md">
        <Nav
          navbar
          theme={theme}
          className="w-100 nav-ul"
          activeColor={activeColor}
          justified={true}
          vertical={vertical}
          gap={`${space.distance}${space.unit}`}
          tabs={type === NavStyle.Tabs}
          pills={type === NavStyle.Pills}
          textAlign={textAlign}
          mode={isMobile ? 'toggle' : 'default'}
          drawer={{ color: color, textColor: textColor }}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleClick={this.toggleMobileMenu}
          onMobileMenuClose={this.closeMobileMenu}
        >
          {navItems.map((navItem, index) => {
            const hasSub = !!(navItem.subs && navItem.subs.length);
            return <NavItem key={index} dropdown={hasSub} menuOpenMode="hover" onMouseOver={e => this.showSubMenu(navItem.id)} onMouseLeave={this.delayHideSubMenu}
              toggle={this.subMenuToggle} direction={vertical ? 'right' : 'down'} isOpen={isSubMenuOpen && hoverMenu === navItem.id} onClick={this.closeMobileMenu}>
              <NavLink dropdowToggle={hasSub} to={navItem.to} active={navItem.id === currentId} icon={show ? navItem.icon : ''}
                iconPosition={position} caret={hasSub} target={navItem.target} queryObject={queryObject}>{navItem.label}</NavLink>
              {
                hasSub && <NavMenu appendToBody onMouseOver={e => this.showSubMenu(navItem.id)} onMouseLeave={this.hideSubMenu}>
                  {navItem.subs.map((subItem, subIndex) =>
                    <NavItem key={subIndex} onClick={this.closeMobileMenu}>
                      <NavLink active={subItem.id === currentId} to={subItem.to} icon={subShow ? subItem.icon : ''}
                        iconPosition={subPosition} target={navItem.target} queryObject={queryObject}>{subItem.label}</NavLink>
                    </NavItem>
                  )}
                </NavMenu>
              }
            </NavItem>
          }
          )}
        </Nav>
      </Navbar>
    </div>
  }
}
