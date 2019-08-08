/** @jsx jsx */
import { BaseWidget, AllWidgetProps, IMState, jimuHistory, urlUtils, css, jsx, ThemeVariables, SessionManager, polished } from 'jimu-core';
import { IMConfig } from '../config';
import { builderActions } from 'jimu-for-builder';
import { appServices } from 'builder/common';
import Template from './template';
import { Icon, Input } from 'jimu-ui';
import { TemplateInfo } from './template';

import defaultMessages from './translations/default';
const searchIcon = require('jimu-ui/lib/icons/search-24.svg');
const closeIcon = require('jimu-ui/lib/icons/close-24.svg');


interface PreloadProps {
  templates: TemplateInfo[];
}

interface State {
  loading: boolean;
  searchText: string;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & PreloadProps & { theme: ThemeVariables }, State>{
  static preloadData = (state: IMState, allProps?: AllWidgetProps<{ IMConfig }>): Promise<PreloadProps> => {
    return Widget.getListInfo();
  };

  static getListInfo(): Promise<PreloadProps> {
    //we need to use absolute url to make the fetch work on server side.
    return fetch(`${urlUtils.getAbsoluteRootUrl()}templates/templates-info.json`)
      .then(res => res.json()).then((templates: any[]) => {
        templates = templates.map(t => {
          let listItem = {
            name: t.name,
            title: t.label,
            image: {
              src: '../' + t.thumbnail
            },
            description: t.description
          };
          return listItem;
        })

        return { templates };
      })
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchText: ''
    };
  }

  nls = (id: string) => {
    return this.props.intl ? this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : id;
  }

  createApp = (templateName: string) => {
    this.setState({ loading: true });

    let title = this.nls('untitledExperience');
    this.getNewAppTitleWithIndex(title).then((newTitle) => {
      appServices.createApp({
        template: templateName,
        name: newTitle,
        description: ''
      }).then(item => {
        this.setState({ loading: false });
        this.props.dispatch(builderActions.refreshAppListAction(true));
        jimuHistory.browserHistory.push(`${urlUtils.getFixedRootPath()}builder?id=${item.id}`);
      }, err => {
        this.setState({ loading: false });
        console.error(err);
      });
    }).catch(err => {
      this.setState({ loading: false });
      console.error(err);
    })
  }

  getNewAppTitleWithIndex = (title: string): Promise<string> => {
    let session = SessionManager.getInstance().getSession();
    let newTitle = null;

    return appServices.searchApp({
      q: `type: "Web Experience" AND owner:${session.username} AND  title:"${title}"`,
      sortField: 'title',
      sortOrder: 'desc'
    }).then((apps) => {
      if (apps && apps.length > 0) {
        let indexArray = [];
        for (let i = 0; i < apps.length; i++) {
          if (apps[i].title === title) {
            newTitle = title + '-1';
            break;
          }

          let titleArray = apps[i].title.split('-');

          if (titleArray.length !== 2) {
            continue;
          }

          let maxIndex = Number(titleArray[titleArray.length - 1]);
          if (!isNaN(maxIndex)) {
            indexArray.push(maxIndex);
          }
        }

        if (indexArray.length > 0) {
          indexArray.sort(function (a, b) { return a < b ? 1 : -1 });
          newTitle = title + '-' + (indexArray[0] + 1);
        }

        if (!newTitle) {
          newTitle = title;
        }

        return Promise.resolve(newTitle);
      } else {
        newTitle = title;
        return Promise.resolve(newTitle);
      }
    }).catch(err => {
      console.error(err);
      return Promise.reject(err);
    })
  }

  onCreateClick = (templateName: string) => {
    this.selectTemplate(templateName);
    this.createApp(templateName);
  }

  selectTemplate = (templateName: string) => {
    this.props.dispatch(builderActions.selectTemplate(templateName));
  }

  _matchearchText = (text) => {
    const { searchText } = this.state;
    if (!searchText || !text) {
      return true;
    }
    return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  }

  getStyle = () => {
    const { theme } = this.props;
    const gray500 = theme ? theme.colors.grays.gray500 : '';
    const secondary = theme ? theme.colors.secondary : '';
    return css`
      height: 100%;
      .header-bar {
        width: 100%;
        height: ${polished.rem(80)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 ${polished.rem(30)};
        font-size: 24px;
        border-bottom: 1px solid ${secondary};
        .jimu-icon {
          cursor: pointer;
        }
      }
      .homescreen {
        height: calc(100% - 80px);
        width:810px;
        margin: 0 auto;
      }
      @media only screen and (min-width: 1280px) {
        .homescreen {
          width:1090px;
        }
      }
      @media only screen and (min-width: 1400px) {
        .homescreen {
            width:1360px;
        }
      }
      @media only screen and (min-width: 1680px) {
        .homescreen {
            width:1630px;
        }
      }

      .header {
        width: 100%;
        padding: ${polished.rem(40)} ${polished.rem(16)} ${polished.rem(20)} ${polished.rem(16)};

        > .banner {
          position: relative;
  
          .jimu-icon {
              color: ${gray500};
              position: absolute;
              left:${polished.rem(20)};
              top: ${polished.rem(18)};
              cursor: pointer;
          }
  
          .searchbox {
              padding-left:${polished.rem(64)};
              font-size:${polished.rem(24)};
              height: 3.8rem;
              cursor: text;
          }
        }

        .template-title {
          margin-top: ${polished.rem(40)};
          font-size: ${polished.rem(16)};
        }
      }
      .section {
        display: flex;
        flex-wrap: wrap;
        height: calc(100% - 200px);
        overflow-x: hidden;
        overflow-y: auto;
        align-content: flex-start;
      }
    `;
  }

  close = () => {
    if (jimuHistory.browserHistory.length > 2) {
      jimuHistory.browserHistory.goBack();
    } else {
      window.location.href = urlUtils.getFixedRootPath();
    }
  }

  isTemplateDisabled = (item: TemplateInfo) => {
    return false;
  }

  render() {
    const { searchText } = this.state;
    const { templates, theme, intl } = this.props;

    return (
      <div css={this.getStyle()} className="widget-choose-template bg-gray-100">
        <div className="header-bar">
          {this.nls('_widgetLabel')}
          <div onClick={this.close}><Icon size={24} icon={closeIcon}></Icon></div>
        </div>
        <div className="homescreen">

          <div className="header">
            <div className="banner d-flex">
              <Icon size={24} icon={searchIcon} />
              <Input className="pt-2 pb-2 searchbox" placeholder={this.nls('searchPlaceholder')} value={searchText}
                onChange={e => { this.setState({ searchText: e.target.value }) }}>
              </Input>
            </div>
            <div className="template-title">{this.nls('telplateListTitle')}</div>
          </div>

          <div className="section">
            {templates && templates.map((item, index) =>
              <Template key={index} theme={theme} show={this._matchearchText(item.title)} info={item} intl={intl}
                disabled={this.isTemplateDisabled(item)} onCreateClick={this.onCreateClick} />
            )}
          </div>

          {this.state.loading && <div style={{ position: 'absolute', left: '50%', top: '50%' }} className="jimu-primary-loading"></div>}
        </div>
      </div>
    );
  }
}
