/** @jsx jsx */
import {React, jsx, SerializedStyles, css, ThemeVariables, ImmutableObject, polished} from 'jimu-core';
import {Button, Icon, Popover, PopoverBody } from 'jimu-ui';
import { Fragment } from 'react';

interface DropDownItem{
  label: string;
  event: (evt) => void;
  visible: boolean;
}
export type IMDropDownItem = ImmutableObject<DropDownItem>

interface Props{
  items: IMDropDownItem[],
  theme: ThemeVariables,
  uId: string,
  icon?: any,
  direction?: Popper.Placement,
  disabled?: boolean
}
export class MyDropDown extends React.PureComponent<Props, {isOpen: boolean}>{

  constructor(props){
    super(props);
    this.state = {isOpen: false}
  }

  onDropDownToggle = (evt) => {
    evt.stopPropagation();
    if(!this.state.isOpen){
      if(document.onclick){
        document.onclick(evt);
      }
      document.onclick = evt => {
        this.setState({
          isOpen: false
        })
        document.onclick = undefined;
        return false;
      }
    }else{
      document.onclick = undefined;
    }

    this.setState({isOpen: !this.state.isOpen});
  }

  getStyle = (): SerializedStyles => {
    let theme = this.props.theme;
    return css`
      .popover-body{
        box-shadow: 0 2px 6px ${polished.rgba(theme.colors.white, 0.2)};
        padding: 0;
        .item-text{
          width: 100%;
          color:${theme.colors.black};
          padding: 10px 10px;
          user-select:none;
          font-size: ${theme.typography.fontSizeBase};
        }

        .item-text:hover{
          cursor:pointer;
          background-color: ${this.props.theme.colors.primary};
        }

        .item-line{
          width: 100%;
          height: 1px;
          background-color: ${this.props.theme.colors.grays.gray300};
        }
      }
    `
  }

  onItemClick = (evt, item) => {
    document.onclick = undefined;
    this.setState({
      isOpen: false
    })
    item.event(evt);
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  render(){
    let {items, icon, direction, disabled} = this.props;
    let modifiers = {
      preventOverflow: {
        escapeWithReference: true
      },
      offset: { offset: '0, 0' }
    };
    return <div className="my-dropdown" id={`toc-item-my-dropdown-${this.props.uId}`} css={this.getStyle()}>
      <Button disabled={disabled} size={'sm'} color={'link'} icon className=" my-dropdown-btn h-100"  onClick={this.onDropDownToggle}>
        {icon || <Icon size={12} icon={require('jimu-ui/lib/icons/more-12.svg')}/>}
      </Button>
      <Popover css={this.getStyle()} placement={direction || 'right-start'} isOpen={this.state.isOpen} target={`toc-item-my-dropdown-${this.props.uId}`}
         hideArrow  modifiers={modifiers}>
          <PopoverBody className="justify-content-between">
            {items.map((item: IMDropDownItem, i: number) => {
              return item.visible && <Fragment key={i}>
                <div className="item-text text-left" onClick={(evt) => this.onItemClick(evt, item)}>{item.label}</div>
                {/* {i !== items.length - 1 && <div className="item-line" />} */}
              </Fragment>
            })}
          </PopoverBody>
      </Popover>
    </div>;
  }
}