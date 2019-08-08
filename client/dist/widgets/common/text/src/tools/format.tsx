import { extensionSpec, React, getAppStore, appActions, LayoutContextToolProps } from 'jimu-core';

export default class TextTool implements extensionSpec.ContextTool {
  index = 1;
  id = 'text-format';
  widgetId: string;

  getGroupId() {
    return null;
  }

  getTitle() {
    return 'Text format';
  }

  getIcon() {
    return require('jimu-ui/lib/icons/tool-text.svg');
  }

  checked(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    const checked = widgetState && widgetState.showFormats;
    return !!checked;
  }

  onClick(props: LayoutContextToolProps) {
    const widgetId = props.layoutItem.widgetId;
    const widgetState = getAppStore().getState().widgetsState[widgetId];

    let showFormats = widgetState && widgetState.showFormats;
    showFormats = !showFormats;
    if (showFormats) {
      getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showExpression', false));
      if (!getAppStore().getState().widgetsRuntimeInfo[widgetId].isInlineEditing) {
        getAppStore().dispatch(appActions.setWidgetIsInlineEditingState(widgetId, true));
      }
    }

    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showFormats', showFormats));

  }

  getSettingPanel(): React.ComponentClass<{}> {
    return null;
  }
}




