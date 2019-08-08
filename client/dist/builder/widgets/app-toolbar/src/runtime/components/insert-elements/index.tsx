/** @jsx jsx */
import {React, classNames as classnames, moduleLoader, urlUtils, InjectedIntl, jsx, ThemeVariables, themeUtils, BrowserSizeMode, appConfigUtils, getAppStore, AppMode,
  LayoutItemType, LayoutItemConstructorProps, PagePart} from 'jimu-core';
import {Icon, Button, Tabs, Tab} from 'jimu-ui';

import {NewElements} from './new-elements';
import {PendingElements} from './pending-elements';

import {getStyle} from './style';

import defaultMessages from '../../translations/default';

let IconClose = require('jimu-ui/lib/icons/close-16.svg');

interface Props{
  isOnScreen: boolean;
  onTogglePopup: (isOnScreen: boolean) => void;
  // appConfig: IMAppConfig;
  browserSizeMode: BrowserSizeMode;
  dispatch: any;
  currentPageId: string;
  currentViewId: string;
  appPath: string;
  appMode: AppMode;
  intl: InjectedIntl;
  activePagePart: PagePart;
}
interface State{
  widgetList: LayoutItemConstructorProps[];
}
export class _InsertElements extends React.PureComponent<Props & {theme: ThemeVariables}, State>{
  rootDom: HTMLElement;

  constructor(props){
    super(props);
    this.state = {
      widgetList: []
    };
  }

  componentDidMount(){
    if(this.rootDom){
      this.getWidgetListInfo();
    }
  }

  getWidgetListInfo(){
    fetch(`${moduleLoader.resolveModuleFullPath('widgets')}/widgets-info.json`).then(res => res.json()).then((widgetInfo: any[]) => {
      let list = widgetInfo.map(w => {
        w.manifest = appConfigUtils.addWidgetManifestProperties(w.manifest);
        let listItemTemplate: LayoutItemConstructorProps = {
          itemType: LayoutItemType.Widget,
          name: w.name,
          label: w.i18nLabel[getAppStore().getState().appContext.locale] || w.manifest.label || w.name,
          path: w.path,
          manifest: w.manifest,
          icon: '../' + w.icon
        };
        return listItemTemplate;
      });

      this.setState({widgetList: list});
    })
  }

  onClose = () => {
    if(!this.props.isOnScreen){
      return;
    }

    this.props.onTogglePopup(false);
  }

  render(){

    return (<div css={getStyle(this.props.theme)}><div style={{display: 'none'}}
        className={classnames('jimu-builder-panel widget-builder-header-insert-elements from-left flex-column bg-gray-100',
        {'d-flex': !urlUtils.getAppIdPageIdFromUrl().pageId && this.props.isOnScreen}
        /* {'widget-popup-show-animation': this.props.isOnScreen},
        {'widget-popup-hide-animation': !this.props.isOnScreen} */)}
        ref={n => this.rootDom = n}
        >

        <div className={classnames('app-toolbar-insert insert-active')}>
           <Button icon circled size="lg" className={classnames('app-toolbar-insert-btn insert-btn-active')}
             onClick={this.onClose}>
             <Icon icon={IconClose} width={18} height={18} className={'app-toolbar-insert-icon'}/>
           </Button>
        </div>

        <div className="jimu-builder-panel--header d-flex flex-row px-3 pb-1">
          <h3 className="flex-grow-1">
            {this.props.intl.formatMessage({id: 'element', defaultMessage: defaultMessages.element})}
          </h3>
        </div>

        <Tabs>
          <Tab title={this.props.intl.formatMessage({id: 'new', defaultMessage: defaultMessages.new})} active={true}>
            {
              <NewElements currentPageId={this.props.currentPageId}
                currentViewId={this.props.currentViewId} appPath={this.props.appPath} widgetList={this.state.widgetList}
                dispatch={this.props.dispatch} appMode={this.props.appMode} intl={this.props.intl}
              />
            }
          </Tab>
          <Tab title={this.props.intl.formatMessage({id: 'pending', defaultMessage: defaultMessages.pending})}>
            <PendingElements browserSizeMode={this.props.browserSizeMode} currentPageId={this.props.currentPageId} appMode={this.props.appMode}
              intl={this.props.intl} activePagePart={this.props.activePagePart}
            />
          </Tab>
        </Tabs>

      </div>
    </div>);
  }
}

export const InsertElements = themeUtils.withTheme(_InsertElements);
