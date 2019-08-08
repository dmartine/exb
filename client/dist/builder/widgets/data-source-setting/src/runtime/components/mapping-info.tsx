import {React, DataSource, classNames, InjectedIntl} from 'jimu-core';
import {Icon} from 'jimu-ui';

import {getDsTypeString} from '../utils';
import defaultMessages from '../translations/default';

const IconExchange = require('jimu-ui/lib/icons/exchange.svg');
const IconArrowLeft = require('jimu-ui/lib/icons/arrow-left.svg');

interface Props{
  curDs: DataSource;
  newDs: DataSource;
  isMappingReady: boolean;
  isExternalDsShown: boolean;
  intl: InjectedIntl;
  hideMapping: () => void;
  toggleExternalDs: (isShown: boolean) => void;
  isOpenSelectDataBtnHide?: boolean;
}

interface State{
}

export default class MappingInfo extends React.PureComponent<Props, State>{

  constructor(props){
    super(props);
  }

  onToggleExternalDsClicked = () => {
    this.props.toggleExternalDs(!this.props.isExternalDsShown);
  }

  onCancelClicked = () => {
    this.props.hideMapping();
  }

  render(){
    if(!this.props.curDs){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }

    const sourceDs = this.props.newDs || this.props.curDs;
    return (
      <div className="mapping-info">
        <div className="border-color-gray-300 m-2 ds-mapping-header">
          {
            this.props.isMappingReady &&
            <div className="d-inline-block ds-mapping-header-back" onClick={this.onCancelClicked}>
              <Icon icon={IconArrowLeft} />
              <span className="align-middle ml-2">
                {this.props.intl.formatMessage({id: 'cancel', defaultMessage: defaultMessages.cancel})}
              </span>
            </div>
          }
        </div>

        <div className="border-color-gray-300 ds-mapping-cur-info">
          <div className="flex-grow-1 m-2 align-self-center text-truncate ds-label" title={this.props.curDs.label || this.props.curDs.id}>
            {this.props.curDs.label || this.props.curDs.id}
          </div>
          <div className="d-flex m-2">
            <div className="d-flex bg-gray-300 ds-type h6">
              <div className="ml-1 mr-1 bg-success ds-type-icon"></div>
              <div className="flex-shrink-0 text-gray-700 mr-1 text-truncate ds-type-name">{getDsTypeString(this.props.curDs.type, this.props.intl)}</div>
            </div>
          </div>
        </div>

        <div className="m-2 d-flex flex-column ds-mapping-collapse">
          <div className="mt-1 d-flex justify-content-between">
            <span className="align-middle ml-1">Source</span>
            {
              !this.props.isOpenSelectDataBtnHide ?
              <span className="inline-block mr-1 bg-gray-300 ds-mapping-source" onClick={this.onToggleExternalDsClicked}>
                <Icon icon={IconExchange} size="12" className="text-dark" />
              </span> : null
            }
          </div>
          <div className={classNames('text-truncate pl-1 mt-2 w-100 ds-origin-label',
            {'border border-primary': !!this.props.newDs},
            {'border-gray-300': !this.props.newDs})} title={sourceDs.label || sourceDs.id}>
            <span className="align-middle">{sourceDs.label || sourceDs.id}</span>
          </div>
        </div>
      </div>
    );
  }
}
