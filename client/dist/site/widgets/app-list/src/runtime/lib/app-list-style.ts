import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles {
  let max_width = 1200;
  // with font_size_root theme variable can't be get, so define font_size_root temporarily
  let font_size_root = 16;

  return css`
    .widget-builder-app-list {
      overflow-y: auto;

      .widget-builder-app-list-screen {
        width:810px;
        margin: auto;
      }
      @media only screen and (min-width: 1280px) {
        .widget-builder-app-list-screen {
          width:1086px;
        }
      }
      @media only screen and (min-width: 1400px) {
        .widget-builder-app-list-screen {
            width:1350px;
        }
      }

      @media only screen and (min-width: 1680px) {
        .widget-builder-app-list-screen {
            width:1620px;
        }
      }

      button.app-list-newapp:hover{
        color: ${theme.colors.black} !important;
      }

      .app-list-newapp {
        padding-left: ${polished.rem(29)};
        padding-right: ${polished.rem(29)};
        font-size: ${polished.rem(24)};
        margin-left: ${polished.rem(20)};

        .app-list-newapp-icon {
          margin-right: ${polished.rem(8)};
        }
      }

      .app-list-search-container {
        padding-left: ${polished.rem(16)};
        padding-right: ${polished.rem(16)};
      }
    
      .app-list-h1 {
        font-size: ${polished.rem(24)};
      }
    
      .app-list-h2 {
        font-size: ${polished.rem(16)};
      }

      .app-list-h3 {
        font-size: ${polished.rem(13)};
      }
    
      .app-list-maxwidth {
        max-width: ${max_width / font_size_root}rem;
      }
    
      .app-list-banner {
        overflow: hidden;
        width: 100%;
        height: ${53 / font_size_root}rem;
        margin-top: ${polished.rem(40)};
    
        .app-list-searchbox {
          color: ${theme.colors.grays.gray500};
          padding-left: ${56 / font_size_root}rem !important;
          width: 90%;
          height: ${53 / font_size_root}rem;
        }
      }
    
      .app-list-filterbar {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        margin-top: ${32 / font_size_root}rem;
    
        .filterbar-input {
          width: ${200 / font_size_root}rem;
          margin-top: 3px;
          padding-top: 3px;
        }

        .app-list-filterbar-title {
          margin-left: ${polished.rem(16)};
          margin-right: ${polished.rem(16)};
        }
      }
    
      .app-list-content {
        width: 100%;
        padding-bottom: ${100 / font_size_root}rem;
      }
    
      .app-list-detailview {
        width: 100%;

        .app-list-detailview-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: ${polished.rem(120)};
        }
    
        .app-list-detailview-content {
          width: 100%;
          margin-top: ${16 / font_size_root}rem;
          display: flex;
          flex-wrap: wrap;
    
          .app-list-detailview-pic {
            background-size: contain;
            background-position: top center;
            border-bottom: 1px solid ${theme.colors.grays.gray300};
          }
        }

        .dropdown-toggle::after {
          display: none !important;
        }
      }
    
      .app-list-listview {

        .app-list-listview-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .app-list-listview-view {
          min-width: ${polished.rem(90)};
        }

        .app-list-listview-container {
          position: relative;
          padding-left: ${polished.rem(16)};
          padding-right: ${polished.rem(16)};
        }
    
        .app-list-listview-pic {
          padding-bottom: 50%;
          background-size: cover;
          background-position: center center;
          background-color: ${theme.colors.grays.gray700};
          position: inherit;
        }
      }

      .detailview-item {
        width: ${polished.rem(238)};
        height: ${polished.rem(284)};
        margin: 0 ${polished.rem(16)} ${polished.rem(30)} ${polished.rem(16)};
      }

      .app-item-more {
        margin-right: -0.625rem;
      }

      .app-item-backcolor {
        background-color: ${theme.colors.grays.gray200};
      }

      .app-item-launch:focus {
        outline: none;
        box-shadow: none !important;
      }
    
      .app-list-iconfill {
        color: ${theme.colors.grays.gray700};
      }

      .app-list-icon-margin {
        fill: #BCC4CD !important;
        margin-right: 0;
        margin-left: 0;
      }

      .app-list-dropdown {
        padding: 0;
        margin: 0;
        min-width: 0;
      }

      .dropdown-toggle::after {
        display: none !important;
      }

      .app-list-iconmargin {
        margin-top: 0.2rem;
      }
    
      .app-list-searchIconFill {
        fill: ${theme.colors.grays.gray500} !important;
        color: ${theme.colors.grays.gray500} !important;
      }
    }
  `;
}