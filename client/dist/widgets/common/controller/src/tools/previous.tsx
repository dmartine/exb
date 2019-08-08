import { extensionSpec, React, getAppStore, LayoutContextToolProps } from 'jimu-core';

export default class Previous implements extensionSpec.ContextTool {
  index = 1;
  id = 'controller-roll-list-previous';
  widgetId: string;

  classes: { [widgetId: string]: React.ComponentClass<{}> } = {};

  visible(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    return widgetState && widgetState.showArrow;
  }

  disabled(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    return widgetState && widgetState.disablePrevious;
  }

  getGroupId() {
    return null;
  }

  getTitle() {
    return 'Previous';
  }

  getIcon() {
    return require('jimu-ui/lib/icons/arrow-left-14.svg');
  }

  onClick(props: LayoutContextToolProps) {
    const widgetState = getAppStore().getState().widgetsState[props.layoutItem.widgetId];
    if (widgetState && widgetState.onArrowClick) {
      widgetState.onArrowClick(true, false);
    }
  }
  getSettingPanel(props: LayoutContextToolProps): React.ComponentClass<{}> {
    return null;
  }
}




