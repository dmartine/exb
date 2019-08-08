import { BaseWidget, React, AllWidgetProps } from 'jimu-core';
import { IMConfig } from '../config';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any>{
  render() {
    return <header>
      <h4 className="text-center">
      Test Theme Builder
      </h4>
    </header>;
  }
}
