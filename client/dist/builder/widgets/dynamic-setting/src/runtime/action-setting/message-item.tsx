import {React, IMAppConfig, IMMessageJson, IMActionJson, classNames, getMessageTypeLabel, MessageType, injectIntl, InjectedIntl} from 'jimu-core';
import {Icon} from 'jimu-ui';
import DragShell from './drag-shell';
import {FrameWorkTargetJson} from './target-choose-list';
import {getActionLabel} from './index';

let IconDelete = require('jimu-ui/lib/icons/delete.svg');
let IconDeleteX = require('jimu-ui/lib/icons/close-12.svg');
let IconEdit = require('jimu-ui/lib/icons/edit.svg');

interface Props {
  message: IMMessageJson;
  appConfig?: IMAppConfig;
  isActive?: boolean;
  intl: InjectedIntl;
  formatMessage: (id: string) => string,

  onMessageRemoved?: (message: IMMessageJson) => void;
  onMessageChanged?: (message: IMMessageJson) => void;
  onClickAddAction?: (message: IMMessageJson) => void;
  onClickEditAction?: (message: IMMessageJson, action: IMActionJson) => void;
}

interface States {
  itemSelected: boolean;
  itemSelectedIndex: number;
}

class Widget extends React.PureComponent<Props, States>{
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: false,
      itemSelectedIndex: undefined
    }
  }

  searchItems = (e: any) => {

  }

  onEditAction = (action: IMActionJson) => {
    if (action.config) {
      this.props.onClickEditAction(this.props.message, action);
    }
  }

  onRemoveAction = (action: IMActionJson) => {
    let message = this.props.message;
    let actionsForMessage = Object.assign([], message.actions) as Array<IMActionJson>;

    let actionsForActionName = [];
    for (let i = 0; i < actionsForMessage.length; i ++) {
      if (actionsForMessage[i].actionName == action.actionName) {
        actionsForActionName.push(actionsForMessage[i]);
      }
    }

    for (let i = 0; i < actionsForMessage.length; i++) {
      if (actionsForMessage[i].actionName === action.actionName && actionsForMessage[i].widgetId === action.widgetId) {
        let actions = Object.assign([], actionsForMessage);
        actions.splice(i, 1);
        message = message.set('actions', actions);
        break;
      }
    }

    this.props.onMessageChanged(message);
  }

  onActionOrderChanged = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) {
      return;
    }

    let message = this.props.message;

    let actions = [];
    
    if (fromIndex < toIndex) {
      for (let i = 0; i < fromIndex; i++) {
        actions.push(message.actions[i]);
      }

      for (let i = fromIndex + 1; i < toIndex + 1; i++) {
        actions.push(message.actions[i]);
      }

      actions.push(message.actions[fromIndex]);

      for (let i = toIndex + 1; i < message.actions.length; i++) {
        actions.push(message.actions[i]);
      }
    } else {
      for (let i = 0; i < toIndex + 1; i++) {
        actions.push(message.actions[i]);
      }

      actions.push(message.actions[fromIndex]);

      for (let i = toIndex + 1; i < fromIndex; i++) {
        actions.push(message.actions[i]);
      }

      for (let i = fromIndex + 1; i < message.actions.length; i++) {
        actions.push(message.actions[i]);
      }
    }

    message = message.set('actions', actions);
    this.props.onMessageChanged(message);
  }

  getActionList = () => {
    return <div style={{position: 'relative'}}>
      {this.props.message.actions.map((action, idx) => {
        let targetJson = null;
        if (action.widgetId) {
          targetJson = this.props.appConfig.widgets[action.widgetId];
        } else {
          targetJson = {
            label: 'Framework'
          } as FrameWorkTargetJson
        }

        return <DragShell dragItemIndex={idx} dragItemName={this.props.message.messageType as string} style={{touchAction: 'none', userSelect: 'none'}} key={idx}
        onDragChanged={this.onActionOrderChanged} onMouseEnter={(index) => {this.setState({itemSelected: true, itemSelectedIndex: index})}} 
        onMouseLeave={(index) => {this.setState({itemSelected: false, itemSelectedIndex: undefined})}}><div className="border mb-2 mt-2 action-item">
          <div className="d-flex w-100 justify-content-between align-items-center">
            {targetJson.label === 'Framework' && <div className="widget-name">{this.props.formatMessage(`action${targetJson.label}`)}</div>}
            {targetJson.label !== 'Framework' && <div className="widget-name">{targetJson.label}</div>}
            {this.state.itemSelected && this.state.itemSelectedIndex === idx && <div className="d-flex">
              <div className="mr-2" onClick={() => this.onEditAction(action)}>
                {(action.config || action.config === null) && <Icon className="p-0 deleteIcon" width={12} height={12} icon={IconEdit}/>}
                {action.config === undefined && <Icon className="p-0 deleteIcon-disable" width={12} height={12} icon={IconEdit}/>}
              </div>
              <div onClick={() => this.onRemoveAction(action)}>
                <Icon className="p-0 deleteIcon" width={11} height={11} icon={IconDelete}/>
              </div>
            </div>}
          </div>
          <div className="bg-gray-200 text-gray-700 pl-2 mt-2 d-flex align-items-center action-name">{getActionLabel(action)}</div>
        </div></DragShell>
      })}
    </div>
  }

  render() {
    let messageTitle = getMessageTypeLabel(this.props.message.messageType as MessageType, this.props.intl);

    return <div className="w-100">
      <div className={classNames('w-100 message-item border mt-2', this.props.isActive ? 'active-border' : '')}>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="message-item-title" title={messageTitle}>{messageTitle}</div>
          <div onClick={() => this.props.onMessageRemoved(this.props.message)}>
            <Icon className="p-0 deleteIcon" width={14} height={14} icon={IconDeleteX}/>
          </div>
        </div>
        {this.props.message.actions && this.props.message.actions.length > 0 && this.getActionList()}
        <div className="mt-2 item-add-action" onClick={() => this.props.onClickAddAction(this.props.message)}>{`+ ${this.props.formatMessage('addAction')}`}</div>
      </div>
    </div>;
  }
}

export const MessageItem = injectIntl(Widget);