/** @jsx jsx */
import { React, css, jsx, ThemeVariables, Immutable, IMState, polished } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, SettingRow, SettingSection, SingleColorChooser, defaultMessages } from 'jimu-for-builder';
import { IMConfig, Dir, TextAlign, Position, NavStyle, TransparentColor } from '../config';
import { Icon, LinearUnit, Input, Label, ThemeColors, ButtonGroup, Button } from 'jimu-ui';

const rightArrowIcon = require('jimu-ui/lib/icons/direction-right.svg');
const downArrowIcon = require('jimu-ui/lib/icons/direction-down.svg');


const themeColors = [ThemeColors.PRIMARY, ThemeColors.SECONDARY, ThemeColors.SUCCESS, ThemeColors.INFO, ThemeColors.WARNING, ThemeColors.LIGHT, ThemeColors.DANGER, ThemeColors.DARK];

interface ExtraProps {
  appTheme: ThemeVariables;
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps & { theme: ThemeVariables }, any>{

  static mapExtraStateProps = (state: IMState) => {
    return {
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme
    }
  }

  constructor(props) {
    super(props);
  }

  _onDirClick = (dir: Dir) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set('dir', dir)
    });
  }

  _onStyleChange = (key: string, value: ThemeColors | NavStyle) => {
    const style = Immutable(this.props.config.style).set(key, value)
    const config = this.props.config.set('style', style);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  _onUnifySizeChange = (key: string, checked: boolean) => {
    const menu = this.props.config[key].set('unifiedSize', checked);
    const config = this.props.config.set(key, menu);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  _onShowIconChange = (key: string, checked: boolean) => {
    const icon = this.props.config[key].icon.set('show', checked);
    const menu = this.props.config[key].set('icon', icon);
    const config = this.props.config.set(key, menu);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  _onIconPositionChange = (key: string, value: Position) => {
    const icon = this.props.config[key].icon.set('position', value);
    const menu = this.props.config[key].set('icon', icon);
    const config = this.props.config.set(key, menu);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  _onTextAlignClick = (key: string, textAlign: TextAlign) => {
    const menu = this.props.config[key].set('textAlign', textAlign);
    const config = this.props.config.set(key, menu);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  _onSpacingChange = (key: string, value: LinearUnit) => {
    const menu = this.props.config[key].set('space', value);
    const config = this.props.config.set(key, menu);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  _onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, key, value) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    this._onStyleChange(key, value);
  }

  _onColorClick = (key, value) => {
    this._onStyleChange(key, value);
  }

  onBackgroundChange = (color: string) => {
    const isLightColor = color === undefined || color === TransparentColor.Transparent || ['', 'warning', 'light', 'white'].indexOf(color) > -1;
    const textColor = isLightColor ? 'dark' : 'light';
    let style = Immutable(this.props.config.style);
    style = style.set('color', color).set('textColor', textColor);
    const config = this.props.config.set('style', style);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  getTransparentColor = () => {
    const { theme } = this.props;
    const white = theme ? theme.colors.white : '';
    const gray300 = theme ? theme.colors.grays.gray300 : '';
    return {
      name: TransparentColor.Transparent,
      value: TransparentColor.Transparent,
      background: `linear-gradient(to bottom right, ${white} calc(50% - 1px), ${gray300}, ${white} calc(50% + 1px))`
    };
  }

  generateColors = (transparent?: boolean) => {
    let colors = [];
    const themeColor = (this.props.appTheme && this.props.appTheme.colors) || {};
    colors = themeColors.map(color => ({
      name: color,
      value: themeColor[color],
      background: themeColor[color]
    }));
    if (transparent) colors.push(this.getTransparentColor());
    return colors;
  }

  generateRegularColor = () => {
    const themeColor = (this.props.appTheme && this.props.appTheme.colors) || {};
    return [{
      name: 'dark',
      value: themeColor.dark,
      background: themeColor.dark
    }, {
      name: 'light',
      value: themeColor.light,
      background: themeColor.light
    }]
  }

  getStyle = () => {
    return css`
      font-size: ${polished.rem(13)};          
    `;
  }

  nls = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] });
  }

  getNavStyle = () => {
    return [{ label: this.nls('default'), value: NavStyle.Default },
    { label: this.nls('tabs'), value: NavStyle.Tabs },
    { label: this.nls('pills'), value: NavStyle.Pills }];
  }

  render() {
    const { dir, style: { type, color, textColor, activeColor } } = this.props.config;

    return <div css={this.getStyle()} className="widget-setting-menu jimu-widget-setting">
      <SettingSection>
        <SettingRow flow="no-wrap" label={this.nls('direction')}>
          <ButtonGroup>
            <Button title={this.nls('right')} color="secondary" icon outline size="sm" active={dir === Dir.Right} onClick={() => this._onDirClick(Dir.Right)}>
              <Icon icon={rightArrowIcon}></Icon>
            </Button>
            <Button title={this.nls('down')} color="secondary" icon outline size="sm" active={dir === Dir.Down} onClick={() => this._onDirClick(Dir.Down)}>
              <Icon icon={downArrowIcon}></Icon>
            </Button>
          </ButtonGroup>
        </SettingRow>
      </SettingSection>
      <SettingSection title={this.nls('style')}>

        {this.getNavStyle().map((item, index) =>
          <SettingRow key={index}>
            <Input id={'nav-style-type' + index} style={{ cursor: 'pointer' }}
              name="style-type" onChange={e => this._onRadioChange(e, 'type', item.value)} type="radio" checked={type === item.value} />
            <Label style={{ cursor: 'pointer' }} for={'nav-style-type' + index} className="ml-1">{item.label}</Label>
          </SettingRow>)
        }

        <SettingRow label={this.nls('background')} flow="wrap">
          <SingleColorChooser color={color} colors={this.generateColors(true)} onChange={this.onBackgroundChange}></SingleColorChooser>
        </SettingRow>


        <SettingRow flow="wrap" label={this.nls('select')}>
          <SingleColorChooser color={activeColor} colors={this.generateColors()} onChange={(c) => this._onColorClick('activeColor', c)}></SingleColorChooser>
        </SettingRow>

        {color === TransparentColor.Transparent &&
          <SettingRow label={this.nls('regular')} flow="wrap">
            <SingleColorChooser color={textColor}
              colors={this.generateRegularColor()} onChange={(c) => this._onColorClick('textColor', c)}></SingleColorChooser>
          </SettingRow>
        }
      </SettingSection>
    </div>
  }
}
