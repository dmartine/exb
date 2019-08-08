
/** @jsx jsx */
import { css, jsx, polished, classNames, ThemeVariables } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, SettingSection, SettingRow, defaultMessages as jimuDefaultMessages } from 'jimu-for-builder';
import { IMConfig, DisplayType } from '../config';
import { Switch, Input, Label } from 'jimu-ui';
import { IconTextSize } from 'jimu-layouts/lib/types'
import defaultMessages from './translations/default';

enum ShapeType { Circle, Rectangle }
interface ChooseShapeProps {
  title?: string;
  className?: string,
  type: ShapeType,
  active: boolean,
  theme: ThemeVariables,
  onClick: () => any
}
export const ChooseShape = ({ className, title, type, active, theme, onClick }: ChooseShapeProps) => {
  const white = theme ? theme.colors.white : '';
  const cyan500 = theme ? theme.colors.cyans.cyan500 : '';
  const gray900 = theme ? theme.colors.grays.gray900 : '';
  const style = css`
    background-color: ${white};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${polished.rem(28)};
    height: ${polished.rem(28)};
    margin: 2px;
    &.active{
      outline: 2px ${cyan500} solid;
    }
    .inner {
      width: 66%;
      height: 66%;
      border: 1px ${gray900} solid;
      border-radius: 2px;
      &.circle {
        border-radius: 50%;
      }
    }
  
  `;


  return <div css={style} onClick={onClick} title={title}
    className={classNames('choose-shape', { active: active }, className)}>
    <div className={classNames('inner', { rectangle: type === ShapeType.Rectangle }, { circle: type === ShapeType.Circle })}></div>
  </div>;
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>>{

  constructor(props) {
    super(props);
  }

  getStyle = () => {
    const { theme } = this.props;
    const white = theme && theme.colors ? theme.colors.white : '';
    const black = theme && theme.colors ? theme.colors.black : '';
    const gray300 = theme && theme.colors ? theme.colors.grays.gray300 : '';
    const gray700 = theme && theme.colors ? theme.colors.grays.gray700 : '';

    return css`
      font-size: 13px;
      font-weight: lighter;
      .setting-row-item {
        width: 100%;
        height: ${polished.rem(30)};
        display: flex;
        align-items: center;
        label {
          margin-bottom: unset;
        }
      }
      .icon-button {
        width:${polished.rem(30)};
        height:${polished.rem(26)};
        border-color: #4d545b;
        padding: 0 !important;
        color: ${gray700} !important;
        background-color: ${white} !important;
        &.active {
            color: ${black} !important;
            background-color: ${gray300} !important;
        }
        > .jimu-icon {
            margin-right: 0 !important;
        }
      }
    `;
  }

  _onConfigChange = (key: string, value: any) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set(key, value)
    });
  }

  _onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, key, value) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    if (key === 'displayType') {
      value = this._getDisplayType(value);
    }
    this._onConfigChange(key, value);
  }

  _getDisplayType = (isStack: boolean) => {
    return isStack ? DisplayType.Stack : DisplayType.SideBySide;
  }

  nls = (id: string, jimu?: boolean) => {
    const message = jimu ? jimuDefaultMessages : defaultMessages;
    return this.props.intl.formatMessage({ id: id, defaultMessage: message[id] })
  }

  render() {
    const { config: { onlyOpenOne, displayType, showLabel, iconSize, space, iconStyle }, theme } = this.props;
    return <div className="widget-setting-controller jimu-widget-setting" css={this.getStyle()}>
      <SettingSection title={this.nls('behavior')}>
        <SettingRow flow="wrap" label={this.nls('openWidget')}>
          <div className="setting-row-item">
            <Input id="only-open-one" style={{ cursor: 'pointer' }}
              name="only-open-one" onChange={e => this._onRadioChange(e, 'onlyOpenOne', true)} type="radio" checked={onlyOpenOne} />
            <Label style={{ cursor: 'pointer' }} for="only-open-one" className="ml-1">{this.nls('onlyOne')}</Label>
          </div>
          <div className="setting-row-item">
            <Input id="open-mutiple" style={{ cursor: 'pointer' }}
              name="only-open-one" onChange={e => this._onRadioChange(e, 'onlyOpenOne', false)} type="radio" checked={!onlyOpenOne} />
            <Label style={{ cursor: 'pointer' }} for="open-mutiple" className="ml-1">{this.nls('multiple')}</Label>
          </div>
        </SettingRow>
        {!onlyOpenOne && <SettingRow flow="wrap" label={this.nls('displayType')}>
          <div className="setting-row-item">
            <Input id="display-stack" style={{ cursor: 'pointer' }}
              name="display-type" onChange={e => this._onRadioChange(e, 'displayType', true)}
              type="radio" checked={displayType === DisplayType.Stack} />
            <Label style={{ cursor: 'pointer' }} for="display-stack" className="ml-1">{this.nls('stack')}</Label>
          </div>
          <div className="setting-row-item">
            <Input id="display-side-by-side" style={{ cursor: 'pointer' }}
              name="display-type" onChange={e => this._onRadioChange(e, 'displayType', false)}
              type="radio" checked={displayType === DisplayType.SideBySide} />
            <Label style={{ cursor: 'pointer' }} for="display-side-by-side" className="ml-1">{this.nls('sideBySide')}</Label>
          </div>
        </SettingRow>}
      </SettingSection>
      <SettingSection title={this.nls('style', true)}>
        <SettingRow flow="wrap" label={this.nls('iconStyle')}>
          <ChooseShape type={ShapeType.Circle} title={this.nls('circle')} className="mr-2" active={iconStyle === 'circle'} theme={theme}
            onClick={() => this._onConfigChange('iconStyle', 'circle')}></ChooseShape>
          <ChooseShape type={ShapeType.Rectangle} title={this.nls('rectangle')} active={iconStyle === 'rectangle'} theme={theme}
            onClick={() => this._onConfigChange('iconStyle', 'rectangle')}></ChooseShape>
        </SettingRow>
        <SettingRow label={this.nls('showIconLabel')}>
          <Switch checked={showLabel} onChange={(evt) => this._onConfigChange('showLabel', evt.target.checked)}></Switch>
        </SettingRow>
        <SettingRow flow="no-wrap" label={this.nls('iconSize')}>
          <Input type="select" value={iconSize} onChange={(e) => this._onConfigChange('iconSize', e.target.value)} className="w-50">
            <option value={IconTextSize.Small}>{this.nls('small')}</option>
            <option value={IconTextSize.Medium}>{this.nls('medium')}</option>
            <option value={IconTextSize.Large}>{this.nls('large')}</option>
          </Input>
        </SettingRow>
        <SettingRow flow="no-wrap" label={this.nls('iconInterval')}>
          <Input className="w-50" type="number" value={space} onAcceptValue={(value) => this._onConfigChange('space', +value)}></Input>
        </SettingRow>
      </SettingSection>
    </div>
  }
}