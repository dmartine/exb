import {React, BaseWidget, AllWidgetProps} from 'jimu-core';
import {WidgetPlaceholder} from 'jimu-ui';
import {IMConfig, EmbedType} from '../config';
import defaultMessages from './translations/default';

interface State{
  iFrameHeight: number;
  canLoadUrl: UrlCanLoadStatue;
}

enum UrlCanLoadStatue {
  Unknow= 'UNKNOW',
  Yes = 'YES',
  No = 'NO'
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{

  ifr: HTMLIFrameElement;

  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: 0,
      canLoadUrl: UrlCanLoadStatue.Unknow
    };
  }

  // componentWillReceiveProps(nextProps){
  //   const nextFunctionConfig = nextProps.config.functionConfig;
  //   const preFunctionConfig = this.props.config.functionConfig;
  //   const {embedType, content} = nextFunctionConfig;
  //   if(embedType !== preFunctionConfig.embedType || content !== preFunctionConfig.content){
  //     this.setState({
  //       loaded: false
  //     })
  //   }
  // }


  iframeOnLoad = (evt) => {
    if(!this.ifr)return;
  }

  iFrameLoadReady = () => {
    // console.log('ready');
  }

  iFrameContentRender = (embedType: EmbedType, content: string, canLoadUrl: UrlCanLoadStatue) => {
    if(embedType === EmbedType.Code){
      return {srcDoc: content};
    }
    if(embedType === EmbedType.Url){
      return {src: content}
    }
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  

  render() {

    const {embedType, content} = this.props.config.functionConfig;
    const {canLoadUrl} = this.state;

    if(!content || content.trim() === ''){
      return <WidgetPlaceholder 
      widgetId={this.props.id} 
      icon={require('./assets/icon.svg')} 
      message={this.formatMessage('hint')}/>;
    }

    return (
      <div style={{width: '100%', height: '100%', position: 'relative' }} className="widget-embed">
        <iframe 
          onLoad = {this.iframeOnLoad}
          style={{width: '100%', height: '100%'}}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allowFullScreen
          {...(this.iFrameContentRender(embedType, content, canLoadUrl))} 
          frameBorder="0"
          ref={(f) => { this.ifr = f; }}
        />
        {/* {!loaded && <div className="mask" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'gray'}}></div>} */}
      </div>
      

    )
  }
}
