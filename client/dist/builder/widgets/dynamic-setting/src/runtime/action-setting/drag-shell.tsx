import { React, classNames } from 'jimu-core';
import { interact } from 'jimu-core/dnd';

interface Props{
  className?: string;
  style?: React.CSSProperties;
  dragItemName: string;
  dragItemIndex: number;

  onDragChanged?: (fromIndex: number, toIndex: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: (index: number) => void;
}

export default class DragShell extends React.PureComponent<Props, {}>{

  interactable: Interact.Interactable;
  dropZoneInteractable: Interact.Interactable;

  ref: HTMLElement;
  dragElement: HTMLElement; ;
  dropzoneElement: HTMLElement; ;

  componentDidMount() {
    this._initInteractive();
  }

  _initInteractive() {
    if (this.ref) {
      const domRef = this.ref;
      let lastMoveCall = null;

      let dragFromIndex = null;
      let dragToIndex = null;

      this.dropZoneInteractable = interact(domRef).dropzone({
        // only accept elements matching this CSS selector
        accept: `.${this.props.dragItemName}`,
        overlap: 'center',
        ondropmove: event => {
          this.dragElement = event.relatedTarget;
          this.dropzoneElement = event.target;

          let dropzoneElementIndex = this.dropzoneElement.getAttribute('data-item-index');
          let dragElementIndex = this.dragElement.getAttribute('data-item-index');

          let dropzoneMidlineOffsetTop = this.dropzoneElement.offsetTop + this.dropzoneElement.clientHeight / 2;
          let dragElementMidlineOffsetTop = parseFloat(this.dragElement.getAttribute('move-relative-top')) + this.dragElement.clientHeight / 2;

          if (dragElementMidlineOffsetTop > dropzoneMidlineOffsetTop) {
            dragFromIndex = parseInt(dragElementIndex);
            dragToIndex = parseInt(dropzoneElementIndex);
          } else {
            dragFromIndex = parseInt(dragElementIndex);
            dragToIndex = parseInt(dropzoneElementIndex) - 1;
          }
        },
        ondrop: event => {
          this.props.onDragChanged && this.props.onDragChanged(dragFromIndex, dragToIndex);
        }
      })

      this.interactable = interact(domRef).draggable({
        startAxis: 'y',
        lockAxis: 'y',
        inertia: false,
        modifiers: [],
        autoScroll: true,
        onstart: e => {
          const {clientY0, target} = e;
          const rect = target.getBoundingClientRect();
          const targetH = target.clientHeight;
          const y = (clientY0 - rect.top - targetH / 2);
          target.style.webkitTransform = 'translate(' + 0 + 'px, ' + y + 'px)';
          target.style.transform = 'translate(' + 0 + 'px, ' + y + 'px)';
          target.setAttribute('start-y', y);
          target.setAttribute('start-relative-top', target.offsetTop);
        },

        onmove: e => {
          const { clientY, clientY0, target } = e;
          let startY = (parseFloat(target.getAttribute('start-y')) || 0);
          let y = clientY - clientY0 + startY

          if (lastMoveCall) {
            cancelAnimationFrame(lastMoveCall);
          }

          if (y < 0) {
            if ( y * -1 > (parseFloat(target.getAttribute('start-relative-top')) + target.clientHeight * 0.8)) {
              y = (parseFloat(target.getAttribute('start-relative-top')) + target.clientHeight * 0.8) * -1;
            }
          } else {
            if (y > target.parentElement.clientHeight - parseFloat(target.getAttribute('start-relative-top')) - target.clientHeight * 0.2) {
              y = target.parentElement.clientHeight - parseFloat(target.getAttribute('start-relative-top')) - target.clientHeight * 0.2;
            }
          }

          target.setAttribute('move-relative-top', y + parseFloat(target.getAttribute('start-relative-top')));

          lastMoveCall = requestAnimationFrame(() => {
            target.style.webkitTransform = 'translate(' + 0 + 'px, ' + y + 'px)';
            target.style.transform = 'translate(' + 0 + 'px, ' + y + 'px)';
            lastMoveCall = null;
          });
        },

        onend: e => {
          const { target } = e;
          if (lastMoveCall) {
            cancelAnimationFrame(lastMoveCall);
          }
          target.style.webkitTransform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
          target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
        }
      })
    }
  }

  render(){
    const {
      className,
      style
    } = this.props;

    let classes = classNames(
      this.props.dragItemName,
      'drag-item',
      className
    );

    return <div className={classes} style={style} ref={dom => this.ref = dom} data-item-index={this.props.dragItemIndex}
    onMouseEnter={() => {this.props.onMouseEnter(this.props.dragItemIndex)}} onMouseLeave={() => {this.props.onMouseLeave(this.props.dragItemIndex)}}>
      {this.props.children}
    </div>;
  }
}