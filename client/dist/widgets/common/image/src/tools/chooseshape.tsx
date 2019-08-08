/** @jsx jsx */
import { extensionSpec, React, ReactRedux, moduleLoader, LayoutContextToolProps, IMState, getAppStore,
  IMAppConfig, IMUrlParameters, ThemeVariables, css, jsx, themeUtils, Immutable, classNames } from 'jimu-core';
import { Icon } from 'jimu-ui';
import { Config } from '../config'

interface Props {
  id: string;
  appConfig: IMAppConfig,
  queryObject?: IMUrlParameters;
  theme: ThemeVariables;
  widgetConfig: Config;
}

class _ChooseShape extends React.PureComponent<Props>{

  cropShapeList = ['rectangle', 'circle', 'hexagon', 'oval', 'pentagon', 'rhombus', 'triangle'];

  getStyle() {
    let theme = this.props.theme;

    return css`
      .widget-image-chooseshape-item {
      }

      .widget-image-chooseshape-item:hover {
        cursor: 'pointer';
        background-color: ${theme.colors.grays.gray300};
      }

      .chooseshape-item-selected {
        background-color: ${theme.colors.grays.gray300};
      }
      `;
  }

  shapeClick = (e, index) => {
    if (this.props.widgetConfig.functionConfig.imageParam && this.props.widgetConfig.functionConfig.imageParam.cropParam
       && this.props.widgetConfig.functionConfig.imageParam.cropParam.cropShape === this.cropShapeList[index]) {
      let appConfigAction = moduleLoader.getAppInBuilderModules().getAppConfigAction();
      let widgetConfig = Immutable(this.props.widgetConfig);
      let cropParam = Immutable(widgetConfig.functionConfig.imageParam.cropParam);
      if (!cropParam) {
        cropParam = Immutable({});
      }
      cropParam = cropParam.set('svgViewBox', null);
      cropParam = cropParam.set('svgPath', null);
      cropParam = cropParam.set('cropShape', null);
      widgetConfig = widgetConfig.setIn(['functionConfig', 'imageParam', 'cropParam'], cropParam);
      appConfigAction.editWidgetConfig(this.props.id, widgetConfig).exec();
      return;
    }

    var svgItem = e.currentTarget.getElementsByTagName('svg') && e.currentTarget.getElementsByTagName('svg')[0];
    if (svgItem) {
      let appConfigAction = moduleLoader.getAppInBuilderModules().getAppConfigAction();
      let widgetConfig = Immutable(this.props.widgetConfig);
      let cropParam = Immutable(widgetConfig.functionConfig.imageParam ? widgetConfig.functionConfig.imageParam.cropParam : null);
      if (!cropParam) {
        cropParam = Immutable({});
      }
      cropParam = cropParam.set('svgViewBox', svgItem.getAttribute('viewBox'));
      cropParam = cropParam.set('svgPath', svgItem.getElementsByTagName('path')[0].getAttribute('d'));
      cropParam = cropParam.set('cropShape', this.cropShapeList[index]);
      widgetConfig = widgetConfig.setIn(['functionConfig', 'imageParam', 'cropParam'], cropParam);
      appConfigAction.editWidgetConfig(this.props.id, widgetConfig).exec();
    }
  }

  render() {
    return <div style={{width: '50px'}} css={this.getStyle()}>
      {this.cropShapeList.map((item, index) => {
        let iconComponent = require(`jimu-ui/lib/icons/imagecrops/${item}.svg`);
        
        return <div key={index} className={classNames('w-100 d-flex justify-content-center align-items-center widget-image-chooseshape-item',
          {'chooseshape-item-selected': (this.props.widgetConfig.functionConfig.imageParam && this.props.widgetConfig.functionConfig.imageParam.cropParam 
            && this.props.widgetConfig.functionConfig.imageParam.cropParam.cropShape === item)})}
          style={{height: '40px'}} onClick={(e) => this.shapeClick(e, index)}><Icon icon={iconComponent}/></div>;
      })}
    </div>
  }
}

const ChooseShape = themeUtils.withTheme(_ChooseShape);

export default class CropTool implements extensionSpec.ContextTool {
  index = 0;
  id = 'choose-shape';
  widgetId: string;

  classes: { [widgetId: string]: React.ComponentClass<{}> } = {};

  getGroupId() {
    return null;
  }

  getTitle() {
    return 'Shape';
  }

  getIcon() {
    return require(`jimu-ui/lib/icons/choose-shape.svg`);
  }

  onClick(props: LayoutContextToolProps) {
    return null;
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
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  getSettingPanel(props: LayoutContextToolProps): React.ComponentClass<{}> {
    const widgetId = props.layoutItem.widgetId;
    if (this.classes[widgetId]) {
      return this.classes[widgetId];
    }

    const mapStateToProps = (state: IMState) => {
      let widgetConfig = Immutable(state.appConfig.widgets[widgetId].config) as any;

      return {
        id: widgetId,
        theme: state.theme,
        appConfig: state.appConfig,
        queryObject: state.queryObject,
        widgetConfig: widgetConfig
      } as Props;
    }
    this.classes[widgetId] = ReactRedux.connect(mapStateToProps)(ChooseShape)
    return this.classes[widgetId];
  }
}