/** @jsx jsx */
import { React, jsx, css, IMThemeVariables, BrowserSizeMode } from 'jimu-core';
import { getAppConfigAction } from 'jimu-for-builder';
import CommonModal from './common-modal';

interface Props{
  isAuto: boolean;
  formatMessage: (id: string, values?: any) => string;
  theme: IMThemeVariables;
  browserSizeMode: BrowserSizeMode;
  mainSizeMode: BrowserSizeMode;
  style?: any;
  pageId?: string;
  isHeader?: boolean;
  isFooter?: boolean;
}

interface State {
  showAutoConfirm: boolean;
  showCustomConfirm: boolean;
}

export class SyncLayoutButton extends React.PureComponent<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      showAutoConfirm: false,
      showCustomConfirm: false,
    };
  }

  formatMessage = (id: string, values?) => {
    return this.props.formatMessage(id, values);
  }

  toggleLayoutMode = () => {
    const { isAuto } = this.props;
    if (isAuto) {
      this.handleToggleCustomConfirm();
    } else {
      this.handleToggleAutoConfirm();
    }
  }

  handleToggleAutoConfirm = () => {
    this.setState({
      showAutoConfirm: !this.state.showAutoConfirm,
    });
  }

  autoConfirmClosed = (isOK: boolean) => {
    if (isOK) {
      // sync layout
      if (this.props.isHeader) {
        this.resetHeader();
      } else if (this.props.isFooter) {
        this.resetFooter();
      } else {
        this.resetPageBody();
      }
    }
  }

  handleToggleCustomConfirm = () => {
    this.setState({
      showCustomConfirm: !this.state.showCustomConfirm,
    });
  }

  customConfirmClosed = (isOK: boolean) => {
    if (isOK) {
      // custom layout
      if (this.props.isHeader) {
        this.unLockHeaderLayout();
      } else if (this.props.isFooter) {
        this.unLockFooterLayout();
      } else {
        this.unLockPageBodyLayout();
      }
    }
  }

  unLockFooterLayout = () => {
    const { browserSizeMode, mainSizeMode } = this.props;
    const appConfigAction = getAppConfigAction();
    appConfigAction.createLayoutForSizeModeForFooter(browserSizeMode, mainSizeMode).exec();
  }

  unLockHeaderLayout = () => {
    const { browserSizeMode, mainSizeMode } = this.props;
    const appConfigAction = getAppConfigAction();
    appConfigAction.createLayoutForSizeModeForHeader(browserSizeMode, mainSizeMode).exec();
  }

  unLockPageBodyLayout = () => {
    const { browserSizeMode, mainSizeMode, pageId } = this.props;
    const appConfigAction = getAppConfigAction();
    appConfigAction.createLayoutForSizeModeForPageBody(browserSizeMode, mainSizeMode, pageId).exec();
  }

  resetHeader = () => {
    const { browserSizeMode } = this.props;
    getAppConfigAction().removeSizeModeLayoutFromHeader(browserSizeMode).exec();
  }

  resetFooter = () => {
    const { browserSizeMode } = this.props;
    getAppConfigAction().removeSizeModeLayoutFromFooter(browserSizeMode).exec();
  }

  resetPageBody = () => {
    const { browserSizeMode, pageId } = this.props;
    getAppConfigAction().removeSizeModeLayoutFromPageBody(pageId, browserSizeMode).exec();
  }

  getStyle() {
    const { theme, isAuto } = this.props;
    return css`
      .state-toggle-btn{
        cursor: pointer;
        position: relative;
        border: 1px solid ${theme.colors.grays.gray400};
        border-radius: 4px;
        padding: 0 1rem;
        overflow: hidden;
      }
      .toggle-part {
        background: transparent;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
      }
      .toggle-highlight {
        position: absolute;
        height: 30px;
        left: 0;
        right: 0;
        background-color: ${theme.colors.primary};
        transition: 0.2s;
        top: ${isAuto ? 0 : 30}px;
      }
    `;
  }

  getSizeModeNls(sizeMode: BrowserSizeMode) {
    switch(sizeMode) {
      case BrowserSizeMode.Small:
        return this.formatMessage('smallScreen');
      case BrowserSizeMode.Medium:
        return this.formatMessage('mediumScreen');
      default:
        return this.formatMessage('largeScreen');
    }
  }

  render() {
    const { isAuto, theme, mainSizeMode } = this.props;
    const mainSizeName = this.getSizeModeNls(mainSizeMode);
    return (
      <div style={this.props.style} css={this.getStyle()}>
        <div className="d-flex flex-column state-toggle-btn"
          onClick={this.toggleLayoutMode}
          title={isAuto ?
          `${this.formatMessage('autoEnabledTip', { label: mainSizeName })} ${this.formatMessage('customDisabledTip')}` :
          `${this.formatMessage('customEnabledTip')} ${this.formatMessage('autoDisabledTip')}`}>
          <div className="toggle-part text-nowrap">{this.formatMessage('auto')}</div>
          <div className="toggle-part text-nowrap">{this.formatMessage('custom')}</div>
          <div className="toggle-highlight"></div>
        </div>
        <CommonModal theme={theme} toggle={this.handleToggleAutoConfirm}
          onClosed={this.autoConfirmClosed}
          title={this.formatMessage('confirm')}
          isOpen = {this.state.showAutoConfirm} formatMessage={this.props.formatMessage}>
            <div style={{ fontSize: '1rem' }}>
              <div>
                {this.formatMessage('autoConfirmMsg', { label: mainSizeName })}
              </div>
              <div css={css`margin-top: 1rem;`}>
                {this.formatMessage('enableConfirm')}
              </div>
            </div>
        </CommonModal>
        <CommonModal theme={theme} toggle={this.handleToggleCustomConfirm}
          onClosed={this.customConfirmClosed}
          title={this.formatMessage('confirm')}
          isOpen = {this.state.showCustomConfirm} formatMessage={this.props.formatMessage}>
            <div style={{ fontSize: '1rem' }}>
              <div>
                {this.formatMessage('customConfirmMsg1')}
              </div>
              <div css={css`margin-top: 1rem;`}>
                {this.formatMessage('customConfirmMsg2')}
              </div>
              <div css={css`margin-top: 1rem;`}>
                {this.formatMessage('enableConfirm')}
              </div>
            </div>
        </CommonModal>
      </div>
    );
  }
}
