import { extensionSpec, React, appActions, getAppStore, LayoutContextToolProps } from 'jimu-core';
export default class TextTool implements extensionSpec.ContextTool {
  index = 2;
  id = 'text-expression';
  widgetId: string;

  visible(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    const visible = widgetState && widgetState.showExpressionTool;
    return !!visible;
  }

  getGroupId() {
    return null;
  }

  getTitle() {
    return 'Dynamic content';
  }

  checked(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    const checked = widgetState && widgetState.showExpression;
    return !!checked;
  }

  getIcon() {
    return require('jimu-ui/lib/icons/tool-data.svg');
  }

  onClick(props: LayoutContextToolProps) {
    const widgetId = props.layoutItem.widgetId;
    const widgetState = getAppStore().getState().widgetsState[widgetId];

    let showExpression = widgetState && widgetState.showExpression;
    showExpression = !showExpression;

    if (showExpression) {
      getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showFormats', false));
      if (!getAppStore().getState().widgetsRuntimeInfo[widgetId].isInlineEditing) {
        getAppStore().dispatch(appActions.setWidgetIsInlineEditingState(widgetId, true));
      }
    }
    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showExpression', showExpression));
  }

  getSettingPanel(): React.ComponentClass<{}> {
    return null;
  }
}




