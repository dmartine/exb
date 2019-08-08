/** @jsx jsx */
import { React, jsx, css, ThemeVariables, SerializedStyles, ImmutableObject, InjectedIntl, polished } from 'jimu-core';
import { Icon, TreeItemJson, Button } from 'jimu-ui';
import { interact } from 'jimu-core/dnd';
import defaultMessages from '../translations/default';

const pageIconSize = 0;

export interface DndTocItemJson extends TreeItemJson {
  allowEditable?: boolean;
  index?: number;
  level?: number;
}

interface Props {
  intl: InjectedIntl;
  theme: ThemeVariables;
  itemJson: ImmutableObject<DndTocItemJson>;
  parentBoundRect?: any;
  isFirstItem?: boolean;
  isLastItem?: boolean;
  editable?: boolean;
  keepWidthInParent?: boolean;
  renameItem?: (itemJson: DndTocItemJson, newName: string) => boolean;
  renderRightContent?: (itemJson: DndTocItemJson) => any;
  onDoubleClick?: (itemJson, evt) => void;
  tocCss?: SerializedStyles;
  isTocDragging?: boolean;
  tocDraggingStatus?: 'bottom' | 'top' | 'on',
  onTocDragStatusChage?: (isDragging: boolean) => void;
  canDnd?: boolean;
  onArrowClick?: (itemJson: ImmutableObject<DndTocItemJson>) => void
  onDidDrop?: (subItemJson: ImmutableObject<DndTocItemJson>, parentItemJson: ImmutableObject<DndTocItemJson>, dropType: 'moveInto' | 'top' | 'bottom' | 'none') => void;
  canDragFunc?: (itemJson: ImmutableObject<DndTocItemJson>) => boolean;
  canDropFunc?: (itemJson: ImmutableObject<DndTocItemJson>, dragItemJson: ImmutableObject<DndTocItemJson>) => boolean;
  canDropIntoFunc?: (itemJson, targetItemJson) => boolean;
  canOrderFunc?: (itemJson, targetItemJson) => boolean;
}

interface States {
  dropType: 'moveInto' | 'top' | 'bottom' | 'none';
  isDragging: boolean;
  isHovering: boolean;
}


export class DndTocContent extends React.PureComponent<Props, States> {

  dropZoneInteractable: Interact.Interactable;
  dragInteractable: Interact.Interactable;
  dropZoneRef: HTMLDivElement;
  dragRef: HTMLDivElement;
  editor: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      dropType: 'none',
      isDragging: false,
      isHovering: false
    };
  }

  componentWillUnmount() {
    if (this.dragInteractable) {
      this.dragInteractable.unset();
      this.dragInteractable = null;
    }
    if (this.dropZoneInteractable) {
      this.dropZoneInteractable.unset();
      this.dropZoneInteractable = null;
    }
  }

  componentDidMount() {
    const { canDnd, canDragFunc, canDropFunc, onDidDrop,
      canOrderFunc, canDropIntoFunc, itemJson, editable } = this.props;
    const { index } = itemJson;
    if (editable) {
      this.renameItemClick();
    }
    if (canDnd && this.dropZoneRef && this.dragRef) {
      let lastMoveCall = null;
      this.dragRef.setAttribute('itemJson', JSON.stringify(itemJson));
      this.dropZoneInteractable = interact(this.dropZoneRef)
        .dropzone({
          // only accept elements matching this CSS selector
          accept: '.toc-item-drag',
          overlap: 'pointer',
          ondropactivate: event => {
          },
          ondropmove: event => {
            const dragElement = event.relatedTarget;
            const dropzoneElement = event.target;
            const dragItemJson = JSON.parse(dragElement.getAttribute('itemJson'));
            if (!canDropFunc || !canDropFunc(itemJson.data, dragItemJson.data)) return;
            const hoverBoundingRect = dropzoneElement.getBoundingClientRect();
            const hoverThresholdBottomY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * 3 / 4;
            const hoverThresholdTopY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * 1 / 4;
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = event.dragEvent.client;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            let dropType = this.state.dropType;
            if (canOrderFunc && canOrderFunc(dragItemJson.data, itemJson.data)) {
              if (canDropIntoFunc && canDropIntoFunc(dragItemJson.data, itemJson.data)) {
                if (index === 0) {
                  if (hoverClientY > hoverThresholdBottomY) {//out and order bottom target
                    dropType = 'bottom';

                  } else if (hoverClientY < hoverThresholdTopY) {//out and order top target
                    dropType = 'top';
                  } else {// move into
                    dropType = 'moveInto';
                  }
                } else {
                  if (hoverClientY > hoverThresholdBottomY) {//order or moveInto
                    dropType = 'bottom';
                  } else {//out and order top target
                    dropType = 'moveInto';
                  }
                }

              } else {
                if (index === 0) {
                  if (hoverClientY > hoverMiddleY) {//out and order bottom target
                    dropType = 'bottom';
                  } else {//out and order top target
                    dropType = 'top';
                  }
                } else {
                  dropType = 'bottom'
                }

              }
            } else if (canDropIntoFunc && canDropIntoFunc(dragItemJson.data, itemJson.data)) {
              dropType = 'moveInto'
            } else {
              dropType = 'none'
            }
            this.onDropHover(dropType);
          },
          ondragenter: event => {
          },
          ondragleave: event => {
            this.onDropHover('none');
          },
          ondrop: event => {
            const dropType = this.state.dropType;
            if (dropType === 'none') return;
            const dragElement = event.relatedTarget;
            const dragItemJson = JSON.parse(dragElement.getAttribute('itemJson'));
            onDidDrop && onDidDrop(dragItemJson, itemJson, dropType as any);
            this.onDropHover('none');
          },
          ondropdeactivate: event => {

          }
        })
      if (canDragFunc(itemJson.data)) {

        this.dragInteractable = interact(this.dragRef).draggable(
          {
            inertia: false,
            modifiers: [],
            autoScroll: true,
            onstart: e => {
              // const { clientX0, clientY0, target } = e;
              // const rect = target.getBoundingClientRect();

              // const targetW = target.clientWidth;
              // const targetH = target.clientHeight;
              // const x = (clientX0 - rect.left - targetW / 2);
              // const y = (clientY0 - rect.top - targetH / 2);
              // target.style.webkitTransform =
              //   target.style.transform =
              //   'translate(' + x + 'px, ' + y + 'px)';
              // // update the posiion attributes
              // target.setAttribute('start-x', x);
              // target.setAttribute('start-y', y);
              // target.setAttribute('start-left', rect.left);
              // target.setAttribute('start-top', rect.top);
              this.setState({
                isDragging: true
              })
              const {onTocDragStatusChage} = this.props;
              if(onTocDragStatusChage){
                onTocDragStatusChage(true);
              }
            },
            onmove: event => {
              const { clientX, clientY, clientX0, clientY0, target } = event;
              // keep the dragged position in the data-x/data-y attributes
              let startX = (parseFloat(target.getAttribute('start-x')) || 0),
                startY = (parseFloat(target.getAttribute('start-y')) || 0),
                x = clientX - clientX0 + startX,
                y = clientY - clientY0 + startY
                // startLeft = (parseFloat(target.getAttribute('start-left')) || 0)
                // startTop = (parseFloat(target.getAttribute('start-Top')) || 0)

              //this is translated distance, not the final position
              // const leftMouseThreshold = clientX - startLeft - pageIconSize / 2;
              // const rightMouseThreshold = clientX - startLeft - (target.clientWidth - pageIconSize / 2);
              const leftClientThreshold = -(target.clientWidth - pageIconSize) / 2;
              const rightClientThreshold = (target.clientWidth - pageIconSize) / 2;

              if (x < leftClientThreshold) {
                x = leftClientThreshold;
              } else if (x > rightClientThreshold) {
                x = rightClientThreshold;
              }

              const {parentBoundRect} = this.props;
              if(parentBoundRect){
                // const topMouseThreshold = this.props.parentBoundRect.top - clientY;
                // const bottomMouseThreshold = clientY - target.clientHeight;
                const topClientThreshold = this.props.parentBoundRect.top - clientY0;
                const bottomClientThreshold = this.props.parentBoundRect.bottom - clientY0;
                if (y <= topClientThreshold) {
                  y = topClientThreshold;
                } else if (y >= bottomClientThreshold) {
                  y = bottomClientThreshold;
                }
              }
              

              if (lastMoveCall) {
                cancelAnimationFrame(lastMoveCall);
              }

              lastMoveCall = requestAnimationFrame(() => {
                target.style.webkitTransform =
                  target.style.transform =
                  'translate(' + x + 'px, ' + y + 'px)';
                // Since this frame didn't get cancelled, the lastUpdateCall should be reset so new frames can be called.
                lastMoveCall = null;
              });
            },
            onend: e => {
              const { target } = e;
              if (lastMoveCall) {
                cancelAnimationFrame(lastMoveCall);
              }
              target.style.webkitTransform =
                target.style.transform =
                'translate(' + 0 + 'px, ' + 0 + 'px)';
              this.setState({
                isDragging: false
              })
              const {onTocDragStatusChage} = this.props;
              if(onTocDragStatusChage){
                onTocDragStatusChage(false);
              }
            }
          }
        )
      }

    }
  }

  componentWillReceiveProps(nextProps) {
    const { itemJson, editable } = nextProps;
    if (itemJson.allowEditable) {
      if (editable !== this.props.editable) {
        if (editable) {
          this.renameItemClick();
        }
      }
    }
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  handleArrowClick = (evt) => {
    const { onArrowClick, itemJson } = this.props
    if (onArrowClick) {
      onArrowClick(itemJson);
    }
    evt.stopPropagation();
  }

  handleClick = (evt) => {

  }

  handleDoubleClickItem = (evt) => {
    const { itemJson, onDoubleClick } = this.props;
    if (onDoubleClick)
      onDoubleClick(itemJson, evt);
    evt.stopPropagation();
  }

  onDropHover = (dropType: 'moveInto' | 'top' | 'bottom' | 'none') => {
    if (this.state.dropType === dropType) return;
    this.setState({
      dropType: dropType
    })
  }

  renameItemClick = (evt?) => {
    if (evt) {
      evt.stopPropagation();
    }
    setTimeout(() => {
      this.editor.focus();

      var sel, range;
      if (window.getSelection && document.createRange) {
        range = document.createRange();
        range.selectNodeContents(this.editor);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        sel = document.createRange();
        sel.setStart(this.editor.firstChild, this.editor.innerText.length);
        sel.select();
      }

    }, 1);
    this.editor.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.onRenameBlur();
      }
    }
    if(this.dragInteractable){
      this.dragInteractable.draggable(false);
    }
  }

  onRenameBlur = () => {

    let newName = this.editor.innerText;

    this.editor.innerText = '';
    setTimeout(() => {
      this.editor.innerText = newName;
    }, 10);
    setTimeout(() => {
      const { renameItem } = this.props;
      if (renameItem) {
        if (!this.props.renameItem(this.props.itemJson, newName)) {
          this.editor.innerText = this.props.itemJson.label;
        }
      } else {
        this.editor.innerText = this.props.itemJson.label;
      }

    }, 30);
    if(this.dragInteractable){
      this.dragInteractable.draggable(true);
    }
  }

  getStyle = (): SerializedStyles => {
    const { theme, editable, tocCss, itemJson, keepWidthInParent, isTocDragging } = this.props;
    let rootFontSize = 16;
    const { mustShowArrow, children, level, isActive, isExpand } = itemJson;
    const { isDragging, isHovering } = this.state;
    const defaultTocHeigt = 30;
    const subPaddingLeft = 20;
    const shortEidtorWidth = 130;
    const longEditorWidth = 190;
    // width: 100%;
    //   min-width: ${keepWidthInParent ? '100%' : `calc(259px + ${subPaddingLeft * level}px)`};
    // calc(256px + ${subPaddingLeft * level}px)
    return css`
      height: ${defaultTocHeigt}px;
      width: auto;
      min-width: 100%;
      align-items: center;
      cursor: pointer;
      ${isDragging ? 'z-index: 100;' : ''}

      :hover {
        ${
          isActive ?
          '' :
          `background-color: ${polished.rgba(theme.colors.grays.gray200, 0.4)};`
        }
      }

      &.active {
        ${
          isTocDragging ?
          '' :
          `background-color: ${theme.colors.cyans.cyan100};`
        }
        border: 0;
      }

      &.drag-move-into {
        border: 1px solid ${theme.colors.cyans.cyan500};
      }

      .toc-item-dropzone {
        touch-action: none;
        position: relative;

        .toc-item-drag:hover {
          cursor: pointer !important;
        }
  
        .toc-item-drag {
          pointer-events: ${isHovering ? 'all' : 'none'};
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background-color: ${isDragging ? polished.rgba(theme.colors.grays.gray200, 0.6) : 'transparent'};
          box-shadow: ${isDragging ? theme.boxShadows.lg : theme.boxShadows.default};
        }

        .toc-item {
          padding: 0;
          border: 0;
          position: relative;
          .toc-item-content {
            margin-left: ${level * subPaddingLeft}px;
            position: relative;
            .toc-arrow {
              z-index: 2;
              visibility: ${(mustShowArrow || (children && children.length > 0)) ? 'visible' : 'hidden'};
              height: 24px;
              width: auto;
              display: flex;
              align-self: center;
              align-items: center;
              justify-content: center;
              transform-origin: center;
              transform: ${`rotate(${isExpand ? 90 : 0}deg)`};
              transition: transform .5s;
              .toc-arrow-icon {
                fill: ${theme.colors.black};
              }
            }
      
            .left-content {
              align-items: center;
              .editor {
                width: ${keepWidthInParent ? `calc(${shortEidtorWidth}px - ${level * subPaddingLeft}px)` : 'auto'};
                overflow: hidden;
                text-overflow: ${editable ? 'clip' : 'ellipsis'};
                white-space: nowrap;
                font-size: ${14 / rootFontSize}rem;
                user-select: none;
              }
              [contenteditable="true"] {
                background-color: ${theme.colors.white};
                width: ${keepWidthInParent ? `calc(${shortEidtorWidth}px - ${level * subPaddingLeft}px)` : (longEditorWidth + 'px')};
              }
              .header-icon {
                margin-right: 0.3rem;
                fill: ${theme.colors.black};
              }
            }
          }

          &.toc-drag-move-last {
            background-color: ${polished.rgba(theme.colors.grays.gray200, 0.4)};
            :after{
              content: '';
              position: absolute;
              left: 0;
              top: auto;
              bottom: 0;
              right: auto;
              height: 2px;
              width: 100%;
              background-color: ${theme.colors.cyans.cyan500};
            }
          }
          
          &.toc-drag-move-first {
            background-color: ${polished.rgba(theme.colors.grays.gray200, 0.4)};
            :before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              bottom: auto;
              right: auto;
              height: 2px;
              width: 100%;
              background-color: ${theme.colors.cyans.cyan500};
            }
          }
          .drag-move-out-order-bottom {
            background-color: ${polished.rgba(theme.colors.grays.gray200, 0.4)};
            :after{
              content: '';
              position: absolute;
              left: 0;
              top: auto;
              bottom: 0;
              right: auto;
              height: 2px;
              width: 100%;
              background-color: ${theme.colors.cyans.cyan500};
            }
          }
    
          .drag-move-out-order-top {
            background-color: ${polished.rgba(theme.colors.grays.gray200, 0.4)};
            :before {
              
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              bottom: auto;
              right: auto;
              height: 2px;
              width: 100%;
              background-color: ${theme.colors.cyans.cyan500};
            }
          }
        }
      }
      
      ${
        tocCss ? tocCss : ''
      }
    `;
  }

  render() {
    const { itemJson, renderRightContent, editable, canDnd, isFirstItem, isLastItem, tocDraggingStatus, isTocDragging } = this.props;
    const { isIconSvg, icon, isActive } = itemJson;
    const { dropType, isDragging } = this.state;

    let moveIntoClassName = dropType === 'moveInto' ? 'drag-move-into' : ''
    let moveOutClassName = 'drag-move-out-order-' + dropType;
    let tocDraggingClass = ''
    if(isTocDragging && tocDraggingStatus !== 'on'){
      if(tocDraggingStatus === 'bottom' && isLastItem){
        tocDraggingClass = 'toc-drag-move-last';
      }else if(tocDraggingStatus === 'top' && isFirstItem){
        tocDraggingClass = 'toc-drag-move-first';
      }
    }
    return (
      <div
        className={`d-flex ${isActive ? 'active' : ''}   ${moveIntoClassName}`}
        css={this.getStyle()}
        onMouseEnter={evt => setTimeout(() => {
          this.setState({isHovering: true})
        }, 100)}
        onMouseLeave={evt => setTimeout(() => {
          this.setState({isHovering: false})
        }, 100)}
      >
        <div ref={dom => this.dropZoneRef = dom}
          className={`toc-item-dropzone h-100 w-100`}
        >
          <div
            className={`d-flex w-100 h-100`}
            onDoubleClick={this.handleDoubleClickItem}
            onClick={this.handleClick} >
            <div
              className={`d-flex justify-content-between w-100 toc-item ${tocDraggingClass}`} >
              <div className={`d-flex toc-item-content w-100 ${moveOutClassName}`} >
                <Button title={itemJson.isExpand ? this.formatMessage('unexpand') : this.formatMessage('expand')} className="toc-arrow"
                 icon color="link" onClick={this.handleArrowClick}>
                  <Icon className={'toc-arrow-icon'} icon={require('jimu-ui/lib/icons/arrow-right-8.svg')} size={8} />
                </Button>
                <div
                  className={'d-flex justify-content-between w-100'}
                >
                  <div className={'d-flex left-content'}>
                    {icon && (isIconSvg ? <Icon className="header-icon" size={12} icon={icon as any}></Icon> : <img className="header-icon" src={icon} width="12" height="12" />)}
                    <div title={itemJson.label} className="item-label editor"
                      ref={dom => this.editor = dom}
                      onBlur={evt => this.onRenameBlur()}
                      contentEditable={itemJson.allowEditable && editable} suppressContentEditableWarning={true}>
                      {itemJson.label}
                    </div>
                  </div>
                  {
                    renderRightContent && renderRightContent(itemJson)
                  }
                </div>
              </div>

            </div>
            {
              canDnd &&
              <div
                className={`toc-item-drag`}
                ref={dom => this.dragRef = dom} >
                {
                  isDragging &&
                  <div
                    className={`d-flex justify-content-between w-100 toc-item`} >
                    <div className={`d-flex toc-item-content w-100`} >
                      <Button title={itemJson.isExpand ? this.formatMessage('unexpand') : this.formatMessage('expand')} icon color="link" className="toc-arrow">
                        <Icon className={'toc-arrow-icon'} icon={require('jimu-ui/lib/icons/arrow-right-8.svg')} size={8} />
                      </Button>
                      <div className={'d-flex justify-content-between w-100'}>
                        <div className={'d-flex left-content'}>
                          {icon && (isIconSvg ? <Icon className="header-icon" size={12} icon={icon as any}></Icon> : <img className="header-icon" src={icon} width="12" height="12" />)}
                          <div title={itemJson.label} className="item-label editor">
                            {itemJson.label}
                          </div>
                        </div>
                        {
                          renderRightContent && renderRightContent(itemJson)
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
            
          </div>
        </div>
      </div>
    )
  }
}
