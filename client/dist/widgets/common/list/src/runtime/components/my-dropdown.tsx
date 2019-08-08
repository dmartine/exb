/** @jsx jsx */
import {React, jsx, SerializedStyles, css, ThemeVariables, ImmutableObject, polished} from 'jimu-core';
import {Button, Popover, PopoverBody, Icon } from 'jimu-ui';
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
}
export default class MyDropDown extends React.PureComponent<Props, {isOpen: boolean}>{

  constructor(props){
    super(props);
    this.state = {isOpen: false}
  }

  onDropDownToggle = (evt) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
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
          background-color: ${this.props.theme.colors.white};
        }

        .item-text:hover{
          cursor:pointer;
          background-color: ${this.props.theme.colors.grays.gray200};
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

  onDropDownMouseClick = (evt) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
  }

  render(){
    let {items} = this.props;
    let modifiers = {
      preventOverflow: {
        escapeWithReference: true
      },
      offset: { offset: '0, 0' }
    };
    return <div className="my-dropdown" css={this.getStyle()}>
      <Button size={'sm'} color={'link'} icon id={`my-dropdown-${this.props.uId}`} onMouseDown={this.onDropDownMouseClick} onClick={this.onDropDownToggle}>
        <Icon size={16} icon={require('jimu-ui/lib/icons/tool-sync.svg')} />
      </Button>
      <Popover css={this.getStyle()} placement="bottom-start" isOpen={this.state.isOpen} target={`my-dropdown-${this.props.uId}`}
         hideArrow  modifiers={modifiers}>
          <PopoverBody className="justify-content-between">
            {items.map((item: IMDropDownItem, i: number) => {
              return item.visible && <Fragment key={i}>
                <div className="item-text text-left" onMouseDown={(evt) => this.onItemClick(evt, item)}>{item.label}</div>
                {/* {i !== items.length - 1 && <div className="item-line" />} */}
              </Fragment>
            })}
          </PopoverBody>
      </Popover>
    </div>;
  }
}