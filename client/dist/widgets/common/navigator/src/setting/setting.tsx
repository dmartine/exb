
/** @jsx jsx */
import { IMState, IMAppConfig, css, jsx, ThemeVariables, LayoutItemType, BrowserSizeMode, ImmutableArray, Immutable, lodash } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, SettingSection, SettingRow, SingleColorChooser, appConfigUtils, defaultMessages } from 'jimu-for-builder';
import { IMConfig, NavStyle, TransparentColor, ViewType } from '../config';
import { Input, ThemeColors, Label, ButtonGroup, Icon, Button, MultiSelect, MultiSelectItem } from 'jimu-ui';
import { toMultiSelectItems, getSectionLabel, getSectionViews } from '../utils'

const rightArrowIcon = require('jimu-ui/lib/icons/direction-right.svg');
const downArrowIcon = require('jimu-ui/lib/icons/direction-down.svg');

const themeColors = [ThemeColors.PRIMARY, ThemeColors.SECONDARY, ThemeColors.SUCCESS, ThemeColors.INFO, ThemeColors.WARNING, ThemeColors.LIGHT, ThemeColors.DANGER, ThemeColors.DARK];

interface ExtraProps {
  appConfig: IMAppConfig;
  appTheme: ThemeVariables;
  sizeMode: BrowserSizeMode;
}

interface State {
  sections: string[];
  views?: string[];
}

type Props = AllWidgetSettingProps<IMConfig> & ExtraProps;


export default class Setting extends BaseWidgetSetting<Props, State>{

  static mapExtraStateProps = (state: IMState) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme,
      sizeMode: state && state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      views: []
    }
  }

  componentDidMount() {
    const { appConfig, id, sizeMode } = this.props;
    const sections = this.getSections(appConfig, id, sizeMode);
    this.setState({ sections });
    let section = this.props.config.data.section;
    if (sections.indexOf(section) < 0) {
      section = sections[0];
      this.onDataSectionChange(section);
      this.setState({ views: [] });
    } else {
      const views = this.getViews(section);
      this.setState({ views });
    }
  }

  componentDidUpdate(preProps: Props, prveState: State) {
    const { appConfig, id, sizeMode } = this.props;
    const sections = this.getSections(appConfig, id, sizeMode);
    const preSections = prveState.sections;
    let section = this.props.config.data.section;

    if (!lodash.isDeepEqual(sections, preSections)) {
      this.setState({ sections });
      if (sections.indexOf(section) < 0) {
        section = sections[0];
        this.onDataSectionChange(section);
        this.setState({ views: [] });
      } else {
        const preSection = preProps.config.data.section;

        if (section !== preSection) {
          const views = this.getViews(section);
          this.setState({ views });
          this.onDataInChange('views', []);
        }
      }
    } else {
      const preSection = preProps.config.data.section;

      if (section !== preSection) {
        const views = this.getViews(section);
        this.setState({ views });
        this.onDataInChange('views', []);
      }
    }

  }

  onSectionChange = (section: string) => {
    section && this.onDataSectionChange(section);
  }

  onViewsChange = (e, v, views) => {
    this.onDataInChange('views', views);
  }

  getSections = (appConfig: IMAppConfig, id: string, sizeMode: BrowserSizeMode): string[] => {
    return appConfigUtils.getWidgetsOrSectionsInTheSameContainer(appConfig, id, LayoutItemType.Widget, LayoutItemType.Section, sizeMode) || [];
  }

  onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, key, value) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    this.onDisplayChange(key, value);
  }

  getViews = (section: string): string[] => {
    if (!section) {
      return [];
    }
    const { appConfig } = this.props;
    return appConfig.sections[section] && appConfig.sections[section].views || [];
    const views = appConfig.sections[section] && appConfig.sections[section].views;
    return views ? views.asMutable() : [];
  }

  getViewSelectItems = (): ImmutableArray<MultiSelectItem> => {
    const { appConfig } = this.props;
    const { views } = this.state;
    const selectItems = toMultiSelectItems(views, appConfig);
    return Immutable(selectItems);
  }

  getStyle = () => {
    return css`
      .jimu-multi-select {
        width: 100%;
      }
    `;
  }

  nls = (id: string, values?: any) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }, values);
  }

  onDataSectionChange = (section: string) => {
    let { config: { data } } = this.props;
    data = data.set('section', section).set('views', Immutable([]));
    this.onDataChange(data);
  }

  onViewTypeChange = (type: ViewType) => {
    if (type === ViewType.Auto) {
      this.onDataInChange('type', type);
    } else {
      let { config: { data } } = this.props;
      data = data.set('type', type).set('views', Immutable([]));
      this.onDataChange(data);
    }
  }

  onBackgroundChange = (color: string) => {
    const isLightColor = color === undefined || color === TransparentColor.Transparent || ['', 'warning', 'light', 'white'].indexOf(color) > -1;
    const textColor = isLightColor ? 'dark' : 'light';
    let { config, config: { display } } = this.props;
    display = display.set('color', color).set('textColor', textColor);
    config = config.set('display', display);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  onDisplayChange = (key: string, value: any) => {
    let { config, config: { display } } = this.props;
    display = display.set(key, value)
    config = config.set('display', display);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  onDataChange = (data) => {
    let { config } = this.props;
    config = config.set('data', data);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config
    });
  }

  onDataInChange = (key: string, value: any) => {
    let { config, config: { data } } = this.props;
    data = data.set(key, value)
    config = config.set('data', data);
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

  getNavStyle = () => {
    return [{ label: this.nls('default'), value: NavStyle.Default },
    { label: this.nls('tabs'), value: NavStyle.Tabs },
    { label: this.nls('pills'), value: NavStyle.Pills }];
  }

  getSelectedViews = (): ImmutableArray<string> => {
    let { config: { data: { section, views = Immutable([]), type } }, appConfig } = this.props;

    if (type === ViewType.Auto || !views) {
      return Immutable([]);
    } else {
      const sectionViews = getSectionViews(section, appConfig);
      const fileredViews = views.filter(view => !!(sectionViews.indexOf(view) > -1));
      return Immutable(fileredViews);
    }
  }

  renderSelectText = (values: string[]) => {
    const viewNumber = values ? values.length : 0;
    return this.nls('viewsSelected', { viewNumber });
  }

  render() {
    let { config: { data: { section, type }, display: { vertical, style, color, activeColor, textColor } }, appConfig } = this.props;
    const { sections } = this.state;
    return <div className="widget-setting-navigator jimu-widget-setting" css={this.getStyle()}>
      <SettingSection>
        <SettingRow flow="wrap" label={this.nls('linkTo')}>
          <Input type="select" value={section} onChange={e => this.onSectionChange(e.target.value)}>
            {sections.map((sid, index) => <option key={index} value={sid}>{getSectionLabel(sid, appConfig)}</option>)}
          </Input>
        </SettingRow>

      </SettingSection>

      <SettingSection>
        <SettingRow label={this.nls('views')}></SettingRow>
        <SettingRow>
          <Input id="view-type-auto" style={{ cursor: 'pointer' }}
            name="view-type" onChange={e => this.onViewTypeChange(ViewType.Auto)} type="radio" checked={type === ViewType.Auto} />
          <Label style={{ cursor: 'pointer' }} for="view-type-auto" className="ml-1">{this.nls('auto')}</Label>
        </SettingRow>
        <SettingRow>
          <Input id="view-type-custom" style={{ cursor: 'pointer' }}
            name="view-type" onChange={e => this.onViewTypeChange(ViewType.Custom)} type="radio" checked={type === ViewType.Custom} />
          <Label style={{ cursor: 'pointer' }} for="view-type-custom" className="ml-1">{this.nls('custom')}</Label>
        </SettingRow>
        {type === ViewType.Custom && <SettingRow flow="wrap">
          <MultiSelect values={this.getSelectedViews()} items={this.getViewSelectItems()} onClickItem={this.onViewsChange} showValues={this.renderSelectText} ></MultiSelect>
        </SettingRow>}
      </SettingSection>

      <SettingSection>
        <SettingRow flow="no-wrap" label={this.nls('direction')}>
          <ButtonGroup>
            <Button outline title={this.nls('right')} color="secondary" icon size="sm" active={!vertical} onClick={() => this.onDisplayChange('vertical', false)}>
              <Icon icon={rightArrowIcon}></Icon>
            </Button>
            <Button outline title={this.nls('down')} color="secondary" icon size="sm" active={vertical} onClick={() => this.onDisplayChange('vertical', true)}>
              <Icon icon={downArrowIcon}></Icon>
            </Button>
          </ButtonGroup>
        </SettingRow>
      </SettingSection>

      <SettingSection title={this.nls('style')}>
        {this.getNavStyle().map((item, index) =>
          <SettingRow key={index}>
            <Input id={'nav-style-type' + index} style={{ cursor: 'pointer' }}
              name="style-type" onChange={e => this.onRadioChange(e, 'style', item.value)} type="radio" checked={style === item.value} />
            <Label style={{ cursor: 'pointer' }} for={'nav-style-type' + index} className="ml-1">{item.label}</Label>
          </SettingRow>)
        }

        <SettingRow label={this.nls('background')} flow="wrap">
          <SingleColorChooser color={color} colors={this.generateColors(true)} onChange={this.onBackgroundChange}></SingleColorChooser>
        </SettingRow>

        <SettingRow label={this.nls('select')} flow="wrap">
          <SingleColorChooser color={activeColor} colors={this.generateColors()} onChange={(c) => this.onDisplayChange('activeColor', c)}></SingleColorChooser>
        </SettingRow>

        {color === TransparentColor.Transparent &&
          <SettingRow label={this.nls('regular')} flow="wrap">
            <SingleColorChooser color={textColor}
              colors={this.generateRegularColor()} onChange={(c) => this.onDisplayChange('textColor', c)}></SingleColorChooser>
          </SettingRow>
        }
      </SettingSection>
    </div >
  }
}