/** @jsx jsx */
import {css, jsx, React, IMAppConfig, MessageType, ThemeVariables, SerializedStyles, polished, themeUtils, IMMessageJson,
  Immutable, MessageJson, getMessageTypeLabel, injectIntl, InjectedIntl} from 'jimu-core';
import {Input, Icon} from 'jimu-ui';
import {SettingSection, SettingRow} from 'jimu-for-builder';

let IconSearch = require('jimu-ui/lib/icons/search-24.svg');

interface Props {
  widgetId: string;
  appConfig: IMAppConfig;
  theme: ThemeVariables;
  messages?: Array<IMMessageJson>;
  intl: InjectedIntl;
  
  onSelected?: (messageJson: IMMessageJson) => void;
  formatMessage: (id: string) => string;
}

class Widget extends React.PureComponent<Props, {}>{
  constructor(props) {
    super(props);
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .choose-message-list {

        .searchIcon {
          cursor: pointer;
          position: absolute;
          right: 1.2rem;
          margin-top: 0.3rem;
          background-color: ${polished.rgba(theme.colors.white, 1)};
          color: ${theme.colors.grays.gray500} !important;
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

  onSelectMessageType = (messageType: MessageType) => {
    let message = {
      widgetId: this.props.widgetId,
      messageType: messageType,
      actions: Immutable([])
    } as MessageJson;

    this.props.onSelected(Immutable(message));
  }

  getPublishMessages = (): {messageType: MessageType, messageLabel: string}[] => {
    let widgetJson = this.props.appConfig.widgets[this.props.widgetId];
    let publishMessages = widgetJson.manifest.publishMessages;

    let messages = [];
    if (publishMessages) {
      for (let i = 0; i < publishMessages.length; i++) {
        let messageIsExist = false
        if (this.props.messages) {
          for (let k = 0; k < this.props.messages.length; k ++) {
            if (this.props.messages[k].messageType === publishMessages[i]) {
              messageIsExist = true;
              break;
            }
          }
        }

        if (!messageIsExist) {
          messages.push({
            messageType: publishMessages[i],
            messageLabel: getMessageTypeLabel(publishMessages[i], this.props.intl),
          });
        }
      }
    }

    return messages;
  }

  render() {
    let publishMessages = this.getPublishMessages();

    return <div className="w-100" css={this.getStyle(this.props.theme)}>
      <div className="w-100 choose-message-list">
        <SettingSection>
          <SettingRow>
            <div className="w-100" style={{display: 'none'}}>
              <Input className="w-100" placeholder={this.props.formatMessage('chooseSearchTrigger')} onChange={this.searchItems} value={''}>
              </Input>
              <Icon className="p-0 searchIcon" width={16} height={16} icon={IconSearch} />
            </div>
            <div className="w-100 list">
              {publishMessages.length === 0 && <div className="d-flex mb-2 p-1">{this.props.formatMessage('noMessage')}</div>}
              {publishMessages.length > 0 && publishMessages.map((item, idx) => {
                return <div className="list-item mb-2 p-1" key={idx} onClick={() => this.onSelectMessageType(item.messageType)} title={item.messageLabel}>{item.messageLabel}</div>
              })}
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    </div>;
  }
}

export const MessageChooseList = themeUtils.withTheme(injectIntl(Widget));