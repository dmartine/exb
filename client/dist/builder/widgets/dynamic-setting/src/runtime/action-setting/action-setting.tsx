import {React, ActionSettingProps, ErrorBoundary, MessageType, ActionSettingOptions, IMAppConfig, IMActionJson, MessageActionProperty, IMMessageJson} from 'jimu-core';
import {AppMessageManager} from 'jimu-for-builder';
import {Button} from 'jimu-ui'

interface Props{
  action: IMActionJson;
  message: IMMessageJson;
  appConfig: IMAppConfig;
  widgetId: string;

  onUpdateAction?: (message: IMMessageJson, action: IMActionJson, isClosePanel: boolean) => void;
  formatMessage: (id: string) => string;
}

interface States{
  settingClass: React.ComponentClass<ActionSettingProps<{}>>;
  cacheActionJson: IMActionJson;

  isDisableDoneBtn: boolean;
}

export default class ActionSetting extends React.PureComponent<Props, States>{

  constructor(props){
    super(props);

    this.state = {
      settingClass: null,
      cacheActionJson: this.props.action,
      isDisableDoneBtn: false
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.action !== this.props.action) {
      this.setState({
        cacheActionJson: newProps.action
      })
    }
  }

  componentDidMount() {
    this.getActionSettingClass();
  }

  componentDidUpdate(){
    this.getActionSettingClass();
  }

  getActionSettingClass = () => {
    AppMessageManager.getInstance().loadActionSettingClass(this.props.action).then(actionSettingClass => {
      this.setState({
        settingClass: actionSettingClass
      });
    })
  }

  onSettingChange = (settingOptions: ActionSettingOptions) => {
    let actionId = settingOptions.actionId;
    let config = settingOptions.config;

    if (this.state.cacheActionJson.config !== config) {
      if (actionId === this.state.cacheActionJson.actionId) {
        this.setState({
          cacheActionJson: this.state.cacheActionJson.set('config', config)
        }, () => {
          this.updateAction(false);
        });
      }
    }
  }

  updateAction = (isClosePanel: boolean) => {
    let message = this.props.message;
    let actionsForMessage = Object.assign([], message.actions) as Array<IMActionJson>;
    let newAction = null;

    for (let i = 0; i < actionsForMessage.length; i++) {
      if (actionsForMessage[i].actionId === this.state.cacheActionJson.actionId && actionsForMessage[i].widgetId === this.state.cacheActionJson.widgetId) {
        actionsForMessage[i] = actionsForMessage[i].set('config', this.state.cacheActionJson.config);
        newAction = actionsForMessage[i];
        break;
      }
    }

    message = message.set('actions',  actionsForMessage);
    this.props.onUpdateAction(message, newAction, isClosePanel);
  }
  
  onDisableDoneBtn = (disabled: boolean) => {
    this.setState({
      isDisableDoneBtn: disabled
    })
  }

  renderActionSetting = () => {
    let SettingClass = this.state.settingClass;
    return SettingClass ? 
      <ErrorBoundary>
        <SettingClass actionId={this.state.cacheActionJson.actionId} widgetId={this.props.action.widgetId} messageWidgetId={this.props.widgetId} 
          config={this.state.cacheActionJson.config ? this.state.cacheActionJson.config : undefined} 
          messageType={this.props.message.messageType as MessageType} onSettingChange={this.onSettingChange} onDisableDoneBtn={this.onDisableDoneBtn}/>
      </ErrorBoundary>
       : <div>{this.props.formatMessage('actionSettingLoading')}</div>
  };

  getActionSettingClassUri = (): string => {
    if (this.props.action.widgetId) {
      // the target is widget
      let widgetId = this.props.action.widgetId;
      let widgetJson = this.props.appConfig.widgets[widgetId];
    
      let messageActions = widgetJson.manifest.messageActions;
      let actionProperty: MessageActionProperty = null;
  
      if (messageActions) {
        for (let i = 0; i < messageActions.length; i++) {
          if (messageActions[i].name === this.props.action.actionName) {
            actionProperty = messageActions[i];
          }
        }
      }
  
      if (actionProperty && actionProperty.settingUri) {
        let uri = null;
        if (widgetJson.context.isRemote) {
          uri = widgetJson.context.folderUrl + 'dist/' + actionProperty.settingUri + '.js';
        } else {
          uri = widgetJson.uri + 'dist/' + actionProperty.settingUri;
        }
  
        return uri;
      } else {
        return null;
      }
    } else {
      // the target is frameWork
      let uri = null;
      let filteredActions = AppMessageManager.getInstance().getFilteredActions(this.props.message.messageType as MessageType);
      for (let i = 0; i < filteredActions.length; i++) {
        if (!filteredActions[i].widgetId && filteredActions[i].name === this.props.action.actionName) {
          uri = filteredActions[i].id;
          break;
        }
      }
      return uri;
    }
  }

  render(){
    let settingClassUri = this.getActionSettingClassUri();
    return <div className="setting-container h-100 pl-3 pr-3">
      {settingClassUri ? this.renderActionSetting() : <div>&nbsp;&nbsp;No widget</div>}
      <div style={{position: 'absolute', bottom: '0.35rem', left: '0'}} className="d-flex justify-content-center pl-3 pr-3 w-100">
        <Button disabled={this.state.isDisableDoneBtn} className="btn btn-primary text-center w-100" onClick={() => this.updateAction(true)}>
          {this.props.formatMessage('actionDone')}</Button>
      </div>
    </div>;
  }

}