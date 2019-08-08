/** @jsx jsx */
import { BaseWidget, AllWidgetProps, css, jsx, classNames, jimuHistory, SerializedStyles, IMSectionJson, IMState, IMThemeVariables, polished} from 'jimu-core';
import { Icon, Nav, NavItem, NavLink } from 'jimu-ui';

import { IMConfig } from '../config';
import defaultMessages from './translations/default';

const IconPage = require('jimu-ui/lib/icons/page.svg');
const IconDataSource = require('jimu-ui/lib/icons/datasource.svg');
const IconTheme = require('jimu-ui/lib/icons/theme.svg');

interface ExtraProps {
  sectionJson: IMSectionJson;
  currentViewId: string;
}

const viewsIcon = {
  'toc-view': IconPage,
  'data-source-view': IconDataSource,
  'theme-view': IconTheme
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, any>{
  viewLabel = {
    'toc-view': this.props.intl.formatMessage({id: 'page', defaultMessage: defaultMessages.page}),
    'data-source-view': this.props.intl.formatMessage({id: 'data', defaultMessage: defaultMessages.data}),
    'theme-view': this.props.intl.formatMessage({id: 'theme', defaultMessage: defaultMessages.theme})
  }

  constructor(props) {
    super(props);
  }

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>): ExtraProps => {
    return {
      sectionJson: state.appConfig.sections[ownProps.config.sectionId],
      currentViewId: state.appRuntimeInfo.currentViewIds && state.appRuntimeInfo.currentViewIds[0] ? state.appRuntimeInfo.currentViewIds[0] : 'toc-view'
    }
  }

  changeView(v) {
    jimuHistory.changeView('opts-section', v);
  }

  getStyle = (theme: IMThemeVariables): SerializedStyles => {
    return css`
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;

      &.nav-tabs.nav-tabs--underline {
        flex-wrap: nowrap;
        font-size: 0.75rem;
        .nav-item {
          width: 100%;
          height: 100%;
        }
        .nav-link {
          cursor: pointer;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .jimu-icon {
            margin: 0 0 6px;
          }
          &:hover {
            background-color: ${polished.rgba(theme && theme.colors.secondary, 0.4)};
          }
          &:active {
            outline: none;
          }
          &.active {
            background-color: ${theme && theme.colors.cyans.cyan100};
            &,
            &:hover,
            &:focus {
              background-color: ${theme && theme.colors.cyans.cyan100};
              outline: none;
            }
          }
        }
      }
    `
  }

  render() {
    const activeClassName = 'active-setting bg-cyan-100';
    const { sectionJson, currentViewId, theme } = this.props;
    return (
      <Nav fill tabs css={this.getStyle(theme)} className="widget-builder-setting-navigator bg-gray-100 h-100">
        {
          sectionJson.views.map(vId => {
            return <NavItem key={vId} className={classNames({ [activeClassName]: vId === currentViewId })}>
                <NavLink tag="button" active={vId === currentViewId}
              onClick={e => this.changeView(vId)} title={this.viewLabel[vId]} >
              <Icon className={classNames({ [activeClassName]: vId === currentViewId })} icon={viewsIcon[vId]} size="18"></Icon>
              <span>{this.viewLabel[vId]}</span>
              </NavLink>
            </NavItem>
          })
        }
      </Nav>
    );
  }
}
