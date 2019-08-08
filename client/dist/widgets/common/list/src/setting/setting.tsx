/** @jsx jsx */
import { classNames, Immutable, DataSource, FieldSchema, IMState,
   IMAppConfig, ThemeVariables, SerializedStyles, css, jsx, IMThemeVariables, utils,
   DataSourceSchema, polished, AppMode, BrowserSizeMode, WidgetManager, 
   appConfigUtils, getAppStore, ImmutableObject, LayoutItemType } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps,
  DataSourceChooser, AllDataSourceTypes, DataSourceJsonWithRootId,
  SettingSection, SettingRow, AppDataSourceComponent, getAppConfigAction,
  BackgroundSetting,
  BorderSetting,
  FourSides,
  builderAppSync,
} from 'jimu-for-builder';
import { Input, Switch, Icon, BorderSides, Slider, Button, ButtonGroup, MultiSelect, MultiSelectItem } from 'jimu-ui';
import { IMConfig, PageStyle, ItemStyle, DirectionType, SelectionModeType, Status } from '../config';
import defaultMessages from './translations/default';
// import MyPicker from './components/my-picker'
import { Fragment } from 'react';
// import { handleResizeCardForStyleChange } from '../common-builder-support';
import { MyInput } from './components/my-input';

const prefix = 'jimu-widget-';

const style0 = Immutable(require('./template/card-style0.json'));
const style1 = Immutable(require('./template/card-style1.json'));
const style2 = Immutable(require('./template/card-style2.json'));
const style3 = Immutable(require('./template/card-style3.json'));
const style4 = Immutable(require('./template/card-style4.json'));

const AllStyles = {
  STYLE0: style0,
  STYLE1: style1,
  STYLE2: style2,
  STYLE3: style3,
  STYLE4: style4,
}

const directions = [
  {icon: require('jimu-ui/lib/icons/direction-right.svg'), value: DirectionType.Horizon},
  {icon: require('jimu-ui/lib/icons/direction-down.svg'), value: DirectionType.Vertical},
]

// const getAlignTypes = (direction: DirectionType) => {
//   return direction === DirectionType.Horizon ? [
//     {icon: require('jimu-ui/lib/icons/align-v-top-10.svg'), value: AlignType.Start},
//     {icon: require('jimu-ui/lib/icons/align-v-center-10.svg'), value: AlignType.Center},
//     {icon: require('jimu-ui/lib/icons/align-v-bottom-10.svg'), value: AlignType.End}
//   ] :
//   [
//     {icon: require('jimu-ui/lib/icons/align-h-left-10.svg'), value: AlignType.Start},
//     {icon: require('jimu-ui/lib/icons/align-h-center-10.svg'), value: AlignType.Center},
//     {icon: require('jimu-ui/lib/icons/align-h-right-10.svg'), value: AlignType.End}
//   ]
// }

const defaultConfig = Immutable(require('../../config.json'));

// const pageTransitions = [
//   {label: 'Glide', icon: require('./assets/img-glide.svg'), value: PageTransitonType.Glide},
//   {label: 'Fade', icon: require('./assets/img-fade.svg'), value: PageTransitonType.Fade},
//   {label: 'Float', icon: require('./assets/img-float.svg'), value: PageTransitonType.Float},
// ]

interface State {
  datasource: DataSource;
  fields: { [jimuName: string]: FieldSchema };
  isTextExpPopupOpen: boolean;
  currentTextInput: string;
  isTipExpPopupOpen: boolean;
  isLinkSettingShown: boolean;
}

interface ExtraProps{
  appConfig: IMAppConfig;
  appTheme: ThemeVariables;
  appMode: AppMode;
  browserSizeMode: BrowserSizeMode;
  showCardSetting: Status;
}

interface CustomeProps{
  theme: IMThemeVariables
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State> {
  dsJsonWidthRootId: DataSourceJsonWithRootId;
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery]);

  lastHoverLayout = {
    layout: [],
    widgets: {}
  };
  lastSelectedLayout = {
    layout: [],
    widgets: {}
  };
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    const {id} = props;
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      appTheme: state && state.appStateInBuilder && state.appStateInBuilder.theme,
      appMode: state && state.appStateInBuilder && state.appStateInBuilder.appRuntimeInfo && state.appStateInBuilder.appRuntimeInfo.appMode,
      browserSizeMode: state && state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
      showCardSetting: state && state.appStateInBuilder && state.appStateInBuilder.widgetsState
         && state.appStateInBuilder.widgetsState[id] && state.appStateInBuilder.widgetsState[id]['showCardSetting'] || Status.None,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      datasource: null,
      fields: {},
      isTextExpPopupOpen: false,
      currentTextInput: '',
      isTipExpPopupOpen: false,
      isLinkSettingShown: false
    };

    let {config, id, useDataSourcesEnabled, appConfig} = props;
    if(!config.isInitialed){
      if(!useDataSourcesEnabled){
        appConfig = getAppConfigAction().editWidget(appConfig.widgets[id].set('useDataSourcesEnabled', true)).appConfig;
      }
      this.onItemStyleChanged(config.itemStyle, appConfig);
    }
  }

  onPropertyChange = (name, value) => {
    const {config} = this.props;

    if(value === config[name]){
      return;
    }
    const newConfig = config.set(name, value);
    this.onConfigChange(newConfig);
  };

  onConfigChange = (newConfig) => {
    const alterProps = {
      widgetId: this.props.id,
      config: newConfig
    }
    this.props.onSettingChange(alterProps);

  };

  onBackgroundStyleChange = (status: Status, key, value) => {
    let {config} = this.props;
    config = config.setIn(['cardConfigs', status, 'backgroundStyle', key], value);
    this.onConfigChange(config);
  }

  onSelectionModeChange = (value) => {
    let {config, id, layouts, browserSizeMode, appConfig} = this.props;
    if(config.cardConfigs[Status.Selected].selectionMode === value){
      return;
    }
    let action = getAppConfigAction();
    if(config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None && value === SelectionModeType.None){//remove selected layout
      const desLayoutId = utils.findLayoutId(layouts[Status.Selected], browserSizeMode, appConfig.mainSizeMode);
      action = action.resetLayout(desLayoutId, true, false);
      this.changeBuilderStatus(Status.Regular);
    }else if(config.cardConfigs[Status.Selected].selectionMode === SelectionModeType.None && value !== SelectionModeType.None){
      const oriLayoutId = utils.findLayoutId(layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode);
      const desLayoutId = utils.findLayoutId(layouts[Status.Selected], browserSizeMode, appConfig.mainSizeMode);
      action = action.duplicateLayoutToLayout(oriLayoutId, desLayoutId, false);
      this.changeBuilderStatus(Status.Selected);
    }
    config = config.setIn(['cardConfigs', Status.Selected, 'selectionMode'], value);
    action.editWidgetConfig(id, config).exec();
  }

  onSelectionSwitch = (evt) => {
    const selected = evt.target.checked;
    if(selected){
      this.onSelectionModeChange(SelectionModeType.Single);
      
    }else {
      this.onSelectionModeChange(SelectionModeType.None);
    }
  }

  onHoverLayoutOpenChange = (evt) => {
    let {config, id, layouts, browserSizeMode, appConfig} = this.props;
    const value = evt.target.checked;
    if(config.cardConfigs[Status.Hover].enable === value)return;
    let action = getAppConfigAction();
    if(config.cardConfigs[Status.Hover].enable && !value){//remove hover layout
      const desLayoutId = utils.findLayoutId(layouts[Status.Hover], browserSizeMode, appConfig.mainSizeMode);
      action = action.resetLayout(desLayoutId, true, false);
      this.changeBuilderStatus(Status.Regular);
    }else if(!config.cardConfigs[Status.Hover].enable && value){
      const oriLayoutId = utils.findLayoutId(layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode);
      const desLayoutId = utils.findLayoutId(layouts[Status.Hover], browserSizeMode, appConfig.mainSizeMode);
      action = action.duplicateLayoutToLayout(oriLayoutId, desLayoutId, false);
      this.changeBuilderStatus(Status.Hover);
    }
    config = config.setIn(['cardConfigs', Status.Hover, 'enable'], value);
    action.editWidgetConfig(id, config).exec();
  }

  onOpenCardSetting = (evt, status) => {
    this.changeCardSettingAndBuilderStatus(status)
  }

  onExportClick = (evt) => {
    let {appConfig, layouts, config, id, browserSizeMode} = this.props;
    const currentPageId = getAppStore().getState().appStateInBuilder.appRuntimeInfo.currentPageId;
    const pageJson = appConfig.pages[currentPageId === 'default' ? 'home' : currentPageId];

    const pageTemplates = [
      {
        config: config,
        layouts: layouts.without(Status.Selected, Status.Hover),
        allLayouts: appConfig.layouts.without(pageJson.layout[browserSizeMode], layouts[Status.Selected][browserSizeMode], layouts[Status.Hover][browserSizeMode]),
        widgets: appConfig.widgets.without(id),
        views: appConfig.views,
        sections: appConfig.sections
      }
    ]

    const template0 = pageTemplates[0];
    template0.allLayouts && Object.keys(template0.allLayouts).forEach(layoutId => {
      let layoutJson = template0.allLayouts[layoutId].without('id');
      layoutJson.content && Object.keys(layoutJson.content).forEach(lEId => {
        const lEJson = (layoutJson.content[lEId] as any).without('id', 'parentId', 'layoutId').setIn(['setting', 'lockParent'], true);
        layoutJson = layoutJson.setIn(['content', lEId], lEJson);
      })
      template0.allLayouts = template0.allLayouts.set(layoutId, layoutJson);
    })

    template0.widgets && Object.keys(template0.widgets).forEach((wId, index) => {
      const wJson = template0.widgets[wId];
      template0.widgets = template0.widgets.set(wId, wJson.without('context', 'icon', 'label', 'manifest', '_originManifest',
       'version', 'id', 'useDataSourcesEnabled', 'useDataSources'))
    })

    template0.sections && Object.keys(template0.sections).forEach((sId, index) => {
      const sJson = template0.sections[sId];
      template0.sections = template0.sections.set(sId, sJson.without('id', 'label'));
    })

    template0.views && Object.keys(template0.views).forEach((vId, index) => {
      const vJson = template0.views[vId];
      template0.views = template0.views.set(vId, vJson.without('id', 'label'));
    })
    console.log(JSON.stringify(pageTemplates[0]));
    

    // const wJson = appConfig.widgets[this.props.id];
    // let embedLayoutJson = appConfig.layouts[wJson.layouts[Status.Regular].Desktop]

    // const template = {
    //   cardSize: config.cardSize,
    //   cardSpace: config.space,
    //   layout: [],
    //   widgets: {}
    // }
    // Object.keys(embedLayoutJson).forEach((key) => {
    //   if(key === 'id' || key === 'ROOT_ID')return;
    //   let layoutEle = embedLayoutJson[key];
    //   if (layoutEle.type === LayoutItemType.Widget && layoutEle.widgetId){
    //     template.widgets[layoutEle.widgetId] = appConfig.widgets[layoutEle.widgetId].without('context', 'icon', 'label', 'manifest', '_originManifest', 'version', 'useDataSources');
    //     template.layout.push(layoutEle);
    //   }
    // });
    // console.log(JSON.stringify(template));
  }

  onCardSettingReturnBackClick = (evt) => {
    this.changeCardSettingAndBuilderStatus(Status.None);
  }

  private changeCardSettingAndBuilderStatus = (status: Status) => {
    let {id, config} = this.props;
    builderAppSync.publishWidgetsStatePropChange({
      widgetId: id,
      propKey: 'showCardSetting',
      value: status
    });
    if(status === Status.Regular ||
        (status === Status.Hover && config.cardConfigs[Status.Hover].enable) ||
        (status === Status.Selected && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None)){
      this.changeBuilderStatus(status)
    }else if(status === Status.None){
      this.changeBuilderStatus(Status.Regular)
    }
  }

  private changeBuilderStatus = (status: Status) => {
    let {id} = this.props;
    builderAppSync.publishWidgetsStatePropChange({
      widgetId: id,
      propKey: 'builderStatus',
      value: status
    });
  }

  onItemStyleChanged = (style: ItemStyle, updatedAppConfig = undefined) => {
    // if(this.props.appMode === AppMode.Run) return;
    let {appConfig, id, browserSizeMode} = this.props;
    if(updatedAppConfig){
      appConfig = updatedAppConfig;
    }
    const wJson = appConfig.widgets[id];

    // remove all widgets
    const willRemoveLayoutInfos = [];
    Object.keys(wJson.layouts).forEach(key => {
      const devices = wJson.layouts[key];
      Object.keys(devices).forEach(device => {
        const embedLayoutJson = appConfig.layouts[devices[device]]
        if(embedLayoutJson.content){
          Object.keys(embedLayoutJson.content).forEach(key => {
            let layoutEle = embedLayoutJson.content[key];
            willRemoveLayoutInfos.push({layoutId: embedLayoutJson.id, layoutItemId: layoutEle.id});
          })
        }
      })
      
    })
    
    // add new widgets in item style
    let embedLayoutJson = appConfig.layouts[utils.findLayoutId(wJson.layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode)];
    if(!embedLayoutJson.content){
      embedLayoutJson = embedLayoutJson.set('content', {});
    }
    let styleTemp = AllStyles[style];
    if(styleTemp && styleTemp.layouts && styleTemp.layouts[Status.Regular]){
      styleTemp = styleTemp.set('style', style);
      styleTemp = styleTemp.setIn(['config', 'isItemStyleConfirm'], false);
      if(styleTemp.widgets && Object.keys(styleTemp.widgets).length > 0){
        this.loadTemplateWidgets(styleTemp, appConfig, willRemoveLayoutInfos);
      }else {
        this.parseTemplate(styleTemp, appConfig, willRemoveLayoutInfos);
      }
    }else {
      willRemoveLayoutInfos.forEach((layoutInfo) => {
        appConfig = getAppConfigAction(appConfig).removeLayoutItem(layoutInfo, true, true).appConfig;
      })

      // Object.keys(layouts).forEach(name => {
      //   const sizeL = layouts[name];
      //   Object.keys(sizeL).forEach(device => {
      //     const lJson = appConfig.layouts[sizeL[device]];
      //     appConfig = appConfig.setIn(['layouts', sizeL[device]], lJson.without('type'));
      //   })
      // })
      
      this._onItemStyleChange(appConfig, style, styleTemp);
    }
  }
  
  componentDidUpdate(preProps){
    const {useDataSources} = this.props;
    if(useDataSources !== preProps.useDataSources){
      if(!useDataSources || useDataSources.length < 1 || !preProps.useDataSource || preProps.useDataSource.length < 1 || 
          preProps.useDataSource[0].dataSourceId !== useDataSources[0].dataSourceId){
        this.onPropertyChange('sortFields', undefined);
      }
    }
  }

  loadTemplateWidgets = (templateJson: ImmutableObject<any>, appConfig: IMAppConfig, willRemoveLayoutInfos) => {
    let widgetLength = Object.keys(templateJson.widgets).length;
    const widgetIds = this.getUniqueIds(appConfig, 'widget', widgetLength);
    const appConfigAction = getAppConfigAction();
    templateJson.widgets && Object.keys(templateJson.widgets).forEach(wId => {
      WidgetManager.getInstance().handleNewWidgetJson(templateJson.widgets[wId].asMutable()).then((widgetJson) => {
        widgetJson.id = widgetIds[widgetIds.length - widgetLength];
        const widgetJsonLayouts = widgetJson.layouts;
        appConfigAction.createWidget(Immutable(widgetJson));
        let imWJson = appConfigAction.appConfig.widgets[widgetJson.id];
        imWJson.layouts && widgetJsonLayouts && Object.keys(imWJson.layouts).forEach(name => {
          const sizeLayouts = widgetJsonLayouts[name];
          if(sizeLayouts && Object.keys(sizeLayouts).length > 0){
            //delete created layout
            Object.keys(imWJson.layouts[name]).forEach(device => {
              const lId = imWJson.layouts[name][device];
              appConfigAction.appConfig = appConfigAction.appConfig.set('layouts', appConfigAction.appConfig.layouts.without(lId));
            })
            imWJson = imWJson.setIn(['layouts', name], sizeLayouts);
          }
        })
        templateJson = templateJson.setIn(['widgets', wId], imWJson);

        widgetLength --;
        if(widgetLength === 0){
          this.parseTemplate(templateJson, appConfigAction.appConfig, willRemoveLayoutInfos);
        }
      })
    })
  }

  parseTemplate = (templateJson: ImmutableObject<any>, appConfig: IMAppConfig, willRemoveLayoutInfos) => {

    const length = Object.keys(templateJson.allLayouts).length;
    const ids = this.getUniqueIds(appConfig, 'layout', length);
    Object.keys(templateJson.allLayouts).forEach((lId, index) => {
      const lJson = templateJson.allLayouts[lId];
      templateJson = templateJson.setIn(['allLayouts', lId], lJson.set('id', ids[index]));
    })
    if(templateJson.widgets && Object.keys(templateJson.widgets).length > 0){
      Object.keys(templateJson.widgets).forEach((wId) => {
        const wJson = templateJson.widgets[wId];
        wJson.layouts && Object.keys(wJson.layouts).forEach(name => {
          wJson.layouts[name] && Object.keys(wJson.layouts[name]).forEach(device => {
            const lId = wJson.layouts[name][device];
            templateJson = templateJson.setIn(['widgets', wId, 'layouts', name, device], templateJson.allLayouts[lId].id);
          })
        })
      })
    }

    if(templateJson.views && Object.keys(templateJson.views).length > 0){
      const length = Object.keys(templateJson.views).length;
      const ids = this.getUniqueIds(appConfig, 'view', length);
      const labels = this.getUniqueLabels(appConfig, 'view', length);
      Object.keys(templateJson.views).forEach((vId, index) => {
        let vJson = templateJson.views[vId];
        templateJson = templateJson.setIn(['views', vId], vJson.set('id', ids[index]).set('label', labels[index]));
        vJson.layout && Object.keys(vJson.layout).forEach(device => {
          const lId = vJson.layout[device];
          templateJson = templateJson.setIn(['views', vId, 'layout', device], templateJson.allLayouts[lId].id);
        })
      })
    }

    if(templateJson.sections && Object.keys(templateJson.sections).length > 0){
      const length = Object.keys(templateJson.sections).length;
      const ids = this.getUniqueIds(appConfig, 'section', length);
      const labels = this.getUniqueLabels(appConfig, 'section', length);
      Object.keys(templateJson.sections).forEach((sId, index) => {
        const sJson = templateJson.sections[sId];
        templateJson = templateJson.setIn(['sections', sId], sJson.set('id', ids[index]).set('label', labels[index]));
        sJson.views && sJson.views.forEach((vId, index) => {
          templateJson = templateJson.setIn(['sections', sId, 'views', index], templateJson.views[vId].id);
        })
      })
    }

    Object.keys(templateJson.allLayouts).forEach((lId) => {
      const lJson = templateJson.allLayouts[lId];
      lJson.content && Object.keys(lJson.content).forEach(lEId => {
        let lEle = lJson.content[lEId].set('id', lEId);
        if(lEle.layoutId){
          lEle = lEle.set('layoutId', lJson.id);
        }
        if(lEle.type === LayoutItemType.Section){
          lEle = lEle.set('sectionId', templateJson.sections[lEle.sectionId].id);
        }else if(lEle.type === LayoutItemType.Widget){
          lEle = lEle.set('widgetId', templateJson.widgets[lEle.widgetId].id);
        }else {
          if(lEle.setting && lEle.setting.layouts){
            Object.keys(lEle.setting.layouts).forEach(device => {
              const lId = lEle.setting.layouts[device];
              lEle = lEle.setIn(['setting', 'layouts', device], templateJson.allLayouts[lId].id);
            })
          }
        }
        templateJson = templateJson.setIn(['allLayouts', lId, 'content', lEId], lEle);
      })

    })

    //remove old contents
    willRemoveLayoutInfos.forEach((layoutInfo) => {
      appConfig = getAppConfigAction(appConfig).removeLayoutItem(layoutInfo, true, true).appConfig;
    })

    templateJson.widgets && Object.keys(templateJson.widgets).forEach(id => 
      appConfig = appConfig.setIn(['widgets', templateJson.widgets[id].id], templateJson.widgets[id]));
    templateJson.allLayouts && Object.keys(templateJson.allLayouts).forEach(id => 
      appConfig = appConfig.setIn(['layouts', templateJson.allLayouts[id].id], templateJson.allLayouts[id]));
    templateJson.sections && Object.keys(templateJson.sections).forEach(id => 
      appConfig = appConfig.setIn(['sections', templateJson.sections[id].id], templateJson.sections[id]));
    templateJson.views && Object.keys(templateJson.views).forEach(id => 
      appConfig = appConfig.setIn(['views', templateJson.views[id].id], templateJson.views[id]));

    const {id} = this.props;
    const wJson = appConfig.widgets[id];

    Object.keys(templateJson.layouts).forEach(name => {
      if(Object.keys(templateJson.layouts[name]).length < 1){
        templateJson = templateJson.set('layouts', templateJson.layous.without(name));
        return;
      }
      Object.keys(templateJson.layouts[name]).forEach(device => {
        const lId = templateJson.layouts[name][device];
        templateJson = templateJson.setIn(['layouts', name, device], templateJson.allLayouts[lId].id);
        appConfig = appConfig.setIn(['widgets', id, 'layouts', name, device], templateJson.layouts[name][device]);
        const oldLId = wJson.layouts[name][device];
        if (oldLId) {
          appConfig = appConfig.set('layouts', appConfig.layouts.without(oldLId));
        }
      })
    });

    Object.keys(wJson.layouts).forEach(name => {
      wJson.layouts[name] && Object.keys(wJson.layouts[name]).forEach(device => {
        if(templateJson.layouts[name] && templateJson.layouts[name][device])return;
        const config = defaultConfig.merge(templateJson.config);
        let embedLayoutJson = undefined;
        let sizeLayouts = templateJson.layouts[name];
        if(!sizeLayouts){
          const layoutKeys = Object.keys(templateJson.layouts);
          sizeLayouts = templateJson.layouts[layoutKeys[layoutKeys.length - 1]];
        }
        const length = Object.keys(sizeLayouts).length;
        embedLayoutJson = appConfig.layouts[sizeLayouts[Object.keys(sizeLayouts)[length - 1]]]

        if(!embedLayoutJson){
          return;
        }
        if(!embedLayoutJson.content){
          embedLayoutJson = embedLayoutJson.set('content', {});
        }
        const desLayoutId = wJson.layouts[name][device]
        appConfig = appConfig.setIn(['layouts', desLayoutId, 'type'], embedLayoutJson.type);
        if(name === Status.Selected ){
          if(config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None){
            //reference to 
            appConfig = getAppConfigAction(appConfig).duplicateLayoutToLayout(embedLayoutJson.id, desLayoutId, false).appConfig;
          }
        }else if(name === Status.Hover){
          if(config.cardConfigs[Status.Hover].enable){
            appConfig = getAppConfigAction(appConfig).duplicateLayoutToLayout(embedLayoutJson.id, desLayoutId, false).appConfig;
          }
        }else {
          appConfig = getAppConfigAction(appConfig).duplicateLayoutToLayout(embedLayoutJson.id, desLayoutId, false).appConfig;
        }
      })
    })

    this._onItemStyleChange(appConfig, templateJson.style, templateJson);
  }

  getUniqueIds = (appConfig: IMAppConfig, type: 'page' | 'layout' | 'widget' | 'section' | 'view', size: Number) : string[] => {
    const ids: string[] = [];
    for(let i = 0; i < size; i ++){
      const id = appConfigUtils.getUniqueId(appConfig, type);
      ids.push(id);
      appConfig = appConfig.setIn([type + 's', id], {id: id} as any);
    }
    return ids;
  }

  getUniqueLabels = (appConfig: IMAppConfig, type: 'page' | 'layout' | 'widget' | 'section' | 'view', size: Number) : string[] => {
    const labels: string[] = [];
    for(let i = 0; i < size; i ++){
      const id = appConfigUtils.getUniqueId(appConfig, type);
      const label = appConfigUtils.getUniqueLabel(appConfig, type, type);
      labels.push(label);
      appConfig = appConfig.setIn([type + 's', id], {id: id, label: label} as any);
    }
    return labels;
  }

  private _onItemStyleChange = (appConfig, style, templateJson) => {
    let {id} = this.props;
    let config = defaultConfig;
    const appConfigAction = getAppConfigAction(appConfig);
    if(templateJson){
      config = config.merge(templateJson.config || {});
    }
    
    const wJson = appConfig.widgets[id];

    //process inherit properties
    if(wJson.useDataSources && wJson.useDataSources.length > 0){
      appConfigAction.editSubWidgetsInheritProperty(wJson.id, 'useDataSources', wJson.useDataSources, 'dataSourceId');
      appConfigAction.editSubWidgetsProperty(wJson.id, 'useDataSourcesEnabled', true);
    }

    config = config.set('itemStyle', style);
    if(!config.isInitialed){
      config = config.set('isInitialed', true);
    }
    appConfigAction.editWidgetProperty(id, 'config', config).exec();
    // selectSelf(this.props);
  }


  setDatasource = (ds: DataSource) => {
    let schema = ds && ds.getSchema();
    this.setState({
      datasource: ds,
      fields: (schema as DataSourceSchema).fields as { [jimuName: string]: FieldSchema }
    });
  }

  getIndexForPickerData(value, data){
    let index = -1;
    data.some((d, i) => {
      if(value === d.value){
        index = i;
        return true;
      }
    })
    return index;
  }

  getSelectModeOptions = (): JSX.Element[] => {
    return [
      <option key={SelectionModeType.Single} value={SelectionModeType.Single}>{this.formatMessage('single')}</option>,
      <option key={SelectionModeType.Multiple} value={SelectionModeType.Multiple}>{this.formatMessage('multiple')}</option>,
    ]
  }

  getAllFields = (): MultiSelectItem[] => {
    const {datasource} = this.state;
    if(datasource){
      const scheme = datasource.getSchema();
      if(scheme && scheme.fields){
        return Object.keys(scheme.fields).map(fieldKey => {
          // return <option key={field} value={field}>{field}</option>
          return {
            value: fieldKey,
            label: scheme.fields[fieldKey].alias || scheme.fields[fieldKey].name
          }
        })
      }
    }
    return []
  }

  getPageStyleOptions = (): JSX.Element[] => {
    return [
      <option key={PageStyle.Scroll} value={PageStyle.Scroll}>{this.formatMessage('scroll')}</option>,
      <option key={PageStyle.MultiPage} value={PageStyle.MultiPage}>{this.formatMessage('multiPage')}</option>
    ]
  }

  onDsCreate = ds => {
    this.setDatasource(ds)
  };

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      &.jimu-widget-list-setting{
        .sort-container {
          margin-top: 12px;
          .sort-multi-select {
            width: 100%;
          }
        }

        .resetting-template {
          cursor: pointer;
          color: ${theme.colors.primary};
        }

        .resetting-template:hover {
          cursor: pointer;
          color: ${theme.colors.primary};
        }
        
        .setting-next {
          width: 38px;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: end;
          font-size: ${polished.rem(13)};
        }

        .card-setting-return {
          cursor: pointer;
        }

        .style-group {
          .style-img {
            cursor: pointer;
            width: 100%;
            height: 70px;
            border: 1px solid ${theme.colors.grays.gray300};
            background-color: ${theme.colors.white};
            &.active {
              border: 2px solid ${theme.colors.primary};
            }
            &.style-img-h {
              width: 108px;
              height: 90px;
            }
            &.style-3 {
              padding: 0 14px;
            }
            &.low {
              height: 36px;
            }
            &.empty {
              height: 40px;
              color: ${theme.colors.grays.gray500};
            }
          }
          .vertical-space {
            height: 10px;
          }

        }
      }
    `
  }

  formatMessage = (id: string, values?: {[key: string]: ReactIntl.MessageValue}) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]}, values)
  }

  render() {
    const {
      config,
      theme,
      showCardSetting
    } = this.props;
    const borderSides = [BorderSides.TL, BorderSides.TR, BorderSides.BR, BorderSides.BL];
    const statusIntl = {}
    statusIntl[Status.Hover] = this.formatMessage('hover');
    statusIntl[Status.Selected] = this.formatMessage('listSelected');
    statusIntl[Status.Regular] = this.formatMessage('regular');

    // console.log(this.props.appConfig);
    return (
    <div className={classNames(`${prefix}list-setting`, `${prefix}setting`)} css={this.getStyle(this.props.theme)} >
      {
        !config.isItemStyleConfirm ? 
        <SettingSection title={this.formatMessage('chooseTemplateTip')}>
          <SettingRow>
            <div className="style-group w-100">
              <div className="d-flex justify-content-between w-100">
                <img className={`style-img style-img-h ${config.itemStyle === ItemStyle.Style0 && 'active'}`}
                  src={require('./assets/style0.svg')} onClick={evt => this.onItemStyleChanged(ItemStyle.Style0)} />
                <img className={`style-img style-img-h ${config.itemStyle === ItemStyle.Style1 && 'active'}`}
                  src={require('./assets/style1.svg')} onClick={evt => this.onItemStyleChanged(ItemStyle.Style1)} />
              </div>
              <div className="vertical-space"/>
              <img className={`style-img ${config.itemStyle === ItemStyle.Style2 && 'active'}`}
                  src={require('./assets/style2.svg')} onClick={evt => this.onItemStyleChanged(ItemStyle.Style2)} />
              <div className="vertical-space"/>
              <img className={`style-img style-3 ${config.itemStyle === ItemStyle.Style3 && 'active'}`}
                  src={require('./assets/style3.svg')} onClick={evt => this.onItemStyleChanged(ItemStyle.Style3)} />
              <div className="vertical-space"/>
              <img className={`style-img low ${config.itemStyle === ItemStyle.Style4 && 'active'}`}
                  src={require('./assets/style4.svg')} onClick={evt => this.onItemStyleChanged(ItemStyle.Style4)} />
              <div className="vertical-space"/>
              <div className={`style-img empty d-flex justify-content-center align-items-center ${config.itemStyle === ItemStyle.Style5 && 'active'}`}
                   onClick={evt => this.onItemStyleChanged(ItemStyle.Style5)} >
                {this.formatMessage('emptyTemplate')}
              </div>
            </div>
          </SettingRow>
          <SettingRow >
            <Button color="primary" className="w-100" onClick={evt => this.onPropertyChange('isItemStyleConfirm', true)} >{this.formatMessage('start')}</Button>
          </SettingRow>
        </SettingSection> :
        <Fragment>
          { (showCardSetting === Status.None) &&
            <div className="list-list-setting">
              <SettingSection >
                {/* <SettingRow label={'export style'}>
                  <Button color="primary" onClick={this.onExportClick} >Test</Button>
                </SettingRow> */}
                <SettingRow flow="wrap">
                  <span>{this.formatMessage('listUseGuide')} 
                    <a className="resetting-template" onClick={evt => this.onPropertyChange('isItemStyleConfirm', false)} >{this.formatMessage('resettingTheTemplate')}</a>
                  </span>
                  
                </SettingRow>
                <SettingRow flow="wrap">
                  <DataSourceChooser
                    types={Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery])}
                    selectedDataSourceIds={Immutable((this.props.useDataSources && this.props.useDataSources[0]) ? [this.props.useDataSources[0].dataSourceId] : [])}
                    widgetId={this.props.id} mustUseDataSource={true}/>
                </SettingRow>
                <SettingRow label={this.formatMessage('maxItems')} flow="no-wrap" >
                  <MyInput
                    title={this.formatMessage('zeroHint')}
                    style={{width: '25%'}}
                    value={config.maxItems + ''}
                    type="number"
                    onChange={value => 
                    {
                      if(!value || value === ''){
                        value = '0';
                      }
                      let valueInt = parseInt(value);
                      if(valueInt < 0)valueInt = 0;
                      this.onPropertyChange('maxItems', valueInt) 
                    }
                    }
                  />
                </SettingRow>
                {/* <SettingRow label={this.formatMessage('itemPerPage')}>
                  <Input value={config.itemsPerPage} type="number" min="1"
                    onChange={(event) => { this.onPropertyChange('itemPerPage', parseInt(event.target.value)); }}
                  />
                </SettingRow> */}
                <SettingRow label={this.formatMessage('direction')}>
                  <ButtonGroup size="sm" >
                    {
                      directions.map((data, i) => {
                        return <Button key={i} icon active={config.direction === data.value} color="secondary" outline
                          onClick={evt => this.onPropertyChange('direction', data.value)} ><Icon size={12} icon={data.icon} /></Button>
                      })
                    }
                  </ButtonGroup>
                </SettingRow>
                {/* <SettingRow label={config.direction === DirectionType.Vertical ? this.formatMessage('horizontalAlignment') : this.formatMessage('verticalAlignment')}>
                  <ButtonGroup size="sm" >
                    {
                      getAlignTypes(config.direction).map((data, i) => {
                        return <Button key={i} icon active={config.alignType === data.value} color="secondary"
                          onClick={evt => this.onPropertyChange('alignType', data.value)} ><Icon size={12} icon={data.icon} /></Button>
                      })
                    }
                  </ButtonGroup>
                </SettingRow> */}
                <SettingRow label={(config.direction === DirectionType.Vertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}>
                  <div className="d-flex justify-content-between w-100">
                    <Slider
                      style={{width: '60%'}}
                      onChange={e => this.onPropertyChange('space',  parseInt(e.target.value))}
                      value={config.space}
                      title="0-50"
                      bsSize="sm"
                      min="0"
                      max="50"
                    />
                    <Input
                      style={{width: '25%'}}
                      value={config.space + ''}
                      type="number"
                      min="0"
                      max="50"
                      title="0-50"
                      onChange={evt => {
                        let value = evt.target.value;
                        if(!value || value === '') return;
                        value = parseInt(evt.target.value);
                        if(value < 0){value = 0}
                        if(value > 50){value = 50}
                        this.onPropertyChange('space', value)
                      } 
                      }
                    />
                    
                  </div>
                </SettingRow>
                {/* <SettingRow label={this.formatMessage('pagingStyle')}>
                  <Input type="select" value={config.pageStyle}
                    onChange={(e) => { this.onPropertyChange('pageStyle', e.target.value) }}>
                    {
                      this.getPageStyleOptions()
                    }
                  </Input>
                </SettingRow>
                <SettingRow label={this.formatMessage('pageTransition')}>
                  <MyPicker
                    theme={theme}
                    onSelected={(value, index) => {this.onPropertyChange('pageTransition', value)}}
                    selectedIndex={this.getIndexForPickerData(config.pageTransition, pageTransitions)}
                    useImg={true}
                    itemSize={{
                      width: 70,
                      height: 60
                    }}
                    gap={8}
                    type={StyleType.List}
                    itemActiveStyle={
                      css`
                        border: 2px solid ${theme.colors.primary};
                      `
                    }
                    dataSource={
                      pageTransitions
                    } />
                </SettingRow> */}
    
              </SettingSection>
              
              <SettingSection title={this.formatMessage('item')}>
                <SettingRow label={this.formatMessage('regular')}>
                  <div className="setting-next"  onClick={evt => this.onOpenCardSetting(evt, Status.Regular)}>
                    <Icon className="sm" size={12} icon={require('jimu-ui/lib/icons/arrow-right-12.svg')}/>
                  </div>
                </SettingRow>
                <SettingRow label={this.formatMessage('hover')}>
                  <div className="setting-next d-flex" onClick={evt => this.onOpenCardSetting(evt, Status.Hover)}>
                    <div>{config.cardConfigs[Status.Hover].enable ? this.formatMessage('on') : this.formatMessage('off')}</div>
                    <Icon className="sm" size={12} icon={require('jimu-ui/lib/icons/arrow-right-12.svg')}/>
                  </div>
                </SettingRow>
                <SettingRow label={this.formatMessage('listSelected')}>
                  <div className="setting-next d-flex" onClick={evt => this.onOpenCardSetting(evt, Status.Selected)}>
                    <div>{config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None ? this.formatMessage('on') : this.formatMessage('off')}</div>
                    <Icon className="sm" size={12} icon={require('jimu-ui/lib/icons/arrow-right-12.svg')}/>
                  </div>
                </SettingRow>
              </SettingSection>
              {this.state.datasource &&
                <SettingSection title={this.formatMessage('tools')}>
                  {/* <SettingRow label={this.formatMessage('search')}>
                    <div className="d-flex">
                        <Switch />
                    </div>
                  </SettingRow>
                  <SettingRow label={this.formatMessage('filter')}>
                    <div className="d-flex">
                        <Switch />
                    </div>
                  </SettingRow> */}
                  <SettingRow label={this.formatMessage('order')}>
                    <div className="d-flex">
                        <Switch 
                          checked={config.sortOpen}
                          onChange={evt => this.onPropertyChange('sortOpen', !config.sortOpen)}
                        />
                    </div>
                  </SettingRow>
                  {config.sortOpen &&
                    <SettingRow label={this.formatMessage('chooseSortingFields')}>
                      <div className="d-flex w-100 sort-container">
                        <MultiSelect 
                          items={Immutable(this.getAllFields())}
                          values={config.sortFields && Immutable(config.sortFields.split(','))}
                          theme={theme} 
                          className="sort-multi-select"
                          placeHolder={this.formatMessage('selectSortFields')}
                          onClickItem={(e, value, values) => this.onPropertyChange('sortFields', values.join(','))}
                          showValues={(values) => {
                            return this.formatMessage('sortSelected', {selectedCount: values.length})
                          }} />
                        {/* <Input className="w-100" type="select" value={config.sortFields}
                            onChange={(e) => { this.onPropertyChange('sortFields', e.target.value) }}>
                            {
                              this.getAllFields()
                            }
                        </Input> */}
                      </div>
                    </SettingRow>
                  }
                </SettingSection>
              }
              
            </div>
          }
          {showCardSetting !== Status.None &&
            <div className="list-card-setting">
              <SettingSection >
                <SettingRow>
                  <Button text color="dark" onClick={this.onCardSettingReturnBackClick} >
                    <Icon className="sm" size={14} icon={require('jimu-ui/lib/icons/arrow-left-14.svg')}/>
                    <div>{statusIntl[showCardSetting]}</div>
                  </Button>
                </SettingRow>
              </SettingSection>
    
              <SettingSection >
                {showCardSetting !== Status.Regular &&
                  <SettingRow label={`Enable ${showCardSetting.toLowerCase()}`}>
                    <Switch
                      checked={showCardSetting === Status.Hover ? config.cardConfigs[Status.Hover].enable : config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None}
                      onChange={showCardSetting === Status.Hover ? this.onHoverLayoutOpenChange : this.onSelectionSwitch}/>
                  </SettingRow>
                }
                {(showCardSetting === Status.Regular ||
                  (showCardSetting === Status.Selected && config.cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) ||
                  (showCardSetting === Status.Hover && config.cardConfigs[Status.Hover].enable)) &&
                  <Fragment>
                    {showCardSetting === Status.Selected &&
                      <SettingRow label={this.formatMessage('selectMode')}>
                        <Input type="select" value={config.cardConfigs[Status.Selected].selectionMode}
                          onChange={(e) => { this.onSelectionModeChange(e.target.value) }}>
                          {
                            this.getSelectModeOptions()
                          }
                        </Input>
                        
                      </SettingRow>
                    }
                    <SettingRow label="Background">
                      <BackgroundSetting
                        background={config.cardConfigs[showCardSetting].backgroundStyle.background}
                        onChange={value => this.onBackgroundStyleChange(showCardSetting, 'background', value)} />
                    </SettingRow>
                    <SettingRow label="Border" flow="wrap">
                      <BorderSetting value={config.cardConfigs[showCardSetting].backgroundStyle.border}
                        onChange={value => this.onBackgroundStyleChange(showCardSetting, 'border', value)} />
                    </SettingRow>
                    <SettingRow label="Border radius" flow="wrap">
                      <FourSides sides={borderSides}
                        value={config.cardConfigs[showCardSetting].backgroundStyle.borderRadius}
                        onChange={value => this.onBackgroundStyleChange(showCardSetting, 'borderRadius', value)}
                      />
                    </SettingRow>
                    {/* <SettingRow label="Box shadow" flow="wrap">
                      <BoxShadowSetting
                        value={config.cardConfigs[showCardSetting].backgroundStyle.boxShadow}
                        onChange={value => this.onBackgroundStyleChange(showCardSetting, 'boxShadow', value)} />
                    </SettingRow> */}
                  </Fragment>
                }
              </SettingSection>
            </div>
          }
        </Fragment>
        
      }
      
      {this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0] &&
        <div className="waiting-for-database">
          <AppDataSourceComponent useDataSource={this.props.useDataSources[0]} onDataSourceCreated={this.onDsCreate}/>
        </div>
      }
    </div>);
  }
}