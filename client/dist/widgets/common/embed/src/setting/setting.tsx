/** @jsx jsx */
import { IMAppConfig, IMState, jsx, ThemeVariables, IMThemeVariables } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, SettingSection, SettingRow } from 'jimu-for-builder';
import { Icon, Input, Label } from 'jimu-ui';
import defaultMessages from './translations/default';
import { IMConfig, EmbedType } from '../config';
import { getStyle } from './style';


interface ExtraProps {
  appConfig: IMAppConfig;
  appTheme: ThemeVariables;
}

interface CustomeProps {
  theme: IMThemeVariables;
}

interface State {
  showUrlError: boolean;
  content: string;
  urlError: string;
}


export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State>{

  constructor(props) {
    super(props);

    this.state = {
      showUrlError: false,
      urlError: '',
      content: props.config.content || ''
    }
  }

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme
    }
  }

  embedTypeChange = (type: EmbedType) => {
    if (this.props.config.functionConfig.embedType !== type) {
      let functionConfig = {
        embedType: type,
        content: ''
      }
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.set('functionConfig', functionConfig)
      });
      this.setState({
        content: ''
      })
    }
  }

  contentChangeTimeout: NodeJS.Timer;
  contentChange = (event) => {
    if(event && event.target && event.target.value){
      const value = event.target.value.trim();
      if(value === '')return;
      const {config} = this.props;
      this.setState({
        content: value
      })
      if(config.functionConfig.embedType === EmbedType.Url){
        const isUrl = this.checkURL(value);
        this.setState({
          showUrlError: !isUrl
        })
      }
    }
    
  }

  checkURL = (str: string) : boolean => {
    if(!str || str === '')return false;
    const httpsRex = '^(([h][t]{2}[p][s])?://)';
    let re = new RegExp(httpsRex);
    if(!re.test(str)){
      this.setState({
        urlError: this.formatMessage('httpsUrlMessage')
      })
      return false;
    }
    const index = str.indexOf('.');
    if(index < 0 || index === str.length - 1){
      this.setState({
        urlError: this.formatMessage('invalidUrlMessage')
      })
      return false;
    }
    return true
  }

  contentChangeAfter = (event, time) => {
    if (!event || !event.target || !event.target.value) return;
    const {config} = this.props;
    const value = event.target.value.trim();
    if(value === '') return;
    
    if (value === this.props.config.functionConfig.content) return;
    if(config.functionConfig.embedType === EmbedType.Url){
      const isUrl = this.checkURL(value);
      this.setState({
        showUrlError: !isUrl
      })
      if(!isUrl)return;
    }
    if (this.contentChangeTimeout) {
      clearTimeout(this.contentChangeTimeout);
      this.contentChangeTimeout = undefined;
    }
    this.contentChangeTimeout = setTimeout(() => {
      this.contentChangeTimeout = undefined;
      this.props.onSettingChange({
        config: this.props.config.setIn(['functionConfig', 'content'], value),
        widgetId: this.props.id
      })
    }, time);
  }

  contentChangeRightAway = (event) => {
    this.contentChangeAfter(event, 1000);
  }

  onKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.contentChangeRightAway(evt);
    }
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  render() {
    const {theme, config} = this.props;
    const { embedType } = this.props.config.functionConfig;
    return (
      <div css={getStyle(this.props.theme)}>
        <div className="widget-iframe jimu-widget">
          <div>
            <SettingSection>
              <SettingRow label={this.formatMessage('embedBy')}>
              </SettingRow>
              <SettingRow>
                <Input onChange={() => this.embedTypeChange(EmbedType.Url)}
                  type="radio" checked={embedType === EmbedType.Url} />
                <Label className="ml-2 " onClick={evt => this.embedTypeChange(EmbedType.Url)} >{this.formatMessage('websiteAddress')}</Label>
              </SettingRow>
              <SettingRow>
                <Input onChange={() => this.embedTypeChange(EmbedType.Code)}
                  type="radio" checked={embedType === EmbedType.Code} />
                <Label className="ml-2 " onClick={evt => this.embedTypeChange(EmbedType.Code)} >{this.formatMessage('code')}</Label>
              </SettingRow>
              <SettingRow>
                {
                  embedType === EmbedType.Url ?
                    <div className="d-flex flex-column w-100">
                      <Input type="text"
                        className="w-100"
                        placeholder={this.formatMessage('websitePlaceholder')}
                        value={config.functionConfig.content || ''}
                        onChange={this.contentChange}
                        onBlur={this.contentChangeRightAway}
                        spellCheck={false}
                        onKeyUp={this.contentChangeRightAway} />
                      {this.state.showUrlError && <div className="d-flex w-100 align-items-center justify-content-between" style={{ marginTop: '5px' }}>
                        <Icon size={16} icon={require('jimu-ui/lib/icons/warning.svg')} color={theme.colors.danger} />
                        <div 
                          style={{ 
                            width: 'calc(100% - 20px)', 
                            marginLeft: '4px', 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: theme.colors.danger }} >
                            {this.state.urlError}
                        </div>
                      </div>}

                    </div> :
                    <Input type="textarea"
                      style={{ height: '300px' }}
                      className="w-100"
                      spellCheck={false}
                      placeholder={this.formatMessage('codePlaceholder')}
                      value={config.functionConfig.content || ''}
                      onChange={this.contentChange}
                      onBlur={this.contentChangeRightAway}
                      onKeyUp={this.onKeyUp} />
                }
              </SettingRow>

            </SettingSection>
          </div>
        </div>
      </div>
    )
  }
}
