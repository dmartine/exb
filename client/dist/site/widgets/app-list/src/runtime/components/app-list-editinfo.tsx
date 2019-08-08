/** @jsx jsx */
import { React, themeUtils, ThemeVariables , css, jsx, SessionManager, 
  Immutable, defaultMessages as commonMessages, InjectedIntl, polished } from 'jimu-core';
import { Icon, Input, Button } from 'jimu-ui';
import {IItem} from '@esri/arcgis-rest-types';
// import {builderActions} from 'jimu-for-builder';
import defaultMessages from '../translations/default';
import {appServices} from 'site/common';

interface Props{
  appItem: IItem;
  portalUrl: string;
  folderUrl: string;
  onEditInfoCancel?: () => void;
  onEditInfoOk?: () => void;
  intl?: InjectedIntl;
}

interface States{
  localAppItem: IItem;
  currentTitleInput: string;
  currentDescriptInput: string;
  loading: boolean;
}

let IconClose = require('jimu-ui/lib/icons/close-24.svg');

export class _AppEditInfo extends React.PureComponent<Props & {theme: ThemeVariables}, States>{

  constructor(props) {
    super(props);

    this.state = {
      localAppItem: Immutable(this.props.appItem),
      currentTitleInput: this.props.appItem.title,
      currentDescriptInput: this.props.appItem.description ? this.props.appItem.description : '',
      loading: false
    }
  }

  getStyle() {
    let theme = this.props.theme;
    let gray200 = theme.colors && theme.colors.grays ? theme.colors.grays.gray200 : '#353b40';
    let gray600 = theme.colors && theme.colors.grays ? theme.colors.grays.gray600 : '#9fa4a7';

    return css`
      .app-editinfo {
        width: 100%;
        height: 100%;

        .info-title {
          height: ${polished.rem(80)};
          border-bottom: 1px solid ${gray200}
        }

        .info-title-text {
          padding-left: ${polished.rem(30)};
          font-size: ${polished.rem(24)};
        }

        .info-title-close {
          padding-right: ${polished.rem(30)};
          cursor: pointer;
        }

        .info-content {
          padding-top: ${polished.rem(61)};
          height: calc(100% - ${polished.rem(80)});

          .info-content-pic {
            width: ${polished.rem(360)};
            height: ${polished.rem(210)};
            background-size: cover;
            background-position: top center;
            margin-right: ${polished.rem(30)};
          }

          .info-content-btn-group {
            padding-top: ${polished.rem(43)};
          }

          .info-content-otherinfo {
            width: ${polished.rem(450)};

            .info-content-label {
              font-size: ${polished.rem(14)};
              color: ${gray600};
              font-weight: 600;
              margin-bottom: ${polished.rem(12)} !important;
            }

            .info-content-text {
              
            }

            .info-content-textarea {
              width: 100%;
              height: 100px;
              resize: none;
            }

            .info-content-btn {
              width: 100px;
              height: 40px;
            }
          }
        }
      }`;
  }

  titleInputChange = () => {
    let localAppItem = Immutable(this.state.localAppItem);
    localAppItem = localAppItem.set('title', this.state.currentTitleInput);
    this.setState({
      localAppItem: localAppItem
    });
  }

  descriptInputChange = () => {
    let localAppItem = Immutable(this.state.localAppItem);
    localAppItem = localAppItem.set('description', this.state.currentDescriptInput);
    this.setState({
      localAppItem: localAppItem
    });
  }

  handleDescriptInputKeydown = (e: any) => {
    if (e.keyCode === 13) {
      this.descriptInputChange();
    } else {
      return;
    }
  }

  updateAppInfo = () => {
    this.setState({ loading: true });
    appServices.updateAppItem(this.state.localAppItem).then(() => {
      this.setState({ loading: false });
      // getAppStore().dispatch(builderActions.refreshAppListAction(true));
      this.props.onEditInfoOk();
    }, err => {
      this.setState({ loading: false });
      console.error(err);
    })
  }

  render() {
    let thumbnail = this.state.localAppItem.thumbnail;
    if (thumbnail) {
      thumbnail = this.props.portalUrl + '/sharing/rest/content/items/' + this.state.localAppItem.id + '/info/' 
        + thumbnail + '?token=' + SessionManager.getInstance().getSession().token;
    } else {
      thumbnail = this.props.folderUrl + './dist/runtime/assets/defaultthumb.png';
    }

    return <div css={this.getStyle()} className="w-100 h-100" onClick={(e) => {e.stopPropagation()}}>
      <div className="app-editinfo">
        <div className="bg-gray-100 info-title align-items-center d-flex justify-content-between">
          <div className="info-title-text">{this.props.intl ? 
            this.props.intl.formatMessage({id: 'editExperienceInfo', defaultMessage: defaultMessages.editExperienceInfo}) : defaultMessages.editExperienceInfo}
          </div>
          <div className="info-title-close" onClick={() => {this.props.onEditInfoCancel()}}>
            <Icon width={24} height={24} icon={IconClose}/>
          </div>
        </div>
        <div className="bg-gray-100 info-content">
          <div className="d-flex justify-content-center">
            <div className="info-content-pic" style={{backgroundImage: 'url(' + thumbnail + ')'}}></div>
            <div className="info-content-otherinfo">
              <div className="info-content-label">{this.props.intl ? 
                this.props.intl.formatMessage({id: 'name', defaultMessage: defaultMessages.name}) : defaultMessages.name}</div>
              <Input value={this.state.currentTitleInput} className="mb-3 info-title-input" 
                onChange={(event) => {this.setState({ currentTitleInput: event.target.value}); }}
                onBlur={() => {this.titleInputChange()}} onKeyUp={() => {this.titleInputChange()}}></Input>
              <div className="info-content-label">{this.props.intl ? 
                this.props.intl.formatMessage({id: 'description', defaultMessage: defaultMessages.description}) : defaultMessages.description}</div>
              <Input type="textarea" value={this.state.currentDescriptInput} className="info-content-textarea form-control mb-3"
                onChange={(event) => {this.setState({ currentDescriptInput: event.target.value}); }}
                onBlur={() => {this.descriptInputChange()}} onKeyDown ={ (e) => {this.handleDescriptInputKeydown(e)}}>
              </Input>
              <div className="d-flex justify-content-end info-content-btn-group">
                <Button color="primary" size="lg" className="info-content-btn mr-2" onClick={this.updateAppInfo}>{this.props.intl ? 
                  this.props.intl.formatMessage({id: 'ok', defaultMessage: commonMessages.ok}) : commonMessages.ok}</Button>
                <Button outline color="secondary" size="lg" className="info-content-btn" 
                  onClick={() => {this.props.onEditInfoCancel()}}>{this.props.intl ? 
                    this.props.intl.formatMessage({id: 'cancel', defaultMessage: commonMessages.cancel}) : commonMessages.cancel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {this.state.loading && <div style={{ position: 'absolute', left: '50%', top: '50%' }} className="jimu-primary-loading"></div>}
    </div>;
  }
}

export const AppEditInfo = themeUtils.withTheme(_AppEditInfo);