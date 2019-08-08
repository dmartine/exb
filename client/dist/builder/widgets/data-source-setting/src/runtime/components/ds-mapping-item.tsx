import {React, DataSource, ImmutableObject, IMWidgetJson, InjectedIntl} from 'jimu-core';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Icon} from 'jimu-ui';

import {getDsUsedWidgets, getSortedArrayByLabel, getDsIcon, getDsTypeString} from '../utils';

const IconWarning = require('jimu-ui/lib/icons/warning.svg');
const IconLinks = require('jimu-ui/lib/icons/links.svg');

interface ItemProps{
  curDs: DataSource;
  newParentDs: DataSource;
  selectedNewDs: DataSource;
  isDone: boolean;
  intl: InjectedIntl;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  updateMappedSchema: (curDs: DataSource, newDs: DataSource) => void;
}
interface ItemState{
  newDss: DataSource[];
  isNewDsDropdownOpen: boolean;
}
export default class extends React.PureComponent<ItemProps, ItemState>{
  __unmount = false;
  constructor(props){
    super(props);
    this.state = {
      isNewDsDropdownOpen: false,
      newDss: null
    }
  }

  componentDidMount(){
    this.__unmount = false;
    this.setNewChildDss(this.props.newParentDs);
  }

  componentDidUpdate(prevProps){
    if(prevProps.newParentDs !== this.props.newParentDs){
      this.setNewChildDss(this.props.newParentDs);
    }
  }

  componentWillMount(){
    this.__unmount = true;
  }

  toggleDropdown = () => {
    this.setState({isNewDsDropdownOpen: !this.state.isNewDsDropdownOpen});
  }

  setNewChildDss = (parentDs: DataSource) => {
    if(parentDs){
      this.setState({
        newDss: parentDs.getChildDataSources()
      });
    }
  }

  getSelectedDsLabel = (ds: DataSource): string => {
    return ds && (ds.label || ds.id);
  }

  onSelectedNewDsChange = (childDs: DataSource) => {
    this.props.updateMappedSchema(this.props.curDs, childDs);
  }

  DsInfo = ({curDs, selectedNewDs}:
    {curDs: DataSource, selectedNewDs: DataSource}) => {

    const relatedWidgets = getDsUsedWidgets(curDs.id, this.props.widgets);
    return (
      <div>
        <div className="d-flex align-items-center m-2">
          <div className="d-flex align-items-center justify-content-center mr-1 flex-shrink-0 border-gray-300 ds-thumbnail">
            <Icon icon={getDsIcon(curDs)} className="text-dark" size="22"/>
          </div>

          <div className="flex-grow-1 text-truncate p-1" title={curDs.label || curDs.id}>{curDs.label || curDs.id}</div>

          {
            !this.props.isDone ?
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Icon icon={IconWarning} className="text-red" size="12"/>
            </div> : null
          }
        </div>

        <div className="d-flex m-2">
          <div className="w-100 d-flex">
            <div className="d-flex bg-gray-300 ds-type h6 pl-1 pr-1">
              {/* <div className='ml-1 mr-1 bg-success ds-type-icon'></div> */}
              <div className="flex-shrink-0 text-gray-700 mr-1 text-truncate ds-type-name">{getDsTypeString(curDs.type, this.props.intl)}</div>
            </div>
          </div>

          <div className="flex-shrink-0 d-flex flex-row ds-related-widgets">
            <Icon icon={IconLinks} className="mr-1 text-dark" />
            <span className="align-middle">{relatedWidgets && relatedWidgets.length}</span>
          </div>
      </div>
    </div>
    )
  }

  render(){
    if(!this.props.curDs){
      return null;
    }
    const selectedNewDs =  this.props.selectedNewDs;
    const DsInfo = this.DsInfo;
    return (
      <div className="border-gray-300 bg-white m-2 list-item ds-mapping-ds-item">
        <DsInfo curDs={this.props.curDs} selectedNewDs={selectedNewDs} />

        <div className="align-items-center">
          <div className="ds-mapping-drop-down p-2">
            <ButtonDropdown isOpen={this.state.isNewDsDropdownOpen} className="w-100 drop-down"
              toggle={this.toggleDropdown}>
              <DropdownToggle caret outline className="w-100 text-truncate" disabled={!this.state.newDss}>
                {this.getSelectedDsLabel(selectedNewDs) || ''}
              </DropdownToggle>
              {
                this.state.newDss ?
                <DropdownMenu className="w-100 text-truncate">
                {
                  getSortedArrayByLabel(this.state.newDss).map((ds, index) => {
                    if(ds && ds.id){
                      return <DropdownItem key={index} onClick={() => {this.onSelectedNewDsChange(ds)}} title={ds.label || ds.id}>
                                <div className="text-truncate">{ds.label || ds.id}</div>
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

      </div>
    );
  }
}