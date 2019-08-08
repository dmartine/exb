/** @jsx jsx */
import { React, ThemeVariables, SerializedStyles, css, jsx } from 'jimu-core';
import { Input, Button, Icon } from 'jimu-ui';

interface Props {
  theme: ThemeVariables;
  placeholder?: string;
  searchText?: string;
  onSearchTextChange?: (searchText: string) => void;
  onSubmit?: (searchText: string) => void;
  className?: string;
  showClear?: boolean;
  hideSearchIcon?: boolean;
  inputRef?: (ref: HTMLInputElement) => void,
  onFocus?: (evt) => void,
  onBlur?: (evt) => void,
}

interface Stats {
  searchText: string
}

export default class SearchBox extends React.PureComponent<Props, Stats> {

  constructor(props){
    super(props);
    this.state = {
      searchText: props.searchText || ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.searchText !== this.state.searchText){
      this.setState({
        searchText: nextProps.searchText
      })
    }
    
  }

  handleChange = searchText => {
    this.setState({
      searchText: searchText
    }, () => {
      const {onSearchTextChange} = this.props;
      if(onSearchTextChange){
        onSearchTextChange(searchText)
      }
    })
    
  }

  handleSubmit = value => {
    const {onSubmit} = this.props;
    if(onSubmit){
      onSubmit(value)
    }
  }

  onKeyUp = (evt) => {
    if(!evt || !evt.target) return;
    if (evt.keyCode === 13) {
      
      this.handleSubmit(evt.target.value);
    }
  }

  handleClear = evt => {
    this.setState({
      searchText: ''
    })
    evt.stopPropagation();
  }

  getStyle = (): SerializedStyles => {
    const {hideSearchIcon, theme} = this.props;
    return css`
      position: relative;
      .toc-search-input {
        cursor: pointer;
        padding-left: ${hideSearchIcon ? '3px' : '24px'};
        border: 0;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-color: ${theme.colors.primary};
        background: transparent;
      }

      .searchbox-icon-btn {
        position: absolute;
        &.submit {
          padding-left: 0;
          left: 0;
          top: 0;
        }
        &.clear {
          right: 0;
          top: 0;
        }
        
      }
    `
  }

  render() {
    const { placeholder, className, showClear, hideSearchIcon, inputRef, onFocus, onBlur } = this.props;
    const {searchText} = this.state;
    
    return (
        
      <div css={this.getStyle()} className={className}>
        <Input className="toc-search-input" 
          ref={inputRef}
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)} 
          onBlur={onBlur}
          onFocus={onFocus}
          value={searchText} 
          onKeyDown ={ (e) => this.onKeyUp(e)}>
        </Input>
        {!hideSearchIcon &&
          <Button color="link" className="searchbox-icon-btn submit icon"
            onClick={evt => this.handleSubmit(this.state.searchText)} >
            <Icon size={12} icon={require('jimu-ui/lib/icons/search-24.svg')}/>
          </Button>
        }
        {showClear &&
          <Button color="link" className="searchbox-icon-btn clear icon"
            onClick={this.handleSubmit} >
            <Icon size={12} icon={require('jimu-ui/lib/icons/close-12.svg')}/>
          </Button>
        }
      </div>
      
    )
  }
}
