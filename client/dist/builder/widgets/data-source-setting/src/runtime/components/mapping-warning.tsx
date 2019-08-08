/** @jsx jsx */
import {React, themeUtils, ThemeVariables, jsx} from 'jimu-core';
import {ReactModal} from 'jimu-ui';

ReactModal.setAppElement(document && document.getElementsByTagName('body')[0] as HTMLElement);

interface Props{
  warning: string;
}

interface State{
}

class _MappingWarning extends React.PureComponent<Props & {theme: ThemeVariables}, State>{
  contentStyle = {
    position: 'fixed',
    bottom: '50px',
    top: 'auto',
    left: '0',
    right: 'auto',
    width: '280px',
    height: '90px',
    backgroundColor: this.props.theme.colors.grays.gray200,
    borderColor: this.props.theme.colors.danger,
    borderWidth: '1px',
    borderStyle: 'solid',
    zIndex: 5
  }

  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.warning){
      return null;
    }

    return (
      <ReactModal isOpen style={{content: this.contentStyle, overlay: this.contentStyle}}>
        {this.props.warning}
      </ReactModal>
    )
  }
}

const MappingWarning = themeUtils.withTheme(_MappingWarning);
export default MappingWarning;
