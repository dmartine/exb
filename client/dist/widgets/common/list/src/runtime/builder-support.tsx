import {LayoutInfo, getAppStore} from 'jimu-core';
import {interact} from 'jimu-core/dnd';
import {Popover, PopoverBody, ButtonGroup} from 'jimu-ui'
import {handleResizeCard as commonHandlResizeCard, selectSelf as commonSelectSelf} from '../common-builder-support'
import { layoutUtils } from 'jimu-layouts/common';
import MyDropdown from './components/my-dropdown'
import { appConfigUtils} from 'jimu-for-builder';

const widgetModules = {
  Popover: Popover,
  PopoverBody: PopoverBody,
  ButtonGroup: ButtonGroup,
  interact: interact,
  MyDropdown: MyDropdown,
  appConfigUtils: appConfigUtils,

  handleResizeCard: (props, newCardSize, isTop: boolean = false, isLeft: boolean = false, isEnd: boolean = false) => {
    const action = commonHandlResizeCard(props, newCardSize, isTop, isLeft, isEnd);
    if(action){
      action.exec();
    }
  },

  selectSelf: (props) => {

    commonSelectSelf(props, true);
  },

  selectionIsSelf: (layoutInfo: LayoutInfo, id: string, appConfig: any) => {
    if(!layoutInfo || !layoutInfo.layoutItemId || !layoutInfo.layoutId){
      return false;
    }
    const layoutItem = layoutUtils.findLayoutItem(appConfig, layoutInfo);
    if(layoutItem && layoutItem.widgetId && layoutItem.widgetId === id){
      return true;
    }
    return false;
  },
  
  selectionInList: (layoutInfo: LayoutInfo, id: string, appConfig: any, notSearchEmbed?: boolean) => {
    if(!layoutInfo || !layoutInfo.layoutItemId || !layoutInfo.layoutId){
      return false;
    }
    return appConfigUtils.getLayoutItemsInWidgetByLayoutInfo(appConfig, layoutInfo, id, getAppStore().getState().browserSizeMode).length > 0
  }
}

export default widgetModules;