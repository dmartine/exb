/** @jsx jsx */
import {IMState, urlUtils, jsx, ImmutableObject, Immutable, ThemeVariables, ImmutableArray, ExpressionPartType,
  IMUseDataSource, Expression} from 'jimu-core';
import {BaseWidgetSetting, AllWidgetSettingProps, LinkParam, SettingSection, SettingRow, LinkSettingPopup,
  DataSourceChooser, AllDataSourceTypes, ExpressionInput, SingleColorChooser, ExpressionInputFrom, expressionUtils} from 'jimu-for-builder';
import {Button, Icon, Input, ThemeColors, Label} from 'jimu-ui';

import {IMConfig, ThemeStyle, ThemeColorStyle, ThemeSizeStyle} from '../config';
import {getStyle} from './style';
import defaultMessages from './translations/default';

const IconRefresh = require('jimu-ui/lib/icons/link-12.svg');

interface Style{
  label: string;
  themeStyle: string;
}
interface Styles{
  [style: string]: Style;
}

interface ExtraProps{
  appTheme: ThemeVariables;
}

enum ThemeGenName{
  Default = 'DEFAULT',
  Outline = 'OUTLINE',
  DefaultRround = 'DEFAULTROUND',
  OutlineRound = 'OUTLINEROUND',
  Link = 'LINK'
}

enum ThemeSizeName{
  Default = 'DEFAULT',
  Large = 'LARGE',
  Small = 'SMALL'
}

interface State{
  isLinkSettingShown: boolean;
  isTextExpOpen: boolean;
  isTipExpOpen: boolean;
  currentTextInput: string;
  currentTipInput: string;
}

const colors = [ThemeColors.PRIMARY, ThemeColors.SECONDARY, ThemeColors.SUCCESS, ThemeColors.INFO, ThemeColors.WARNING,
  ThemeColors.DANGER, ThemeColors.LIGHT, ThemeColors.DARK];

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps, State>{
  width70Style = {width: '75%', minHeight: '20px'};
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery]);
  themeGenerals: Styles = {
    [ThemeGenName.Default]: {
      label: this.props.intl.formatMessage({id: 'default', defaultMessage: defaultMessages.default}),
      themeStyle: 'default'
    },
    [ThemeGenName.Outline]: {
      label: this.props.intl.formatMessage({id: 'outline', defaultMessage: defaultMessages.outline}),
      themeStyle: 'outline'
    },
    [ThemeGenName.DefaultRround]: {
      label: this.props.intl.formatMessage({id: 'defaultRound', defaultMessage: defaultMessages.defaultRound}),
      themeStyle: 'default-round'
    },
    [ThemeGenName.OutlineRound]: {
      label: this.props.intl.formatMessage({id: 'outlineRound', defaultMessage: defaultMessages.outlineRound}),
      themeStyle: 'outline-round'
    },
    [ThemeGenName.Link]: {
      label: this.props.intl.formatMessage({id: 'link', defaultMessage: defaultMessages.link}),
      themeStyle: 'link'
    }
  };
  themeSizes: Styles = {
    [ThemeSizeName.Default]: {
      label: this.props.intl.formatMessage({id: 'default', defaultMessage: defaultMessages.default}),
      themeStyle: ''
    },
    [ThemeSizeName.Large]: {
      label: this.props.intl.formatMessage({id: 'large', defaultMessage: defaultMessages.large}),
      themeStyle: 'lg'
    },
    [ThemeSizeName.Small]: {
      label: this.props.intl.formatMessage({id: 'small', defaultMessage: defaultMessages.small}),
      themeStyle: 'sm'
    }
  };

  themeColors: Styles = {
    [ThemeColors.PRIMARY]: {
      label: this.props.intl.formatMessage({id: 'primary', defaultMessage: defaultMessages.primary}),
      themeStyle: 'primary'
    },
    [ThemeColors.SECONDARY]: {
      label: this.props.intl.formatMessage({id: 'secondary', defaultMessage: defaultMessages.secondary}),
      themeStyle: 'secondary'
    },
    [ThemeColors.SUCCESS]: {
      label: this.props.intl.formatMessage({id: 'success', defaultMessage: defaultMessages.success}),
      themeStyle: 'success'
    },
    [ThemeColors.INFO]: {
      label: this.props.intl.formatMessage({id: 'info', defaultMessage: defaultMessages.info}),
      themeStyle: 'info'
    },
    [ThemeColors.WARNING]: {
      label: this.props.intl.formatMessage({id: 'warning', defaultMessage: defaultMessages.warning}),
      themeStyle: 'warning'
    },
    [ThemeColors.DANGER]: {
      label: this.props.intl.formatMessage({id: 'danger', defaultMessage: defaultMessages.danger}),
      themeStyle: 'danger'
    },
    [ThemeColors.LIGHT]: {
      label: this.props.intl.formatMessage({id: 'light', defaultMessage: defaultMessages.light}),
      themeStyle: 'light'
    },
    [ThemeColors.DARK]: {
      label: this.props.intl.formatMessage({id: 'dark', defaultMessage: defaultMessages.dark}),
      themeStyle: 'dark'
    }
  }
  outlineStyleReg = /outline/i;
  roundStyleReg = /round/i;
  linkStyleReg = /link/i;
  linkNameReg = /link/i;

  constructor(props) {
    super(props);

    this.state = {
      isLinkSettingShown: false,
      isTextExpOpen: false,
      isTipExpOpen: false,
      currentTextInput: this.props.config ? this.props.config.functionConfig.text : null,
      currentTipInput: this.props.config ? this.props.config.functionConfig.toolTip : null
    }
  }

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme
    }
  }

  getGeneralThemeName = (themeStyle: ImmutableObject<ThemeStyle>): ThemeGenName => {
    if(!themeStyle){
      return ThemeGenName.Default;
    }

    if(this.linkStyleReg.test(themeStyle.color)){
      return ThemeGenName.Link;
    }

    let outline = 'default';
    let round = '';

    if(themeStyle.outline){
      outline = 'outline';
    }
    if(themeStyle.rounded){
      round = 'round';
    }

    const style = !!round ? `${outline}-${round}` : outline;
    return Object.keys(this.themeGenerals).find(g => this.themeGenerals[g].themeStyle === style) as ThemeGenName || ThemeGenName.Default;
  }

  getSizeThemeName = (themeStyle: ImmutableObject<ThemeStyle>): ThemeSizeName => {
    if(!themeStyle){
      return ThemeSizeName.Default;
    }

    return Object.keys(this.themeSizes).find(s => this.themeSizes[s].themeStyle === themeStyle.size) as ThemeSizeName || ThemeSizeName.Default;
  }

  getColorThemeName = (themeStyle: ImmutableObject<ThemeStyle>): ThemeColors => {
    if(!themeStyle){
      return ThemeColors.PRIMARY;
    }

    return this.linkStyleReg.test(themeStyle.color) ? ThemeColors.PRIMARY
      : (Object.keys(this.themeColors).find(c => this.themeColors[c].themeStyle === themeStyle.color) as ThemeColors || ThemeColors.PRIMARY);
  }

  getThemeStyle = (themeGenName: string, themeSizeName: string, themeColName: string): ImmutableObject<ThemeStyle> => {
    const themeStyle = {
      outline: this.outlineStyleReg.test(this.themeGenerals[themeGenName].themeStyle),
      rounded: this.roundStyleReg.test(this.themeGenerals[themeGenName].themeStyle),
      color: (this.linkStyleReg.test(this.themeGenerals[themeGenName].themeStyle) ? 'link'
        : this.themeColors[themeColName].themeStyle) as ThemeColorStyle,
      size: this.themeSizes[themeSizeName].themeStyle as ThemeSizeStyle
    };

    return this.props.config.styleConfig.themeStyle.merge(themeStyle);
  }

  changeGeneral = (themeGenName: ThemeGenName) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(
        ['styleConfig', 'themeStyle'],
        this.getThemeStyle(
          themeGenName,
          this.getSizeThemeName(this.props.config.styleConfig.themeStyle),
          this.getColorThemeName(this.props.config.styleConfig.themeStyle)
        )
      )
    });
  }

  changeSize = (themeSizeName: ThemeSizeName) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(
        ['styleConfig', 'themeStyle'],
        this.getThemeStyle(
          this.getGeneralThemeName(this.props.config.styleConfig.themeStyle),
          themeSizeName,
          this.getColorThemeName(this.props.config.styleConfig.themeStyle)
        )
      )
    });
  }

  changeColor = (themeColName: ThemeColors) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(
        ['styleConfig', 'themeStyle'],
        this.getThemeStyle(
          this.getGeneralThemeName(this.props.config.styleConfig.themeStyle),
          this.getSizeThemeName(this.props.config.styleConfig.themeStyle),
          themeColName
        )
      )
    });
  }

  toggleLinkSetting = () => {
    this.setState({ isLinkSettingShown: !this.state.isLinkSettingShown});
  }

  onSettingLinkConfirm = (linkResult: LinkParam) => {
    let config;
    if(!linkResult){
      return;
    }
    if(!linkResult.expression){
      let mergedUseDataSources;
      if(this.getIsDataSourceUsed()){
        const textExpression = this.getTextExpression();
        const tooltipExpression = this.getTipExpression();
        mergedUseDataSources = this.mergeUseDataSources(textExpression, tooltipExpression, null);
      }else{
        mergedUseDataSources = this.getUseDataSourcesWithoutFields();
      }
      config = {
        widgetId: this.props.id,
        config: this.props.config.setIn(['functionConfig', 'linkParam'], linkResult),
        useDataSources: mergedUseDataSources
      };
    }else{
      const textExpression = this.getTextExpression();
      const tooltipExpression = this.getTipExpression();
      const expression = linkResult.expression;
      const mergedUseDataSources = this.mergeUseDataSources(textExpression, tooltipExpression, expression);

      config = {
        widgetId: this.props.id,
        config: this.props.config.setIn(['functionConfig', 'linkParam'], linkResult),
        useDataSources: mergedUseDataSources
      };
    }

    this.props.onSettingChange(config);

    this.setState({
      isLinkSettingShown: false
    });
  }

  onTextInputConfigChange = (useDataSource?: IMUseDataSource) => {
    let config = {
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'text'], this.state.currentTextInput)
        .setIn(['functionConfig', 'textExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields()
    };

    this.props.onSettingChange(config);
  }

  onToolTipConfigChange = (useDataSource?: IMUseDataSource) => {
    let config = {
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTip'], this.state.currentTipInput)
        .setIn(['functionConfig', 'toolTipExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields()
    };
    this.props.onSettingChange(config);
  }

  onTextExpChange = (expression: Expression) => {
    if(!expression){
      return;
    }
    const tooltipExpression = this.getTipExpression();
    const linkSettingExpression = this.getLinkSettingExpression();
    const mergedUseDataSources = this.mergeUseDataSources(expression, tooltipExpression, linkSettingExpression);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'textExpression'], expression), //.setIn(['functionConfig', 'text'], ''),
      useDataSources: mergedUseDataSources
    });
    this.setState({isTextExpOpen: false});
  }

  onTipExpChange = (expression: Expression) => {
    if(!expression){
      return;
    }
    const textExpression = this.getTextExpression();
    const linkSettingExpression = this.getLinkSettingExpression();
    const mergedUseDataSources = this.mergeUseDataSources(textExpression, expression, linkSettingExpression);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTipExpression'], expression), //.setIn(['functionConfig', 'toolTip'], ''),
      useDataSources: mergedUseDataSources
    });
    this.setState({isTipExpOpen: false});
  }

  mergeUseDataSources = (textExpression: Expression, tipExpression: Expression, linkSettingExpression: Expression): ImmutableArray<IMUseDataSource> => {
    const textDss = expressionUtils.getUseDataSourceFromExpParts(textExpression && textExpression.parts);
    const tipDss = expressionUtils.getUseDataSourceFromExpParts(tipExpression && tipExpression.parts);
    const linkSettingDss = expressionUtils.getUseDataSourceFromExpParts(linkSettingExpression && linkSettingExpression.parts);
    return this.mergeUseDataSourcesByDss(textDss, tipDss, linkSettingDss);
  }

  mergeUseDataSourcesByDss = (textUseDss: ImmutableArray<IMUseDataSource>, tipUseDss: ImmutableArray<IMUseDataSource>,
    linkSettingUseDss: ImmutableArray<IMUseDataSource>): ImmutableArray<IMUseDataSource> => {
    let useDataSourcesWithoutFields = this.getUseDataSourcesWithoutFields();
    let mergedUseDss = expressionUtils.mergeUseDataSources(useDataSourcesWithoutFields, textUseDss)
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, tipUseDss);
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, linkSettingUseDss);
    return mergedUseDss;
  }

  generateColors = () => {
    const themeColor = (this.props.appTheme && this.props.appTheme.colors) || {};
    return colors.map(color => ({
      name: color,
      value: themeColor[color],
      background: themeColor[color]
    }));

  }

  getUseDataSourcesWithoutFields = (): ImmutableArray<IMUseDataSource> => {
    if(this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId){
      return Immutable([this.props.useDataSources[0].without('fields')]);
    }else{
      return Immutable([]);
    }
  }

  getIsDataSourceUsed = () => {
    return this.props.useDataSourcesEnabled;
  }

  getTipExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression;
    return (expression && expression.asMutable({deep: true}))
      || {name: 'default expression', parts: [{type: ExpressionPartType.String, exp: `"${this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip}"`}]};
  }

  getTextExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.textExpression &&
      this.props.config.functionConfig.textExpression;
    return (expression && expression.asMutable({deep: true}))
      || {name: 'default expression', parts: [{type: ExpressionPartType.String, exp: `"${this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.text}"`}]};
  }

  getLinkSettingExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam &&
      this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.expression;

    return (expression && expression.asMutable({deep: true})) || null;
  }

  openTextExpPopup = () => {
    this.setState({
      isTextExpOpen: true,
      isTipExpOpen: false
    });
  }

  openTipExpPopup = () => {
    this.setState({
      isTextExpOpen: false,
      isTipExpOpen: true
    });
  }

  closeTextExpPopup = () => {
    this.setState({
      isTextExpOpen: false,
      isTipExpOpen: false
    });
  }

  closeTipExpPopup = () => {
    this.setState({
      isTextExpOpen: false,
      isTipExpOpen: false
    });
  }

  render() {
    const generalNames = Object.keys(this.themeGenerals) as ThemeGenName[];
    //const sizeNames = Object.keys(this.themeSizes) as ThemeSizeName[];

    const useDataSources = this.props.useDataSources || [];
    const dataSourceIds: ImmutableArray<string> = useDataSources[0] ? Immutable([useDataSources[0].dataSourceId]) : Immutable([]);

    return(
      <div css={getStyle(this.props.theme)}>
        <div className="widget-setting-link jimu-widget">
          <div>
            <SettingSection>
              <SettingRow>
                <div className="choose-ds w-100">
                  <DataSourceChooser types={this.supportedDsTypes} selectedDataSourceIds={dataSourceIds} widgetId={this.props.id}/>
                </div>
              </SettingRow>
            </SettingSection>

            <SettingSection>
              <SettingRow>
                <Button className="w-100 text-dark set-link-btn" color="primary"
                  onClick={this.toggleLinkSetting}>
                  <Icon className="mr-3" icon={IconRefresh}/>{this.props.intl.formatMessage({id: 'setLink', defaultMessage: defaultMessages.setLink})}
                </Button>
              </SettingRow>
              <SettingRow label={this.props.intl.formatMessage({id: 'text', defaultMessage: defaultMessages.text})}>
              {
                this.getIsDataSourceUsed() ?
                <div style={this.width70Style}>
                  <ExpressionInput dataSourceIds={dataSourceIds} onChange={this.onTextExpChange} openExpPopup={this.openTextExpPopup}
                    expression={this.getTextExpression()} isExpPopupOpen={this.state.isTextExpOpen} closeExpPopup={this.closeTextExpPopup}
                    from={[ExpressionInputFrom.Static, ExpressionInputFrom.Attribute, ExpressionInputFrom.Statistics, ExpressionInputFrom.Expression]}
                  />
                </div> :
                <Input className="float-right" style={this.width70Style} value={this.state.currentTextInput}
                  onChange={(event) => { this.setState({ currentTextInput: event.target.value}); }}
                  onBlur={() => {this.onTextInputConfigChange()}}
                  onKeyUp={() => {this.onTextInputConfigChange()}}
                />
              }
              </SettingRow>
              <SettingRow label={this.props.intl.formatMessage({id: 'tooltip', defaultMessage: defaultMessages.tooltip})}>
              {
                this.getIsDataSourceUsed() ?
                <div style={this.width70Style}>
                  <ExpressionInput dataSourceIds={dataSourceIds} onChange={this.onTipExpChange} openExpPopup={this.openTipExpPopup}
                    expression={this.getTipExpression()} isExpPopupOpen={this.state.isTipExpOpen} closeExpPopup={this.closeTipExpPopup}
                    from={[ExpressionInputFrom.Static, ExpressionInputFrom.Attribute, ExpressionInputFrom.Statistics, ExpressionInputFrom.Expression]}
                  />
                </div> :
                <Input className="float-right" style={this.width70Style} value={this.state.currentTipInput}
                  onChange={(event) => { this.setState({currentTipInput: event.target.value}); }}
                  onBlur={() => {this.onToolTipConfigChange()}}
                  onKeyUp={() => {this.onToolTipConfigChange()}}
                />
              }
              </SettingRow>
            </SettingSection>

            <SettingSection>
              <SettingRow>
                <div className="d-flex justify-content-between w-100">
                  <label>{this.props.intl.formatMessage({id: 'style', defaultMessage: defaultMessages.style})}</label>
                </div>
              </SettingRow>

              {
                generalNames.map((v, i) =>
                  <SettingRow key={v}>
                    <Input onChange={() => this.changeGeneral(v)} id={'link-style' + i}
                      type="radio" checked={this.getGeneralThemeName(this.props.config.styleConfig.themeStyle) === v}/>
                    <Label for={'link-style' + i} className="ml-2 link-cursor-pointer">{this.themeGenerals[v].label}</Label>
                  </SettingRow>
                )
              }
            </SettingSection>

            {/* <SettingSection>
              <SettingRow>
                <div className="d-flex justify-content-between w-100">
                  <label>{this.props.intl.formatMessage({id: 'size', defaultMessage: defaultMessages.size})}</label>
                </div>
              </SettingRow>

              {
                sizeNames.map((v, i) =>
                  <SettingRow key={v}>
                    <Input onChange={() => this.changeSize(v)} id={'link-size' + i}
                      type="radio" checked={this.getSizeThemeName(this.props.config.styleConfig.themeStyle) === v}/>
                    <Label for={'link-size' + i} className="ml-2 link-cursor-pointer">{this.themeSizes[v].label}</Label>
                  </SettingRow>
                )
              }
            </SettingSection> */}

            {
              !this.linkNameReg.test(this.getGeneralThemeName(this.props.config.styleConfig.themeStyle)) ?
              <SettingSection>
                <SettingRow>
                  <div className="d-flex justify-content-between w-100">
                    <label>{this.props.intl.formatMessage({id: 'color', defaultMessage: defaultMessages.color})}</label>
                  </div>
                </SettingRow>
                <SingleColorChooser color={this.getColorThemeName(this.props.config.styleConfig.themeStyle)} colors={this.generateColors()}
                  onChange={c => this.changeColor(c as ThemeColors)}
                />
              </SettingSection> : null
            }

          </div>

          {
            this.state.isLinkSettingShown && !urlUtils.getAppIdPageIdFromUrl().pageId &&
            <LinkSettingPopup showDialog={this.state.isLinkSettingShown}
              onSettingCancel={() => {this.setState({ isLinkSettingShown: false}); }}
              onSettingConfirm={this.onSettingLinkConfirm}
              linkParam={this.props.config.functionConfig.linkParam}
              dataSourceIds={this.getIsDataSourceUsed() && dataSourceIds}
            />
          }
        </div>
      </div>
    )
  }
}
