import { BaseWidget, React, AllWidgetProps } from 'jimu-core';
import { IMConfig } from '../config';
import { Page1 } from './pages';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>> {
  render() {
    return (
      <div className="p-3">
        <main className="p-4">
          <Page1 />
        </main>
      </div>
    )
  }
}
