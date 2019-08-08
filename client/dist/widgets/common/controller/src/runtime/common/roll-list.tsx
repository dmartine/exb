/** @jsx jsx */
import { React, css, jsx, classNames, ThemeVariables } from 'jimu-core';
import { Icon } from 'jimu-ui';
import ReactResizeDetector from 'react-resize-detector';

const leftIcon = require('jimu-ui/lib/icons/arrow-left-14.svg');
const rightIcon = require('jimu-ui/lib/icons/arrow-right-14.svg');
const upIcon = require('jimu-ui/lib/icons/arrow-up-14.svg');
const downIcon = require('jimu-ui/lib/icons/arrow-down-14.svg');

interface Props {
  theme: ThemeVariables,
  className?: string,
  horizontal?: boolean,
  disablePrevious: boolean,
  disableNext: boolean,
  showArrow: boolean,
  onResize?: (width: number, height: number) => any;
  onArrowClick?: (previous: boolean) => any;
  children: any;
}

export class RollList extends React.PureComponent<Props> {
  contentNoded: React.RefObject<HTMLDivElement>;
  static defaultProps: Partial<Props> = {
    horizontal: true,
    onArrowClick: () => { },
    onResize: () => { }
  }

  getStyle = () => {
    const { horizontal, theme } = this.props;
    const gray200 = theme ? theme.colors.grays.gray200 : '';
    const gray400 = theme ? theme.colors.grays.gray400 : '';
    return css`
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: ${horizontal ? 'row' : 'column'};
      justify-content: space-between;
      align-items: center;
      .previous,
      .next {
        cursor: pointer;
        flex-grow: 0;
        flex-shrink: 0;
        width: ${horizontal ? '30px' : 'unset'};
        height: ${!horizontal ? '30px' : 'unset'};
        display: flex;
        align-items: center;
        justify-content: center;
        .jimu-icon{
          color:${gray400};
        }
        &.disabled {
          cursor: default;
          .jimu-icon{
            color:${gray200};
          }
        }
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-grow: 1;
        flex-shrink: 1;
        flex-wrap: nowrap;
        width: ${horizontal ? 'auto' : '100%'};
        height:${!horizontal ? 'auto' : '100%'};
      }
    `;
  }

  render() {
    const { horizontal, className, showArrow, disablePrevious, disableNext, onArrowClick, onResize } = this.props;
    return <div css={this.getStyle()} className={classNames('roll-list', className)}>
      {showArrow && <div onClick={() => onArrowClick(true)}
        className={classNames('previous', { disabled: disablePrevious })}><Icon size={14} icon={horizontal ? leftIcon : upIcon}></Icon></div>}
      <div className="content">
        {this.props.children}
        <ReactResizeDetector handleWidth handleHeight onResize={onResize}></ReactResizeDetector>
      </div>
      {showArrow && <div onClick={() => onArrowClick(false)}
        className={classNames('next', { disabled: disableNext })}><Icon size={14} icon={horizontal ? rightIcon : downIcon}></Icon></div>}
    </div >
  }
}