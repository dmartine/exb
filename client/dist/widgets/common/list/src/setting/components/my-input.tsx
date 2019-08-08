import { React} from 'jimu-core';
import { Input } from 'jimu-ui';
import classNames = require('classnames');

interface Props {
  value?: string;
  disabled?: boolean;
  type?: any;
  min?: string;
  max?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: any;
  title?: string;
}

interface State {
  value?: string
}

export class MyInput extends React.PureComponent<Props, State> {

  constructor(props){
    super(props);

    if(props.value){
      this.state = {
        value: props.value
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value && nextProps.value !== this.state.value){
      this.setState({
        value: nextProps.value
      })
    }
  }

  onTextInputChange = () => {
    this.props.onChange(this.state.value);
  }

  render(){
    const { min, max, className, style, disabled, type, title } = this.props;
    return (
    <Input className={classNames(className, 'my-input')} 
      value={this.state.value}
      min={min} max={max}
      title={title}
      type={type}
      style={style}
      disabled={disabled}
      onChange={(event) => { this.setState({ value: event.target.value}); }}
      onBlur={() => {this.onTextInputChange()}}
      onKeyUp={() => {this.onTextInputChange()}}
    />
    )
  }
}