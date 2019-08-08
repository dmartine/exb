import { Immutable, ImmutableArray } from 'jimu-core';
const expressionRegular = /\<exp((?!\<exp).)*((?!\<exp).)*\<\/exp\>/gm;
const linkRegular = /\<a((?!\<a).)*((?!\<a).)*\<\/a\>/gm;

const expressionIdRegular = /expid="(((?!\<span).)*)\"\>/m;
const linkIdRegular = /id="(.*)\"\starget/m;
const linkHrefRegular = /href="((?!").)*"/m;

export const getDataSourceIds = (useDataSources = Immutable([])): ImmutableArray<string> => {
  return Immutable(useDataSources.map(ds => ds.dataSourceId));
}

export const getIdsFromHtml = (html: string, type: 'LINK' | 'EXPRESSION') => {
  const mainExp = type === 'LINK' ? linkRegular : expressionRegular;
  const subExp = type === 'LINK' ? linkIdRegular : expressionIdRegular;
  const ids = [];
  if (!html) {
    return ids;
  }
  let parts = html.match(mainExp);
  if (!parts) {
    return ids;
  }
  parts.forEach((exp) => {
    const ret = exp.match(subExp);
    const id = ret && ret[1];
    if (id) {
      ids.push(id);
    }
  });
  return ids;
}


export {
  expressionRegular,
  linkRegular,
  expressionIdRegular,
  linkIdRegular,
  linkHrefRegular
}