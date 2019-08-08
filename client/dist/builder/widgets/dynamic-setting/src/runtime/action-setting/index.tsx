/** @jsx jsx */
import {css, jsx, React, ReactRedux, ThemeVariables, SerializedStyles, ReactDOM,
  themeUtils, polished, IMMessageJson, IMActionJson, IMWidgetJson, Immutable, getAppStore, IMState, ImmutableArray, ImmutableObject} from 'jimu-core';
import {SettingSection, SettingRow, getAppConfigAction, AppMessageManager} from 'jimu-for-builder';
import {Button} from 'jimu-ui';
import {MessageChooseList} from './message-choose-list';
import {ActionChooseList} from './action-choose-list';
import {TargetChooseList, TargetJson, FrameWorkTargetJson} from './target-choose-list';
import {MessageItem} from './message-item';
import ActionSetting from './action-setting';
import {RouterShell, PathType, Route} from './router-shell';

interface Props {
  widgetId: string;
  theme?: ThemeVariables;
  pageId: string;

  formatMessage: (id: string) => string;
}

interface StateProps{
  messages: ImmutableArray<IMMessageJson>;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
}

interface States {
  currentTriggeredMessage?: IMMessageJson;
  currentTriggeredTarget?: TargetJson;
  currentTriggeredAction?: IMActionJson;
  panelRoutes: Array<Route>;
}

export function getActionLabel (action: IMActionJson): string {
  let targetJson = null;
  if (action.widgetId) {
    targetJson = getAppStore().getState().appStateInBuilder.appConfig.widgets[action.widgetId];
  } else {
    targetJson = {
      label: 'Framework'
    } as FrameWorkTargetJson
  }

  let actionLabel = action.actionName;
  if (targetJson.manifest) {
    if (targetJson.manifest.i18nMessages[`_action_${action.actionName}_label`]) {
      actionLabel = targetJson.manifest.i18nMessages[`_action_${action.actionName}_label`];
    } else {
      let messageActions = targetJson.manifest.messageActions;
      if (messageActions) {
        for (let i = 0; i < messageActions.length; i++) {
          if (messageActions[i].name === action.actionName) {
            actionLabel = messageActions[i].label;
            break;
          }
        }
      }
    }
  } else if (targetJson.label === 'Framework') {
    let allActions = AppMessageManager.getInstance().getAllActions();
    for (let i = 0; i < allActions.length; i++) {
      if (action.actionId.indexOf(allActions[i].id) > -1) {
        actionLabel = allActions[i].label;
        break;
      }
    }
  }

  return actionLabel;
}

class _messageSetting extends React.PureComponent<Props & StateProps, States>{

  modalStyle: any = {position: 'absolute', top: '0', bottom: '0', right: '260px', left: 'auto', width: '259px',
    height: 'auto', zIndex: '3', borderRight: '', borderBottom: '', paddingBottom: '1px'};

  constructor(props){
    super(props);

    this.modalStyle.borderRight = `1px solid ${this.props.theme.colors.white}`;
    this.modalStyle.borderBottom = `1px solid ${this.props.theme.colors.white}`;

    this.state = {
      currentTriggeredMessage: null,
      currentTriggeredTarget: null,
      currentTriggeredAction: null,
      panelRoutes: []
    }
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .message-setting {

        .searchIcon {
          cursor: pointer;
          position: absolute;
          right: 1.2rem;
          margin-top: 0.3rem;
        }

        .listItem {
          cursor: pointer;
          padding: 5px 0px;
        }

        .listItem.active {
          background-color: ${theme.colors.cyans.cyan100};
          border: 0;
        }

        .listItem:hover {
          background-color: ${polished.rgba(theme.colors.cyans.cyan100, 0.4)};
        }

        .active-border {
          border: 1px solid ${theme.colors.cyans.cyan500} !important;
        }

        .message-item {

          .widget-name {
            font-size: ${polished.rem(14)};
            font-weight: 400;
          }

          .action-name {
            font-size: ${polished.rem(13)};
            height: ${polished.rem(25)};
          }

          padding: 5px 12px 6px 12px;

          .action-item {
            padding: 5px 10px 10px 10px;
          }

          .drag-item {
            &:hover {
              background-color: rgba(255,255,255,.3);
            }
          }

          .message-item-title {
            font-size: ${polished.rem(14)};
            width: 190px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .deleteIcon-disable {
            opacity: .3;
          }

          .deleteIcon {
            cursor: pointer;
            opacity: .8;
          }

          .deleteIcon:hover {
            opacity: 1;
          }

          .item-add-action {
            opacity: .8;
            cursor: pointer;
            width: 90px;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    `;
  }

  componentWillReceiveProps(newProps: Props & StateProps) {
    if (newProps.widgetId !== this.props.widgetId) {
      this.resetState();
    } else {
      this.updateLocalState(newProps);
    }
  }

  updateLocalState = (newProps: Props & StateProps) => {
    let appConfig = getAppConfigAction().appConfig;
    if (newProps.messages && newProps.messages !== this.props.messages) {
      let tempMessage: IMMessageJson = null;
      let tempTarget: TargetJson = null;
      let tempAction = null;

      if (this.state.currentTriggeredMessage && this.state.currentTriggeredMessage.messageType) {
        for (let i = 0; i < newProps.messages.length; i++) {
          if (newProps.messages[i].messageType === this.state.currentTriggeredMessage.messageType 
            && newProps.messages[i].widgetId ===  this.state.currentTriggeredMessage.widgetId) {
            tempMessage = newProps.messages[i];
            break;
          }
        }

        if (tempMessage && this.state.currentTriggeredTarget) {
          if ((this.state.currentTriggeredTarget as IMWidgetJson).id) {
            // the target is widget
            let currentTriggeredTarget: IMWidgetJson = this.state.currentTriggeredTarget as IMWidgetJson;
            if (this.state.panelRoutes && this.state.panelRoutes.length > 0 && this.state.panelRoutes[this.state.panelRoutes.length - 1].pathType === PathType.ActionChoose) {
              tempTarget = appConfig.widgets[currentTriggeredTarget.id];
            } else {
              for (let i = 0; i < tempMessage.actions.length; i++) {
                if (tempMessage.actions[i].widgetId === currentTriggeredTarget.id) {
                  tempTarget = appConfig.widgets[currentTriggeredTarget.id];
                  break;
                }
              }
            }
          } else {
            // the target is framework
            let currentTriggeredTarget: FrameWorkTargetJson = this.state.currentTriggeredTarget as FrameWorkTargetJson;
            if (this.state.panelRoutes && this.state.panelRoutes.length > 0 && this.state.panelRoutes[this.state.panelRoutes.length - 1].pathType === PathType.ActionChoose) {
              tempTarget = currentTriggeredTarget;
            } else {
              for (let i = 0; i < tempMessage.actions.length; i++) {
                if (!tempMessage.actions[i].widgetId) {
                  tempTarget = currentTriggeredTarget;
                  break;
                }
              }
            }
          }
        }

        if (tempMessage && this.state.currentTriggeredAction && this.state.currentTriggeredAction.actionName) {
          for (let i = 0; i < tempMessage.actions.length; i++) {
            if (tempMessage.actions[i].actionId === this.state.currentTriggeredAction.actionId && tempMessage.actions[i].widgetId === this.state.currentTriggeredAction.widgetId 
              && tempMessage.actions[i].actionName === this.state.currentTriggeredAction.actionName) {
              tempAction = tempMessage.actions[i];
              break;
            }
          }
        }
      }

      this.setState({
        currentTriggeredMessage: tempMessage,
        currentTriggeredTarget: tempTarget,
        currentTriggeredAction: tempAction
      });
    }
  }

  resetState = () => {
    this.setState({
      currentTriggeredMessage: null,
      currentTriggeredTarget: null,
      currentTriggeredAction: null,
      panelRoutes: []
    })
  }

  onMessageRemoved = (message: IMMessageJson) => {
    getAppConfigAction().removeMessage(message).exec();
  }

  onMessageChanged = (message: IMMessageJson) => {
    this.setState({
      currentTriggeredMessage: message
    }, () => {
      getAppConfigAction().editMessage(message).exec();
    });
  }

  onUpdateAction = (message: IMMessageJson, action: IMActionJson, isClosePanel: boolean) => {
    if (isClosePanel) {
      this.setState({
        currentTriggeredMessage: message,
        currentTriggeredAction: action,
        panelRoutes: []
      }, () => {
        getAppConfigAction().editMessage(message).exec();
      });
    } else {
      this.setState({
        currentTriggeredMessage: message,
        currentTriggeredAction: action
      }, () => {
        getAppConfigAction().editMessage(message).exec();
      });
    }
  }

  getMessages = (): Array<IMMessageJson> => {
    let allMessages = this.props.messages;
    let messages = [];

    if (allMessages) {
      for (let i = 0; i < allMessages.length; i++) {
        if (allMessages[i] && allMessages[i].widgetId === this.props.widgetId) {
          messages.push(allMessages[i]);
        }
      }
    }

    return messages;
  }

  onShowMessageChooseList = () => {
    let panelRoutes = [
      {
        pathType: PathType.MessageChoose,
        message: null
      }
    ];

    this.setState({
      panelRoutes: panelRoutes
    })
  }

  onShowTargetChooseList = (message: IMMessageJson) => {
    let panelRoutes = [
      {
        pathType: PathType.TargetChoose,
        message: message
      }
    ];

    this.setState({
      currentTriggeredMessage: message,
      currentTriggeredAction: null,
      panelRoutes: panelRoutes
    });
  }

  onShowActionSettingPage = (message: IMMessageJson, action: IMActionJson) => {
    let panelRoutes = [
      {
        pathType: PathType.ActionSetting,
        message: message
      }
    ];

    this.setState({
      currentTriggeredMessage: message,
      currentTriggeredAction: action,
      panelRoutes: panelRoutes
    });
  }

  onMessageChooseListSelected = (message: IMMessageJson) => {
    let panelRoutes = Object.assign([], this.state.panelRoutes);
    panelRoutes.push({
      pathType: PathType.TargetChoose,
      message: message
    });

    this.setState({
      currentTriggeredMessage: message,
      panelRoutes: panelRoutes
    }, () => {
      getAppConfigAction().addMessage(message).exec();
    });
  }

  onTargetChooseListSelected = (targetJson: TargetJson) => {
    let panelRoutes = Object.assign([], this.state.panelRoutes);
    panelRoutes.push({
      pathType: PathType.ActionChoose,
      message: this.state.currentTriggeredMessage
    });

    this.setState({
      currentTriggeredTarget: targetJson,
      panelRoutes: panelRoutes
    });
  }

  onActionChooseListSelected = (message: IMMessageJson, action: IMActionJson) => {
    if (action.config === null) {
      let panelRoutes = Object.assign([], this.state.panelRoutes);
      panelRoutes.push({
        pathType: PathType.ActionSetting,
        message: message
      });

      this.setState({
        currentTriggeredMessage: message,
        currentTriggeredAction: Immutable(action),
        panelRoutes: panelRoutes
      }, () => {
        getAppConfigAction().editMessage(message).exec();
      });
    } else {
      this.setState({
        currentTriggeredMessage: message,
        currentTriggeredAction: null,
        panelRoutes: []
      }, () => {
        getAppConfigAction().editMessage(message).exec();
      });
    }
  }

  backForwardPanel = () => {
    let panelRoutes = Object.assign([], this.state.panelRoutes) as Array<Route>;
    panelRoutes.splice(panelRoutes.length - 1, 1);

    if (!panelRoutes[panelRoutes.length - 1].message) {
      let tempMessage = this.state.panelRoutes[this.state.panelRoutes.length - 1].message;
      this.setState({
        panelRoutes: panelRoutes,
        currentTriggeredMessage: null
      }, () => {
        getAppConfigAction().removeMessage(tempMessage).exec();
      });
    } else {
      let tempMessage = panelRoutes[panelRoutes.length - 1].message;
      this.setState({
        panelRoutes: panelRoutes,
        currentTriggeredMessage: panelRoutes[panelRoutes.length - 1].message
      }, () => {
        getAppConfigAction().editMessage(tempMessage).exec();
      });
    }
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  closePanel = () => {
    this.setState({
      panelRoutes: []
    });
  }

  render(){
    let messages = this.getMessages();
    let appConfig = getAppConfigAction().appConfig;
    let publishMessages = this.props.widgets[this.props.widgetId] && this.props.widgets[this.props.widgetId].manifest 
      && this.props.widgets[this.props.widgetId].manifest.publishMessages;

    return <div className="w-100 h-100" css={this.getStyle(this.props.theme)}>
      <div className="jimu-widget message-setting">
        {(!publishMessages || publishMessages.length === 0) && <SettingSection>
          <div className="w-100 justify-content-center d-flex">{this.formatMessage('noTrigger')}</div>
        </SettingSection>}
        {publishMessages && publishMessages.length > 0 && <SettingSection>
          <SettingRow>
            <div className="w-100 justify-content-center d-flex">
              <Button className="w-100" color="primary" onClick={this.onShowMessageChooseList}>{this.formatMessage('addTrigger')}</Button>
            </div>
          </SettingRow>
          <SettingRow>
            {messages.map((item, idx) => {
              return <MessageItem key={idx} message={item} appConfig={appConfig} onMessageRemoved={this.onMessageRemoved} 
              isActive={item === this.state.currentTriggeredMessage && this.state.panelRoutes.length > 0}
              onMessageChanged={this.onMessageChanged} onClickAddAction={this.onShowTargetChooseList}
              onClickEditAction={this.onShowActionSettingPage} formatMessage={this.props.formatMessage}/>
            })}
          </SettingRow>
          {this.state.panelRoutes.length > 0 && !this.props.pageId ? <div>
            {
              this.state.panelRoutes[this.state.panelRoutes.length - 1].pathType === PathType.MessageChoose && document && document.getElementById('default') &&
              ReactDOM.createPortal(
                <div className="bg-gray-100 border-color-gray-400" style={this.modalStyle}>
                  <RouterShell formatMessage={this.props.formatMessage} Routes={this.state.panelRoutes} title={this.formatMessage('selectTrigger')} 
                    onBack={this.backForwardPanel} onClose={this.closePanel}>
                    <MessageChooseList widgetId={this.props.widgetId} appConfig={appConfig} onSelected={this.onMessageChooseListSelected} messages={messages}
                      formatMessage={this.props.formatMessage}/>
                  </RouterShell>
                </div>
              , document.getElementById('default'))
            }
            {
              this.state.panelRoutes[this.state.panelRoutes.length - 1].pathType === PathType.TargetChoose && this.state.currentTriggeredMessage && document && document.getElementById('default') &&
              ReactDOM.createPortal(
                <div className="bg-gray-100 border-color-gray-400" style={this.modalStyle}>
                  <RouterShell formatMessage={this.props.formatMessage} Routes={this.state.panelRoutes} title={this.formatMessage('selectTarget')} 
                    onBack={this.backForwardPanel} onClose={this.closePanel}>
                    <TargetChooseList appConfig={appConfig} onSelected={this.onTargetChooseListSelected} message={this.state.currentTriggeredMessage}
                      formatMessage={this.props.formatMessage}/>
                  </RouterShell>
                </div>
              , document.getElementById('default'))
            }
            {
              this.state.panelRoutes[this.state.panelRoutes.length - 1].pathType === PathType.ActionChoose && this.state.currentTriggeredMessage && this.state.currentTriggeredTarget &&
              document && document.getElementById('default') &&
              ReactDOM.createPortal(
                <div className="bg-gray-100 border-color-gray-400" style={this.modalStyle}>
                  <RouterShell formatMessage={this.props.formatMessage} Routes={this.state.panelRoutes} title={this.formatMessage('selectAction')} 
                    onBack={this.backForwardPanel} onClose={this.closePanel}>
                    <ActionChooseList widgetId={this.props.widgetId} onSelected={this.onActionChooseListSelected} message={this.state.currentTriggeredMessage} 
                      target={this.state.currentTriggeredTarget} formatMessage={this.props.formatMessage}/>
                  </RouterShell>
                </div>
              , document.getElementById('default'))
            }
            {
              this.state.panelRoutes[this.state.panelRoutes.length - 1].pathType === PathType.ActionSetting && this.state.currentTriggeredMessage && this.state.currentTriggeredAction &&
              document && document.getElementById('default') &&
              ReactDOM.createPortal(
                <div className="bg-gray-100 border-color-gray-400" style={this.modalStyle}>
                  <RouterShell formatMessage={this.props.formatMessage} Routes={this.state.panelRoutes}
                    title={`${this.formatMessage('actionSet')} ${getActionLabel(this.state.currentTriggeredAction)}`}
                    onBack={this.backForwardPanel} onClose={this.closePanel}>
                    <ActionSetting widgetId={this.props.widgetId} appConfig={appConfig} message={this.state.currentTriggeredMessage} action={this.state.currentTriggeredAction} 
                      onUpdateAction={this.onUpdateAction} formatMessage={this.props.formatMessage}/>
                  </RouterShell>
                </div>
              , document.getElementById('default'))
            }
          </div> : null}
        </SettingSection>}
      </div>
    </div>
  }
}

export const MessageSetting = ReactRedux.connect<StateProps, {}, Props>((state: IMState) => {
  return {
    messages: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.messages,
    widgets: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.widgets
  }
})(themeUtils.withTheme(_messageSetting));