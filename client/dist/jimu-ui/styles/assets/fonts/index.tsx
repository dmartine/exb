import { css, urlUtils } from 'jimu-core';

const fontPath = urlUtils.getFixedRootPath() + 'jimu-ui/styles/assets/fonts/avenir-next/';

export const getFontFaces = () => {
  return css`
    @font-face {
      font-family: "Avenir Next W01";
      src: url("${fontPath}Avenir_Next_W01_300.woff2") format("woff2"), url("${fontPath}Avenir_Next_W01_300.woff") format("woff");
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: "Avenir Next W01";
      src: url("${fontPath}Avenir_Next_W01_400.woff2") format("woff2"), url("${fontPath}Avenir_Next_W01_400.woff") format("woff");
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: "Avenir Next W01";
      src: url("${fontPath}Avenir_Next_W01_500.woff2") format("woff2"), url("${fontPath}Avenir_Next_W01_500.woff") format("woff");
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: "Avenir Next W01";
      src: url("${fontPath}Avenir_Next_W01_600.woff2") format("woff2"), url("${fontPath}Avenir_Next_W01_600.woff") format("woff");
      font-weight: 600;
      font-style: bold;
    }
  `
}