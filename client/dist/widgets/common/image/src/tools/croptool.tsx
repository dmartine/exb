import { extensionSpec, React, getAppStore, appActions, LayoutContextToolProps } from 'jimu-core';
import { Config } from '../config';

export default class CropTool implements extensionSpec.ContextTool {
  index = 1;
  id = 'image-croptool';
  widgetId: string;

  classes: { [widgetId: string]: React.ComponentClass<{}> } = {};

  getGroupId() {
    return null;
  }

  getTitle() {
    return 'Crop';
  }

  getIcon() {
    return require('jimu-ui/lib/icons/tool-cut.svg');
  }

  onClick(props: LayoutContextToolProps) {
    let widgetInfo = getAppStore().getState().appConfig.widgets[props.layoutItem.widgetId];
    let clientRect: ClientRect = {
      bottom: props.clientRect.bottom,
      height: props.clientRect.height,
      left: window.scrollX + props.clientRect.left,
      right: props.clientRect.right,
      top: window.scrollY + props.clientRect.top,
      width: props.clientRect.width
    };

    getAppStore().dispatch(appActions.widgetMutableStatePropChange(props.layoutItem.widgetId, 'clientRect', clientRect));
    
    if (widgetInfo) {
      let widgetConfig = widgetInfo.config as Config;
      if (widgetConfig.functionConfig.imageParam && widgetConfig.functionConfig.imageParam.url) {
        getAppStore().dispatch(appActions.setWidgetIsInlineEditingState(props.layoutItem.widgetId, true));
      }
    }
  }

  isEmptySource = (config: Config): boolean => {
    if ((!config.functionConfig.imageParam || !config.functionConfig.imageParam.url) && !config.functionConfig.srcExpression) {
      return true;
    } else {
      return false;
    }
  }

  visible(props: LayoutContextToolProps) {
    let widgetInfo = getAppStore().getState().appConfig.widgets[props.layoutItem.widgetId];
    if (widgetInfo) {
      let widgetConfig = widgetInfo.config as Config;
      if (this.isEmptySource(widgetConfig)) {
        return false;
      }

      if (widgetConfig.functionConfig.srcExpression) {
        // the dynamic src from expression can't support crop
        return false;
      } else {
        // the static src can support crop
        return true;
      }
    } else {
      return false;
    }
  }

  getSettingPanel(props: LayoutContextToolProps): React.ComponentClass<{}> {
    return null;
  }
}




