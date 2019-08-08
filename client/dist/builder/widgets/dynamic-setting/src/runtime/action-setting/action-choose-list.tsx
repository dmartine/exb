/** @jsx jsx */
import {css, jsx, React, MessageType, ThemeVariables, SerializedStyles, polished, themeUtils, IMMessageJson, IMActionJson, MessageAction, IMWidgetJson} from 'jimu-core';
import {SettingSection, SettingRow, AppMessageManager} from 'jimu-for-builder';
import {Input, Icon} from 'jimu-ui';
import {TargetJson, FrameWorkTargetJson} from './target-choose-list';

let IconSearch = require('jimu-ui/lib/icons/search-24.svg');

interface Props {
  theme: ThemeVariables;
  message?: IMMessageJson;
  target?: TargetJson;
  widgetId?: string;

  onSelected?: (messageJson: IMMessageJson, action: IMActionJson) => void;
  formatMessage: (id: string) => string;
}

class Widget extends React.PureComponent<Props, {}>{
  constructor(props) {
    super(props);
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .action-choose-list {

        .searchIcon {
          cursor: pointer;
          position: absolute;
          right: 1.2rem;
          margin-top: 0.3rem;
          background-color: ${polished.rgba(theme.colors.white, 1)};
        }

        .list{
          .list-item{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border: 1px solid transparent;
            cursor: pointer;
            background-color: ${theme.colors.grays.gray200};
            user-select: none;
            font-size: ${polished.rem(13)};
          }
          .list-item:hover{
            background-color: ${theme.colors.grays.gray300};
          }
          .list-item:active.list-item:hover{
            background-color: ${theme.colors.white};
          }
        }
      }
    `;
  }

  searchItems = (e: any) => {

  }

  getActions = (): Array<MessageAction> => {
    let actions = [];
    let actionNames = [];

    let target = null;
    if ((this.props.target as IMWidgetJson).id) {
      target = this.props.target as IMWidgetJson;
    } else {
      target = this.props.target as FrameWorkTargetJson;
    }

    let filteredActionInstances = AppMessageManager.getInstance().getFilteredActions(this.props.message.messageType as MessageType);
    for (let i = 0; i < filteredActionInstances.length; i++) {
      if (actionNames.indexOf(filteredActionInstances[i].name) === -1 && filteredActionInstances[i].widgetId === target.id) {
        actionNames.push(filteredActionInstances[i].name);
        actions.push(filteredActionInstances[i]);

        // only use action for once
        // if (this.props.message.actions) {
        //   let actionIsExit = false;
        //   for (let k = 0; k < this.props.message.actions.length; k ++) {
        //     if (this.props.message.actions[k].actionName === filteredActionInstances[i].name && this.props.message.actions[k].widgetId === filteredActionInstances[i].widgetId) {
        //       actionIsExit = true;
        //       break;
        //     }
        //   }

        //   if (!actionIsExit) {
        //     actionNames.push(filteredActionInstances[i].name);
        //     actions.push(filteredActionInstances[i]);
        //   }
        // } else {
        //   actionNames.push(filteredActionInstances[i].name);
        //   actions.push(filteredActionInstances[i]);
        // }
      }
    }

    return actions;
  }

  onSelectAction = (action: MessageAction) => {
    let message = this.props.message;

    let target = null;
    if ((this.props.target as IMWidgetJson).id) {
      target = this.props.target as IMWidgetJson;
    } else {
      target = this.props.target as FrameWorkTargetJson;
    }
    
    let tempAction = {
      actionId: action.id + '-' + (new Date().getTime()).toString(),
      widgetId: target.id,
      messageWidgetId: this.props.widgetId,
      actionName: action.name,
      description: null,
      config: this.checkIsSupportActionSetting(action) ? null : undefined
    } as IMActionJson;

    message = message.set('actions',  message.actions.concat(tempAction));
    this.props.onSelected(message, tempAction);
  }

  checkIsSupportActionSetting = (action: MessageAction) => {
    let isSupportActionSetting = false;

    let target = null;
    if ((this.props.target as IMWidgetJson).id) {
      target = this.props.target as IMWidgetJson;
      let manifest = target.manifest;
      if (manifest && manifest.messageActions) {
        for (let i = 0; i < manifest.messageActions.length; i ++) {
          if (action.name === manifest.messageActions[i].name && manifest.messageActions[i].settingUri) {
            isSupportActionSetting = true;
            break;
          }
        }
      }
    } else {
      target = this.props.target as FrameWorkTargetJson;
      if (target.uri && AppMessageManager.getInstance().getActionRawSettingClassInfo(target.uri)) {
        isSupportActionSetting = true;
      }
    }

    return isSupportActionSetting;
  }

  render() {
    let actions = this.getActions();

    return <div className="w-100" css={this.getStyle(this.props.theme)}>
      <div className="w-100 action-choose-list">
        <SettingSection>
          <SettingRow>
            <div className="w-100" style={{display: 'none'}}>
              <Input className="w-100" placeholder={this.props.formatMessage('chooseSearchAction')} onChange={this.searchItems} value={''}>
              </Input>
              <Icon className="p-0 searchIcon" width={16} height={16} icon={IconSearch}/>
            </div>
            <div className="w-100 list">
              {actions.length === 0 && <div className="d-flex mb-2 p-1">{this.props.formatMessage('noAction')}</div>}
              {actions.length > 0 && actions.map((item, idx) => {
                return <div className="d-flex list-item mb-2 p-1" key={idx} onClick={() => this.onSelectAction(item)}>{item.label}</div>
              })}
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    </div>;
  }
}

export const ActionChooseList = themeUtils.withTheme(Widget);