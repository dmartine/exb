/** @jsx jsx */
import {React, ThemeVariables, SerializedStyles, InjectedIntl, polished, Keyboard,
  css, jsx, classNames, IMState, ImmutableObject, UrlParameters, getAppStore, themeUtils, ReactRedux, IMAppConfig, Immutable} from 'jimu-core';
import {Icon, Button, Popover, PopoverBody, ReactModal} from 'jimu-ui';
import {appStateHistoryActions} from 'jimu-for-builder';
import {appServices} from 'builder/common';
import defaultMessages from './translations/default';
import {SaveLoading} from './save-loading';

ReactModal.setAppElement(document && document.getElementsByTagName('body')[0] as HTMLElement);

interface  StateHistory {
  past: IMState[];
  future: IMState[];
}

interface State {
  publishState: string;
  saveState: string;
  savedAppConfig: IMAppConfig;
  publishedAppConfig: IMAppConfig;
  publishOptionsListOpen: boolean;
  moreToolListOpen: boolean;
  isPublished: boolean;
  isToastNote: boolean;
  noteText: string;

  toolTipUndoOpen: boolean;
  toolTipRedoOpen: boolean;
  toolTipSaveOpen: boolean;
  toolTipPreviewOpen: boolean;
  toolTipPublishOpen: boolean;
  toolTipPublishOptionsOpen: boolean;
}

interface ExtraProps {
  theme?: ThemeVariables;
  stateHistory?: StateHistory;
  queryObject?: ImmutableObject<UrlParameters>;
  intl?: InjectedIntl;
  appConfig?: IMAppConfig;
  currentAppId?: string;
  portalUrl?: string;

  onSaveStatusChanged?: (isSaved: boolean) => void;
}

let IconUndo = require('jimu-ui/lib/icons/undo.svg');
let IconRedo = require('jimu-ui/lib/icons/redo.svg');
let IconSave = require('jimu-ui/lib/icons/save.svg');
let IconPreview = require('jimu-ui/lib/icons/preview.svg');
let IconArrowDown = require('jimu-ui/lib/icons/arrow-down-8.svg');
let IconMore = require('jimu-ui/lib/icons/more-horizontal.svg');

class ToolListComponentInner extends React.PureComponent<ExtraProps, State> {
  fontSizeBase = 14;
  panelWidth = `${210 / this.fontSizeBase}rem`;
  defaultModalStyle = {position: 'fixed', top: '90px', width: '500px', backgroundColor: 'none',
    height: '50px', marginLeft: 'auto',  marginRight: 'auto'};
  modalStyle = {content: this.defaultModalStyle, overlay: this.defaultModalStyle}

  save: string;
  saved: string;
  saving: string;
  saveError: string;
  saveSuccess: string;
  publish: string;
  published: string;
  publishing: string;
  publishError: string;
  publishSuccess: string;
  undo: string;
  redo: string;
  preview: string;
  publishTo: string;
  publishOptions: string;
  copySuccess: string;
  changeShareSettings: string;
  viewPublishedItem: string;
  copyPublishedItemLink: string;

  constructor(props) {
    super(props);
    this.save = this.props.intl.formatMessage({id: 'save', defaultMessage: defaultMessages.save});
    this.saved = this.props.intl.formatMessage({id: 'saved', defaultMessage: defaultMessages.saved});
    this.saving = this.props.intl.formatMessage({id: 'saving', defaultMessage: defaultMessages.saving});
    this.saveError = this.props.intl.formatMessage({id: 'saveError', defaultMessage: defaultMessages.saveError});
    this.saveSuccess = this.props.intl.formatMessage({id: 'saveSuccess', defaultMessage: defaultMessages.saveSuccess});
    this.publish = this.props.intl.formatMessage({id: 'publish', defaultMessage: defaultMessages.publish});
    this.published = this.props.intl.formatMessage({id: 'published', defaultMessage: defaultMessages.published});
    this.publishing = this.props.intl.formatMessage({id: 'publishing', defaultMessage: defaultMessages.publishing});
    this.publishError = this.props.intl.formatMessage({id: 'publishError', defaultMessage: defaultMessages.publishError});
    this.publishSuccess = this.props.intl.formatMessage({id: 'publishSuccess', defaultMessage: defaultMessages.publishSuccess});
    this.undo = this.props.intl.formatMessage({id: 'undo', defaultMessage: defaultMessages.undo});
    this.redo = this.props.intl.formatMessage({id: 'redo', defaultMessage: defaultMessages.redo});
    this.preview = this.props.intl.formatMessage({id: 'preview', defaultMessage: defaultMessages.preview});
    this.publishTo = this.props.intl.formatMessage({id: 'publishTo', defaultMessage: defaultMessages.publishTo});
    this.publishOptions = this.props.intl.formatMessage({id: 'publishOptions', defaultMessage: defaultMessages.publishOptions});
    this.copySuccess = this.props.intl.formatMessage({id: 'copySuccess', defaultMessage: defaultMessages.copySuccess});
    this.changeShareSettings = this.props.intl.formatMessage({id: 'changeShareSettings', defaultMessage: defaultMessages.changeShareSettings});
    this.viewPublishedItem = this.props.intl.formatMessage({id: 'viewPublishedItem', defaultMessage: defaultMessages.viewPublishedItem});
    this.copyPublishedItemLink = this.props.intl.formatMessage({id: 'copyPublishedItemLink', defaultMessage: defaultMessages.copyPublishedItemLink});

    this.state = {
      publishState: this.publish,
      saveState: this.save,
      savedAppConfig: null,
      publishedAppConfig: null,
      toolTipUndoOpen: false,
      toolTipRedoOpen: false,
      toolTipSaveOpen: false,
      toolTipPreviewOpen: false,
      toolTipPublishOpen: false,
      toolTipPublishOptionsOpen: false,
      publishOptionsListOpen: false,
      moreToolListOpen: false,
      isPublished: false,
      noteText: '',
      isToastNote: false
    }
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    let toolbar_black = theme.colors && theme.colors.black ? theme.colors.black : 'black';

    return css`
      .toollist-tooltip {
        background-color: ${theme.colors.grays.gray100}
      }

      .toollist-drop-icon {
        fill: ${theme.colors.black};
      }

      .toollist {

        .toollist-length-screen {
          width: ${polished.rem(0)};
          overflow: hidden;
        }

        @media only screen and (min-width: 1080px) {
          .toollist-length-screen {
            width: ${polished.rem(36)};
          }
        }

        @media only screen and (min-width: 1173px) {
          .toollist-length-screen {
            width: ${polished.rem(36 * 2)};
          }
        }

        @media only screen and (min-width: 1240px) {
          .toollist-length-screen {
            width: ${polished.rem(36 * 3)};
          }
        }

        @media only screen and (min-width: 1245px) {
          .toollist-length-screen {
            width: ${polished.rem(36 * 4)};
          }
        }

        .toollist-more {
          width: ${polished.rem(36)};
          overflow: hidden;
        }

        @media only screen and (min-width: 1245px) {
          .toollist-more {
            width: ${polished.rem(0)};
          }
        }


        .toollist-item {
          padding: 0;
          border: 0;
          background-color: inherit;

          &:hover {
            background-color: ${theme.colors.grays.gray100};
          }
        }

        .toollist-item-icon {
          margin-left: ${polished.rem(10)};
          margin-right: ${polished.rem(10)};
        }

        .toollist-item-click:focus {
          outline: none;
          box-shadow: none !important;
        }

        .toollist-publish {
          border-radius: 2px;
          min-width: 5rem;
          line-height: 0;
          height: 28px;
          color: ${theme.colors.black};
        }

        .toollist-publish:focus {
          outline: none;
          box-shadow: none !important;
        }

        .btn {
          &.disabled,
          &:disabled {
            background-color: transparent;
          }
          &[class*="btn-outline-"] {
            border-color: ${theme.colors.grays.gray400};
          }
        }

        .btn:not(:disabled):not(.disabled):active, 
        .btn:not(:disabled):not(.disabled).active, 
        .show > .btn.dropdown-toggle {
          color: ${toolbar_black};
        }
      }

      .popover-item {



        .publish-options-item {
          color: ${theme.colors.black};
          cursor: pointer;
          height: 40px;
          padding-left: 12px;
          padding-right: 12px;
          font-size: 0.8rem;

          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.black}
          }
        }

        .publish-options-item-disabled {
          color: ${theme.colors.grays.gray600};
          height: 40px;
          padding-left: 12px;
          padding-right: 12px;
          font-size: 0.8rem;
        }

        a {
          text-decoration: none;
        }

        .more-tool-container-screen {
          width: ${polished.rem(40 * 4)};
          overflow: hidden;
        }

        @media only screen and (min-width: 1080px) {
          .more-tool-container-screen {
            height: ${polished.rem(40 * 3)};
          }
        }

        @media only screen and (min-width: 1173px) {
          .more-tool-container-screen {
            height: ${polished.rem(40 * 2)};
          }
        }

        @media only screen and (min-width: 1240px) {
          .more-tool-container-screen {
            height: ${polished.rem(40 * 1)};
          }
        }

        @media only screen and (min-width: 1245px) {
          .more-tool-container-screen {
            height: ${polished.rem(0)};
          }
        }

        .more-tool-container {
          color: ${theme.colors.grays.gray600};
          width: ${polished.rem(38)};
          overflow: hidden;

          .more-tool-container-item {
            color: ${toolbar_black};
            height: ${polished.rem(40)};
            background-color: inherit;
            border: 0;
            padding: 0;

            &:hover {
              background-color: ${theme.colors.grays.gray100};
            }
          }

          .more-tool-a {
            width: ${polished.rem(40)};
            height: ${polished.rem(40)};
          }

          .more-tool-container-item-disabled {
            color: ${theme.colors.grays.gray600};

            &:hover {
              background-color: inherit !important;
            }
          }

          .toollist-item {
            padding: 0;
            border: 0;
            background-color: inherit;
  
            &:hover {
              background-color: ${theme.colors.grays.gray100};
            }
          }
  
          .toollist-item-icon {
            margin-left: ${polished.rem(10)};
            margin-right: ${polished.rem(10)};
          }
  
          .toollist-item-click:focus {
            outline: none;
            box-shadow: none !important;
          }
        }
      }

      .toast-note {
        font-size: 16px;
        color: ${theme.colors.grays.gray900};
        box-shadow: 0 2px 6px 0 rgba(255, 255, 255, 0.2);
      }
    `;
  }

  componentDidMount () {
    window.onbeforeunload = () => {
      if (this.checkIsSaved()) {
        return;
      } else {
        return false;
      }
    }
  }

  componentWillUnmount () {
    window.onbeforeunload = null;
  }

  componentDidUpdate () {
    this.props.onSaveStatusChanged && this.props.onSaveStatusChanged(this.checkIsSaved());
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentAppId !== this.props.currentAppId) {
      appServices.getAppItemData(newProps.currentAppId).then(result => {
        if (result && result.__not_publish) {
          this.setState({
            isPublished: false
          })
        } else if (result && !result.__not_publish) {
          this.setState({
            isPublished: true
          })
        } else {
          this.setState({
            isPublished: false
          })
        }
      })

      getAppStore().dispatch(appStateHistoryActions.InBuilderAppConfigClear());
    }

    if (newProps.appConfig) {
      if (this.state.savedAppConfig) {
        if (newProps.appConfig !== this.state.savedAppConfig) {
          this.setState({saveState: this.save});
        } else {
          this.setState({saveState: this.saved});
        }
      } else if (this.state.saveState === this.saveError) {
        this.setState({saveState: this.save});
      }

      if (this.state.publishedAppConfig) {
        if (newProps.appConfig !== this.state.publishedAppConfig) {
          this.setState({publishState: this.publish});
        }
      } else if (this.state.publishState === this.publishError) {
        this.setState({publishState: this.publish});
      }
    }
  }

  checkIsSaved = () => {
    if (this.state.saveState === this.saved || 
      (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1)) {
      return true;
    } else {
      return false;
    }
  }

  onUndo = () => {
    if (this.props.stateHistory.past.length <= 1) {
      return;
    }
    getAppStore().dispatch(appStateHistoryActions.InBuilderAppConfigUndo());
  }

  onRedo = () => {
    if (this.props.stateHistory.future.length <= 0) {
      return;
    }
    getAppStore().dispatch(appStateHistoryActions.InBuilderAppConfigRedo());
  }

  onSaveClick = (isDisableNote?: boolean): Promise<any> => {
    this.setState({saveState: this.saving});

    return appServices.saveApp(this.props.queryObject.id, this.props.appConfig).then(item => {
      this.setState({
        saveState: this.saved,
        savedAppConfig: Immutable(this.props.appConfig)
      });

      !isDisableNote && this.toastNote(this.saveSuccess);
      return Promise.resolve();
    }, err => {
      console.error(err);

      this.setState({saveState: this.saveError});
      !isDisableNote && this.toastNote(this.saveError);
      return Promise.reject(err);
    });
  }

  onPublishClick = () => {
    if (this.state.publishState === this.publishing) {
      return;
    }

    this.setState({publishState: this.publishing});

    if (this.state.saveState === this.saved || (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1)) {
      appServices.publishApp(this.props.queryObject.id).then(() => {
        this.setState({
          isPublished: true,
          publishState: this.published,
          publishedAppConfig: Immutable(this.props.appConfig)
        });
        this.toastNote(this.publishSuccess);
      }, err => {
        console.error(err);
        this.toastNote(this.publishError);
        this.setState({publishState: this.publishError});
      });
    } else {
      this.onSaveClick(true).then(() => {
        appServices.publishApp(this.props.queryObject.id).then(() => {
          this.setState({
            isPublished: true,
            publishState: this.published,
            publishedAppConfig: Immutable(this.props.appConfig)
          });
          this.toastNote(this.publishSuccess);
        }, err => {
          console.error(err);
          this.toastNote(this.publishError);
          this.setState({publishState: this.publishError});
        });
      }, err => {
        console.error(err);
        this.toastNote(this.saveError);
        this.setState({publishState: this.publishError});
      })
    }
  }

  onToggleToolTipUndo = () => {
    this.setState({
      toolTipUndoOpen: !this.state.toolTipUndoOpen,
      toolTipRedoOpen: false,
      toolTipSaveOpen: false,
      toolTipPreviewOpen: false,
      toolTipPublishOpen: false,
      toolTipPublishOptionsOpen: false
    });
  }

  onToggleToolTipRedo = () => {
    this.setState({
      toolTipUndoOpen: false,
      toolTipRedoOpen: !this.state.toolTipRedoOpen,
      toolTipSaveOpen: false,
      toolTipPreviewOpen: false,
      toolTipPublishOpen: false,
      toolTipPublishOptionsOpen: false
    });
  }

  onToggleToolTipSave = () => {
    this.setState({
      toolTipUndoOpen: false,
      toolTipRedoOpen: false,
      toolTipSaveOpen: !this.state.toolTipSaveOpen,
      toolTipPreviewOpen: false,
      toolTipPublishOpen: false,
      toolTipPublishOptionsOpen: false
    });
  }

  onToggleToolTipPreview = () => {
    this.setState({
      toolTipUndoOpen: false,
      toolTipRedoOpen: false,
      toolTipSaveOpen: false,
      toolTipPreviewOpen: !this.state.toolTipPreviewOpen,
      toolTipPublishOpen: false,
      toolTipPublishOptionsOpen: false
    });
  }

  onToggleToolTipPublish = () => {
    this.setState({
      toolTipUndoOpen: false,
      toolTipRedoOpen: false,
      toolTipSaveOpen: false,
      toolTipPreviewOpen: false,
      toolTipPublishOpen: !this.state.toolTipPublishOpen,
      toolTipPublishOptionsOpen: false
    });
  }

  onToggleToolTipPublishOptions = () => {
    this.setState({
      toolTipUndoOpen: false,
      toolTipRedoOpen: false,
      toolTipSaveOpen: false,
      toolTipPreviewOpen: false,
      toolTipPublishOpen: false,
      toolTipPublishOptionsOpen: !this.state.toolTipPublishOptionsOpen
    });
  }

  togglePublishOptionList = () => {
    this.setState({
      publishOptionsListOpen: !this.state.publishOptionsListOpen,
      toolTipPublishOptionsOpen: false
    });
  }

  toggleMoreToolList = () => {
    this.setState({
      moreToolListOpen: !this.state.moreToolListOpen
    });
  }

  copyPublishUrlToClipBoard = () => {
    let publishUrl = window.location.origin + (window.jimuConfig.useStructuralUrl ? `/stemapp/${this.props.queryObject.id}/` : `/stemapp/?id=${this.props.queryObject.id}`);
    let textArea = document.createElement('input');
    textArea.value = publishUrl;
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.toastNote(this.copySuccess);

    this.setState({
      publishOptionsListOpen: false
    });
  }

  isInOnLine = () => {
    if (this.props.portalUrl.match('arcgis.com')) {
      return true;
    } else {
      return false;
    }
  }

  toastNote = (noteText: string) => {
    this.setState({
      isToastNote: true,
      noteText: noteText
    }, () => {
      setTimeout(() => {
        this.setState({
          isToastNote: false,
          noteText: ''
        })
      }, 2000)
    })
  }

  saveForkeyBoard = () => {
    if (this.state.saveState === this.saved || 
      (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1) || this.state.saveState === this.saving) {
      return false;
    } else {
      this.onSaveClick();
      return false;
    }
  }

  isMac = () => {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  }

  render() {
    let modifiers = {
      preventOverflow: {
        escapeWithReference: true
      },
      offset: { offset: '0, 6' }
    };

    let modifiersForMoreTool = {
      preventOverflow: {
        escapeWithReference: true
      },
      offset: { offset: '0, 1' }
    };

    return <div className="float-right d-flex flex-row align-items-center h-100" css={this.getStyle(this.props.theme)}>
      {this.isMac() && <Keyboard bindings={{'command+keys': () => { this.saveForkeyBoard(); }}}/>}
      {!this.isMac() && <Keyboard bindings={{'ctrl+keys': () => { this.saveForkeyBoard(); }}}/>}
      <div className="h-100 toollist d-flex flex-row align-items-center justify-content-end">
        <div className="toollist-length-screen h-100 d-flex flex-wrap align-items-center justify-content-start">
          <div id="tooltip_undo" className="h-100">
            <Button className={classNames('d-flex flex-column align-items-center toollist-item h-100',
              'justify-content-center', {'toollist-item-click': !(this.props.stateHistory.past.length <= 1)})}
              color="light" title={this.undo}
              disabled={this.props.stateHistory.past.length <= 1}
              onClick={this.onUndo}>
              <Icon icon={IconUndo} className="toollist-item-icon" width={16} height={16}></Icon>
            </Button>
          </div>
          {/* <Tooltip css={this.getStyle(this.props.theme)} innerClassName="toollist-tooltip" placement="bottom" isOpen={this.state.toolTipUndoOpen} 
            target="tooltip_undo" hideArrow={false} toggle={this.onToggleToolTipUndo}>{this.undo}
          </Tooltip> */}
          <div id="tooltip_redo" className="h-100">
            <Button className={classNames('d-flex flex-column align-items-center toollist-item h-100',
              'justify-content-center', {'toollist-item-click': !(this.props.stateHistory.future.length < 1)})}
              color="light" title={this.redo}
              disabled={this.props.stateHistory.future.length < 1}
              onClick={this.onRedo}>
              <Icon icon={IconRedo} className="toollist-item-icon" width={16} height={16}></Icon>
            </Button>
          </div>
          {/* <Tooltip css={this.getStyle(this.props.theme)} placement="bottom" isOpen={this.state.toolTipRedoOpen} innerClassName="toollist-tooltip" target="tooltip_redo" 
            hideArrow={false} toggle={this.onToggleToolTipRedo}>{this.redo}
          </Tooltip> */}
          <div id="tooltip_save" className="h-100">
            <Button className={classNames('d-flex flex-column align-items-center toollist-item h-100',
              'justify-content-center', {'toollist-item-click':
              !(this.state.saveState === this.saved || (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1))})}
              color="light" title={this.state.saveState}
              disabled={this.state.saveState === this.saved || (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1)}
              onClick={() => {this.onSaveClick()}}>
              {this.state.saveState !== this.saving && <Icon icon={IconSave} className="toollist-item-icon" width={16} height={16}></Icon>}
              {this.state.saveState === this.saving && <div style={{width: '16px', height: '16px'}} className="toollist-item-icon">
                <SaveLoading theme={this.props.theme}/>
              </div>}
            </Button>
          </div>
          {/* <Tooltip css={this.getStyle(this.props.theme)} placement="bottom" isOpen={this.state.toolTipSaveOpen} innerClassName="toollist-tooltip" 
            target="tooltip_save" hideArrow={false} toggle={this.onToggleToolTipSave}>{this.state.saveState}
          </Tooltip> */}
          <div id="tooltip_preview" className="h-100">
            <a className="m-0 p-0 toollist-item-click btn h-100 border-0" href={window.jimuConfig.useStructuralUrl ? 
              `../stemapp/${this.props.queryObject.id}/?draft=true` : `../stemapp/?id=${this.props.queryObject.id}&draft=true`}  rel="noreferrer" target="_blank">
              <Button className={classNames('d-flex flex-column align-items-center toollist-item h-100',
                'justify-content-center toollist-item-click h-100 border-0')} title={this.preview}
                color="light">
                <Icon icon={IconPreview} className="toollist-item-icon" width={16} height={16}></Icon>
              </Button>
            </a>
          </div>
        </div>
        <div className="h-100 toollist-more">
          <Button id="more_tool_popover" className={classNames('d-flex flex-column align-items-center toollist-item h-100 justify-content-center')}
            color="light" onClick={this.toggleMoreToolList}>
            <Icon icon={IconMore} className="toollist-item-icon" width={16} height={16}></Icon>
          </Button>
          <Popover css={this.getStyle(this.props.theme)} className="mt-0" style={{backgroundColor: this.props.theme && this.props.theme.colors ? 
            this.props.theme.colors.grays.gray200 : '', boxShadow: '0 0 8px 0 rgba(0,0,0,0.50)'}}
              hideArrow modifiers={modifiersForMoreTool} placement="bottom-end" isOpen={this.state.moreToolListOpen} target="more_tool_popover" 
              toggle={this.toggleMoreToolList}>
              <PopoverBody className="p-0 popover-item">
                <div>
                  <div className="d-flex more-tool-container more-tool-container-screen" style={{flexFlow: 'column-reverse'}}>
                    <div className="d-flex align-items-center justify-content-center jimu-widget">
                      <div className="d-flex align-items-center justify-content-center more-tool-a">
                        <a className="m-0 p-0 toollist-item-click btn h-100 border-0" href={window.jimuConfig.useStructuralUrl ? 
                          `../stemapp/${this.props.queryObject.id}/?draft=true` : `../stemapp/?id=${this.props.queryObject.id}&draft=true`}  rel="noreferrer" target="_blank">
                          <Button className={classNames('d-flex flex-column align-items-center toollist-item more-tool-container-item',
                            'justify-content-center toollist-item-click h-100 border-0')} title={this.preview}
                            color="light">
                            <Icon icon={IconPreview} className="toollist-item-icon" width={16} height={16}></Icon>
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button className={classNames('d-flex flex-column align-items-center toollist-item more-tool-container-item',
                        'justify-content-center', {'more-tool-container-item-disabled': 
                        (this.state.saveState === this.saved || (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1))},
                        {'toollist-item-click':
                        !(this.state.saveState === this.saved || (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1))})}
                        color="light" title={this.state.saveState}
                        disabled={this.state.saveState === this.saved || (this.props.stateHistory.past.length <= 1 && this.props.stateHistory.future.length < 1)}
                        onClick={() => {this.onSaveClick()}}>
                        {this.state.saveState !== this.saving && <Icon icon={IconSave} className="toollist-item-icon" width={16} height={16}></Icon>}
                        {this.state.saveState === this.saving && <div style={{width: '16px', height: '16px'}} className="toollist-item-icon">
                          <SaveLoading theme={this.props.theme}/>
                        </div>}
                      </Button>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button className={classNames('d-flex flex-column align-items-center toollist-item more-tool-container-item',
                        'justify-content-center', {'more-tool-container-item-disabled': this.props.stateHistory.future.length < 1},
                        {'toollist-item-click': !(this.props.stateHistory.future.length < 1)})}
                        color="light" title={this.redo}
                        disabled={this.props.stateHistory.future.length < 1}
                        onClick={this.onRedo}>
                        <Icon icon={IconRedo} className="toollist-item-icon" width={16} height={16}></Icon>
                      </Button>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button className={classNames('d-flex flex-column align-items-center toollist-item more-tool-container-item',
                        'justify-content-center', {'more-tool-container-item-disabled': this.props.stateHistory.past.length <= 1},
                        {'toollist-item-click': !(this.props.stateHistory.past.length <= 1)})}
                        color="light" title={this.undo}
                        disabled={this.props.stateHistory.past.length <= 1}
                        onClick={this.onUndo}>
                        <Icon icon={IconUndo} className="toollist-item-icon" width={16} height={16}></Icon>
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverBody>
            </Popover>
        </div>
        {/* <Tooltip css={this.getStyle(this.props.theme)} placement="bottom" isOpen={this.state.toolTipPreviewOpen} innerClassName="toollist-tooltip" target="tooltip_preview" 
          hideArrow={false} toggle={this.onToggleToolTipPreview}>{this.preview}</Tooltip> */}
        <div id="tooltip_publish" className="h-100 d-flex align-items-center">
          <Button className="ml-2 toollist-publish" size="sm" outline onClick={this.onPublishClick}
            style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}}
            disabled={this.state.publishState === this.published} title={`${this.publishTo} ${this.isInOnLine() ? 'ArcGIS Online' : 'Portal for ArcGIS'}`}>
            <span>{this.state.publishState}</span>
          </Button>
        </div>
        {/* <Tooltip css={this.getStyle(this.props.theme)} placement="bottom" isOpen={this.state.toolTipPublishOpen} innerClassName="toollist-tooltip" target="tooltip_publish" 
          hideArrow={false} toggle={this.onToggleToolTipPublish}>{`${this.publishTo} ${this.isInOnLine() ? 'ArcGIS Online' : 'Portal for ArcGIS'}`}</Tooltip> */}
        <div id="tooltip_publish_options" className="h-100 d-flex align-items-center" title={this.publishOptions}>
          <Button id="publish_options_popover" 
            style={{width: '26px', minWidth: 0, marginLeft: '-1px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}} 
            onClick={this.togglePublishOptionList} 
            className="toollist-publish border-left-0 pl-0 pr-0" size="lg" outline >
            <Icon className="toollist-drop-icon mr-0" icon={IconArrowDown} width={10} height={10}/>
          </Button>
          <Popover css={this.getStyle(this.props.theme)} className="mt-0" style={{backgroundColor: this.props.theme && this.props.theme.colors ? 
            this.props.theme.colors.grays.gray200 : '', boxShadow: '0 0 8px 0 rgba(0,0,0,0.50)'}}
              hideArrow modifiers={modifiers} placement="bottom-end" isOpen={this.state.publishOptionsListOpen} target="publish_options_popover" 
              toggle={this.togglePublishOptionList}>
              <PopoverBody className="p-0 popover-item">
                <div>
                  <a target="_blank" href={`${this.props.portalUrl}/home/item.html?id=${this.props.currentAppId}`}>
                    <div className="publish-options-item d-flex align-items-center" onClick={() => {this.setState({publishOptionsListOpen: false})}}>
                      {this.changeShareSettings}
                    </div>
                  </a>
                  {this.state.isPublished && <a rel="noreferrer" target="_blank" href={window.jimuConfig.useStructuralUrl ? 
                    `../stemapp/${this.props.queryObject.id}/` : `../stemapp/?id=${this.props.queryObject.id}`}>
                    <div className={classNames('d-flex align-items-center', {'publish-options-item-disabled': 
                      !this.state.isPublished, 'publish-options-item': this.state.isPublished})} onClick={() => {this.setState({publishOptionsListOpen: false})}}>
                      {this.viewPublishedItem}
                    </div>
                  </a>}
                  {!this.state.isPublished && <div className={classNames('d-flex align-items-center publish-options-item-disabled')}>{this.viewPublishedItem}</div>}
                  <div className={classNames('d-flex align-items-center', {'publish-options-item-disabled': !this.state.isPublished, 
                    'publish-options-item': this.state.isPublished})} onClick={() => {this.state.isPublished && this.copyPublishUrlToClipBoard()}}>
                    {this.copyPublishedItemLink}
                  </div>
                </div>
              </PopoverBody>
            </Popover>
        </div>
        {/* <Tooltip css={this.getStyle(this.props.theme)} placement="bottom" isOpen={this.state.toolTipPublishOptionsOpen} innerClassName="toollist-tooltip" 
          target="tooltip_publish_options" 
          hideArrow={false} toggle={this.onToggleToolTipPublishOptions}>{this.publishOptions}</Tooltip> */}
        {/* <Button style={{width: '114px'}} className="ml-2 app-toolbar-toollist-download" size="lg" target="_blank" outline
          href={`/api/download/${this.props.currentAppId}?portalUrl=${this.props.portalUrl}&token=${SessionManager.getInstance().getSession().token}`}>
          Donwload
        </Button> */}
        </div>

        {<ReactModal css={this.getStyle(this.props.theme)} className="border-color-gray-400" style={this.modalStyle} isOpen={this.state.isToastNote}>
          <div className="w-100 h-100 d-flex align-items-center justify-content-center"><div className="h-100 toast-note d-flex align-items-center 
            justify-content-center pl-2 pr-2 bg-gray-100">{this.state.noteText}</div></div>
        </ReactModal>}
      </div>;
  }
};

const _ToolListComponentInner = themeUtils.withTheme(ToolListComponentInner);

const mapStateToProps = (state: IMState) => {
  return {
    stateHistory: state.appStateHistory,
    queryObject: state.queryObject,
    appConfig: state.appStateInBuilder && state.appStateInBuilder.appConfig,
    currentAppId: state.builder && state.builder.currentAppId,
    portalUrl: state.portalUrl
  };
}

export default ReactRedux.connect<{}, {}, ExtraProps>(mapStateToProps)(_ToolListComponentInner);
