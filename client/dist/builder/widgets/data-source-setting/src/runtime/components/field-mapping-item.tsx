import {React, FieldSchema, DataSourceSchema} from 'jimu-core';
import {DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown} from 'jimu-ui';

import {getSortedKeys} from '../utils';

interface ItemProps{
  curField: FieldSchema;
  newSchema: DataSourceSchema;
  selectedNewField: FieldSchema;
  updateMappedSchema: (curField: FieldSchema, newField: FieldSchema) => void;
}
interface ItemState{
  isDropdownOpen: boolean;
}
export default class extends React.PureComponent<ItemProps, ItemState>{
  constructor(props){
    super(props);
    this.state = {
      isDropdownOpen: false
    }
  }

  toggleDropdown = () => {
    this.setState({isDropdownOpen: !this.state.isDropdownOpen});
  }

  onDropDownItemClicked = (newField: FieldSchema) => {
    this.props.updateMappedSchema(this.props.curField, newField);
  }
  render(){
    if(!this.props.curField || !this.props.newSchema){
      return null;
    }
    const newSchema = this.props.newSchema;
    const selectedNewField = this.props.selectedNewField;
    return (
      <div className="m-2 filed-mapping-item">
        <div>{this.props.curField.alias || this.props.curField.name}</div>
        <div className="ds-mapping-drop-down p-2">
            <ButtonDropdown isOpen={this.state.isDropdownOpen} className="w-100 drop-down"
              toggle={this.toggleDropdown}>
              <DropdownToggle caret outline className="w-100 text-truncate" disabled={!newSchema || !newSchema.fields}>
                {(selectedNewField && (selectedNewField.alias || selectedNewField.name)) || ''}
              </DropdownToggle>
              {
                newSchema && newSchema.fields ?
                <DropdownMenu className="w-100 text-truncate">
                {
                  getSortedKeys(newSchema.fields).map((jimuName, index) => {
                    if(newSchema.fields[jimuName] && newSchema.fields[jimuName].esriType === this.props.curField.esriType){
                      return <DropdownItem key={index} onClick={() => this.onDropDownItemClicked(newSchema.fields[jimuName])}>
                              <div className="text-truncate">{(newSchema.fields[jimuName].alias || newSchema.fields[jimuName].name)}</div>
                            </DropdownItem>
                    }
                    return null;
                  }
                  )
                }
                </DropdownMenu>
              : null
              }
            </ButtonDropdown>
          </div>
      </div>
    )
  }
}