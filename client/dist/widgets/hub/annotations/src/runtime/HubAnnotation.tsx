import { React } from 'jimu-core';
import { Card, ImageProps } from 'jimu-ui';
import { getThumbnailUrl } from './utils';

// NOTE: datasetRecord.getData() returns any
export class HubAnnotation extends React.PureComponent<{data: any, context: any, portalUrl?: string, token?: string}>{

  render(){
    const {
      data
    } = this.props
    const user = data.user;
    const title = user && (user.fullName || user.username);
    // TODO: i18n
    const alt = `${title ? title : 'User'} thumbnail`;
    const thumbnailImage: ImageProps = {
      src: getThumbnailUrl(this.props.portalUrl, user, this.props.token, this.props.context),
      alt,
      title,
      shape: 'circle',
      // NOTE: this only seems to put a gray box around the image
      // type: 'thumbnail',
      height: 32
    }
    return <Card
      title={title}
      description={data.description}
      image={thumbnailImage}
      className="hub-annotation"
      horizontal />
  }
}
