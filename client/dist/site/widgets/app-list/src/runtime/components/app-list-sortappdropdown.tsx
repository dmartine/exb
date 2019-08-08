import {React, InjectedIntl} from 'jimu-core';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Icon} from 'jimu-ui';
import * as classnames from 'classnames';
import defaultMessages from '../translations/default';

interface State{
  isOpen: boolean;
}

interface Props{
  className?: string;
  style?: React.CSSProperties;
  onChange?: any;
  intl?: InjectedIntl;
}

let IconOrder = require('jimu-ui/lib/icons/app-sort.svg');

export default class Widget extends React.PureComponent<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  render(){
    const {className, style} = this.props;
    const classes = classnames(
      className,
      'widget-builder-list-sort'
    );

    return <div className={classes} style={style}>
      <Dropdown size="sm" isOpen={this.state.isOpen} onClick={evt => evt.stopPropagation()} toggle={() => this.setState({isOpen: !this.state.isOpen})}>
      <DropdownToggle className="border-0" style={{background: 'transparent'}}>
        <Icon width={20} height={16} icon={IconOrder} className="app-list-iconfill"/>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={() => {this.props.onChange('modified')}}>
          {this.props.intl.formatMessage({id: 'orderByModified', defaultMessage: defaultMessages.orderByModified})}
        </DropdownItem>
        <DropdownItem onClick={() => {this.props.onChange('title')}}>
          {this.props.intl.formatMessage({id: 'orderByTitle', defaultMessage: defaultMessages.orderByTitle})}
        </DropdownItem>
        <DropdownItem onClick={() => {this.props.onChange('numViews')}}>
          {this.props.intl.formatMessage({id: 'orderByView', defaultMessage: defaultMessages.orderByView})}
        </DropdownItem>
      </DropdownMenu>
      </Dropdown>
    </div>;
  }
}