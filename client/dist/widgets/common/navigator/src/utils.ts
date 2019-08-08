import { IMAppConfig, LinkType, LinkResult, urlUtils, Immutable } from 'jimu-core';
import { NavLinkType } from './config';
import { MultiSelectItem } from 'jimu-ui';

const getPageId = (appConfig?: IMAppConfig): string => {
  const pageId = getCurrentPageId()
  return pageId || getDefaultPageId(appConfig);
}

const getCurrentPageId = (): string => {
  let urlInfo = urlUtils.getAppIdPageIdFromUrl();
  return urlInfo && urlInfo.pageId;
}

const getDefaultPageId = (appConfig: IMAppConfig): string => {
  if (!appConfig || !appConfig.pages) {
    return;
  }
  return Object.keys(appConfig.pages).find(pId => appConfig.pages[pId].isDefault);
}

const filterInexistentViews = (views: string[], appConfig: IMAppConfig) => {
  return views.filter(view => !!(appConfig.views && appConfig.views[view]));
}

export const updateViewsBySection = (views: string[], sectionId: string, appConfig: IMAppConfig): string[] => {
  const section = appConfig.sections[sectionId];
  if (!section) {
    return [];
  }
  const sectionViews = section.views || Immutable([]);
  views = views.filter(view => sectionViews.indexOf(view) > -1);
  views = views.sort((a, b) => {
    return sectionViews.indexOf(a) - sectionViews.indexOf(b);
  });
  return views;
}

export const toMultiSelectItem = (viewId: string, appConfig: IMAppConfig): MultiSelectItem => {
  return {
    label: getViewLabel(viewId, appConfig),
    value: viewId
  };
}

export const toMultiSelectItems = (views: string[], appConfig: IMAppConfig): MultiSelectItem[] => {
  return views.map(v => toMultiSelectItem(v, appConfig));
}

export const toNavViewLinks = (views: string[], appConfig: IMAppConfig): NavLinkType[] => {
  const filteredViews = filterInexistentViews(views, appConfig);
  return filteredViews.map(v => toNavViewLink(v, appConfig));
}

export const toNavViewLink = (viewId: string, appConfig: IMAppConfig): NavLinkType => {
  const value = toViewLink(viewId, appConfig);
  const name = getViewLabel(viewId, appConfig);
  return { name, value };
}

export const toViewLink = (viewId: string, appConfig: IMAppConfig): LinkResult => {
  const pageId = getPageId(appConfig);
  return {
    linkType: LinkType.View,
    value: `${pageId},${viewId}`
  } as LinkResult;
}

export const getViewLabel = (viewId: string, appConfig: IMAppConfig) => {
  if (typeof viewId === 'undefined' || !appConfig.views) {
    return;
  }
  return appConfig.views[viewId].label;
}

export const isNavItemActive = (viewIds: string[], link: NavLinkType, index: number) => {
  if (!viewIds || !viewIds.length) {
    if (index === 0) {
      return true;
    }
    return;
  }
  const currentViewId = (link.value && link.value.value) || '';
  return viewIds.some((vid) => currentViewId.indexOf(vid) > -1);
}

export const getSectionLabel = (sectionId: string, appConfig: IMAppConfig): string => {
  const section = appConfig.sections[sectionId];
  if (!section) {
    return '';
  }
  return section.label;
}

export const getSectionViews = (sectionId: string, appConfig: IMAppConfig): string[] => {
  const section = appConfig.sections[sectionId];
  if (!section) {
    return [];
  }
  const views = section.views;
  return views ? views.asMutable() : [];
}