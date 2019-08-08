/** @jsx jsx */
import {
  React, BaseWidget, IMState, AllWidgetProps, IMAppConfig, ThemeManifest,
  Immutable, CustomThemeJson, ThemeManager,
  css, jsx, ThemeVariables, ThemeInfo, IMThemeInfo, SerializedStyles
} from 'jimu-core';
import {
  ThemeEditor, 
  SettingSection, getAppConfigAction
} from 'jimu-for-builder';
import defaultMessages from './translations/default';

interface ExtraProps{
  appConfig: IMAppConfig;
  sharedTheme: object;
}

interface WState{
  themeInfo: IMThemeInfo;
}

export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, WState>{
  loadingStr: string;
  titleStr: string;

  editorRef: any;

  private themeManager: ThemeManager;

  constructor(props){
    super(props);
    this.state = {
      themeInfo: null
    }

    this.loadingStr = this.props.intl.formatMessage({id: 'loading', defaultMessage: defaultMessages.loading});
    this.titleStr = this.props.intl.formatMessage({id: 'title', defaultMessage: defaultMessages.chooseTemplate});

    this.editorRef = React.createRef();

    this.themeManager = ThemeManager.getInstance();

    if(this.props.appConfig && this.props.appConfig.customTheme) {
      this.themeManager.updateCustomTheme(
        this.props.appConfig.theme,
        this.props.appConfig.customTheme
      )
    }
  }

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      appConfig: state.appStateInBuilder && state.appStateInBuilder.appConfig || null,
      sharedTheme: state.portalSelf &&  state.portalSelf.portalProperties && state.portalSelf.portalProperties.sharedTheme
    }
  }

  getStyle = (): SerializedStyles => {
    return css`
      overflow: auto;
      .jimu-builder-theme-chooser {
        ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .jimu-widget-setting--row.form-inline {
        select,
        .jimu-builder--input-unit {
          width: 50%;
        }
      }
    `
  }

  handleOnChange = (themeName: string, themeInfo?: ThemeInfo) => {
    console.log(`SELECTED THEME IS: ${themeName}`);

    // this.themeManager.reset();
    
    const themeUri = themeName;
    this.themeManager.loadThemeManifest(themeUri).then((result: ThemeManifest) => {
      getAppConfigAction(this.props.appConfig).editTheme(themeUri, Immutable(result)).exec();
    });

    if(themeInfo) {
      this.setState({
        themeInfo: Immutable(themeInfo)
      })
    }
  }

  handleOnUpdate = (customVariables: Partial<ThemeVariables>) => {
    if(!customVariables) return;

    let themeJson: CustomThemeJson = customVariables;
    getAppConfigAction(this.props.appConfig).editCustomTheme(Immutable(themeJson)).exec();
  }

  componentDidUpdate(prevProps: AllWidgetProps<{}> & ExtraProps) {
    if(this.props.appConfig && !prevProps.appConfig) {
      if(this.props.appConfig.customTheme) {
        this.themeManager.updateCustomTheme(
          this.props.appConfig.theme,
          this.props.appConfig.customTheme
        )
      }
    }
  }

  render() {
    const {
      appConfig
    } = this.props;

    return <div css={this.getStyle()} className="jimu-widget widget-builder-themes bg-gray-100 w-100 h-100">
      <SettingSection>
        {/* <h4 className="mb-3">{this.titleStr}</h4> */}
        <ThemeEditor
          themeName={appConfig && appConfig.theme}
          onThemeChange={this.handleOnChange} 
          auto
          ref = {this.editorRef}
          themeManager = {this.themeManager}
          intl={this.props.intl}
        />
      </SettingSection>
    </div>;
  }
}
