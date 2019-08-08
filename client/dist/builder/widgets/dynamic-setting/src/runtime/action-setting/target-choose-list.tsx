/** @jsx jsx */
import {css, jsx, React, themeUtils, ThemeVariables, SerializedStyles, polished, IMMessageJson, MessageType, IMActionJson, IMAppConfig, IMWidgetJson} from 'jimu-core';
import {Input, Icon} from 'jimu-ui';
import {SettingSection, SettingRow, AppMessageManager} from 'jimu-for-builder';

let IconSearch = require('jimu-ui/lib/icons/search-24.svg');

export interface FrameWorkTargetJson {
  label?: string;
  uri?: string;
}

export type TargetJson = IMWidgetJson | FrameWorkTargetJson;

interface Props {
  action?: IMActionJson;
  appConfig: IMAppConfig;
  theme: ThemeVariables;
  message?: IMMessageJson;

  formatMessage: (id: string) => string;
  onSelected?: (targetJson: TargetJson) => void;
}

class Widget extends React.PureComponent<Props, {}>{
  constructor(props) {
    super(props);
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .target-choose-list {

        .searchIcon {
          cursor: pointer;
          position: absolute;
          right: 1.2rem;
          margin-top: 0.3rem;
          background-color: ${polished.rgba(theme.colors.white, 1)};
        }

        .seperateline-mt {
          margin-top: ${polished.rem(5)};
        }

        .seperateline-mb {
          margin-bottom: ${polished.rem(1)};
        }

        .seperateline {
          border-top: 1px solid ${theme.colors.grays.gray300};
        }

        .widgets-title {
          font-weight: 600;
          font-size: ${polished.rem(14)};
          color: ${theme.colors.grays.gray600};
        }

        .nodata {
          font-size: ${polished.rem(13)};
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

  getTargets = (): any => {
    let widgetTargets = [];
    let frameWorkTargets = [];
    let targetIDs = [];

    let filteredActionInstances = AppMessageManager.getInstance().getFilteredActions(this.props.message.messageType as MessageType);
    for (let i = 0; i < filteredActionInstances.length; i++) {
      if (targetIDs.indexOf(filteredActionInstances[i].widgetId) === -1) {
        targetIDs.push(filteredActionInstances[i].widgetId);

        if (filteredActionInstances[i].widgetId) {
          let widgetJson = this.props.appConfig.widgets[filteredActionInstances[i].widgetId];
          if (widgetJson) {
            if (widgetJson.id === this.props.message.widgetId) {
              continue;
            }
            widgetTargets.push(widgetJson);
          }
        } else {
          frameWorkTargets.push({
            uri: filteredActionInstances[i].id,
            label: 'Framework'
          } as FrameWorkTargetJson);
        }
      }
    }

    return {
      widgetTargets: widgetTargets,
      frameWorkTargets: frameWorkTargets
    };
  }

  onSelectTarget = (targetJson: TargetJson) => {
    this.props.onSelected(targetJson);
  }

  render() {
    let targets = this.getTargets();
    let frameWorkTargets: Array<TargetJson> = targets.frameWorkTargets;
    let widgetTargets: Array<TargetJson> = targets.widgetTargets;

    return <div className="w-100" css={this.getStyle(this.props.theme)}>
      <div className="w-100 target-choose-list">
        <SettingSection>
          <SettingRow>
            <div className="w-100" style={{display: 'none'}}>
              <Input className="w-100" placeholder={this.props.formatMessage('chooseSearchTarget')} onChange={this.searchItems} value={''}>
              </Input>
              <Icon className="p-0 searchIcon" width={16} height={16} icon={IconSearch}/>
            </div>
            <div className="w-100 list">
              {frameWorkTargets.length === 0 && widgetTargets.length === 0 && <div className="d-flex justify-content-center nodata">
                {this.props.formatMessage('noTargetWidgets')}</div>}
              {frameWorkTargets.map((item, idx) => {
                return <div className="d-flex list-item p-1" key={idx} onClick={() => this.onSelectTarget(item)}>
                  {this.props.formatMessage(`action${item.label}`)}</div>
              })}
              {frameWorkTargets.length > 0 && widgetTargets.length === 0 && 
                <div className="w-100">
                  <div className="w-100 seperateline-mt seperateline-mb" style={{position: 'relative', height: '20px'}}>
                    <div className="seperateline w-100" style={{top: '10px', position: 'absolute'}}></div>
                  </div>
                  <div className="w-100 widgets-title">{this.props.formatMessage('targetWidgets')}</div>
                  <div className="d-flex mt-2 nodata">{this.props.formatMessage('noTargetWidgets')}</div>
                </div>}
              {widgetTargets.length > 0 && 
                <div className="w-100">
                  <div className="w-100 seperateline-mb" style={{position: 'relative', height: '20px'}}>
                    <div className="seperateline w-100" style={{top: '10px', position: 'absolute'}}></div>
                  </div>
                  <div className="w-100 widgets-title">{this.props.formatMessage('targetWidgets')}</div>
                  {widgetTargets.map((item, idx) => {
                    return <div className="d-flex list-item mt-2 p-1" key={idx} onClick={() => this.onSelectTarget(item)}>{item.label}</div>
                  })}
                </div>
              }
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    </div>;
  }
}

export const TargetChooseList = themeUtils.withTheme(Widget);