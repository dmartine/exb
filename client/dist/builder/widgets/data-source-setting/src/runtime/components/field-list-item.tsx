import {React, FieldSchema} from 'jimu-core';

//const IconClose = require('jimu-ui/lib/icons/close.svg');

interface ItemProps{
  field: FieldSchema;
  onRemove: (f: FieldSchema) => void;
  isDataSourceInited: boolean;
}
interface ItemState{
}
export default class extends React.PureComponent<ItemProps, ItemState>{

  constructor(props){
    super(props);
  }

  onRemove = () => {
    this.props.onRemove(this.props.field);
  }

  render(){
    if(!this.props.field){
      return null;
    }

    const field = this.props.field;
    return (
      <div className="container-fluid field-item">
        <div className="row align-items-center no-gutters">
          <div className="col-11 text-truncate field-label" title={field && (field.alias || field.name)}>{field && (field.alias || field.name)}</div>
          {/* <div className="col-1" onClick={this.onRemove} ><div className="text-right mw-50"><Icon icon={IconClose} className="text-dark" /></div></div> */}
        </div>
        <div className="row align-items-center no-gutters field-name">
          {/* <div className='col'>Original field label</div> */}
        </div>
      </div>
    );
  }
}