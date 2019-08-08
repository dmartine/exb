/** @jsx jsx */
import { React, jsx, css, ThemeVariables, Immutable, appActions, polished,
 IMViewJson, classNames, appConfigUtils, lodash } from 'jimu-core';
// import * as ReactDnd from 'jimu-core/dnd';
import { getAppConfigAction} from 'jimu-for-builder';
import {Input} from 'jimu-ui';
import {MyDropDown} from '../../../toc/src/runtime/components/my-dropdown';

interface ViewProps {
  sectionId: string;
  view: IMViewJson;
  theme: ThemeVariables;
  canRemove: boolean;
  selected: boolean;
  dispatch: any;
  index: number;
  onSelect: (vid: string) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  formatMessage: (id: string) => string
}

// interface DragSourceCollectedProps {
//   isDragging?: boolean
//   connectDragSource?: ReactDnd.ConnectDragSource
// }

// interface DropTargetCollectedProps {
//   connectDropTarget?: ReactDnd.ConnectDropTarget
// }

interface ViewState {
  editingLabel: boolean;
}

export default class ViewItem extends React.PureComponent<ViewProps,
ViewState> {
  inputRef: HTMLInputElement;
  dropDownItems;

  constructor(props) {
    super(props);
    this.state = {
      editingLabel: false
    };
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  _removeView() {
    const { view, sectionId, dispatch } = this.props;
    getAppConfigAction().removeView(view.id, sectionId, false).exec();
    dispatch(appActions.selectionChanged(null));
  }

  _duplicateView() {
    if(!this.props.view){
      return;
    }
    const appConfig = getAppConfigAction().appConfig;
    const nextId = appConfigUtils.getUniqueId(appConfig, 'view');
    getAppConfigAction().duplicateView(this.props.view.id, this.props.sectionId).exec();
    lodash.defer(() => {
      this.props.onSelect(nextId);
    });
  }

  _select = (e) => {
    e.stopPropagation();
    this.props.onSelect(this.props.view.id);
  }

  _enableEditing = (e) => {
    e.stopPropagation();
    this.setState({
      editingLabel: true
    });
  }

  _disableEditing = () => {
    this._onLabelUpdate(this.inputRef.value);
    this.setState({
      editingLabel: false
    });
  }

  _onLabelUpdate = (value) => {
    const { view } = this.props;
    const updatedView = Immutable(view).set('label', value);
    getAppConfigAction().editView(updatedView).exec();
  }

  _focusInput() {
    if (this.inputRef) {
      this.inputRef.select();
      this.inputRef.focus();
    }
  }

  componentDidMount() {
    if (this.inputRef) {
      this.inputRef.select();
      this.inputRef.focus();
    }
  }

  componentDidUpdate() {
    if (this.inputRef) {
      this.inputRef.select();
      this.inputRef.focus();
    }
  }

  _getStyle() {
    const {theme} = this.props;
    return css`
    padding: 5px 10px;
    cursor: pointer;

    .drop-down {
      visibility: hidden;
      .popover{
        .popover-inner {
          box-shadow: 0 0 0;
        }
      }
    }

    &.selected {
      background-color: ${theme.colors.cyans.cyan100};
    }

    &:hover {
      .drop-down {
        visibility: visible;
      }
    }

    &:not(.selected):hover {
      background-color: ${polished.rgba(theme.colors.cyans.cyan100, 0.4)};
    }
    `;
  }

  render() {
    const { theme, canRemove, selected/* , connectDragSource, connectDropTarget */ } = this.props;
    const {label, id} = this.props.view;
    const { editingLabel } = this.state;
    if (editingLabel) {
      this._focusInput();
    }

    const dropDownItems = [Immutable({
      label: this.formatMessage('remove'),
      event: this._removeView.bind(this),
      visible: canRemove === true
    }), Immutable({
      label: this.formatMessage('duplicate'),
      event: this._duplicateView.bind(this),
      visible: true
    }), Immutable({
      label: this.formatMessage('rename'),
      event: this._enableEditing.bind(this),
      visible: true
    })];

    const classes = classNames('d-flex justify-content-between w-100', {
      selected
    });

    return (
      <div css={this._getStyle()} className={classes} onClick={this._select}>
        <div className="d-flex">
          {/* <div><Icon icon={require('jimu-ui/lib/icons/more-12.svg')}></Icon></div> */}
          {!editingLabel && <div onDoubleClick={this._enableEditing}>{label}</div>}
          {editingLabel && <div><Input type="text" value={label} innerRef={el => {this.inputRef = el}}
            onBlur={this._disableEditing}></Input></div>}
        </div>
        <div className="drop-down toc-item-icon">
          <MyDropDown uId={id} theme={theme} items={dropDownItems}/>
        </div>
      </div>
    );
  }
}
