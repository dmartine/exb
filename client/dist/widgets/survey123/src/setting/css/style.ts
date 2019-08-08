import { ThemeVariables, css, SerializedStyles } from 'jimu-core';

export function getStyle(theme?: ThemeVariables): SerializedStyles {
  return css`
    &.survey123{
        .survey123__section {

            input + span {
              // margin-left:5px; 
            }
            .jimu-widget-setting--section-header.row >h5 {
              font-size: 0.875rem;
              color: #FFFFFF;
            }
            .survey123__section-createSurvey {
              .error-message {
                color: #D65940;
              }
            }
            .select-survey-section {
              hr.split-line {
                display: none;
              }
            }
            .create-survey-container {
              .jimu-widget-setting--row.items {
                margin-top: 1.2rem;
              }
              .jimu-widget-setting--row >label {
                font-size: 0.875rem;
                color: #C0C3D2;
                font-weight: 400;
                +p.w-100 {
                  font-size: 0.8125rem;
                  line-height: 1.1875rem;
                  margin-top: 0.3125rem;
                }
              }
            }
        
            .appearance {
              display: flex;
              justify-content: space-between;
              width:100%;
              
            }
        
            &-resetSurvey {
              position:relative;
              top:-30px;
              float:right;

              svg {
                margin:0px !important;
              }
            }

            .cursor-pointer{
              &:hover{
                cursor:pointer;
              }
            }
              
            &-surveyMenu {}
        
            &-selectExistingSurvey {}
        
            &-createSurvey {
              overflow-y: hidden;
              
              span.isRequired{
                position:relative;
                left:-180px;
                color:#ff0000;
              }
            }
        
            &-surveySettings {
              
            }
          }
    }
  `;
}