/** @jsx jsx */
import {React, RepeatedDataSourceProvider, jsx, css, IMThemeVariables,
        RepeatedDataSource, AppMode, BrowserSizeMode, IMAppConfig, LayoutInfo, utils, LayoutItemType, polished, appActions} from 'jimu-core';
import { ListGroupItem, styleUtils, Button, Icon } from 'jimu-ui';
import { LayoutViewer} from 'jimu-layouts/layout-runtime';
import { DirectionType, CardSize, Status, SelectionModeType } from '../../config';
import { layoutUtils } from 'jimu-layouts/common';

const cornerSize = 12;
const cornerPosition = -10;
const sideSize = 16;
const sidePosition = -10;
const zindexHandle = 20;

const handle = css`
  position: absolute;
`;

// const topLeftCursor = css`
//   top: ${cornerPosition / 2}px;
//   left: ${cornerPosition / 2}px;
// `;
// const topRightCursor = css`
//   top: ${cornerPosition / 2}px;
//   right: ${cornerPosition / 2}px;
// `;
// const bottomLeftCursor = css`
//   bottom: ${cornerPosition / 2}px;
//   left: ${cornerPosition / 2}px;
// `;
// const bottomRightCursor = css`
//   bottom: ${cornerPosition / 2}px;
//   right: ${cornerPosition / 2}px;
// `;
// const topSideCursor = css`
//   height: ${sideSize}px;
//   left: ${-1 * sidePosition}px;
//   right: ${-1 * sidePosition}px;
//   top: ${-1 * (sideSize / 2)}px;

//   &:after {
//     left: 50%;
//     top: 50%;
//     margin-left: ${cornerPosition / 2}px;
//     margin-top: ${cornerPosition / 2}px;
//   }
// `;
const rightSideCursor = css`
  width: ${sideSize}px;
  top: ${-1 * sidePosition}px;
  bottom: ${-1 * sidePosition}px;
  right: ${-1 * (sideSize / 2)}px;

  &:after {
    top: 50%;
    right: 50%;
    margin-top: ${cornerPosition / 2}px;
    margin-right: ${cornerPosition / 2}px;
  }
`;
const bottomSideCursor = css`
  height: ${sideSize}px;
  left: ${-1 * sidePosition}px;
  right: ${-1 * sidePosition}px;
  bottom: ${-1 * (sideSize / 2)}px;

  &:after {
    left: 50%;
    bottom: 50%;
    margin-left: ${cornerPosition / 2}px;
    margin-bottom: ${cornerPosition / 2}px;
  }
`;
// const leftSideCursor = css`
//   width: ${sideSize}px;
//   top: ${-1 * sidePosition}px;
//   bottom: ${-1 * sidePosition}px;
//   left: ${-1 * (sideSize / 2)}px;

//   &:after {
//     top: 50%;
//     left: 50%;
//     margin-top: ${cornerPosition / 2}px;
//     margin-left: ${cornerPosition / 2}px;
//   }
// `;

interface Props{
  theme: IMThemeVariables,
  appConfig: IMAppConfig,
  builderSupportModules: any,
  selection: LayoutInfo,
  providerData: RepeatedDataSource | RepeatedDataSource[],
  widgetId: string,
  isEditing: boolean,
  LayoutBuilderClass: any,
  layouts: any,
  direction: DirectionType,
  active: boolean,
  selectionIsList: boolean,
  selectionIsInList: boolean,
  builderStatus: Status,
  interact: any,
  selectable: boolean,
  hoverLayoutOpen: boolean,
  draggingWidget: any,
  browserSizeMode: BrowserSizeMode,
  dispatch: any,
  formatMessage: (id: string) => string,
  appMode: AppMode,
  handleResizeCard?: (newCardSize: CardSize, resizeEnd?: boolean, isLeft?: boolean, isTop?: boolean, isEnd?: boolean) => void;
  onChange: (item: ListCard) => void,
  cardConfigs?: any,
  selectCard?: () => void
}

interface State {
  isHover: boolean,
  // canShowCardTools: boolean,
}

export default class ListCard extends React.PureComponent<Props, State>{
  isViewer: boolean = true;
  interactable: Interact.Interactable;
  resizeRef: any;
  lastResizeCall = null;

  constructor(props){
    super(props);

    this.state = {
      isHover: false,
      // canShowCardTools: false
    }

    const {active, selectable, providerData} = props;
    if (selectable && active) {
      this.props.onChange(this);
      this._handleItemChange();
    }
    const {recordIndex} = providerData as RepeatedDataSource;

    if(recordIndex === 0){
      this.isViewer = false;
    }
  }

  componentWillReceiveProps(nextProps){
    const {selectionIsInList, isEditing, direction} = nextProps;
    if(window.jimuConfig.isInBuilder && !this.isViewer){
      if(this.interactable){
        if(isEditing && !selectionIsInList){
          this.interactable.resizable({
            edges: {
              top: false,
              left: false,
              bottom: direction === DirectionType.Vertical,
              right: direction === DirectionType.Horizon
            }
          })
          this.interactable.resizable(true);
        }else {
          this.interactable.resizable(false);
        }
      }
    }
  }

  componentDidMount(){
    if(!this.isViewer && window.jimuConfig.isInBuilder && this.resizeRef){
      // this.setState({
      //   canShowCardTools: true
      // })
      const {interact, handleResizeCard, direction} = this.props;
      this.interactable = interact(this.resizeRef)
        .resizable({
          // resize from all edges and corners
          edges: {
            top: false,
            left: false,
            bottom: direction === DirectionType.Vertical,
            right: direction === DirectionType.Horizon
          },
          modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
              outer: 'parent',
              endOnly: true,
            }),

            // minimum size
            interact.modifiers.restrictSize({
              min: { width: 20, height: 20 },
            }),
          ],
          inertia: false,
          onstart: (event: Interact.InteractEvent) => {
            event.stopPropagation();
          },
          onmove: (event: Interact.ResizeEvent) => {
            event.stopPropagation();
            
            if (this.lastResizeCall) {
              cancelAnimationFrame(this.lastResizeCall);
            }
            const rect = event.rect;
            const newCardSize = {
              width: rect.right - rect.left,
              height: rect.bottom - rect.top
            };
            
            this.lastResizeCall = requestAnimationFrame(() => {
              const edges = {} as any; //event.interaction.edges;
              handleResizeCard(newCardSize, false, edges.top, edges.left, false);
            });
          },
          onend: (event: Interact.ResizeEvent) => {
            event.stopPropagation();
            if (this.lastResizeCall) {
              cancelAnimationFrame(this.lastResizeCall);
            }
            this.lastResizeCall = requestAnimationFrame(() => {
              const rect = event.rect;
              const newCardSize = {
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
              };
              handleResizeCard(newCardSize, true);
            });
          }
        })
    }
  }

  componentWillUnMount() {
    if (this.lastResizeCall) {
      cancelAnimationFrame(this.lastResizeCall);
    }
    if (this.interactable) {
      this.interactable.unset();
      this.interactable = null;
    }
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  handleHoverChange = (isHover) => {
    if(window.jimuConfig.isInBuilder && this.props.appMode !== AppMode.Run)return;
    this.setState({
      isHover
    })
  }

  handleItemClick = (evt) => {
    if(!window.jimuConfig.isInBuilder || this.props.appMode === AppMode.Run){
      const {onChange, active} = this.props;
      if(active){
        const tagName = (evt.target && evt.target.tagName) || '';
        if(!(tagName.toLowerCase() === 'a' || tagName.toLowerCase() === 'button' || evt.exbEventType === 'linkClick')){
          onChange(this);
        }
      }else {
        onChange(this);
      }
    }
    this._handleItemChange(evt);
  }

  handleCopyTo = (evt, status: Status, selectedLayoutItem) => {
    if(!selectedLayoutItem) return;
    const {layouts, appConfig, browserSizeMode, builderStatus} = this.props;
    const action = this.props.builderSupportModules.appInBuilderLib.getAppConfigAction();
    const originLayoutId = utils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode)
    const desLayoutId = utils.findLayoutId(layouts[status], browserSizeMode, appConfig.mainSizeMode)
    action.duplicateLayoutItem(originLayoutId, desLayoutId, selectedLayoutItem.id, false).exec();
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  editStatus = (name, value) => {
    const {dispatch, widgetId} = this.props;
    dispatch(appActions.widgetStatePropChange(widgetId, name, value));
  }

  handleBuilderStatusChange(evt, status) {

    this.editStatus('showCardSetting', status === Status.Regular ? Status.None : status);
    this.editStatus('builderStatus', status);

    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  handleBreakLink = (evt) => {
    
    const {layouts, appConfig, browserSizeMode, selection, builderStatus, dispatch} = this.props;
    const selectedLayoutItem = layoutUtils.findLayoutItem(appConfig, selection);
    if(!selectedLayoutItem)return;
    const layoutId = utils.findLayoutId(layouts[builderStatus], browserSizeMode, appConfig.mainSizeMode);
    const action = this.props.builderSupportModules.appInBuilderLib.getAppConfigAction();
    action.duplicateLayoutItem(layoutId, layoutId, selectedLayoutItem.id, true);
    action.removeLayoutItem({layoutId: layoutId, layoutItemId: selectedLayoutItem.id}, false).exec();
    if (selection.layoutId === layoutId && selection.layoutItemId === selectedLayoutItem.id) {
      dispatch(appActions.selectionChanged(null));
    }
    const content = action.appConfig.layouts[layoutId].content;
    const newItemKey = Object.keys(content)[Object.keys(content).length - 1]
    if(newItemKey){
      const newItem = content[newItemKey];
      dispatch(appActions.selectionChanged({
        layoutId: layoutId,
        layoutItemId: newItem.id
      }))
    }
    
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  private _handleItemChange = (evt = undefined) => {
    const {selectCard, appMode} = this.props;
    if(!window.jimuConfig.isInBuilder || this.isViewer || appMode === AppMode.Run) return;
    if(evt){
      evt.stopPropagation();
    }
    selectCard();
  }

  private getCopyDropdownItems = () => {
    const {cardConfigs, layouts, browserSizeMode, appConfig, selection, builderStatus, builderSupportModules} = this.props;
    const selectedLayoutItem = layoutUtils.findLayoutItem(appConfig, selection);
    if(!selection || !selectedLayoutItem || !window.jimuConfig.isInBuilder) return [];
    const items = [];

    const isWidgetInLayout = (layoutId: string, widgetId: string): boolean => {
      const appConfigUtils = builderSupportModules.widgetModules.appConfigUtils;
      let widgets = appConfigUtils.getWidgetsOrSectionsInLayout(appConfig.layouts[layoutId], LayoutItemType.Widget);
      return widgets.indexOf(widgetId) > -1;
    }

    const syncToHover = () => {
      if(cardConfigs[Status.Hover].enable){
        const layoutId = utils.findLayoutId(layouts[Status.Hover], browserSizeMode, appConfig.mainSizeMode);
        if(!isWidgetInLayout(layoutId, appConfig.layouts[selection.layoutId].content[selection.layoutItemId].widgetId)){
          items.push({
            label: `${this.formatMessage('syncTo')} ${this.formatMessage('hover').toLocaleLowerCase()}`,
            event: (evt) => {this.handleCopyTo(evt, Status.Hover, selectedLayoutItem)},
            visible: true
          })
        }
      }
    }

    const syncToSelected = () => {
      if(cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None){
        const layoutId = utils.findLayoutId(layouts[Status.Selected], browserSizeMode, appConfig.mainSizeMode);
        if(!isWidgetInLayout(layoutId, appConfig.layouts[selection.layoutId].content[selection.layoutItemId].widgetId)){
          items.push({
            label: `${this.formatMessage('syncTo')} ${this.formatMessage('listSelected').toLocaleLowerCase()}`,
            event: (evt) => {this.handleCopyTo(evt, Status.Selected, selectedLayoutItem)},
            visible: true
          })
        }
      }
    }

    const syncToRegular = () => {
      const layoutId = utils.findLayoutId(layouts[Status.Regular], browserSizeMode, appConfig.mainSizeMode);
      if(!isWidgetInLayout(layoutId, appConfig.layouts[selection.layoutId].content[selection.layoutItemId].widgetId)){
        items.push({
          label: `${this.formatMessage('syncTo')} ${this.formatMessage('regular').toLocaleLowerCase()}`,
          event: (evt) => {this.handleCopyTo(evt, Status.Regular, selectedLayoutItem)},
          visible: true
        })
      }
    }

    if(builderStatus === Status.Regular){
      syncToHover();
      syncToSelected();
    }else if(builderStatus === Status.Hover){
      syncToRegular();
      syncToSelected();
    }else {
      syncToRegular();
      syncToHover();
    }
    return items;
  }

  getStyle = () => {
    const {theme, widgetId, selectable, appMode} = this.props;
    return css`
    ${'&.list-card-' + widgetId} {
      padding: 0;
      border: 0;
      height: 100%;
      width: 100%;
      background-color: transparent;
      .list-card-content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: ${theme.colors.white};
      }
    }
    ${'&.list-card-' + widgetId}:hover {
      ${
        (!window.jimuConfig.isInBuilder || appMode === AppMode.Run) && selectable ? 
        'cursor: pointer;' :
        ''
      }
    }
    `;
  }

  _renderAction = () => {
    let handlers = [];
    const { theme, direction } = this.props;
    // const cornerHandle = css`
    //   width: ${cornerSize}px;
    //   height: ${cornerSize}px;
    //   background-color: ${theme.colors.cyans.cyan300};
    //   border: 2px solid ${theme.colors.white};
    //   border-radius: 50%;
    //   z-index: ${zindexHandle};
    // `;
    const sideHandle = css`
      box-shadow: none;

      &:after {
        position: absolute;
        content: "";
        width: ${cornerSize}px;
        height: ${cornerSize}px;
        background-color: ${theme.colors.cyans.cyan300};
        border: 2px solid ${theme.colors.white};
        border-radius: 50%;
        z-index: ${zindexHandle};
      }
    `;

    const bottomSideLine = css`
      box-shadow: none;
      height: ${sideSize}px;
      left: 0px;
      right: 0px;
      bottom: ${-1 * (sideSize / 2)}px;
      &:after {
        position: absolute;
        content: "";
        bottom: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${theme.colors.cyans.cyan200};
        z-index: ${zindexHandle};
      }
    `;

    const rightSideLine = css`
    box-shadow: none;
    width: ${sideSize}px;
    top: 0px;
    bottom: 0px;
    right: ${-1 * (sideSize / 2)}px;
    &:after {
      position: absolute;
      content: "";
      right: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: ${theme.colors.cyans.cyan200};
      z-index: ${zindexHandle};
    }
  `;

    if(direction === DirectionType.Horizon){
      handlers.push(
        <span key="10" className="list-card-rnd-resize-left-line" css={[handle, rightSideLine]}></span>
      );
      handlers.push(
        <span key="4" className="list-card-rnd-resize-right" css={[handle, sideHandle, rightSideCursor]}></span>
      );
      
      // handlers.push(
      //   <span key="8" className="list-card-rnd-resize-left" css={[handle, sideHandle, leftSideCursor]}></span>
      // );
    }else {
      // handlers.push(
      //   <span key="2" className="list-card-rnd-resize-top" css={[handle, sideHandle, topSideCursor]}></span>
      // );
      handlers.push(
        <span key="9" className="list-card-rnd-resize-bottom-line" css={[handle, bottomSideLine]}></span>
      );
      handlers.push(
        <span key="6" className="list-card-rnd-resize-bottom" css={[handle, sideHandle, bottomSideCursor]}></span>
      );
      
    }
    
    // handlers.push(
    //   <span key="1" className="list-card-rnd-resize-top list-card-rnd-resize-left" css={[handle, cornerHandle, topLeftCursor]}></span>
    // );
    // handlers.push(
    //   <span key="3" className="list-card-rnd-resize-top list-card-rnd-resize-right" css={[handle, cornerHandle, topRightCursor]}></span>
    // );
    // handlers.push(
    //   <span key="5" className="list-card-rnd-resize-bottom list-card-rnd-resize-right" css={[handle, cornerHandle, bottomRightCursor]}></span>
    // );
    // handlers.push(
    //   <span key="7" className="list-card-rnd-resize-bottom list-card-rnd-resize-left" css={[handle, cornerHandle, bottomLeftCursor]}></span>
    // );
    return handlers;
  }

  renderCardTools = () => {
    const {theme, cardConfigs, selection, appConfig, widgetId, appMode, builderSupportModules,
      draggingWidget, builderStatus, browserSizeMode, selectionIsInList, selectionIsList} = this.props;
    const isInBuilder = window.jimuConfig.isInBuilder;

    let showTools = true;
    let appConfigUtils;
    if(isInBuilder){
      appConfigUtils = builderSupportModules.widgetModules.appConfigUtils;
    }
    
    const isInList = selectionIsInList;
    const isSelf = selectionIsList;
    if((!isInList && !isSelf) || (isSelf && draggingWidget) || appMode === AppMode.Run
    //  || !this.state.canShowCardTools
     ){
      showTools = false;
    }

    const syncItems = this.getCopyDropdownItems();

    const showSync = syncItems && syncItems.length > 0;
    const showBreak = !isSelf && selection && appConfigUtils && appConfigUtils.getLayoutItemsInWidgetByLayoutInfo(appConfig as any, selection, widgetId, browserSizeMode).length > 1;
    const {MyDropdown, Popover, PopoverBody, ButtonGroup} = builderSupportModules.widgetModules;

    const toolsH = 30;
    return (
      isInBuilder && !this.isViewer && <Popover 
        css={
          css`
          &.popover {
            background-color: transparent;
            .popover-inner {
              box-shadow: none;
            }
            .popover-body{
              padding: 0;
            }
            margin: 0 !important;
            padding: 0;
            .card-tools-${widgetId} {
              height: ${toolsH}px;
              .status-group {
                margin-right: 10px;
                height: 30px;
                box-shadow: 0 2px 8px 1px ${polished.rgba(theme.colors.black, 0.2)};
              }
              .tools-group {
                height: 30px;
                box-shadow: 0 2px 8px 1px ${polished.rgba(theme.colors.black, 0.2)};
              }
              .btn {
                height: 100%;
                background-color: ${polished.rgba(theme.colors.white, 0.9)};
                border: 0;
                color: ${theme.colors.black};
                font-size: ${polished.rem(14)};
                &.active {
                  background-color: ${theme.colors.grays.gray200};
                  color: ${theme.colors.black};
                }
              }
    
              .btn:hover {
                background-color: ${theme.colors.grays.gray200};
                color: ${theme.colors.black};
              }
    
              .btn:focus {
                box-shadow: 0 0 0 !important;
                outline: 0;
              }
            }
          }
          
          `
        }
        placement="bottom-start" 
        isOpen={showTools} 
        target={`list-card-content-edit-${widgetId}`}
        hideArrow >
        <PopoverBody className="justify-content-between">
          <div className={`card-tools-${widgetId} d-flex`} >
            { (cardConfigs[Status.Hover].enable ||  cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None) &&
              <ButtonGroup className="status-group">
                <Button active={builderStatus === Status.Regular}
                  onClick={evt => this.handleBuilderStatusChange(evt, Status.Regular)}>{this.formatMessage('regular')}</Button>
                {cardConfigs[Status.Hover].enable && <Button active={builderStatus === Status.Hover}
                  onClick={evt => this.handleBuilderStatusChange(evt, Status.Hover)}>{this.formatMessage('hover')}</Button>}
                {cardConfigs[Status.Selected].selectionMode !== SelectionModeType.None &&
                  <Button active={builderStatus === Status.Selected} 
                  onClick={evt => this.handleBuilderStatusChange(evt, Status.Selected)}>{this.formatMessage('listSelected')}</Button>}
              </ButtonGroup>
            }
            {!isSelf && (showSync || showBreak) &&
              <div className="tools-group d-flex">
                {showSync &&
                  <MyDropdown uId="list-widget" items={syncItems} theme={theme} />}
                {showBreak &&
                  <Button size={'sm'} color={'link'} icon
                    onClick={this.handleBreakLink} ><Icon size={16} icon={require('jimu-ui/lib/icons/tool-remove-sync.svg')} /></Button>}
              </div>
            }
          </div>
        </PopoverBody>
      </Popover>
    )
  }

  render(){
    const {providerData, LayoutBuilderClass, selectable, active, cardConfigs, selectionIsInList, isEditing, widgetId,
      builderStatus, layouts, hoverLayoutOpen, appMode} = this.props;
    const isInBuilder = window.jimuConfig.isInBuilder;
    const {isHover} = this.state;
    let layout = undefined;
    let bgStyle = undefined;
    if(isInBuilder && appMode !== AppMode.Run){
      layout = layouts[builderStatus]
      bgStyle = cardConfigs[builderStatus].backgroundStyle;
      if(this.isViewer){
        bgStyle = cardConfigs[Status.Regular].backgroundStyle;
        layout = layouts[Status.Regular];
      }
    }else {
      layout = layouts[Status.Regular]
      bgStyle = cardConfigs[Status.Regular].backgroundStyle;
      if(hoverLayoutOpen && isHover  && layouts[Status.Hover]){
        layout = layouts[Status.Hover]
        bgStyle = cardConfigs[Status.Hover].backgroundStyle;
      }
      if(selectable && active && layouts[Status.Selected]){
        layout = layouts[Status.Selected]
        bgStyle = cardConfigs[Status.Selected].backgroundStyle;
      }
    }
    layout = layouts[Status.Regular]

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(bgStyle || {} as any),
    };
    return (
      <RepeatedDataSourceProvider
        data={providerData}
      >
        
        <ListGroupItem
          active={selectable && active}
          css={this.getStyle()}
          className={'list-card-' + widgetId}
          onMouseEnter={evt => this.handleHoverChange(true)}
          onMouseLeave={evt => this.handleHoverChange(false)}
          onClick={this.handleItemClick}
        >
          
          {
            this.isViewer ?
            <div className="list-card-content d-flex list-card-content-view"
              style={mergedStyle}>
              <LayoutViewer layouts={layout}></LayoutViewer>
            </div>
            :
            (
              <div
                ref={node => {
                  if(!this.resizeRef)
                    this.resizeRef = node
                }}
                id={`list-card-content-edit-${widgetId}`}
                className={`list-card-content d-flex `}
                style={mergedStyle}
              >
                {
                  appMode === AppMode.Run ?
                  <LayoutViewer layouts={layout}></LayoutViewer>
                  : 
                  <LayoutBuilderClass isRepeat={true} layouts={layout} isInWidget={true} >
                  </LayoutBuilderClass>
                }
                
                {isEditing && !selectionIsInList && this._renderAction()}
                {/* {this.renderCardTools()} */}
              </div>
              
            )
          }
          
        </ListGroupItem>
      </RepeatedDataSourceProvider>
    )
  }
}