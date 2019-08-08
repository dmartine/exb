import { React, IMState, ReactRedux, ImmutableObject, IMWidgetJson, IMRuntimeInfos, WidgetManager, ThemeVariables } from 'jimu-core';
import { MultiplePopper } from './multiple-popper';
import { IMConfig, DisplayType } from '../../../config';
import { Placement, VirtualReference } from 'jimu-ui';


export interface WidgetInfo {
  show?: boolean;
  id: string;
}

interface ExtraProps {
  config: IMConfig,
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>,
  widgetsRuntimeInfo: IMRuntimeInfos;
}

interface OwnProps {
  theme: ThemeVariables;
  position: {
    staring: {
      left: number,
      top: number
    },
    offset: number,
    minSzie: number,
    space: number
  },
  defaultSize: {
    width: number,
    height: number
  }
  widgetId: string,
  activeIconNode?: HTMLElement,
  widgetsInfo: WidgetInfo[],
  placement: Placement,
  container: Element,
  onClose?: (id?: string) => any
}

export class _WidgetRenderer extends React.PureComponent<OwnProps & ExtraProps> {
  wm: WidgetManager;
  position: {
    left: number[],
    top: number[]
  }

  constructor(props) {
    super(props);
    this.wm = WidgetManager.getInstance();
    this.position = {
      left: [this.props.position.staring.left],
      top: [this.props.position.staring.top]
    }
  }

  generatePoppers = () => {
    const { widgetsInfo, activeIconNode, widgets, config: { onlyOpenOne } } = this.props;
    return widgetsInfo.map((wi: WidgetInfo, index: number) => {
      const title = widgets[wi.id].label;
      const show = wi.show;
      const content = this.getWidgetContent(wi.id);
      const style = this.getPopperStyle(wi.id);
      const reference = onlyOpenOne ? activeIconNode : this.getVirtualReference(wi.id, index);
      return {
        id: wi.id,
        popper: {
          show,
          title,
          reference,
          content
        },
        style
      }
    })
  }

  //virtual reference
  getVirtualReference = (widgetId: string, index: number) => {
    const { config: { displayType } } = this.props;
    if (displayType === DisplayType.Stack) {
      return this.getStackReference(index);
    }
    return this.getSideBySideReference(widgetId, index);
  }

  getWidgetContent = (widgetId: string) => {
    let widgetContent;
    const { widgetsRuntimeInfo: wris } = this.props;
    const isClassLoaded = wris[widgetId] && wris[widgetId].isClassLoaded
    if (!isClassLoaded) {
      this.wm.loadWidgetClass(widgetId);
    }
    if (isClassLoaded) {
      let Widget = this.wm.getWidgetClass(widgetId);
      widgetContent = <Widget />
    } else {
      widgetContent = <div>Loading...</div>;
    }
    return widgetContent;
  }

  getPopperStyle = (widgetId: string) => {
    const [width, height] = this.getWidgetDefaultWidthHeight(widgetId);
    return { width, height };
  }

  getWidgetDefaultWidthHeight = (widgetId: string) => {
    const { config: { size = {} }, defaultSize } = this.props;
    let widgetSize = size[widgetId] || defaultSize;

    let { width, height } = widgetSize;

    width = typeof width === 'number' ? width : 300;
    height = typeof height === 'number' ? height : 300;

    return [width, height]
  }

  getStackReference = (index: number) => {
    const { position: { staring, offset, minSzie } } = this.props;

    const position = {
      left: staring.left + offset * index,
      top: staring.top + offset * index,
      right: staring.left + offset * index + minSzie,
      bottom: staring.top + offset * index + minSzie,
      width: minSzie,
      height: minSzie
    }

    return new VirtualReference(position);
  }

  getSideBySideReference = (widgetId: string, index: number) => {
    const { position: { staring, offset, space } } = this.props;

    const maxWidget = document.body.offsetWidth;

    const [w, h] = this.getWidgetDefaultWidthHeight(widgetId);
    if (this.position.left[index] + w > maxWidget) {
      this.position.left[index] = staring.left;
      this.position.top[index] = this.position.top[index] + offset;
    }
    const position = {
      left: this.position.left[index],
      top: this.position.top[index],
      right: this.position.left[index] + w,
      bottom: this.position.top[index],
      width: w,
      height: h
    }
    this.position.left[index + 1] = this.position.left[index] + w + space;
    this.position.top[index + 1] = this.position.top[index];

    return new VirtualReference(position);
  }

  render() {
    const { position, defaultSize, widgetId, activeIconNode, widgetsInfo, ...others } = this.props;
    return <MultiplePopper poppers={this.generatePoppers()} {...others}></MultiplePopper>
  }
}



const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  return {
    widgets: state.appConfig.widgets,
    config: state.appConfig.widgets[ownProps.widgetId].config,
    widgetsRuntimeInfo: state.widgetsRuntimeInfo

  }
}

export const WidgetRenderer = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_WidgetRenderer);