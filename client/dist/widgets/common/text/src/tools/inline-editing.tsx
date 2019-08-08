import { extensionSpec, React, getAppStore, appActions, LayoutContextToolProps } from 'jimu-core';

export default class TextTool implements extensionSpec.ContextTool {
  index = 0;
  id = 'inline-editing';
  widgetId: string;

  getGroupId() {
    return null;
  }

  getTitle() {
    return 'Edit';
  }

  getIcon() {
    return require('jimu-ui/lib/icons/tool-edit.svg');
  }

  checked(props: LayoutContextToolProps) {
    const widgetId = props.layoutItem.widgetId;
    const widgetsRuntimeInfo = getAppStore().getState().widgetsRuntimeInfo;
    const checked = widgetsRuntimeInfo[widgetId] && widgetsRuntimeInfo[widgetId].isInlineEditing;
    return !!checked;
  }

  onClick(props: LayoutContextToolProps) {
    const widgetId = props.layoutItem.widgetId;
    const widgetsRuntimeInfo = getAppStore().getState().widgetsRuntimeInfo;
    const isInlineEditing = widgetsRuntimeInfo[widgetId] && widgetsRuntimeInfo[widgetId].isInlineEditing;
    getAppStore().dispatch(appActions.setWidgetIsInlineEditingState(widgetId, !isInlineEditing));
    if (isInlineEditing) {
      getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showExpression', false));
      getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showFormats', false));
    }
  }

  getSettingPanel(): React.ComponentClass<{}> {
    return null;
  }
}




