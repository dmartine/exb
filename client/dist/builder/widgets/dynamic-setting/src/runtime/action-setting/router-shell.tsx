/** @jsx jsx */
import {css, jsx, React, IMMessageJson, ThemeVariables, SerializedStyles, polished, themeUtils} from 'jimu-core';
import {Icon} from 'jimu-ui';

export enum PathType {
  MessageChoose = 'MESSAGECHOOSE',
  TargetChoose = 'TARGETCHOOSE',
  ActionChoose = 'ACTIONCHOOSE',
  ActionSetting = 'ACTIONSETTING'
}

export interface Route {
  pathType: PathType,
  message: IMMessageJson
}

interface Props{
  Routes: Array<Route>,
  title: string,
  onBack?: () => void,
  onClose?: () => void,

  formatMessage: (id: string) => string,
  theme: ThemeVariables;
}

let IconBack = require('jimu-ui/lib/icons/line-arrow-left-8.svg');
let IconClose = require('jimu-ui/lib/icons/close.svg');

export default class Widget extends React.PureComponent<Props, {}>{

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }

      .setting-title {
        font-size: ${polished.rem(16)};
      }
    `;
  }

  render(){
    return <div className="w-100" css={this.getStyle(this.props.theme)}>
      <div className="w-100 d-flex align-items-center justify-content-between setting-header border-0">
          {this.props.Routes.length > 1 ? <div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center" style={{cursor: 'pointer'}} onClick={this.props.onBack}><Icon icon={IconBack} size="14" className="text-dark"/></div>
              <div className="pl-2 setting-title mt-1" style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} 
                title={this.props.title}>{`${this.props.formatMessage('actionBack')}/` + this.props.title}</div>
            </div>
          </div> : <div className="setting-title mt-1" style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={this.props.title}>
            {this.props.title}</div>}
        <div style={{cursor: 'pointer'}} onClick={this.props.onClose}><Icon icon={IconClose} size="12" className="text-dark"/></div>
      </div>
      {this.props.children}
    </div>;
  }
}

export const RouterShell = themeUtils.withTheme(Widget);