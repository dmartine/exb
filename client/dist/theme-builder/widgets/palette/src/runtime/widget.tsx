
/** @jsx jsx */
import {  BaseWidget, AllWidgetProps, ThemeManager, css, jsx, SerializedStyles, Immutable, ThemeInfo, IMThemeInfo, ThemeVariables } from 'jimu-core';
import { IMConfig } from '../config';
import {ThemeEditor, ThemeConfigurator, getAppConfigAction} from 'jimu-for-builder';
import { Switch } from 'jimu-ui';

interface State {
  themeInfo: IMThemeInfo;
  selectedThemeName: string;
  isBuilder: boolean;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{

  protected themeManager: ThemeManager = ThemeManager.getInstance();
  protected defaultTheme: string = 'calcite';

  cssLink: HTMLLinkElement;


  getStyle = (): SerializedStyles => {
    return css`
      overflow: auto;
      .jimu-builder-theme-chooser {
        ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }

  handleOnChange = (themeName: string, themeInfo?: ThemeInfo) => {
    console.log(`SELECTED THEME IS: ${themeName}`);

    const themeUri = themeName;
    getAppConfigAction().editTheme(themeUri).exec();
    if(themeInfo) {
      this.setState({
        themeInfo: Immutable(themeInfo)
      })
    }
  }

  handleOnUpdate = (customVariables: Partial<ThemeVariables>) => {
    if(!customVariables) return;

    getAppConfigAction().editCustomTheme(Immutable(customVariables)).exec();
  }

  handleOnThemeGroupChange = e => {
    let checked = e.target && e.target.checked;
    if(checked) {
      this.themeManager.setThemeFolderPath('builder/themes/');
      this.setState({
        selectedThemeName: 'builder/dark',
        isBuilder: true
      })
    } else {
      this.themeManager.setThemeFolderPath('themes/');
      this.setState({
        selectedThemeName: 'default',
        isBuilder: false
      })
    }
    this.forceUpdate();
  }

  constructor(props) {
    super(props);

    this.state = {
      themeInfo: null,
      selectedThemeName: this.defaultTheme,
      isBuilder: false
    };
  }

  render() {
    return (
      <div css={this.getStyle()}>
        <h5>Theme Tester: </h5>
        <div className="d-flex justify-content-end"> Builder Themes: 
          <Switch className="ml-2" onChange={this.handleOnThemeGroupChange} />
        </div>
        <hr/>
        <ThemeEditor
          themeName={this.state.selectedThemeName}
          onThemeChange={this.handleOnChange} 
          auto
          isBuilder={this.state.isBuilder}
          ></ThemeEditor>
        <hr/>
        <ThemeConfigurator 
          themeInfo={this.state.themeInfo}
          onThemeUpdate={this.handleOnUpdate}
          ></ThemeConfigurator>
      </div>
    )
  }
}