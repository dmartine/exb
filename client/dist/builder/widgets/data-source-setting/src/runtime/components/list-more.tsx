import {React, classNames, InjectedIntl, IMDataSourceJson, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {getAppConfigAction, AppDataSourceManager} from 'jimu-for-builder';
import {ReactModal} from 'jimu-ui';

import {getElementPosition, getAllDsUsedWidgets} from '../utils';
import defaultMessages from '../translations/default';

import ListRemovePopup from './list-remove-popup';

ReactModal.setAppElement(document && document.getElementsByTagName('body')[0] as HTMLElement);

interface Props{
  dsJson: IMDataSourceJson;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  isShown: boolean;
  rootDom: HTMLElement;
  intl: InjectedIntl;
  onRemoveItem?: () => void;
  onRenameItem?: () => void;
}

interface State{
  isRemoveOptionsShown: boolean;
  selectedWidgets: string[];
}

export default class extends React.PureComponent<Props, State>{

  constructor(props){
    super(props);
    this.state = {
      isRemoveOptionsShown: false,
      selectedWidgets: []
    }
  }

  onRemove = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if(!this.props.onRemoveItem){
      return;
    }

    const dsId = this.props.dsJson && this.props.dsJson.id;
    const relatedWidgets = getAllDsUsedWidgets(dsId, this.props.widgets);

    if(relatedWidgets.length === 0){
      getAppConfigAction().removeDataSource(dsId).exec();
      AppDataSourceManager.getInstance().destroyDataSource(dsId);
    }else{
      this.setState({isRemoveOptionsShown: true});
    }
    this.props.onRemoveItem();
  }

  onRename = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if(!this.props.onRenameItem){
      return;
    }

    this.props.onRenameItem();
  }

  hideRemovePopup = () => {
    this.setState({isRemoveOptionsShown: false});
  }

  render(){
    if(!this.props.rootDom || !this.props.dsJson){
      return null;
    }
    const position = getElementPosition(this.props.rootDom);
    return (
      <div className={classNames('shadow ds-more-options', {'d-none': !this.props.isShown})}
        style={{left: position.x + this.props.rootDom.offsetWidth + 16, top: position.y + 15}}>

        {
          this.props.onRenameItem &&
          <div className="ds-more-option" onClick={this.onRename}>
            {this.props.intl.formatMessage({id: 'rename', defaultMessage: defaultMessages.rename})}
          </div>
        }
        {
          this.props.onRemoveItem &&
          <div className="ds-more-option" onClick={this.onRemove}>
            {this.props.intl.formatMessage({id: 'remove', defaultMessage: defaultMessages.remove})}
          </div>
        }

        <ListRemovePopup dsJson={this.props.dsJson} isShown={this.state.isRemoveOptionsShown} intl={this.props.intl}
          hideRemovePopup={this.hideRemovePopup} widgets={this.props.widgets}/>
      </div>
    );
  }
}
