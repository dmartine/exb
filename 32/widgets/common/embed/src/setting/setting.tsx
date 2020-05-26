/** @jsx jsx */
import { IMAppConfig, IMState, jsx, ThemeVariables, IMThemeVariables, Immutable, UseDataSource, ImmutableArray, Expression, JimuFieldType } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder';
import { SettingSection, SettingRow } from 'jimu-ui/setting-components';
import { Icon, Radio, TextInput, Label } from 'jimu-ui';
import defaultMessages from './translations/default';
import { IMConfig, EmbedType } from '../config';
import { getStyle } from './style';
import { DataSourceSelector, AllDataSourceTypes, SelectedDataSourceJson } from 'jimu-ui/data-source-selector';
import { ExpressionInput, ExpressionInputFrom } from 'jimu-ui/expression-builder';

interface ExtraProps {
  appConfig: IMAppConfig;
  appTheme: ThemeVariables;
}

interface CustomeProps {
  theme: IMThemeVariables;
}

interface State {
  showUrlError: boolean;
  urlError: string;
  isExpPopupOpen: boolean;
}


export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State>{
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery]);
  attributePlaceHolder: string;
  expressionPlaceHolder: string;
  constructor(props) {
    super(props);

    this.state = {
      showUrlError: false,
      urlError: '',
      isExpPopupOpen: false
    }
  }

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme
    }
  }

  embedTypeChange = (type: EmbedType) => {
    const {config} = this.props;
    if (this.props.config.embedType !== type) {
      this.props.onSettingChange({
        id: this.props.id,
        config: config.set('embedType', type)
      });
    }
  }

  checkURL = (str: string): boolean => {
    if(!str || str === '')return false;
    const httpsRex = '^(([h][t]{2}[p][s])?://)';
    const re = new RegExp(httpsRex);
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

  embedCodeChangeRightAway = (value) => {
    const {config, id} = this.props;
    this.props.onSettingChange({
      config: config.set('embedCode', value),
      id: id
    })
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  onDataSourceSelected = (allSelectedDss: SelectedDataSourceJson[], currentSelectedDs?: SelectedDataSourceJson) => {
    if(!allSelectedDss){
      return;
    }
    const useDataSources: UseDataSource[] = allSelectedDss.map(ds => ({
      dataSourceId: ds.dataSourceJson && ds.dataSourceJson.id,
      rootDataSourceId: ds.rootDataSourceId
    }));

    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    });
  }

  onDataSourceRemoved = () => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: []
    });
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled
    });
  }

  openExpPopup = () => this.setState({isExpPopupOpen: true})

  closeExpPopup = () => this.setState({isExpPopupOpen: false})

  webAddressExpressionChange = (e: Expression) => {
    const {config, onSettingChange, id} = this.props;
    onSettingChange({
      id,
      config: config.set('expression', e),
    })
    this.closeExpPopup();
  }

  staticUrlChange = (event) => {
    let value;
    if (!event || !event.target || !event.target.value){
      value = ''
    }else {
      value = event.target.value.trim();
    }
    if(!this.checkURL(value)){
      this.setState({
        showUrlError: true
      })
    }else{
      this.setState({
        showUrlError: false
      })
    }
  }

  staticUrlSubmit = (value) => {
    if(!value) return;
    if(!this.checkURL(value)){
      this.setState({
        showUrlError: true
      })
      return;
    }
    const {config, onSettingChange, id} = this.props;
    onSettingChange({
      id,
      config: config.set('staticUrl', value),
    })
  }

  isUsedDataSource = () => {
    const {useDataSources, useDataSourcesEnabled} = this.props;
    return useDataSourcesEnabled && useDataSources && useDataSources.length > 0
  }

  render() {
    const {theme, config, useDataSourcesEnabled} = this.props;
    const { embedType} = config;

    const useDataSources = this.props.useDataSources || [];
    const dataSourceIds: ImmutableArray<string> = useDataSources[0] ? Immutable([useDataSources[0].dataSourceId]) : Immutable([]);
    
    return (
      <div css={getStyle(this.props.theme)}>
        <div className="widget-iframe jimu-widget">
          <div>
            <SettingSection>
              <SettingRow label={this.formatMessage('embedBy')}>
              </SettingRow>
              <SettingRow>
                <Radio onChange={() => this.embedTypeChange(EmbedType.Url)}
                  checked={embedType === EmbedType.Url} />
                <Label className="ml-2 " onClick={evt => this.embedTypeChange(EmbedType.Url)} >{this.formatMessage('websiteAddress')}</Label>
              </SettingRow>
              <SettingRow>
                <Radio onChange={() => this.embedTypeChange(EmbedType.Code)}
                  checked={embedType === EmbedType.Code} />
                <Label className="ml-2 " onClick={evt => this.embedTypeChange(EmbedType.Code)} >{this.formatMessage('code')}</Label>
              </SettingRow>
              <SettingRow>
                {
                  embedType === EmbedType.Url ?
                    <div className="d-flex flex-column w-100" style={{zIndex: 3}}>
                      {
                        this.isUsedDataSource() ? 
                          <ExpressionInput dataSourceIds={dataSourceIds} 
                            attributeTypes={[JimuFieldType.String]}
                            onChange={this.webAddressExpressionChange}
                            expression={config.expression && config.expression.asMutable({deep: true})}
                            placeHolders={{
                              [ExpressionInputFrom.Attribute]: this.formatMessage('attributeHint'), 
                              [ExpressionInputFrom.Expression]: this.formatMessage('expressionHint')}}
                            closeExpPopup={this.closeExpPopup} openExpPopup={this.openExpPopup} isExpPopupOpen={this.state.isExpPopupOpen}
                            from={[ExpressionInputFrom.Attribute, ExpressionInputFrom.Expression]}
                          /> :
                          <TextInput type="text"
                            className="w-100"
                            placeholder={this.formatMessage('websitePlaceholder')}
                            value={config.staticUrl}
                            onChange={this.staticUrlChange}
                            onAcceptValue={this.staticUrlSubmit}
                            spellCheck={false} />
                      }
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
                    <TextInput type="textarea"
                      style={{ height: '300px' }}
                      className="w-100"
                      spellCheck={false}
                      placeholder={this.formatMessage('codePlaceholder')}
                      value={config.embedCode || ''}
                      onAcceptValue={this.embedCodeChangeRightAway} />
                }
              </SettingRow>
              {embedType === EmbedType.Url &&
              // <SettingSection>
                <SettingRow>
                  <div className="choose-ds w-100">
                    <DataSourceSelector types={this.supportedDsTypes} selectedDataSourceIds={dataSourceIds}
                      useDataSourcesEnabled={useDataSourcesEnabled} onToggleUseDataEnabled={this.onToggleUseDataEnabled}
                      onSelect={this.onDataSourceSelected} onRemove={this.onDataSourceRemoved}
                    />
                  </div>
                </SettingRow>
                // </SettingSection>
              
              }

            </SettingSection>
          </div>
        </div>
      </div>
    )
  }
}
