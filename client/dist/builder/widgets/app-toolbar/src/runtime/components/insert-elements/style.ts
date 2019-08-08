import {ThemeVariables, css, SerializedStyles, polished} from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles{

  return css`
  .widget-builder-header-insert-elements {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 261px;
    text-align: left;
    .collapse-btn{
      cursor: pointer;
      .jimu-icon{
        vertical-align: top;
      }
    }
    .jimu-nav{
      margin-left: ${polished.rem(16)};
      margin-right: ${polished.rem(16)};
      margin-bottom: ${polished.rem(16)};
    }
    .new-elements-title{
      font-size: 14px;
      color: ${theme.colors.grays.gray600};
      margin-bottom: ${polished.rem(10)};
    }
    .jimu-nav{
      height: ${polished.rem(43)} !important;
    }
    .tab-content{
      overflow: auto;
      height: calc(100% - ${polished.rem(59)});
    }

    .elements-collapse-item{
      height: ${polished.rem(40)};
      .elements-collapse-item-icon-container{
        width: ${polished.rem(30)};
        height: ${polished.rem(30)};
        background: ${theme.colors.secondary};
        margin-right: ${polished.rem(15)};
        .elements-collapse-item-icon{
          width: ${polished.rem(16)};
          height: ${polished.rem(16)};
        }
      }
      .elements-collapse-item-label{
        max-width: ${polished.rem(180)};
        color: ${theme.colors.dark};
        line-height: ${polished.rem(30)};
      }
    }

    .elements-collapse-item:hover, .elements-collapse-item:hover.elements-collapse-item:active{
      background: ${polished.rgba(theme.colors.secondary, 0.4)};
      font-size: ${polished.rem(13)};
      .elements-collapse-item-icon-container{
        background: ${theme.colors.grays.gray300};
      }
    }

    .app-toolbar-insert {
      padding-top: 10px;
      padding-left: 10px;
      position: absolute;
      left: 260px;

      .app-toolbar-insert-btn {
        width: 46px;
        height: 46px;
        border: 0;
        z-index: 2;
        position: relative;
        color: ${theme.colors.black};

        &:focus {
          outline: none;
          box-shadow: none !important;
          background-color: ${theme.colors.cyans.cyan100};
        }

        &:disabled {
          outline: none;
          box-shadow: none !important;
          background-color: ${theme.colors.secondary};
        }
      }

      &::after {
        opacity: 0;
        content: "";
        height: 66px; /* <-- set to fixed */
        width: 66px; /* <-- set to fixed */
        background: ${theme.colors.grays.gray100};
        position: absolute;
        left: -30%;
        top: 0;
        z-index: 1;
        border-radius: 0 100rem 100rem 0;
        transition-property: left;
        transition-timing-function: ease-out;
        transition-duration: .1s;
      }

      &.insert-active {
        &::after {
          opacity: 1;
          left: 0;
          transition-property: left;
        transition-timing-function: ease-out;
        transition-duration: .1s;
        }
      }
    }

    .btn{
      .jimu-icon{
        margin: 0;
      }
    }
    .jimu-builder-panel--content {
      .widget-card-item{
        height: 70px;
        background-color: ${theme.colors.grays.gray200};
        user-select: none;
        cursor: pointer;
        .widget-card-image{
          width: 16px;
          height: 16px;
          &:after{
            display: none;
          }
        }

        .widget-card-name{
          max-width: 90px;
          margin: 0 auto;
          max-height: 28px;
          margin-top: 5px;
        }
      }
      .widget-card-item:hover{
        background-color: ${theme.colors.grays.gray300};
      }

      .row {
        .col-6 {
          flex: 1 0 0;
          margin-right: ${theme.spacers[1]};
        }
        .col-6 + .col-6 {
          margin-left: ${theme.spacers[1]};
          margin-right: 0;
        }
        .col {
          flex-basis: 100%;
        }
      }
    }
  }`;
}