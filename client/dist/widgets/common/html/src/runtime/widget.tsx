import { BaseWidget, React, ReactDOM } from 'jimu-core';
import { AllWidgetProps } from 'jimu-core';
import * as classnames from 'classnames';
import {IMConfig} from '../config';
import { Sanitizer } from '@esri/arcgis-html-sanitizer';

// jimu whitelist that extends the arcgis defaults
// this will probably need to be further extended
const whiteList = {
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  small: []
};

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, {}>{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    // get html content and CSS class names from props
    const {
      config,
      className
    } = this.props;

    // merge CSS class names
    const classes = classnames(
      'jimu-html-widget',
      // TODO: implement vertical align CSS
      config && config.verticalAlign ? `jimu-vertical-align-${config.verticalAlign}` : '',
      className
    );

    // sanitize html
    let html = '';
    if (config && config.html) {
      const sanitizer = new Sanitizer({
        whiteList
      }, true);
      html = sanitizer.sanitize(config.html);
    }

    // TODO: is there a better way besides dangerouslySetInnerHTML?
    return <div className={classes} dangerouslySetInnerHTML={{ __html: html }}></div>;
  }
}
