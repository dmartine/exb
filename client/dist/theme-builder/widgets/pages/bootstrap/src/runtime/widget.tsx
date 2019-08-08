/** @jsx jsx */
import { BaseWidget, AllWidgetProps, jsx } from 'jimu-core';
import { IMConfig } from '../config';
import { Page1, Page2, Page3, Page4, Page5, Page6, /*Page7,*/ Page8, Page9, Page10 } from './pages';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>> {
  render() {
    const styles = `
      main hr {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    `;

    return (
      <div className="p-3">
        <style>{styles}</style>
        <main className="p-4">
          <Page1 />
          <hr />
          <Page2 />
          <hr />
          <Page3 />
          <hr />
          <Page10 />
          <hr />
          <Page4 />
          <hr />
          <Page5 />
          <hr />
          <Page6 />
          <hr />
          {/* <Page7 />
          <hr /> */}
          <Page8 />
          <hr />
          <Page9 />
        </main>
      </div>
    )
  }
}
