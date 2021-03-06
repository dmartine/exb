import {
  React, BaseWidget, AllWidgetProps,
  ExpressionResolverComponent, DataRecord, RepeatedDataSource, getAppStore, AppMode, urlUtils, queryString
} from 'jimu-core';
import { WidgetPlaceholder } from 'jimu-ui';
import { IMConfig, EmbedType } from '../config';
import defaultMessages from './translations/default';
import { versionManager } from '../embed-version-manager';

interface State {
  content?: string;
  isResetting?: boolean;
  loadErr?: boolean;
  errMessage?: string;
  resolveErr?: boolean
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{
  static versionManager = versionManager;
  ifr: HTMLIFrameElement;
  errMessages: {
    unSupportUrl: string,
    unSupportIframeUrl: string,
  }

  constructor(props) {
    super(props);
    const { config } = props;
    const { embedType, embedCode } = config;

    this.errMessages = {
      unSupportUrl: this.formatMessage('unSupportUrl'),
      unSupportIframeUrl: this.formatMessage('unSupportIframeUrl'),
    }

    this.checkUrl = this.checkUrl.bind(this);
    const state: State = {
      content: embedType === EmbedType.Url ? (this.isUsedDataSource() ? undefined : this.processUrl(config.staticUrl)) : embedCode,
      loadErr: false,
      resolveErr: false
    };
    if (state.content && state.content.trim().length > 0) {
      state.isResetting = true;
    }
    this.state = state;
  }

  componentDidMount() {
    const { config } = this.props;
    const { embedType } = config;
    const { content } = this.state;
    if (embedType === EmbedType.Url) {
      this.checkUrl(content);
    }
  }

  componentDidUpdate(preProps, preStates) {
    const { embedCode, embedType, staticUrl } = this.props.config;
    if (embedType !== preProps.config.embedType) {
      const content = embedType === EmbedType.Url ? (this.isUsedDataSource() ? undefined : this.processUrl(staticUrl)) : embedCode;
      this.setState({
        content: content
      })
    } else {
      if (embedType === EmbedType.Url) {
        const nowUsedDataSource = this.isUsedDataSource()
        const preUsedDataSource = this.isUsedDataSource(preProps)
        //if usedDataSource, the content will be changed by expression resolver component
        if (!nowUsedDataSource || nowUsedDataSource !== preUsedDataSource) {
          const content = this.isUsedDataSource() ? undefined : this.processUrl(staticUrl);
          this.setState({
            content: content
          })
        }
      } else {
        if (preProps.config.embedCode !== embedCode) {
          this.setState({
            content: embedCode
          })
        }
      }
    }


    const { content } = this.state;
    const { content: oldContent } = preStates;
    if (content !== oldContent) {
      this.setState({
        isResetting: !!content,
        loadErr: false
      }, () => {
        if (embedType === EmbedType.Url) {
          this.checkUrl(content);
        }
      })

    }
  }

  iframeOnLoad = (evt) => {
    // if(this.loadTimeOut){
    //   clearTimeout(this.loadTimeOut);
    //   this.loadTimeOut = undefined;
    // }
    const state: State = {
      isResetting: false
    }
    this.setState(state)
  }

  iFrameContentRender = () => {
    const { embedType } = this.props.config;
    const { content } = this.state;
    if (embedType === EmbedType.Code) {
      return { srcDoc: content };
    }
    if (embedType === EmbedType.Url) {
      return { src: content }
    }
  }

  processUrl = (url: string): string => {
    if (!url) return url;
    //support Google Map, Youtube Facebook Vimeo now.
    const lowerUrl = url.toLowerCase();
    /**
     * support Google Map
     */
    // if(lowerUrl.indexOf('https://www.google.com/maps') > -1 || lowerUrl.indexOf('https://goo.gl/maps') > -1){//google map
    //   return url;
    // }

    /**
     * Vimeo
     */
    if (/https:\/\/vimeo\.com\/.*/.test(lowerUrl)) {
      url = urlUtils.removeSearchFromUrl(url)
      const splits = url.split('/');
      const id = splits[splits.length - 1];
      return `https://player.vimeo.com/video/${id}`;
    }

    /**
     * Youtube
     */
    if (/https:\/\/www\.youtube\.com\/watch\?.*v=.*/.test(lowerUrl)) {
      const queryObj = queryString.parseUrl(url)?.query
      const id = queryObj?.['v'];
      return `https://www.youtube.com/embed/${id}`
    } else if (/https:\/\/youtu\.be\/.*/.test(lowerUrl)) {
      url = urlUtils.removeSearchFromUrl(url)
      const splits = url.split('/');
      const id = splits[splits.length - 1];
      return `https://www.youtube.com/embed/${id}`
    }

    /**
     * Facebook video
     */
    if (/https:\/\/www\.facebook\.com\/.*\/videos\/.*/.test(lowerUrl)) {
      return `https://www.facebook.com/plugins/video.php?href=${lowerUrl}&show_text=0`
    }

    if (!this.checkURLFormat(url)) {
      url = 'about:blank'
    }

    return url;
  }

  checkURLFormat = (str: string): boolean => {
    if (!str || str === '') return false;
    const httpsRex = '^(([h][t]{2}[p][s])?://)';
    const re = new RegExp(httpsRex);
    if (!re.test(str)) {
      return false;
    }
    const index = str.indexOf('.');
    if (index < 0 || index === str.length - 1) {
      return false;
    }
    return true
  }

  checkUrl(url: string) {
    if (!this.checkURLFormat(url)) {
      this.setState({
        loadErr: true,
        errMessage: this.errMessages.unSupportUrl
      })
      return;
    }
    const appMode = getAppStore()?.getState()?.appRuntimeInfo?.appMode;
    if (!url || !window.jimuConfig.isInBuilder || appMode === AppMode.Run) return;
    if (url.indexOf('https://www.facebook.com/plugins/video.php?show_text=0&href=') > -1 ||
      url.indexOf('https://www.youtube.com/embed/') > -1 ||
      url.indexOf('https://player.vimeo.com/video/') > -1) {
      this.setState({
        loadErr: false
      })
      return
    }
    this.fetchUrl(`${window.location.origin}/check_url?url=${url}`).then(res => {
      let canLoadUrl: boolean = true;
      if (res && res.success) {
        const data = res.data;
        const status = data?.status;
        if (status && status < 400) {
          const contentSecurityPolicy = data?.headers?.['content-security-policy'];
          if (contentSecurityPolicy) {
            canLoadUrl = false;
          }
          const xFrameOptions = data?.headers?.['x-frame-options']?.toLowerCase();
          if (xFrameOptions) {
            if (xFrameOptions === 'deny') {
              canLoadUrl = false;
            } else if (xFrameOptions === 'sameorigin') {
              if (!this.isOriginSameAsLocation(url)) {
                canLoadUrl = false;
              }
            }
          }
        } else {
          canLoadUrl = false;
        }
      } else {
        canLoadUrl = false;
      }
      const alterState: State = {
        loadErr: !canLoadUrl
      }
      if (!canLoadUrl) {
        alterState.isResetting = false;
        alterState.errMessage = this.errMessages.unSupportIframeUrl
      }
      this.setState(alterState)
    })
  }

  isOriginSameAsLocation(url) {
    var pageLocation = window.location;
    var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/;
    var urlMatch = URL_HOST_PATTERN.exec(url) || [];
    var urlparts = {
      protocol: urlMatch[1] || '',
      host: urlMatch[2] || '',
      port: urlMatch[3] || ''
    };

    const defaultPort = (protocol) => {
      return { 'http:': 80, 'https:': 443 }[protocol];
    }

    const portOf = (location) => {
      return location.port || defaultPort(location.protocol || pageLocation.protocol);
    }

    return !!((urlparts.protocol && (urlparts.protocol == pageLocation.protocol)) &&
      (urlparts.host && (urlparts.host == pageLocation.host)) &&
      (urlparts.host && (portOf(urlparts) == portOf(pageLocation)))
    );
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  fetchUrl = async (url): Promise<any> => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/json'
    }
    const result = await fetch(url, {
      method: 'get',
      headers: headers,
    }).catch(err => { });
    if (!result) return Promise.resolve(null);
    const json = await result.json().catch(error => { });
    return Promise.resolve(json);
  }

  isUsedDataSource = (props?: AllWidgetProps<IMConfig>) => {
    if (!props) {
      props = this.props
    }
    const { useDataSources, useDataSourcesEnabled } = props;
    return useDataSourcesEnabled && useDataSources && useDataSources.length > 0
  }

  onUrlExpResolveChange = result => {
    if(result.isSuccessful){
      this.setState({
        content: this.processUrl(result.value),
        resolveErr: false
      });
    }else{
      this.setState({
        resolveErr: true
      });
    }
  }

  getRecordsFromRepeatedDataSource = (): { [dataSourceId: string]: DataRecord } => {
    const dataSourceId = this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId;

    if (dataSourceId && this.props.repeatedDataSource) {
      const record = (this.props.repeatedDataSource as RepeatedDataSource).record as DataRecord;

      return {
        [dataSourceId]: record
      }
    }

    return null;
  }

  render() {
    const { isResetting, loadErr, errMessage, resolveErr } = this.state;
    const { theme, id, config } = this.props;
    const { embedCode, embedType, staticUrl, expression } = config;
    const isDataSourceUsed = this.props.useDataSourcesEnabled;

    const showPlaceholder = embedType === EmbedType.Code ? !embedCode :
      ((!staticUrl && !isDataSourceUsed) || (isDataSourceUsed && !expression))
    if (showPlaceholder) {
      return <WidgetPlaceholder
        widgetId={this.props.id}
        icon={require('./assets/icon.svg')}
        message={this.formatMessage('embedHint')} />;
    }

    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }} className="jimu-widget widget-embed">
        <iframe
          className={`iframe-${id}`}
          style={{ width: '100%', height: '100%' }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allowFullScreen
          onLoad={this.iframeOnLoad}
          {...(this.iFrameContentRender())}
          frameBorder="0"
          ref={(f) => { this.ifr = f; }}
        />
        {isResetting && <div className="jimu-secondary-loading"></div>}
        {loadErr &&
          <div className="mask text-center"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              paddingTop: '30%',
              backgroundColor: theme.colors.white
            }}>
            {errMessage}
          </div>
        }
        {resolveErr && isDataSourceUsed &&
          <div className="mask text-center"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              paddingTop: '30%',
              backgroundColor: theme.colors.white
            }}>
            {expression?.name}
          </div>
        }
        <div style={{ display: 'none' }}>
          {
            isDataSourceUsed && embedType === EmbedType.Url && expression &&
            <div>
              <ExpressionResolverComponent useDataSources={this.props.useDataSources} expression={expression}
                onChange={this.onUrlExpResolveChange}
              />
            </div>
          }
        </div>
      </div>


    )
  }
}
