/** @jsx jsx */
import {Immutable, ImmutableObject, IMDataSourceJson, IMState, FormattedMessage, 
  css, jsx, DataSourceManager, getAppStore, polished, classNames} from 'jimu-core';
import {Switch} from 'jimu-ui';
import { DataSourceTypes } from 'jimu-arcgis/arcgis-data-source';
import {BaseWidgetSetting, AllWidgetSettingProps, DataSourceChooser, DataSourceJsonWithRootId, 
  SettingSection, SettingRow, builderAppSync} from 'jimu-for-builder';
import {IMConfig} from '../config';
import defaultMessages from './translations/default';
import MapThumb from './components/map-thumb';

interface ExtraProps{
  dsJsons: ImmutableObject<{ [dsId: string]: IMDataSourceJson }>;
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps, {}>{
  unmount = false;
  dsManager = DataSourceManager.getInstance();
  integratedDataSourceSetting = {} as any;
  supportedDsTypes = Immutable([DataSourceTypes.WebMap, DataSourceTypes.WebScene]);

  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      dsJsons: state.appStateInBuilder.appConfig.dataSources
    }
  }

  constructor(props){
    super(props);
    this.initDataSourceSettingOption();
  }

  getStyle () {
    return css`
      .widget-setting-map{
        font-weight: lighter;
        font-size: 13px;

        .source-descript {
          color: ${this.props.theme.colors.grays.gray700};	
        }

        .webmap-thumbnail{
          cursor: pointer;
          width: 100%;
          height: 120px;
          overflow: hidden;
          padding: 1px;
          border: ${polished.rem(2)} solid initial;
          img, div{
            width: 100%;
            height: 100%;
          }
        }

        .selected-item{
          border: ${polished.rem(2)} solid ${this.props.theme.colors.cyans.cyan500} !important;
        }

        .webmap-thumbnail-multi{
          cursor: pointer;
          width: 48%;
          height: 100px;
          overflow: hidden;
          padding: 1px;
          border: ${polished.rem(2)} solid initial;
          img, div{
            width: 100%;
            height: 100%;
          }
        }

        .placeholder-container {	
          background-color: ${this.props.theme.colors.secondary};	
          width: 100%;	
          height: 120px;	
          position: relative;	
        }	
  
        .placeholder-icon {	
          top: 40%;	
          left: 46%;	
          position: absolute;	
          fill: ${this.props.theme.colors.grays.gray600};	
        }
      
        .choose-btn{
          width: 100%;
        }
      
        .webmap-tools{
          .webmap-tools-item{
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
        }

        .uploadInput {
          position: absolute;
          opacity: 0;
          left: 0;
          top: 0;
          cursor: pointer;
        }
      
        .uploadInput-container {
          position: relative;
        }

        .setting-map-button{
          cursor: 'pointer';
        }
      }
      .item-chooser-popup {
        width: 850px;
        .modal-body {
          max-height: 70vh;
          overflow: auto;
        }
      }`;
  }

  componentDidMount(){
    this.unmount = false;
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  getOutputDataSourceJson = (dataSourceJson: IMDataSourceJson): IMDataSourceJson => {
    // outputDataSourceJson should bind widget instance, such as MapviewDataSource
    let dsJson = null;
    if (dataSourceJson.type === DataSourceTypes.WebMap) {
      dsJson = Immutable({
        id: `${dataSourceJson.id}-${this.props.id}-view`,
        label: dataSourceJson.label,
        type: DataSourceTypes.MapView,
        itemId: dataSourceJson.itemId,
        originDataSourceId: dataSourceJson.id,
        isOutputFromWidget: true
      }) as IMDataSourceJson;
    }

    if (dataSourceJson.type === DataSourceTypes.WebScene) {
      dsJson = Immutable({
        id: `${dataSourceJson.id}-${this.props.id}-view`,
        label: dataSourceJson.title,
        type: DataSourceTypes.SceneView,
        itemId: dataSourceJson.itemId,
        originDataSourceId: dataSourceJson.id,
        isOutputFromWidget: true
      }) as IMDataSourceJson;
    }

    return dsJson;
  }

  getPortUrl = (): string => {
    let portUrl = getAppStore().getState().portalUrl;
    return portUrl;
  }

  onDataSourceSelected = (selectedDsJsons: DataSourceJsonWithRootId[], dsJsonWithRootId: DataSourceJsonWithRootId): void => {

    if(!dsJsonWithRootId || !dsJsonWithRootId.dataSourceJson){
      return;
    }

    let tempUseDataSources = [];
    tempUseDataSources = Object.assign(tempUseDataSources, this.props.useDataSources);
    tempUseDataSources.push({
      dataSourceId: dsJsonWithRootId.dataSourceJson.id,
      rootDataSourceId: dsJsonWithRootId.rootDataSourceId
    });

    let outputDataSourcesJson = null;
    let outputDataSources = this.props.outputDataSources;
    
    let builderDatasources = getAppStore().getState().appStateInBuilder.appConfig.dataSources;
    if (this.props.outputDataSources && this.props.outputDataSources[0]) {
      outputDataSourcesJson = [];
      for (let i = 0; i < this.props.outputDataSources.length; i++) {
        let outputdataSourceJson = builderDatasources[outputDataSources[i]];
        outputDataSourcesJson.push(outputdataSourceJson)
      }
      let outputDataSourceJson = this.getOutputDataSourceJson(dsJsonWithRootId.dataSourceJson)
      if (outputDataSourceJson) {
        outputDataSourcesJson.push(outputDataSourceJson);
      }
    } else {
      let outputDataSourceJson = this.getOutputDataSourceJson(dsJsonWithRootId.dataSourceJson)
      if (outputDataSourceJson) {
        outputDataSourcesJson = [outputDataSourceJson];
      }
    }

    this.integratedDataSourceSetting = {
      widgetId: this.props.id,
      useDataSources: Immutable(tempUseDataSources),
      outputDataSourcesJson: Immutable(outputDataSourcesJson)
    };

    let settingOption = Object.assign({}, this.integratedDataSourceSetting);
    settingOption.config = this.props.config.set('initialMapDataSourceID', dsJsonWithRootId.dataSourceJson.id),
    this.props.onSettingChange(settingOption);
  }

  onDataSourceRemoved = (dsJsons: DataSourceJsonWithRootId[], dsJsonWithRootId: DataSourceJsonWithRootId): void => {

    if(!dsJsonWithRootId || !dsJsonWithRootId.dataSourceJson){
      return;
    }

    let removedDatasourceId = dsJsonWithRootId.dataSourceJson.id;

    //remove related useDataSource
    let tempUseDataSources = [];
    tempUseDataSources = Object.assign(tempUseDataSources, this.props.useDataSources);
    for (let i = 0; i < tempUseDataSources.length; i++) {
      if (tempUseDataSources[i].dataSourceId === removedDatasourceId) {
        tempUseDataSources.splice(i, 1);
        break;
      }
    }

    //remove related outputDataSource
    let outputDataSourcesJson = null;
    let outputDataSources = this.props.outputDataSources;
    let builderDatasources = getAppStore().getState().appStateInBuilder.appConfig.dataSources;
    if (outputDataSources && outputDataSources[0]) {
      outputDataSourcesJson = [];
      for (let i = 0; i < this.props.outputDataSources.length; i++) {
        let outputdataSourceJson = builderDatasources[outputDataSources[i]];
        if (outputdataSourceJson.originDataSourceId !== removedDatasourceId) {
          outputDataSourcesJson.push(outputdataSourceJson)
        }
      }
    }

    let settingChange = {
      widgetId: this.props.id,
      useDataSources: Immutable(tempUseDataSources),
      outputDataSourcesJson: Immutable(outputDataSourcesJson)
    } as any;

    let settingOption = {} as any;

    this.integratedDataSourceSetting = settingChange;
    settingOption = Object.assign({}, this.integratedDataSourceSetting);
    if (tempUseDataSources.length > 0) {
      let initialMapDataSourceID = tempUseDataSources[0] && tempUseDataSources[0].dataSourceId;
      settingOption.config = this.props.config.set('initialMapDataSourceID', initialMapDataSourceID);
    } else {
      settingOption.config = this.props.config.set('initialMapDataSourceID', null);
    }

    this.props.onSettingChange(Object.assign({}, settingOption));
  }

  onMapToolsChanged = (checked, name): void => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set(name, checked),
    });
  };

  onMapOptionsChanged = (checked, name): void => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set(name, checked),
    });
  };

  extentModeChanged = (extentMode: string): void => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set('extentMode', extentMode),
    });
  }

  onDisableSelection = (selectedDsJsons: DataSourceJsonWithRootId[]): boolean => {
    if (selectedDsJsons.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  // use for dataSourceSetting cache
  initDataSourceSettingOption = () => {
    let tempUseDataSources = [];
    tempUseDataSources = Object.assign(tempUseDataSources, this.props.useDataSources);

    let outputDataSourcesJson = null;
    let outputDataSources = this.props.outputDataSources;
    let builderDatasources = getAppStore().getState().appStateInBuilder.appConfig.dataSources;
    if (this.props.outputDataSources && this.props.outputDataSources[0]) {
      outputDataSourcesJson = [];
      for (let i = 0; i < this.props.outputDataSources.length; i++) {
        let outputdataSourceJson = builderDatasources[outputDataSources[i]];
        outputDataSourcesJson.push(outputdataSourceJson)
      }
    }
    let dataSourceSettingOption = {
      widgetId: this.props.id,
      useDataSources: Immutable(tempUseDataSources),
      outputDataSourcesJson: Immutable(outputDataSourcesJson)
    }
    this.integratedDataSourceSetting = dataSourceSettingOption;
  }

  setInitialMap = (dataSourceId: string) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set('initialMapDataSourceID', dataSourceId)
    });

    builderAppSync.publishWidgetsStatePropChange({widgetId: this.props.id, propKey: 'initialMapDataSourceID', value: dataSourceId});
  }

  render(){
    const portalUrl = this.getPortUrl();

    let mapDsIds = [];
    if (this.props.useDataSources) {
      for (let i = 0; i < this.props.useDataSources.length; i++) {
        mapDsIds.push(this.props.useDataSources[i].dataSourceId);
      }
    }

    return <div css={this.getStyle()}><div className="widget-setting-map">
      {
        <SettingSection title={this.props.intl.formatMessage({id: 'sourceLabel', defaultMessage: defaultMessages.sourceLabel})}>
          <SettingRow>
            <div className="source-descript">{this.props.intl.formatMessage({id: 'sourceDescript', defaultMessage: defaultMessages.sourceDescript})}</div>
          </SettingRow>
          <SettingRow>
            <DataSourceChooser isMultiple={true} types={this.supportedDsTypes} widgetId={this.props.id} 
              onSelect={this.onDataSourceSelected} selectedDataSourceIds={Immutable(mapDsIds)} 
              onRemove={this.onDataSourceRemoved} disableSelection={this.onDisableSelection} mustUseDataSource={true}/>
          </SettingRow>
          {portalUrl && this.props.dsJsons && this.props.useDataSources && this.props.useDataSources.length === 1 && <SettingRow>
              <div className="w-100">
                <div className="webmap-thumbnail" title={this.props.dsJsons[this.props.useDataSources[0].dataSourceId].label}
                  onClick={() => {this.setInitialMap(this.props.useDataSources[0].dataSourceId)}}>
                  <MapThumb mapItemId={this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ? 
                    this.props.dsJsons[this.props.useDataSources[0].dataSourceId].itemId : null} 
                    portUrl={this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ? 
                      this.props.dsJsons[this.props.useDataSources[0].dataSourceId].portalUrl : null} ></MapThumb>
                </div>
              </div>
          </SettingRow>}
        </SettingSection>
      }
      {
        portalUrl && this.props.dsJsons && this.props.useDataSources && this.props.useDataSources.length === 2 &&
          <SettingSection title={this.props.intl.formatMessage({id: 'initialMap', defaultMessage: defaultMessages.initialMap})}>
            <SettingRow>
            {
              <div className="w-100 d-flex justify-content-between">
                <div onClick={() => {this.setInitialMap(this.props.useDataSources[0].dataSourceId)}} 
                  title={this.props.dsJsons[this.props.useDataSources[0].dataSourceId].label}
                  className={classNames('webmap-thumbnail-multi', {'selected-item': this.props.config.initialMapDataSourceID === this.props.useDataSources[0].dataSourceId})}>
                  <MapThumb mapItemId={this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ?
                    this.props.dsJsons[this.props.useDataSources[0].dataSourceId].itemId : null} 
                    portUrl={this.props.dsJsons[this.props.useDataSources[0].dataSourceId] ?
                      this.props.dsJsons[this.props.useDataSources[0].dataSourceId].portalUrl : null}></MapThumb>
                </div>
                <div onClick={() => {this.setInitialMap(this.props.useDataSources[1].dataSourceId)}} 
                  title={this.props.dsJsons[this.props.useDataSources[1].dataSourceId].label}
                  className={classNames('webmap-thumbnail-multi', {'selected-item': this.props.config.initialMapDataSourceID === this.props.useDataSources[1].dataSourceId})}>
                  <MapThumb mapItemId={this.props.dsJsons[this.props.useDataSources[1].dataSourceId] ?
                    this.props.dsJsons[this.props.useDataSources[1].dataSourceId].itemId : null} 
                    portUrl={this.props.dsJsons[this.props.useDataSources[1].dataSourceId] ?
                      this.props.dsJsons[this.props.useDataSources[1].dataSourceId].portalUrl : null}></MapThumb>
                </div>
              </div>
            }
          </SettingRow>
          </SettingSection>
      }
      <SettingSection title={this.props.intl.formatMessage({id: 'toolLabel', defaultMessage: defaultMessages.toolLabel})}>
        <SettingRow>
          <div className="w-100 webmap-tools">
            <div className="webmap-tools-item">
              <label><FormattedMessage id="zoomLabel" defaultMessage={defaultMessages.zoomLabel}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canZoom) || false}
                data-key="canZoom" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canZoom')}} />
            </div>
            <div className="webmap-tools-item">
              <label><FormattedMessage id="homeLabel" defaultMessage={defaultMessages.homeLabel}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canGoHome) || false}
                data-key="canGoHome" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canGoHome')}} />
            </div>
            <div className="webmap-tools-item">
              <label><FormattedMessage id="locateLabel" defaultMessage={defaultMessages.locateLabel}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canLocate) || false}
                data-key="canLocate" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canLocate')}} />
            </div>
            <div className="webmap-tools-item">
              <label><FormattedMessage id="scalebarLabel" defaultMessage={defaultMessages.scalebarLabel}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canScale) || false}
                data-key="canScale" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canScale')}} />
            </div>
            <div className="webmap-tools-item">
              <label><FormattedMessage id="compassLabel" defaultMessage={defaultMessages.compassLabel}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canCompass) || false}
                data-key="canCompass" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canCompass')}} />
            </div>
            <div className="webmap-tools-item">
              <label><FormattedMessage id="toggleToPanOrRotate" defaultMessage={defaultMessages.toggleToPanOrRotate}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canNavigate) || false}
                data-key="canNavigate" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canNavigate')}} />
            </div>
            <div className="webmap-tools-item">
              <label><FormattedMessage id="searchLocationLabel" defaultMessage={defaultMessages.searchLocationLabel}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.canSearch) || false}
                data-key="canSearch" onChange={evt => {this.onMapToolsChanged(evt.target.checked, 'canSearch')}} />
            </div>
          </div>
        </SettingRow>
      </SettingSection>
      <SettingSection title={this.props.intl.formatMessage({id: 'options', defaultMessage: defaultMessages.options})}>
        <SettingRow>
          <div className="w-100 webmap-tools">
            <div className="webmap-tools-item">
              <label><FormattedMessage id="disableScrollZoom" defaultMessage={defaultMessages.disableScrollZoom}/></label>
              <Switch className="can-x-switch" checked={(this.props.config && this.props.config.disableScroll) || false}
                data-key="disableScroll" onChange={evt => {this.onMapOptionsChanged(evt.target.checked, 'disableScroll')}} />
            </div>
          </div>
        </SettingRow>
      </SettingSection>
    </div>
    </div>
  }
}