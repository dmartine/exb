import {IMRuntimeInfos, React, IMDataSourceJson, ReactRedux, ErrorBoundary, IMWidgetJson, IMState} from 'jimu-core';
import {WidgetSettingManager, getAppConfigAction, SettingOptions} from 'jimu-for-builder';

interface Props{
  widgetsSettingRuntimeInfo: IMRuntimeInfos;
  widgetId: string;
  dispatch: any,
  formatMessage: (id: string) => string
}
interface StateProps{
  widgetJson: IMWidgetJson
}
export class _WidgetSetting extends React.PureComponent<Props & StateProps>{
  constructor(props){
    super(props);
  }

  componentDidUpdate(){
    this.loadWidgetSettingClass();
  }

  componentDidMount(){
    this.loadWidgetSettingClass();
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  loadWidgetSettingClass(){
    let {widgetId} = this.props;

    if(!widgetId){
      return;
    }
    
    !WidgetSettingManager.getInstance().getWidgetSettingClass(widgetId) && WidgetSettingManager.getInstance().loadWidgetSettingClass(widgetId);
  }

  onSettingChange = (settingOption: SettingOptions) => {
    let widgetJson = this.props.widgetJson;

    let appConfigAction = getAppConfigAction();

    //delete properties
    Object.keys(settingOption).forEach(k => {
      if(settingOption[k] === null){
        if(k === 'outputDataSourcesJson'){
          if(widgetJson.outputDataSources){
            widgetJson.outputDataSources.forEach(dsId => appConfigAction.removeDataSource(dsId));
          }
          widgetJson = widgetJson.without('outputDataSources');
        }else{
          widgetJson = widgetJson.without(k as any);
        }
        
        delete settingOption[k];
      }
    });
    
    let outputDataSourceIds;
    
    if(settingOption.outputDataSourcesJson){
      settingOption.outputDataSourcesJson.forEach((ds: IMDataSourceJson) => {
        ds = ds.set('isOutputFromWidget', true);
        appConfigAction.addDataSource(ds);
      });

      outputDataSourceIds = settingOption.outputDataSourcesJson.map(ds => ds.id);
    }

    delete settingOption.outputDataSourcesJson;
    delete settingOption.widgetId;

    widgetJson = widgetJson.merge(settingOption);
    if(outputDataSourceIds){
      widgetJson = widgetJson.merge({outputDataSources: outputDataSourceIds});
    }
    
    appConfigAction.editWidget(widgetJson).exec();
  }


  renderWidgetSetting = (widgetId: string) => {
    let SettingClass = this.props.widgetsSettingRuntimeInfo[widgetId] && this.props.widgetsSettingRuntimeInfo[widgetId].isClassLoaded ?
      WidgetSettingManager.getInstance().getWidgetSettingClass(widgetId) : null;
    return SettingClass ? 
      <ErrorBoundary>
        <SettingClass onSettingChange={this.onSettingChange}/>
      </ErrorBoundary>
       : <div>{this.formatMessage('dynamicLoading')}...</div>
  };

  render(){
    if(!this.props.widgetJson){
      return <div>{this.formatMessage('dynamicLoading')}...</div>;
    }
    let {widgetId} = this.props;
    return <div className="setting-container h-100">
      {widgetId ? this.renderWidgetSetting(widgetId) : <div>&nbsp;&nbsp;{this.formatMessage('noWidget')}</div>}
    </div>;
  }

  // FOR DEMO:
  onToggleMe = () => {
    let rightToggle = document.getElementsByClassName('sidebar_handler_right');
    if(rightToggle) {
      (rightToggle[0] as HTMLElement).click();
    }
  }
  // TODO: REMOVE AFTER DEMO

}

export default ReactRedux.connect((state: IMState, ownProps: Props) => {
  return {
    widgetJson: state.appStateInBuilder && state.appStateInBuilder.appConfig && state.appStateInBuilder.appConfig.widgets[ownProps.widgetId]
  }
})(_WidgetSetting);