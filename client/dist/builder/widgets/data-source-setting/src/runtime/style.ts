import {ThemeVariables, css, SerializedStyles, polished} from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles{
  return css`
    .widget-ds-setting{
      width: 100%;
      min-height: 100%;
      position: absolute;
      overflow: auto;

      .in-use-related-widgets{
        font-size: 14px;
        color: ${theme.colors.grays.gray600};
        margin-top: 16px !important;
        margin-bottom: 16px !important;
        font-weight: bold;
      }

      .widget-icon{
        >img{
          vertical-align: text-top;
          width: ${polished.rem(14)};
          height: ${polished.rem(14)};
        }
      }

      .drop-down{
        button{
          background-color: ${theme.colors.white};
        }
      }

      .setting-header{
        border-bottom: 1px;
      }

      .ds-back{
        width: 40%;
        cursor: pointer;
        height: 20px;
        text-transform: initial;
        margin-left: -5px;
      }

      .add-data{
        height: ${polished.rem(30)};
        line-height: ${polished.rem(30)};
        width: 228px;
        padding: 0;
        border-radius: 2px;
        cursor: pointer;
      }
      button.add-data:hover{
        color: ${theme.colors.black} !important;
      }

      .ds-label-input{
        width: 90%;
      }

      .two-line-truncate{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        word-wrap: break-word;
      }

      .ds-thumbnail-type{
        padding: ${polished.rem(10)} ${polished.rem(10)} 0  ${polished.rem(10)};
      }

      .ds-more{
        margin-left:  ${polished.rem(5)};
        cursor: pointer;
      }

      .ds-origin-label{
        .ds-origin-label-link, .ds-origin-label-link:hover, .ds-origin-label-link:focus, .ds-origin-label-link:active{
          color: ${theme.colors.grays.gray600};
          outline: none;
          box-shadow: 0 0 0 !important;
          border: 0 !important;
        }
        .ds-origin-label-link-text{
          display: inline-block;
          font-size: ${polished.rem(12)};
          max-width: 200px;
        }
      }

      .mapping-info{
        .ds-label{
          cursor: default;
        }
      }

      .ds-mapping-icon{
        cursor: pointer;
      }

      .ds-mapping-collapse{
        padding: ${polished.rem(10)} ${polished.rem(10)} 0  ${polished.rem(10)};
        .ds-origin-label{
          max-width: 170px;
          height:  ${polished.rem(25)};
          line-height:  ${polished.rem(25)};
          border-radius: 2px;
        }
      }

      .ds-widgets-more{
        padding:  ${polished.rem(10)};
      }

      .list-item{
        cursor: pointer;
        background-color: ${theme.colors.secondary};
        font-size: ${polished.rem(12)};
        .ds-label{
          font-size: ${polished.rem(13)};
        }
        .ds-related-widgets{
          color: ${theme.colors.cyans.cyan400};
        }
      }

      .list-item.list-error-item{
        cursor: default;
        user-select: none;
        background-color: ${polished.rgba(theme.colors.secondary, 0.4)};
        color: ${theme.colors.grays.gray600};
        .ds-thumbnail{
          background-color: ${theme.colors.grays.gray300};
        }
        .jimu-icon{
          color: ${theme.colors.grays.gray600};
        }
        .ds-related-widgets{
          color: ${theme.colors.grays.gray600};
        }
      }

      .ds-thumbnail{
        width:  ${polished.rem(36)};
        height:  ${polished.rem(36)};
        background-color: ${theme.colors.blues.blue200};
        border-radius: 2px;
      }

      .mapping-info{
        .ds-mapping-collapse{
          border: 0;
        }
      }

      .field-list, .ds-list{
        .ds-info{
          width: 100%;
          .ds-label{
            cursor: pointer;
            font-size: ${polished.rem(13)};
          }
        }
        .tab-pane{
          width: 100%;
        }
      }

      .field-item{
        .field-label{
          height:  ${polished.rem(35)};
          line-height:  ${polished.rem(35)};
        }
      }

      .ds-more-options{
        position: fixed;
        background-color: ${theme.colors.grays.gray100};
        color: ${theme.colors.dark};
        z-index: 3;
        user-select: none;
        font-size: 13px;
        width: ${polished.rem(70)};
        .ds-more-option{
          height: ${polished.rem(38)};
          line-height: ${polished.rem(38)};
          border-bottom: 1px;
          cursor: pointer;
          padding-left: 10px;
          padding-right: 10px;
        }
        .ds-more-option:hover{
          background-color: ${theme.colors.primary};
        }
        .ds-more-option:active.ds-more-option:hover{
          background-color: ${theme.colors.grays.gray100};
        }
      }

      .ds-mapping{
        .ds-mapping-header{
          height:  ${polished.rem(42)};
          line-height:  ${polished.rem(42)};
          border-bottom: 1px solid;
          .ds-mapping-header-back{
            cursor: pointer;
          }
        }

        .ds-mapping-cur-info{
          border-bottom: 1px solid;
        }

        .ds-mapping-external-data{
          position: fixed;
          z-index: 4;
        }

        .ds-mapping-set-item{
          .ds-mapping-drop-down{
            .btn-group{
              width: 100%;
              button{
                width: 100%;
              }
            }
          }
        }

        .ds-mapping-buttons{
          left:  ${polished.rem(65)};
          bottom:  ${polished.rem(10)};
        }

        .ds-mapping-source{
          width:  ${polished.rem(20)};
          height:  ${polished.rem(20)};
          border-radius:  ${polished.rem(10)};
          line-height:  ${polished.rem(20)};
          text-align: center;
          cursor: pointer;
        }

        .ds-mapping-ds{
          .ds-origin-label{
            max-width: 190px;
          }
        }

      }
    }

    .widget-ds-setting-add-data-popup{
      .modal-content{
        height: 100%;
      }
    }

  `
}