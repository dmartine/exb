import { React, ReactRedux, LayoutInfo, IMState, IMRuntimeInfo,
  IMLayoutItemJson, ErrorBoundary, LayoutType } from 'jimu-core';
import {findContainerWidgetId, layoutUtils} from 'jimu-layouts/common';
import {FixedLayoutItemSetting, FlowLayoutItemSetting} from 'jimu-layouts/layout-builder';
import {WidgetSettingManager} from 'jimu-for-builder';

interface OwnProps {
  layoutId: string;
  layoutItemId: string;
  formatMessage: (id: string) => string;
  onSettingChanged: (layoutInfo: LayoutInfo, setting) => void;
  onPosChanged: (layoutInfo: LayoutInfo, pos) => void;
}

interface StateToProps {
  layoutItem: IMLayoutItemJson
  containerWidgetId: string,
  hasLayoutSetting?: boolean,
  runtimeInfo?: IMRuntimeInfo,
  layoutType?: LayoutType,
  dispatch?: any
}

class LayoutItemSetting extends React.PureComponent<OwnProps & StateToProps> {

  componentDidUpdate(){
    this.loadItemSettingClass();
  }

  componentDidMount(){
    this.loadItemSettingClass();
  }

  loadItemSettingClass(){
    const {containerWidgetId, hasLayoutSetting} = this.props;

    if(!containerWidgetId || !hasLayoutSetting){
      return;
    }

    !WidgetSettingManager.getInstance().getItemSettingClass(containerWidgetId) &&
      WidgetSettingManager.getInstance().loadItemSettingClass(containerWidgetId);
  }

  renderItemSetting = () => {
    let SettingClass = null;
    if (this.props.layoutType === LayoutType.FixedLayout) {
      SettingClass = FixedLayoutItemSetting;
    } else if (this.props.layoutType === LayoutType.FlowLayout) {
      SettingClass = FlowLayoutItemSetting;
    } else {
      let { containerWidgetId, hasLayoutSetting } = this.props;
      if (hasLayoutSetting) {
        SettingClass = this.props.runtimeInfo && this.props.runtimeInfo.isItemClassLoaded ?
          WidgetSettingManager.getInstance().getItemSettingClass(containerWidgetId) : null;
      }
    }
    if (!SettingClass) {
      return null;
    }

    return SettingClass ?
      <ErrorBoundary>
        <SettingClass layoutId={this.props.layoutId} layoutItem={this.props.layoutItem}
        onSettingChange={this.props.onSettingChanged}
        onPosChange={this.props.onPosChanged} formatMessage={this.props.formatMessage}/>
      </ErrorBoundary>
       : <div>Loading...</div>
  };

  render(){
    return <div className="setting-container h-100">
      {this.renderItemSetting()}
    </div>;
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps): StateToProps => {
  const {layoutId, layoutItemId} = ownProps;
  const layouts = state.appStateInBuilder.appConfig.layouts;

  const layout = layouts[layoutId];
  if (!layout) {
    return null;
  }
  const layoutItem = layoutUtils.findLayoutItem(state.appStateInBuilder.appConfig, {
    layoutId,
    layoutItemId
  });

  const containerWidgetId = findContainerWidgetId(state.appStateInBuilder.appConfig, layoutId);
  let hasLayoutSetting = false;
  if (containerWidgetId) {
    const widgetJson = state.appStateInBuilder.appConfig.widgets[containerWidgetId];
    hasLayoutSetting = widgetJson.manifest && widgetJson.manifest.properties &&
      widgetJson.manifest.properties.hasLayoutItemSettingPage;
  }

  return {
    layoutType: layout.type,
    layoutItem: layoutItem as IMLayoutItemJson,
    containerWidgetId,
    hasLayoutSetting,
    runtimeInfo: state.builder.widgetsSettingRuntimeInfo[containerWidgetId]
  }
};

//connect<IMapStateToProps, IMapDispatchToProps, ICompProps, IReduxState>(mapStateToProps, mapDispatchToProps)
export default ReactRedux.connect<StateToProps, {}, OwnProps>(mapStateToProps)(LayoutItemSetting);