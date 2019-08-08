import {ThemeVariables, css, SerializedStyles, polished} from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles{

  return css`
    .widget-setting-link {
      overflow-y: auto;
      font-size: 13px;
      font-weight: lighter;

      .link-setting-selected {
        border: ${polished.rem(2)} solid;
      }

      .choose-ds {
        width: ${polished.rem(160)};
      }

      .setting-function {

        .setting-function-item {
          overflow: hidden;

          .setting-function-item-input {
            width: ${polished.rem(200)};
          }
        }
      }

      .setting-exterior {

        .exterior-shape-item {
          padding-bottom: 100%;
          cursor: pointer;
        }
      }

      .setting-collapse {
        overflow: hidden;
        cursor: pointer;
      }

      .setting-stylepicker {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: ${polished.rem(10)};
      }

      .setting-stylepicker-item {
        height: ${polished.rem(30)};
      }

      .setting-stylepicker-selected {
        border-width: ${polished.rem(2)} !important;
      }

      .link-cursor-pointer{
        cursor: pointer;
      }
    }

  `
}