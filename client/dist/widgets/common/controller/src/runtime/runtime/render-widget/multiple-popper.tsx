import { React, ThemeVariables, lodash, classNames } from 'jimu-core';
import { Placement, Popper, Resizeable } from 'jimu-ui';
import { PopperHeader } from '../../common';

interface SizeMap {
  [widgetId: string]: {
    width: number;
    height: number;
  }
}
export interface PopperInfo {
  id: string;
  popper: {
    show: boolean,
    title?: string,
    reference: any,
    content: HTMLElement
  },
  style: {
    style?: React.CSSProperties;
    width?: number;
    height?: number;
  }
}

interface Props {
  theme: ThemeVariables;
  container?: Element,
  placement: Placement,
  poppers: PopperInfo[],
  onClose?: (id?: string) => any
}

interface State {
  size?: SizeMap
}

export class MultiplePopper extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    onClose: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      size: {}
    };
  }

  handleClose = (widgetId: string) => {
    this.props.onClose(widgetId);
  }

  generatePopperHeader = (widgetId: string, title: string) => {
    const { theme } = this.props;
    return <PopperHeader theme={theme} text={title} onClose={() => this.handleClose(widgetId)}></PopperHeader>
  }

  onResizeing = (widgetId: string, width: number, height: number) => {
    let { size } = this.state;
    size = lodash.assign({}, size, { [widgetId]: { width, height } })
    this.setState({ size });
  }

  render() {
    const { poppers, placement, container = 'body' } = this.props;
    const { size } = this.state;
    return <React.Fragment>
      {poppers.map(p => {
        const width = size[p.id] ? size[p.id].width : p.style.width;
        const height = size[p.id] ? size[p.id].height : p.style.height;
        return <Popper
          key={p.id}
          offset={[0, 30]}
          zIndex={21}
          keepMounted={true}
          open={p.popper.show}
          title={p.popper.title}
          draggable={true}
          header={this.generatePopperHeader(p.id, p.popper.title)}
          reference={p.popper.reference}
          placement={placement}
          container={container}
          className={classNames('border bg-white shadow rounded p-2', { 'd-none': !p.popper.show })}>
          <Resizeable onResize={(w, h) => this.onResizeing(p.id, w, h)}
            minSize={[150, 100]}
            width={width}
            height={height}>
            <div style={{ width, height }}>{p.popper.content}</div>
          </Resizeable>
        </Popper>
      })
      }
    </React.Fragment>;
  }
}