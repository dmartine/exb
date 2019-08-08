/** @jsx jsx */
import { IMState, IMAppConfig, jsx, css } from 'jimu-core';
import { BaseWidget } from 'jimu-core';
import { AllWidgetProps } from 'jimu-core';
import { Navbar, Nav, NavLink, NavItem, Icon } from 'jimu-ui';
import { IMConfig, NavLinkType, NavStyle, ViewType } from '../config';
import { toNavViewLinks, isNavItemActive, getSectionViews, updateViewsBySection } from '../utils';
import defaultMessages from './translations/default';

const navigatorIcon = require('jimu-ui/lib/icons/navigator.svg');

interface State {
  links: NavLinkType[];
}

interface ExtraProps {
  appConfig: IMAppConfig;
  viewIds: string[];
}

type Props = AllWidgetProps<IMConfig> & ExtraProps;

export default class Widget extends BaseWidget<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      appConfig: state && state.appConfig,
      viewIds: state && state.appRuntimeInfo && state.appRuntimeInfo.currentViewIds
    }
  }

  componentDidMount() {
    this.updateLinks();
  }

  componentDidUpdate(preProps: Props) {
    const { appConfig: { sections: preSections, views: preAllViews } } = preProps;
    const { appConfig: { sections, views: allViews } } = this.props;
    const { config: { data: { type: preType, section: preSection, views: preViews } } } = preProps;
    const { config: { data: { type, section, views } } } = this.props;

    const shouldUpdate = allViews !== preAllViews || sections !== preSections ||
      type !== preType || section !== preSection || (type === ViewType.Custom && views !== preViews);

    if (shouldUpdate) {
      this.updateLinks();
    }
  }

  updateLinks = () => {
    const views = this.getViews();
    const links = this.getLinks(views);
    this.setState({ links });
  }

  getViews = (): string[] => {
    let { config: { data: { type, section, views } }, appConfig } = this.props;
    if (type === ViewType.Auto) {
      return getSectionViews(section, appConfig);
    } else {
      let vs = views ? views.asMutable() : [];
      return updateViewsBySection(vs, section, appConfig);
    }
  }

  getLinks = (views: string[]) => {
    const { appConfig } = this.props;
    return toNavViewLinks(views, appConfig);
  }

  getStyle = () => {
    return css`
      overflow: hidden;
      .nav-ul {
        flex-wrap: nowrap;
        &.nav-tabs .nav-link.active {
          background-color: unset;
        }
      }
      .placeholder {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  nls = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] });
  }

  placeholer = () => {
    const { links } = this.state;
    if (links.length || !window.jimuConfig.isInBuilder) {
      return null;
    }
    return <div className="placeholder">
      <Icon color="black" icon={navigatorIcon} size="16"></Icon>
      <span className="ml-2">{this.nls('placeholder')}</span>
    </div>;
  }

  isActive = (link: NavLinkType, index: number) => {
    const { viewIds } = this.props;
    const active = isNavItemActive(viewIds, link, index);
    return active;
  }

  isLightOrDark = (light?: boolean) => {
    const { config: { display: { textColor } } } = this.props;
    return light ? textColor === 'light' : textColor === 'dark';
  }

  navbar = () => {
    const { links } = this.state;
    const { config: { display: { vertical, style, color, activeColor, textAlign } = {} as any }, queryObject } = this.props;
    if (!links.length) {
      return false;
    }
    return <Navbar
      color={color}
      light={this.isLightOrDark(false)}
      dark={this.isLightOrDark(true)}
      className="w-100 h-100">
      <Nav
        navbar
        className="w-100 nav-ul"
        tabs={style === NavStyle.Tabs}
        pills={style === NavStyle.Pills}
        vertical={vertical}
        justified={true}
        activeColor={activeColor}
        textAlign={textAlign}>
        {links.map((link, index) =>
          <NavItem key={index}>
            <NavLink to={link.value} active={this.isActive(link, index)} queryObject={queryObject}>{link.name}</NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  }


  render() {
    return <div className="widget-navigator jimu-widget" css={this.getStyle()}>
      {this.placeholer()}
      {this.navbar()}
    </div>
  }
}