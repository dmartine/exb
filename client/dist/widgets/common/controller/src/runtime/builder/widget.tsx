/** @jsx jsx */
import {
  React, jsx, IMState, IMLayoutJson, AppMode, appActions, Immutable, BrowserSizeMode, utils as jimuUtils, IMSizeModeLayoutJson, ReactRedux, IMWidgetJson, ThemeVariables, getAppStore, ImmutableObject
} from 'jimu-core';
import { IMConfig } from '../../config';
import { RollList, Placeholder } from '../common'
import { FlexboxType } from 'jimu-layouts/flexbox-runtime';
import utils from '../utils';
import { getAppConfigAction } from 'jimu-for-builder';
import { LayoutForBuilder } from './layout'
import { DynamicLayoutPopper } from './dynamic-layout-popper';

const LayoutName = 'controller';
const OpenWidgetLayoutName = 'openwidget';

interface OwnProps {
  id: string;
  config: IMConfig;
  nls: (id: string) => string;
};

interface ExtraProps {
  widgetJson: IMWidgetJson;
  layout: IMLayoutJson;
  layouts: IMSizeModeLayoutJson;
  popperLayouts: IMSizeModeLayoutJson;
  appMode: AppMode;
  browserSizeMode: BrowserSizeMode;
  theme: ThemeVariables;
}

type Size = ImmutableObject<{
  width: number,
  height: number
}>

interface State {
  openedWidget: string;
  activeIconNode: HTMLDivElement;
  start: number,
  end: number,
  size: Size
}

export class _Widget extends React.PureComponent<OwnProps & ExtraProps, State>{
  constructor(props) {
    super(props);
    this.state = {
      openedWidget: '',
      activeIconNode: null,
      start: 0,
      end: 1,
      size: Immutable({
        width: 300,
        height: 70
      })
    }
  }

  componentDidMount() {
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'onArrowClick', this.onListArrowClick));
  }

  componentDidUpdate(preProps: OwnProps & ExtraProps) {
    const { config: { onlyOpenOne: preOnlyOpenOne, displayType: preDisplayType, space: preSpace, iconSize: preIconSize },
      layout, layout: { order: preOrder = [] }, appMode: preAppMode, browserSizeMode: preBrowserSizeMode } = preProps;
    const { config: { onlyOpenOne, displayType, space, iconSize }, layout: { order = [] }, appMode, browserSizeMode } = this.props;
    if (preOnlyOpenOne !== onlyOpenOne || displayType !== preDisplayType) {
      this.setState({ openedWidget: '' });
    }

    if (appMode !== preAppMode) {
      this.setState({ openedWidget: '' });
    }

    if (browserSizeMode !== preBrowserSizeMode) {
      this.setState({ openedWidget: '' });
    }

    if (order.length !== preOrder.length) {
      const widgetIds = utils.getWidgetIdsFromLayout(layout);
      this.updateWidgetJsonWidgets(widgetIds);
    }

    if (space !== preSpace || iconSize !== preIconSize) {
      this.reCalculateStartEnd(this.state.size);
    }
  }

  onPopperClose = () => {
    this.setState({ openedWidget: '' });
  }

  updateWidgetJsonWidgets = (widgetIds: string[]) => {
    const { widgetJson } = this.props;
    const newWidgetJson = widgetJson.set('widgets', widgetIds);
    //update widgetJson.widgets
    getAppConfigAction().editWidget(newWidgetJson).exec();
  }

  handleClick = (openedWidget: string, activeIconNode?: HTMLDivElement) => {
    this.setState({ activeIconNode, openedWidget });
  }

  onWidgetSizeChanged = (widgetId: string, width: number, height: number) => {
    if (!widgetId) {
      return
    }
    let { config, config: { size = Immutable({}) } } = this.props;
    const oneSize = Immutable({ [widgetId]: { width, height } });
    size = size.merge(oneSize);
    config = config.set('size', size);
    this.updateWidgetConfig(config);
  }

  updateWidgetConfig = (config: IMConfig) => {
    getAppConfigAction().editWidgetConfig(this.props.id, config).exec();
  }

  publishRollListStateToWidgetState = (disablePrevious: boolean, disableNext: boolean, showArrow: boolean) => {
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'disablePrevious', disablePrevious));
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'disableNext', disableNext));
    getAppStore().dispatch(appActions.widgetStatePropChange(this.props.id, 'showArrow', showArrow));
  }

  onRollLayoutResize = (width: number, height: number) => {
    let { size } = this.state;
    size = size.set('width', width).set('height', height);
    this.reCalculateStartEnd(size);
    this.setState({ size });
  }

  reCalculateStartEnd = (size: Size) => {
    const { width, height } = size;
    const { layout, config } = this.props;
    const counts = utils.getWidgetCountsFromLayout(layout);
    if (!counts) {
      return;
    }
    const [start, end] = utils.calculateStartEnd(width, height, config);
    this.setState({ start, end });
  }

  onListArrowClick = (previous: boolean, rollOne: boolean = true) => {
    const { layout } = this.props;
    let { start, end } = this.state;
    const { disablePrevious, disableNext } = this.calculateRollListState();
    if ((disablePrevious && previous) || (disableNext && !previous)) {
      return;
    }

    const counts = utils.getWidgetCountsFromLayout(layout);
    const [s, e] = utils.onListArrowClick(previous, counts, start, end, rollOne);
    this.setState({ start: s, end: e });
  }

  calculateRollListState = () => {
    const { layout } = this.props;
    const { start, end } = this.state;
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, layout);
    this.publishRollListStateToWidgetState(disablePrevious, disableNext, showArrow);
    return { showArrow, disablePrevious, disableNext };
  }

  placeholderRenderer = () => {
    const { layout, theme, nls } = this.props;
    const counts = utils.getWidgetCountsFromLayout(layout);
    return !counts && <Placeholder theme={theme} text={nls('placeholder')}/>;
  }

  widgetIconList = () => {
    const { layouts, config, config: { horizontal, space }, theme } = this.props;
    const { start, end, openedWidget } = this.state;

    return <RollList horizontal={horizontal} theme={theme} {...this.calculateRollListState()} onResize={this.onRollLayoutResize} onArrowClick={this.onListArrowClick}>
      <LayoutForBuilder itemStyle={utils.getLayoutIconStyle(config)} start={start} end={end} layouts={layouts} space={space} onClick={this.handleClick}
        direction={horizontal ? FlexboxType.Row : FlexboxType.Column} activeIds={openedWidget}>
      </LayoutForBuilder>
    </RollList>
  }

  popperLayout = () => {
    const { popperLayouts, config: { size = {} }, appMode, theme, layout } = this.props;
    const { activeIconNode, openedWidget } = this.state;

    return <DynamicLayoutPopper onClose={this.onPopperClose} theme={theme} size={size[openedWidget]}
      layouts={popperLayouts} widgetIds={utils.getWidgetIdsFromLayout(layout)} onWidgetSizeChange={this.onWidgetSizeChanged}
      widgetId={appMode === AppMode.Run ? '' : openedWidget} reference={activeIconNode}></DynamicLayoutPopper>
  }


  render() {
    return <React.Fragment>
      {this.placeholderRenderer()}
      {this.popperLayout()}
      {this.widgetIconList()}
    </React.Fragment>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  const layouts = state.appConfig.widgets[ownProps.id].layouts;
  return {
    theme: state.theme,
    browserSizeMode: state.browserSizeMode,
    widgetJson: state.appConfig.widgets[ownProps.id],
    layout: state.appConfig.layouts[jimuUtils.findLayoutId(layouts[LayoutName], state.browserSizeMode, state.appConfig.mainSizeMode)],
    layouts: layouts[LayoutName],
    popperLayouts: layouts[OpenWidgetLayoutName],
    appMode: state.appRuntimeInfo.appMode
  }
}

export const WidgetInBuilder = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_Widget) as any;