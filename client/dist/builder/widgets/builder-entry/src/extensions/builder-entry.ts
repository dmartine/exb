import {extensionSpec, AppConfig, getAppStore, jimuHistory} from 'jimu-core';
import {appServices} from 'builder/common';
import { parseAppPath, getPageLinkUrl } from 'jimu-core/lib/utils/url-utils';

export default class BuilderEntry implements extensionSpec.AppConfigProcessorExtension{
  id = 'app-config-processor-extension-builder-entry';
  
  process(appConfig: AppConfig): Promise<AppConfig>{
    let urlInfo = parseAppPath();
    let qo = getAppStore().getState().queryObject;
    if(qo.id || qo.app_config){
      return Promise.resolve(appConfig);
    }
    if(!qo.title){
      if(!urlInfo.pageId){
        jimuHistory.browserHistory.push(getPageLinkUrl('template', qo));
        return Promise.resolve(appConfig);
      }else{
        return Promise.resolve(appConfig);
      }
    }

    //if has ?title, we'll create new app
    
    return appServices.createApp({
      template: 'default',
      name: qo.title,
      description: qo.summary,
      tags: qo.tags ? qo.tags.split(',') : [],
      webmap: qo.webmap,
      webscene: qo.webscene,
      folder: qo.folder,
      shareWithWebmap: qo.sharewithwebmap ? true : false,
      shareWithWebscene: qo.sharewithwebscene ? true : false
    }).then(item => {
      let newQuery = {
        id: item.id,
        apiurl: qo.apiurl,
        locale: qo.locale
      };
      
      jimuHistory.changeQueryObject(newQuery);
      return appConfig;
    }, err => {
      return appConfig;
    });
  }
}