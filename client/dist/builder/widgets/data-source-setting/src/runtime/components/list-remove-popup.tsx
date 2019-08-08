import {React, IMWidgetJson, IMDataSourceJson, InjectedIntl, Immutable, ImmutableObject, IMUseDataSource} from 'jimu-core';
import {getAppConfigAction} from 'jimu-for-builder';
import {Button, ReactModal} from 'jimu-ui';

import {getAllDsUsedWidgets} from '../utils';
import defaultMessages from '../translations/default';

ReactModal.setAppElement(document && document.getElementsByTagName('body')[0] as HTMLElement);

interface Props{
  dsJson: IMDataSourceJson;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  isShown: boolean;
  intl: InjectedIntl;
  hideRemovePopup: () => void;
}

interface State{
  selectedWidgets: string[];
  whetherRemoveAll: boolean;
}

export default class extends React.PureComponent<Props, State>{
  modalStyle = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: '400px'
    },
    overlay: {
      background: 'transparent'
    }
  };

  constructor(props){
    super(props);
    this.state = {
      selectedWidgets: [],
      whetherRemoveAll: false
    }
  }

  onCloseRemoveOptions = e => {
    this.stopPropagation(e);
    this.props.hideRemovePopup();
  }

  onCheckboxBtnClick = (selected, e) => {
    this.stopPropagation(e);
    const index = this.state.selectedWidgets.indexOf(selected);
    if(index < 0) {
      this.state.selectedWidgets.push(selected);
    }else{
      this.state.selectedWidgets.splice(index, 1);
    }
    this.setState({selectedWidgets: [...this.state.selectedWidgets]});
  }

  onRemoveWidgets = e => {
    this.stopPropagation(e);

    const action = getAppConfigAction();
    const usedWidgets = getAllDsUsedWidgets(this.props.dsJson.id, this.props.widgets);
    let useDs: IMUseDataSource[];
    let newUseDs: IMUseDataSource[];
    usedWidgets.forEach((w: IMWidgetJson) => {
      useDs = w.useDataSources.asMutable();
      // remove use data source: remove the data source and all child data source
      newUseDs = useDs.filter(u => u.dataSourceId !== this.props.dsJson.id && (!u.rootDataSourceId || u.rootDataSourceId !== this.props.dsJson.id));
      action.editWidget(w.set('useDataSources', Immutable(newUseDs)));
    });

    if(this.state.selectedWidgets.length > 0){
      this.state.selectedWidgets.forEach((widgetId, i) => {
        if(i !== this.state.selectedWidgets.length - 1){
          action.removeWidget(widgetId, true);
        }else{
          action.removeWidget(widgetId, true).removeDataSource(this.props.dsJson.id);
        }
      });
    }else{
      action.removeDataSource(this.props.dsJson.id);
    }

    action.exec();
    this.props.hideRemovePopup();
  }

  onToggleRemoveAll = e => {
    this.stopPropagation(e);
    this.setState({
      whetherRemoveAll: !this.state.whetherRemoveAll,
      selectedWidgets: !this.state.whetherRemoveAll ? getAllDsUsedWidgets(this.props.dsJson.id, this.props.widgets).map(w => w.id) : []
    });
  }

  stopPropagation = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  render(){
    if(!this.props.dsJson){
      return null;
    }

    return (
      <ReactModal
        isOpen={this.props.isShown}
        style={this.modalStyle}
        contentLabel="Remove Options"
        className="bg-gray-100"
      >
        <div className="d-flex justify-content-between border-color-gray-300 pl-2" style={{height: 60, border: 1}}>
          <div className="d-flex align-items-center">
            <h2>
              {this.props.intl.formatMessage({id: 'removeDataSource', defaultMessage: defaultMessages.removeDataSource})}
            </h2>
          </div>
        </div>

        <div className="p-2">
          <p>
            {this.props.intl.formatMessage({id: 'affectedWidgets', defaultMessage: defaultMessages.affectedWidgets})}
          </p>

          <div>
            {
              getAllDsUsedWidgets(this.props.dsJson.id, this.props.widgets).map((w: IMWidgetJson) => {
                if(w && w.id){
                  return <Button key={w.id} outline className="ml-2 mt-2" onClick={e => this.onCheckboxBtnClick(w.id, e)} active={this.state.selectedWidgets.indexOf(w.id) > -1}>
                    {w.label}
                  </Button>
                }
                return null;
              })
            }
          </div>
        </div>

        <div style={{position: 'absolute', bottom: 20, left: 0, right: 0}}>
          <div className="ml-2 mb-3">
            <Button color="primary" onClick={this.onToggleRemoveAll} active={this.state.whetherRemoveAll}>
              {this.props.intl.formatMessage({id: 'deleteBrokenWidgets', defaultMessage: defaultMessages.deleteBrokenWidgets})}
            </Button>
          </div>
          <div className="d-flex justify-content-end">
            <Button color="primary" className="mr-1" onClick={this.onRemoveWidgets}>
              {this.props.intl.formatMessage({id: 'removeDataSource', defaultMessage: defaultMessages.removeDataSource})}
            </Button>
            <Button color="primary" className="mr-3" onClick={this.onCloseRemoveOptions}>
              {this.props.intl.formatMessage({id: 'cancel', defaultMessage: defaultMessages.cancel})}
            </Button>
          </div>
        </div>
      </ReactModal>
    );
  }
}
