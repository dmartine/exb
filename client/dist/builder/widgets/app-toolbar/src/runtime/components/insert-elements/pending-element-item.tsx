/** @jsx jsx */
import {React, jsx, ThemeVariables, themeUtils, AppMode, LayoutItemConstructorProps} from 'jimu-core';
import DraggableElement from './draggable-element';


interface Props{
  item: LayoutItemConstructorProps;
  appMode: AppMode;
}
export class _PendingElementItem extends React.PureComponent<Props & {theme: ThemeVariables}, {}>{

  constructor(props){
    super(props);
  }


  getListItemJSX = (item: LayoutItemConstructorProps) => {
    if(!item){
      return <div className="col-6" style={{visibility: 'hidden'}}></div>;
    }

    const ItemInCollapse = this.ItemInCollapse;
    return (
      <div key={item.name || item.id}>
        <DraggableElement item={item} fullLine={true} appMode={this.props.appMode} className="elements-collapse-item">
          {
            () => <ItemInCollapse item={item} />
          }
        </DraggableElement>
      </div>
    );
  }


  ItemInCollapse = ({item}: {item: LayoutItemConstructorProps}) => {
    return (
        <div title={item.label} className="d-flex align-items-center pl-3 pr-3 elements-collapse-item">
          <div className="elements-collapse-item-icon-container d-flex justify-content-center align-items-center">
            <img className="elements-collapse-item-icon" src={item.icon} />
          </div>
          <div className="text-truncate elements-collapse-item-label">{item.label}</div>
        </div>
    )
  }

  render(){
    return (
      <div className="w-100">
        {this.getListItemJSX(this.props.item)}
      </div>
    );
  }
}

export const PendingElementItem = themeUtils.withTheme(_PendingElementItem);
