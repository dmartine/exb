import { ThemeVariables, css, SerializedStyles } from 'jimu-core';

export function getStyle(theme: ThemeVariables): SerializedStyles {

  return css`
    &>a {
      text-align: center;
    }
    &>a:before {
      content:'';
      display:inline-block;
      height:100%;
      vertical-align:middle;
    }
    .btn-outline-primary{
      border-color: ${theme.colors.primary} !important;
    }
    .btn-outline-secondary{
      border-color: ${theme.colors.secondary} !important;
    }
    .btn-outline-success{
      border-color: ${theme.colors.success} !important;
    }
    .btn-outline-info{
      border-color: ${theme.colors.info} !important;
    }
    .btn-outline-warning{
      border-color: ${theme.colors.warning} !important;
    }
    .btn-outline-danger{
      border-color: ${theme.colors.danger} !important;
    }
    .btn-outline-light{
      border-color: ${theme.colors.light} !important;
    }
    .btn-outline-dark{
      border-color: ${theme.colors.dark} !important;
    }

  `
}