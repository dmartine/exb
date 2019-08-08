/** @jsx jsx */
import { React, jsx, css, Immutable, utils as jimuUtils, ThemeVariables, getAppStore, IMState, ReactRedux, IMSizeModeLayoutJson, IMLayoutJson } from 'jimu-core';
import { Popper, Resizeable } from 'jimu-ui';
import { getAppConfigAction } from 'jimu-for-builder';
import { selectionChanged } from 'jimu-core/lib/app-actions';
import LayoutForBuilder from 'jimu-layouts/lib/fixed-layout/builder/layout';
import { PopperHeader } from '../common'

export interface OwnProps {
  theme?: ThemeVariables;
  widgetId?: string;
  widgetIds: string[],
  layouts: IMSizeModeLayoutJson,
  reference: any;
  onClose?: (widgetId: string) => any;
  size: { width: number, height: number };
  onWidgetSizeChange?: (widgetId: string, width: number, height: number) => any;
}

interface ExtraProps {
  isExist: boolean;
  layout: IMLayoutJson;
}

interface State {
  width: number;
  height: number;
}

class _DynamicLayoutPopper extends React.PureComponent<OwnProps & ExtraProps, State> {
  elementId: string;

  static defaultProps: Partial<OwnProps> = {
    widgetIds: [],
    size: { width: 300, height: 300 },
    onClose: () => { },
    onWidgetSizeChange: () => { }
  }

  constructor(props) {
    super(props);
    this.elementId = '0';
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this.createLayoutElement();
    const { size: { width, height } } = this.props;
    this.setState({ width, height });
  }

  componentDidUpdate(preveProps: OwnProps) {
    if (this.props.widgetId !== preveProps.widgetId) {
      const { size: { width, height } } = this.props;
      this.setState({ width, height });
    }
  }

  getWidgetTitle = (widgetId: string) => {
    if (!widgetId) {
      return;
    }
    let appConfig = getAppConfigAction().appConfig;
    return appConfig.widgets[widgetId] && appConfig.widgets[widgetId].label;
  }

  componentWillUpdate(nextProps: OwnProps & ExtraProps) {
    const { widgetId, layout, isExist } = nextProps;
    const { widgetId: preWidgetId, isExist: preIsExist } = this.props;
    if (isExist !== preIsExist && !isExist) {
      this.props.onClose(widgetId);
      return;
    }
    if (widgetId && widgetId !== preWidgetId) {
      let appConfig = getAppConfigAction().appConfig;
      appConfig = appConfig.setIn(['layouts', layout.id, 'content', this.elementId], this.getLayoutElementJson(widgetId))
        .setIn(['layouts', layout.id, 'order'], [this.elementId]);
      getAppConfigAction(appConfig).exec();
      getAppStore().dispatch(selectionChanged((Immutable({ layoutId: layout.id, layoutItemId: this.elementId }))));
    }
  }

  getLayoutElementJson = (widgetId: string) => {
    return {
      type: 'WIDGET',
      widgetId: widgetId,
      bbox: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      },
      id: this.elementId
    };
  }

  createLayoutElement = () => {
    const { widgetId, layout } = this.props;
    if (layout) {
      let appConfig = getAppConfigAction().appConfig;
      let elementJson = this.getLayoutElementJson(widgetId);

      appConfig = appConfig.setIn(['layouts', this.props.layout.id, 'content', elementJson.id], elementJson)
        .setIn(['layouts', this.props.layout.id, 'order'], [elementJson.id]);
      getAppConfigAction(appConfig).exec();
    }
  }

  onResizeEnd = (width: number, height: number) => {
    const { widgetId } = this.props;
    this.props.onWidgetSizeChange(widgetId, width, height);
  }

  getStyle = () => {
    return css`
      .rnd-resize-top,
      .rnd-resize-right,
      .rnd-resize-bottom,
      .rnd-resize-left {
        display: none;
      }
      .selectable {
        > div {
          cursor: default;
        }
      }
    `;
  }

  onResizeing = (width: number, height: number) => {
    this.setState({ width, height });
  }

  generatePopperHeader = () => {
    const { widgetId, onClose, theme } = this.props;
    return <PopperHeader theme={theme} text={this.getWidgetTitle(widgetId)} onClose={() => onClose(widgetId)}></PopperHeader>
  }

  render() {
    const { layouts, layout, reference, widgetId } = this.props;
    if (!layout || !widgetId) {
      return null;
    }
    let { width, height } = this.state;

    return <Popper
      css={this.getStyle()}
      offset={[0, 30]}
      draggable={false}
      header={this.generatePopperHeader()}
      container="body"
      className="d-flex flex-column flex-grow-1 border bg-white shadow rounded p-2"
      reference={reference} open={!!widgetId} placement="bottom" zIndex={21}>
      <Resizeable
        onResize={this.onResizeing}
        onEnd={this.onResizeEnd}
        minSize={[150, 100]}
        width={width}
        height={height}>
        <div style={{ width, height }} className="d-flex flex-grow-1">
          <LayoutForBuilder layouts={layouts} itemDraggable={false} itemResizable={true}></LayoutForBuilder>
        </div>
      </Resizeable>

    </Popper>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  const layout = state.appConfig.layouts[jimuUtils.findLayoutId(ownProps.layouts, state.browserSizeMode, state.appConfig.mainSizeMode)];
  return {
    layout: layout,
    isExist: ownProps.widgetIds.indexOf(ownProps.widgetId) > -1
  }
}
export const DynamicLayoutPopper = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_DynamicLayoutPopper) as any;
