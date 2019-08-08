/** @jsx jsx */
import {React, ReactRedux, IMAppConfig, BrowserSizeMode, InjectedIntl, jsx, ThemeVariables, themeUtils, AppMode, LayoutItemType, LayoutItemConstructorProps, LayoutInfo,
  PagePart, WidgetType, PageType, IMState} from 'jimu-core';
import {appConfigUtils} from 'jimu-for-builder';
import {PendingElementItem} from './pending-element-item';

import defaultMessages from '../../translations/default';

interface Props{
  browserSizeMode: BrowserSizeMode;
  currentPageId: string;
  appMode: AppMode;
  intl: InjectedIntl;
  activePagePart: PagePart;
}
interface State{
}
export class _PendingElements extends React.PureComponent<Props & {theme: ThemeVariables, appConfig: IMAppConfig}, State>{

  constructor(props){
    super(props);
    this.state = {
    };
  }

  convertLayoutItemToElementItem = (layoutInfo: LayoutInfo, isFromCurrentSizeMode: boolean): LayoutItemConstructorProps => {
    let {appConfig} = this.props;

    let layoutItem = appConfig.layouts[layoutInfo.layoutId].content[layoutInfo.layoutItemId];
    let parentWidgetId = appConfigUtils.getWidgetIdThatUseTheLayoutId(appConfig, layoutInfo.layoutId);
    if(layoutItem.type === LayoutItemType.Widget){
      let widgetId = layoutItem.widgetId;
      let widgetJson = appConfig.widgets[widgetId];
      let label;
      if(parentWidgetId && appConfig.widgets[parentWidgetId].manifest.properties.type !== WidgetType.Layout){
        label = appConfig.widgets[parentWidgetId].label + '-' + widgetJson.label;
      }else{
        label = widgetJson.label;
      }
      return {
        id: layoutItem.widgetId,
        itemType: LayoutItemType.Widget,
        layoutInfo: layoutInfo,
        isFromCurrentSizeMode,
        label: label,
        path: widgetJson && widgetJson.uri,
        icon: widgetJson && widgetJson.icon,
        manifest: widgetJson && widgetJson.manifest
      }
    }else if(layoutItem.type === LayoutItemType.Section){
      let sectionId = layoutItem.sectionId;
      let secionJson = appConfig.sections[sectionId];
      return {
        id: sectionId,
        itemType: LayoutItemType.Section,
        layoutInfo: layoutInfo,
        isFromCurrentSizeMode,
        label: secionJson && secionJson.label,
        path: '',
        icon: secionJson && secionJson.icon || './widgets/app-toolbar/dist/runtime/assets/section.svg',
        manifest: {
          properties: {} as any
        }
      }
    }

    return null;
  }

  render(){
    if(!this.props.appConfig || !this.props.currentPageId || !this.props.appConfig.pages[this.props.currentPageId] || this.props.appConfig.pages[this.props.currentPageId].type !== PageType.Normal){
      return null;
    }
    let layoutId;
    if(this.props.activePagePart === PagePart.Header){
      layoutId = this.props.appConfig.header.layout[this.props.browserSizeMode];
    }else if(this.props.activePagePart === PagePart.Footer){
      layoutId = this.props.appConfig.footer.layout[this.props.browserSizeMode];
    }else if(this.props.activePagePart === PagePart.Body){
      layoutId = this.props.appConfig.pages[this.props.currentPageId].layout[this.props.browserSizeMode];
    }
    const layoutItemsFromOthers: LayoutInfo[] = layoutId
      ? appConfigUtils.getPendingLayoutItemsFromOtherSizeModeInPage(this.props.appConfig, this.props.currentPageId, this.props.browserSizeMode, this.props.activePagePart)
      : [];
    const elementListFromOthers = layoutItemsFromOthers.map(item => this.convertLayoutItemToElementItem(item, false));

    const layoutItemsFromCurrent: LayoutInfo[] = layoutId
      ? appConfigUtils.getPendingLayoutItemsInPage(this.props.appConfig, this.props.currentPageId, this.props.browserSizeMode, this.props.activePagePart)
      : [];
    const elementListFromCurrent = layoutItemsFromCurrent.map(item => this.convertLayoutItemToElementItem(item, true));

    const elementList = elementListFromOthers.concat(elementListFromCurrent);
    return (
      <div className="flex-column bg-gray-100 d-flex">
        {
          elementList.length === 0 &&
          <div className="pt-1 pl-3 pr-3 text-white-50 text-left">
            {this.props.intl.formatMessage({id: 'pendingElementsInfo', defaultMessage: defaultMessages.pendingElementsInfo})}
          </div>
        }

        {
          elementList.map(item => {
            return <PendingElementItem key={item.id} item={item} appMode={this.props.appMode}></PendingElementItem>
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state: IMState) {
  return {
    appConfig: state.appStateInBuilder && state.appStateInBuilder.appConfig,
  }
}

export const PendingElements = ReactRedux.connect<{appConfig: IMAppConfig}, {}, Props>(mapStateToProps)(
  themeUtils.withTheme(_PendingElements),
);
