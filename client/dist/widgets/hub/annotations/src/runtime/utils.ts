import {IMConfig} from '../config';
import { IMUser } from 'jimu-core';

export function buildWhereClause(config:IMConfig) {
  let where = `parent_id is null AND target LIKE '${config.target}%'`;
  if (config.status) {
    where = where + ` AND status = '${config.status}'`
  }
  // TODO: build where clause from remaining config properties
  return where;
}

export function getThumbnailUrl(portalUrl?: string, user?: IMUser , token?: string, context?: any) {
  // example:
  // https://cityxcommunity.maps.arcgis.com/sharing/rest/community/users/twaysonX/info/look-at-this-graph.png?token=SdnQxDcQh2mIsJt7JY6y0Lz_Fkksvki8RKqjoyqcavmnHZ9BK4dnWQUR4Z7bWW7ELZ0arfQv3EkrV6tw1vhs13jZUMrmw8SGTuLc3Iwv2OZn1Wu9ONY2AdBmzkfdWNjteJvKo6LGC0A1tT5Sq9rhLD2HGQrALSzlMq_9tdeFx1CGBfkFt1IqTuFPVxPk1VcPhRueYle8gch7aMw4NLM6WF-YuabK1RunFblzH0W2Uyc.
  if (portalUrl && user && user.thumbnail) {
    const url = `${portalUrl}/community/users/${user.username}/info/${user.thumbnail}`;
    return token ? `${url}?token=${token}` : url;
  } else {
    // NOTE: default profile image is 150x150
    return `${context.folderUrl}dist/runtime/assets/no-user-thumb.jpg`;
  }
}
