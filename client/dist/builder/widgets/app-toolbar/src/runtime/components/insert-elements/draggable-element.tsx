/** @jsx jsx */
import {React, jsx, css, classNames as classnames, AppMode, LayoutItemConstructorProps} from 'jimu-core';
import {builderAppSync} from 'jimu-for-builder';

let dragging_count = 0;

interface ElementRenderFunction{
  (item: LayoutItemConstructorProps, fullLine?: boolean, hideLabel?: boolean): React.ReactNode
}

interface Props{
  appMode: AppMode;
  item: LayoutItemConstructorProps;
  fullLine: boolean;
  className?: string;
  children?: ElementRenderFunction | React.ReactNode;
  onSelect?: (item: LayoutItemConstructorProps) => void;
}

export default class DraggableElement extends React.PureComponent<Props>{
  constructor(props) {
    super(props);
  }

  stopBubble(e) {
    if (e && e.stopPropagation){
      e.stopPropagation();
    }else if(window.event){
      window.event.cancelBubble = true;
    }
  }

  onSelectItem = (e) => {
    this.stopBubble(e);
    this.props.onSelect && this.props.onSelect(this.props.item);
  }

  beginDrag = (e) => {
    if (this.props.appMode !== AppMode.Design) {
      return;
    }

    const {item} = this.props;
    if (e.dataTransfer) {
      // Must set some data to make it draggable in firefox
      e.dataTransfer.setData('widget', item.name);
    }

    builderAppSync.publishDraggingWidgetToApp({
      uid: dragging_count++,
      ...item
    });
  }

  endDrag = (e) => {
    builderAppSync.publishEndDragWidgetToApp();
  }

  maskStyle() {
    return css`
      position: absolute;
      user-select: none;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      cursor: default;

      &.can-drag {
        cursor: pointer;

        &:active {
          cursor: grabbing;
        }
      }
    `;
  }

  render(){
    const {item, fullLine, appMode} = this.props;
    return (
        <div
          className={classnames('mt-2 p-0', {'col-6': !fullLine, col: fullLine, [this.props.className]: !!this.props.className})}
          draggable={appMode === AppMode.Design}
          onClick={this.onSelectItem}
          onDragStart={this.beginDrag}
          onDragEnd={this.endDrag}
          key={item.name}
          title={item.label}
        >
          {
            typeof this.props.children === 'function' ?
            (this.props.children as ElementRenderFunction)(item, fullLine) :
            this.props.children
          }
          <div className={classnames({ 'can-drag': appMode === AppMode.Design })} css={this.maskStyle()}></div>
        </div>
    );
  }
}
