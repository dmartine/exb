import {css, IMThemeVariables} from 'jimu-core';

const fullScreenAppStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function getStyle(isFullScreenApp: boolean, theme: IMThemeVariables) {
  return css`
    ${isFullScreenApp ? fullScreenAppStyle : ''};
    padding: 0 1.5rem 1.5rem;
    margin: 0 auto;

    .top-section{
      margin-top: 5px;
    }

    .page-name {
      color: ${theme.colors.grays.gray500};
    }

    .body-section{
      width: 100%;
      display: flex;
      margin-top: 5px;
      overflow: visible;
      position: relative;
      // box-shadow: 0 2px 5px 1px rgba(0,0,0,0.15);

      .device-frame{
        position: relative;
        overflow: hidden;
        flex-grow: 0;
        flex-shrink: 0;
        margin: auto;

        iframe{
          width: 100%;
          // height: 100%;
          border: none;
          position: relative;
          overflow: visible;
        }
      }
    }

    .bottom-section{
      display: none;
      height: 50px;
    }

    .resize-handler-bottom {
      height: 26px;
      width: 100%;
      cursor: ns-resize;
      display: flex;
      justify-content: center;
      align-items: center;

      .label {
        font-size: 0.8rem;
        letter-spacing: 0;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    }
  `;
}