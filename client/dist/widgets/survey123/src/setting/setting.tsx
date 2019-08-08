/** @jsx jsx */
import { React, Immutable, IMDataSourceJson, IMUseDataSource, ImmutableArray, FieldSchema, DataSource, DataSourceManager, jsx, SessionManager } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, DataSourceChooser, FieldChooser, DataSourceJsonWithRootId, SettingSection, SettingRow } from 'jimu-for-builder';
import { ArcGISDataSourceTypes } from 'jimu-arcgis/arcgis-data-source-type';
import { Button, Icon, Col, Input, Switch, Collapse, Label } from 'jimu-ui';
import { IMConfig } from '../config';
import { survey123Service } from '../service/survey123.service';
import defaultMessages from './translations/default';
import { getStyle } from './css/style';

import * as ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>, any>{
  /**
   * state variable
   */
  supportedMapTypes = Immutable([ArcGISDataSourceTypes.MapView]);
  supportedLayerTypes = Immutable([ArcGISDataSourceTypes.FeatureLayerView]);
  public state: any = {
    /**
     * survey123
     */
    newSurveyTitle: null,
    newSurveyTags: null,
    newSurveyTitleDirty: false,
    newSurveyTagsDirty: false,
    newSurveySnippet: null,
    newSurveyItemId: null,
    // newSurveyThumbnailUrl: 'https://images-eu.ssl-images-amazon.com/images/I/61ot3Cx98aL.png',
    newSurveyThumbnailUrls: [
      'https://survey123.arcgis.com/assets/img/default-thumbnails/Image01.png',
      'https://survey123.arcgis.com/assets/img/default-thumbnails/Image02.png',
      'https://survey123.arcgis.com/assets/img/default-thumbnails/Image03.png'
    ],
    newSurveyMsg: null,
    newSurveyLoading: false,
    existSurveyMsg: null,
    existSurveys: [],
    selectedSurvey: null,
    modalIsOpen: false,
    mode: 'none',
    isCheckedSurveyItemId: false,
    isShowSurveyQuestionField: false,
    surveyQuestionFields: [],
    selectedQuestionField: null,
    createSurveyErrorMsg: null,
    /**
     * data source
     */
    dsMapView: null,
    dsFeatureLayerView: null
  }

  public newDefaultValue: {
    key: string;
    value: string;
  } = {
      key: '',
      value: ''
    };

  public iconRefresh = require('jimu-ui/lib/icons/close.svg');
  public closeIcon24 = require('jimu-ui/lib/icons/close-24.svg');
  private _survey123HostUrl: string = survey123Service.getSurvey123HostUrl();
  private _dsManager = DataSourceManager.getInstance();

  /**
   * constructor
   * @param props 
   */
  constructor(props: any) {
    super(props);

    /**
     * query existing survey
     */
    this.querySurvey();
  }


  /**
   * on setting value changed
   */
  onValueChanged = (evt: React.FormEvent<HTMLInputElement>) => {
    let target = evt.currentTarget;

    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set(target.name, target.value)
    });
  }

  nls = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] });
  }
  /**
   * add default value
   */
  addDefaultValue = (evt: any) => {
    if (this.newDefaultValue.key && this.newDefaultValue.value) {
      this.props.config.defaultValue[this.newDefaultValue.key] = this.newDefaultValue.value;

      /**
       * clear newDefaultValue key / value
       */
      this.newDefaultValue = {
        key: '',
        value: ''
      };
    }
  }

  /**
   * on new survey value changed
   */
  onNewSurveyValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
    let target = e.currentTarget;

    if (target.name) {
      this.setState({
        [target.name]: target.value
      });
    }
    if (target.name === 'newSurveyTags') {
      this.setState({
        newSurveyTagsDirty: true
      });
    } if (target.name === 'newSurveyTitle') {
      this.setState({
        newSurveyTitleDirty: true
      });
    }
  }

  /**
   * onExistSurveyChanged
   */
  onExistSurveyChanged = (e: React.FormEvent<HTMLSelectElement>) => {
    let target = e.currentTarget;

    if (target.value && target.value !== 'null') {
      /**
       * update selected survey
       */
      let selectedSurvey = this.state.existSurveys.find((survey) => survey.id === target.value);
      this.setState({
        selectedSurvey: selectedSurvey
      });
    }
  }

  /**
   * create survey
   */
  createSurvey = () => {
    return Promise.resolve(true)
      .then(() => {
        /**
         * handle title, tags, description
         */
        let title = this.state.newSurveyTitle;
        let tags = (this.state.newSurveyTags || '').split(',').map((tag) => tag.trim());
        let snippet = this.state.newSurveySnippet;
        if (!title) {
          this.setState({
            newSurveyTitleDirty: true
          });

        }
        if (!this.state.newSurveyTags) {
          this.setState({
            newSurveyTagsDirty: true
          });
        }

        if (!title || !tags || !tags.length) {
          // throw new Error('missing title or tags');
          throw new Error('');
        }

        /**
         * update msg
         */
        this.setState({
          newSurveyMsg: '',
          newSurveyLoading: true
        });
        let randomIdx = parseInt(Math.random() * 10 + '') % 3;
        let thumbnail = this.state.newSurveyThumbnailUrls[randomIdx];

        return survey123Service.createSurvey(title, tags, {
          token: this.props.token,
          username: this.props.user.username,
          /**
           * portalUrl
           */
          portalUrl: this.props.config.portalUrl || this.props.portalUrl
        }, {
            snippet: snippet,
            thumbnailUrl: thumbnail
          });
      })
      .then((res: any) => {
        if (res.success === true) {
          let survey = res;

          /**
           * set item id
           */
          this.setState({
            createSurveyErrorMsg: null,
            newSurveyItemId: res.id,
            selectedSurvey: res,
            newSurveyLoading: false
          });

          return res.id;
        }
        if (res.error && res.error.code + '' == '400') {
          this.setState({
            createSurveyErrorMsg: 'A survey with this name already exists, please choose a different name.',
            newSurveyLoading: false,
            newSurveyTitleDirty: false
          });

          return null;
        }

        throw res;
      })
      .then((itemId: string) => {
        if (!itemId) {
          return;
        }
        /**
         * we should set hides in config
         */
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('hides', ['navbar', 'header', 'description', 'footer', 'theme'])
        });

        /**
         * show survey123 designer modal
         */
        this.showSurvey123DesignerModal(itemId);
      })
      .catch((err) => {
        if (err) {
          /**
           * update msg
           */
          this.setState({
            newSurveyMsg: err.message ? err.message : (typeof err === 'string') ? err : '',
            newSurveyLoading: false
          });
        }
        console.error(err);
      })

  }

  /**
   * query survey
   */
  querySurvey = (options?: {
    isShared?: boolean;
    isPublished?: boolean;
  }) => {
    // options
    options = Object.assign({
      isShared: false,
      isPublished: true
    }, options || {});
    if (this.props.config.surveyItemId && this.props.config.selectedSurvey) {

      let selectedSurvey = this.props.config.selectedSurvey;
      // this.state.mode = 'settings';
      setTimeout(() => {
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('surveyItemId', selectedSurvey.id)
        });
        /**
         * switch to settings page
         */
        this.setState({
          existSurveyMsg: null,
          mode: 'settings',
          selectedSurvey: selectedSurvey
        });
      }, 0);
      // this.setSurveyItemId();
      return survey123Service.querySurvey({username: this.props.user.username, token: this.props.token, portalUrl: this.props.config.portalUrl || this.props.portalUrl}, { isShared: options.isShared, isPublished: options.isPublished})
      .then((surveys: any[]) => {
        this.setState({
          existSurveys: surveys
        });
      });
    }
    return Promise.resolve(true)
      .then(() => {
        if (this.state.mode === 'none') {
          this.setState({
            mode: 'survey-createSurvey'
          });
        }

        /**
         * update msg
         */
        this.setState({
          existSurveyMsg: '<div class="jimu-small-loading"></div>'
        });

        return survey123Service.querySurvey({
          username: this.props.user.username,
          token: this.props.token,
          portalUrl: this.props.config.portalUrl || this.props.portalUrl
        }, {
            isShared: options.isShared,
            isPublished: options.isPublished
          });
      })
      .then((surveys: any[]) => {
        // console.log(surveys);

        /**
         * update msg and existing surveys
         */
        this.setState({
          existSurveyMsg: null,
          existSurveys: surveys
        });

        /**
         * update selected survey
         */
        let usedSurveyItemId = this.props.config.surveyItemId;
        if (usedSurveyItemId) {
          let selectedSurvey = surveys.find((survey) => survey.id === usedSurveyItemId);
          if (selectedSurvey) {
            this.setState({
              selectedSurvey: selectedSurvey
            });
            this.props.onSettingChange({
              widgetId: this.props.id,
              config: this.props.config.set('selectedSurvey', selectedSurvey)
            });
          }
        }
      })
      .catch((err) => {
        this.setState({
          mode: 'survey-createSurvey',
          existSurveyMsg: 'error when load existing surveys'
        });
        console.log(err);
      });
    }

    /**
     * get survey question fields
     */
    getSurveyQuestionFields = (): Promise<any[]> => {
      let surveyItemId = this.props.config.surveyItemId;

      return Promise.resolve(true)
        .then(() => {
          if (surveyItemId && this.props.token) {
            return survey123Service.getSurveyQuestionFields(surveyItemId, {
              token: this.props.token
            });
          }
        })
        .then((fields: any[]) => {
          if (fields) {
            this.setState({
              surveyQuestionFields: fields
            });
          }
          return fields;
        });
    }

    /**
     * show survey123 designer modal
     */
    showSurvey123DesignerModal(surveyItemId ?: string) {
      surveyItemId = surveyItemId || this.props.config.surveyItemId;
      let sessionManager = SessionManager.getInstance();
      let portalUrl = this.props.config.portalUrl || this.props.portalUrl;

      if (!surveyItemId) {
        throw new Error('cannot get survey item id to open survey123 designer');
      }

      /**
       * popup window and embed survey123 designer 
       */
      let url = survey123Service.getSurvey123DesignerUrl(surveyItemId, {
        portalUrl: portalUrl
      });

      /**
       * we need to add access_token / username / expires_in in hash
       * to tell survey123 website to parse the hash to use the token
       */
      let session = sessionManager.getSession();
      if (session && session.token && session.username && session.tokenDuration) {
        url += `#access_token=${session.token}&username=${session.username}&expires_in=${session.tokenDuration}`;
      }

      /**
       * show modal
       */
      this.setState({
        modalIsOpen: true,
        newSurveyMsg: null
      });

      /**
       * cannot use window.open because address bar will be shown.
       * try to use modal and iframe to show survey123 designer webpage
       */
      let self = this;
      let index = 0;
      let checkTimer = setInterval(() => {
        if (!self.state.modalIsOpen) {
          self.setState({
            modalIsOpen: true
          });
        }
        index ++;
        let target: any = document.getElementById('survey123-designer');
        if (target || index > 100) {
          clearInterval(checkTimer);
          target.src = url;
        }
      }, 50);

      // setTimeout(() => {
      //   let target: any = document.getElementById('survey123-designer');
      //   target.src = url;
      // }, 200);
    }

    /**
     * remove default value
     */
    removeDefaultValue = (key: string, evt: any) => {
      let defaultValue = this.props.config.defaultValue;
      if (key && defaultValue[key]) {
        delete defaultValue[key];
      }
    }

    /**
     * show setting page
     */
    showSettingPage = () => {
      this.setState({
        mode: 'settings'
      });
      /**
       * get survey question fields
       */
      this.getSurveyQuestionFields();
    }

    /**
     * handle close modal
     */
    handleCloseModal = () => {
      this.setState({
        modalIsOpen: false
      });

      this.showSettingPage();

      /**
       * update survey itemid in props config
       */
      let surveyItemId = this.state.newSurveyItemId || this.props.config.surveyItemId;
      if (surveyItemId) {
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('surveyItemId', surveyItemId).set('timestamp', Date.now())
        });
      }
    }

    /**
     * get thumbnail url from portal
     */
    getThumbnailUrl = () => {
      let portalUrl = this.props.config.portalUrl || this.props.portalUrl || 'https://www.arcgis.com';
      let surveyItemId = this.state.selectedSurvey.id;
      let thumbnail = this.state.selectedSurvey.thumbnail;
      if ((thumbnail + '').startsWith('http://') || (thumbnail + '').startsWith('https://')) {
        return thumbnail;
      }
      return `${portalUrl}/sharing/rest/content/items/${surveyItemId}/info/${thumbnail}?token=${this.props.token}`;
    }

    /**
     * set survey item id 
     * update this.props.config
     */
    setSurveyItemId = () => {
      let selectedSurvey = this.state.selectedSurvey;
      if (selectedSurvey && selectedSurvey.id) {
        /**
         * update props to have the same setting in runtime
         * and ensure the hides are all switched on 
         */
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('surveyItemId', selectedSurvey.id).set('hides', ["navbar", "header", "description", "footer", "theme"])
        });

        /**
         * switch to settings page
         */
        this.setState({
          mode: 'settings'
        });
      }
    }

    /**
     * edit survey
     */
    editSurvey = () => {
      this.showSurvey123DesignerModal();
    }

    /**
     * set appearance
     */
    setAppearance = (isChecked: boolean, value: string) => {
      // let target = e.currentTarget;
      // let value = target.value;
      let hides = this.props.config.hides || [];
      // let isChecked = target.checked;

      if (isChecked) {
        hides = hides.concat([value])
      } else {
        if (hides.indexOf(value) !== -1) {
          hides = hides.filter((k) => k !== value);
        }
      }
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.set('hides', hides)
      });
    }

    /**
     * on feature layer view selected
     */
    onFeatureLayerViewSelected = (selectedDsJsons: DataSourceJsonWithRootId[], d: DataSourceJsonWithRootId) => {
      if (d && d.dataSourceJson && d.rootDataSourceId) {
        /**
         * update state
         */
        this.setState({
          dsMapView: null,
          dsFeatureLayerView: d
        });

        /**
         * embed params
         */
        let embeds = this.props.config.embeds || [];
        if (embeds.indexOf('associatedMap') === -1) {
          embeds = embeds.concat(['associatedMap']);
        }

        /**
         * update useDataSources
         */
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('embeds', embeds).set('dsType', ArcGISDataSourceTypes.FeatureLayerView)
          /* useDataSources: Immutable([{
            dataSourceId: d.dataSourceJson.id,
            rootDataSourceId: d.rootDataSourceId 
          }]) as ImmutableArray<IMUseDataSource> */
        });
      }
    }

    /**
     * on map view selected
     */
    onMapViewSelected = (selectedDsJsons: DataSourceJsonWithRootId[], d: DataSourceJsonWithRootId) => {
      if (d && d.dataSourceJson && d.rootDataSourceId) {
        let mapViewDSJson = d.dataSourceJson;

        /**
         * update state
         */
        this.setState({
          dsMapView: d,
          dsFeatureLayerView: null
        });

        /**
         * embed params
         */
        let embeds = this.props.config.embeds || [];
        if (embeds.indexOf('associatedMap') === -1) {
          embeds = embeds.concat(['associatedMap']);
        }

        /**
         * update props
         */
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('embeds', embeds).set('selectedSurveyQuestionFields', []).set('dsType', ArcGISDataSourceTypes.MapView)
          /* useDataSources: Immutable([{
            dataSourceId: d.dataSourceJson.id,
            rootDataSourceId: d.rootDataSourceId
          }]) as ImmutableArray<IMUseDataSource> */
        });
      }
    }


    /**
     * on feature layer field selected
     */
    onFieldSelected = (field: FieldSchema, ds: DataSource) => {
      /**
       * update fields in data source
       */
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.setIn(['title', 'field'], field.name),
        useDataSources: Immutable([{
          dataSourceId: this.props.useDataSources[0].dataSourceId,
          rootDataSourceId: this.props.useDataSources[0].rootDataSourceId,
          fields: [field.name]
        }]) as ImmutableArray<IMUseDataSource>
      });
    }

    /**
     * on survey question field changed
     */
    onSurveyQuestionFieldChanged = (e: any) => {
      let target = e.currentTarget;
      let value = target.value;

      /**
       * update fields in data source
       */
      if (value && value !== 'null') {
        this.props.onSettingChange({
          widgetId: this.props.id,
          config: this.props.config.set('selectedSurveyQuestionFields', [value]),
        });
      }
    }

    /**
     * isDsConfigured
     */
    isDsConfigured = () => {
      if (this.props.useDataSources &&
        this.props.useDataSources.length === 1) {
        return true;
      }
      return false;
    }

    /**
     * reset survey
     */
    resetSurvey = () => {
      /**
       * reset survey item id
       */
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.set('surveyItemId', null).set('hides', []).set('embeds', ['fullScreen', 'onSubmitted']).set('selectedSurveyQuestionFields', []).set('dsType', null).set('selectedSurvey', null)
      });

      this.setState({
        mode: 'survey-createSurvey',
        selectedSurvey: null,
        isCheckedSurveyItemId: false,
        surveyQuestionFields: [],
        dsMapView: null,
        dsFeatureLayerView: null
      });
    }

    /**
     * render
     */
    render() {
      let defaultValue = this.props.config.defaultValue;
      const usedFieldName = this.props.useDataSources && this.props.useDataSources[0] &&
        this.props.useDataSources[0].fields && this.props.useDataSources[0].fields[0];
      const selectedSurveyQuestionField = this.props.config.selectedSurveyQuestionFields && this.props.config.selectedSurveyQuestionFields[0];

      /**
       * show setting page
       */
      if (this.state.selectedSurvey && this.props.config.surveyItemId && this.state.isCheckedSurveyItemId === false) {
        this.setState({
          isCheckedSurveyItemId: true
        });
        this.showSettingPage();
      }

      /**
       * render
       */
      return <div css={getStyle()} className='jimu-widget-setting survey123'>
        <div className='survey123__section' style={
          (this.state.mode.indexOf('survey-') !== -1) ?
            { display: 'block' }
            : { display: 'none' }
        } >
          <SettingSection>
            <SettingRow>
              <p>{defaultMessages.chooseSurvey}</p>
            </SettingRow>
            <SettingRow>
              <Input type="radio" name='survey-survey' className="cursor-pointer" id="survey-survey-createNewSurvey" checked={this.state.mode === 'survey-createSurvey'} onChange={() => { this.setState({ mode: 'survey-createSurvey' }) }} />
              <Label for="survey-survey-createNewSurvey" className="cursor-pointer">&nbsp;&nbsp;{defaultMessages.createNewSurveyLabel}</Label>
            </SettingRow>
            <SettingRow>
              <Input type="radio" name='survey-survey' className="cursor-pointer" id="survey-survey-chooseExistingSurvey" checked={this.state.mode === 'survey-selectExistingSurvey'} onChange={() => { this.setState({ mode: 'survey-selectExistingSurvey' }) }} />
              <Label for="survey-survey-chooseExistingSurvey" className="cursor-pointer">&nbsp;&nbsp;{defaultMessages.chooseSurveyLabel}</Label>
            </SettingRow>
          </SettingSection>

          {/* select existing survey */}
          <div className='survey123__section-selectExistingSurvey' style={
            (this.state.mode === 'survey-selectExistingSurvey') ?
              { display: 'block' }
              : { display: 'none' }
          } >
            <SettingSection className="select-survey-section">
              <SettingRow>
                <Input type="select" onChange={this.onExistSurveyChanged} disabled={this.state.existSurveys.length === 0} value={(this.state.selectedSurvey) ? this.state.selectedSurvey.id : 'null'} style={{
                  width: '100%',
                  padding: '2px 5px'
                }}>
                  <option value="null">{defaultMessages.selectSurveyTip}</option>
                  {
                    (this.state.existSurveys.length > 0) ?
                      this.state.existSurveys.map((survey) => {
                        return <option value={survey.id} key={survey.id}>{survey.title}</option>
                      })
                      : ''
                  }
                </Input>
                <p>{this.state.existSurveyMsg}</p>
              </SettingRow>
            </SettingSection>

            {/* survey details */}
            <div style={{
              display: (this.state.selectedSurvey) ? 'block' : 'none'
            }}>
              <SettingSection title={this.nls('surveyDetailLabel')} className="create-survey-container">
                {
                  (this.state.selectedSurvey) ?
                    [
                      <SettingRow key="surveyThumnail"><img src={this.getThumbnailUrl()} style={{ width: '100%', height: 'auto' }}></img></SettingRow>,
                      <SettingRow key="surveyTitle">
                        <span style={{ 'wordBreak': 'break-word', 'fontSize': '0.8125rem', 'color': '#FFFFFF' }}>{this.state.selectedSurvey.title}</span>
                      </SettingRow>,
                      // <SettingRow label="Tags"><p className="w-100">{this.state.selectedSurvey.tags}</p></SettingRow>,
                      // <SettingRow>{this.state.selectedSurvey.owner}</SettingRow>,
                      this.state.selectedSurvey.snippet ? <SettingRow label={this.nls('summaryLabel')} className="items" key="surveySnippet"><p className="w-100">{this.state.selectedSurvey.snippet}</p></SettingRow> : null,
                      <SettingRow key="surveyInsertBtn"><Button color='primary' className="w-100" onClick={this.setSurveyItemId}>{defaultMessages.insertLabel}</Button></SettingRow>
                    ] :
                    null
                }
              </SettingSection>
            </div>
          </div>

          {/* create survey */}
          <div className='survey123__section-createSurvey' style={
            (this.state.mode === 'survey-createSurvey') ?
              { display: 'block' }
              : { display: 'none' }
          }>
            <SettingSection>
              <SettingRow label={this.nls('surveyTitleLabel')}>
                <span className="isRequired">*</span>
                <Input className="w-100" value={this.state.newSurveyTitle || ''} name="newSurveyTitle" onChange={this.onNewSurveyValueChanged} />
              </SettingRow>
              {!this.state.newSurveyTitle && this.state.newSurveyTitleDirty ?
                <div className="error-message">
                  {defaultMessages.surveyTitleRequiredMsg}
                </div>
                :
                ''}

              {this.state.createSurveyErrorMsg && !this.state.newSurveyTitleDirty ?
                <div className="error-message">
                  {defaultMessages.surveyTitleDuplicateMsg}
                </div>
                :
                ''}
              <SettingRow label={this.nls('surveyTagLabel')}>
                <span className="isRequired">*</span>
                <Input className="w-100" value={this.state.newSurveyTags || ''} name="newSurveyTags" onChange={this.onNewSurveyValueChanged} />
                {!this.state.newSurveyTags && this.state.newSurveyTagsDirty ?
                  <div className="error-message">
                    {defaultMessages.surveyTagsRequiredMsg}
                  </div>
                  :
                  ''}
              </SettingRow>
              <SettingRow label={this.nls('surveySummaryLabel')}>
                <Input className="w-100" value={this.state.newSurveySnippet || ''} name="newSurveySnippet" onChange={this.onNewSurveyValueChanged} />
              </SettingRow>
              {/* <SettingRow label="Thumbnail">
              <img src={this.state.newSurveyThumbnailUrl} style={{
                width: '50px',
                height: '50px'
              }}></img>

              <Input className="w-100" value={this.state.newSurveyThumbnailUrl} name="newSurveyThumbnailUrl" onChange={this.onNewSurveyValueChanged} />

            </SettingRow> */}
              <SettingRow>
                <Button color='primary' className="w-100" disabled={this.state.newSurveyLoading === true} onClick={this.createSurvey}>{defaultMessages.createSurveyBtn}</Button>
                <span style={{
                  color: '#ff0000',
                  marginTop: '10px'
                }}>{this.state.newSurveyMsg}</span>
                <div className="w-100" style={
                  {
                    position: 'relative',
                    display: 'block',
                    marginTop: '50px'
                  }
                }>
                  <div className="jimu-small-loading" style={
                    (this.state.newSurveyLoading === true) ? { display: 'block' } : { display: 'none' }
                  }></div>
                </div>
              </SettingRow>
            </SettingSection>
          </div>

        </div>

        {/* setting section */}
        <div className='survey123__section' style={
          (this.state.mode.indexOf('settings') !== -1) ?
            { display: 'block' }
            : { display: 'none' }
        }>
          <SettingSection title={this.nls('currentSurveyLabel')}>
            <Button className="survey123__section-resetSurvey" onClick={() => this.setState({ mode: 'confirmResetSurvey' })}><Icon size="8" icon={this.iconRefresh} /></Button>

            {/* survey title */}
            <SettingRow>
              {(this.state.selectedSurvey) ? this.state.selectedSurvey.title : ''}
            </SettingRow>

            {/* survey description */}
            <SettingRow>
              {(this.state.selectedSurvey) ? this.state.selectedSurvey.snippet : ''}
            </SettingRow>

            <SettingRow>
              <Button className="w-100" color='primary' onClick={this.editSurvey}>{defaultMessages.editSurveyBtn}</Button>
            </SettingRow>
          </SettingSection>

          <SettingSection title={this.nls('appearanceTitle')}>
            <SettingRow>
              <div className="appearance">
                <span>{defaultMessages.hideOptionsBarLabel}</span>
                <Switch className='can-x-switch' checked={this.props.config.hides.indexOf('navbar') !== -1}
                  onChange={evt => { this.setAppearance(evt.target.checked, 'navbar') }} />
              </div>
              {/* <input value='navbar' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('navbar') !== -1} /> */}
            </SettingRow>
            <SettingRow>
              {/* <input value='header' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('header') !== -1} /> */}
              <div className="appearance">
                <span>{defaultMessages.hideOptionsHeaderLabel}</span>
                <Switch className='can-x-switch' checked={this.props.config.hides.indexOf('header') !== -1}
                  onChange={evt => { this.setAppearance(evt.target.checked, 'header') }} />
              </div>
            </SettingRow>
            <SettingRow>
              {/* <input value='description' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('description') !== -1} /> */}
              <div className="appearance">
                <span>{defaultMessages.hideOptionsDesLabel}</span>
                <Switch className='can-x-switch' checked={this.props.config.hides.indexOf('description') !== -1}
                  onChange={evt => { this.setAppearance(evt.target.checked, 'description') }} />
              </div>
            </SettingRow>
            <SettingRow>
              {/* <input value='footer' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('footer') !== -1} /> */}
              <div className="appearance">
                <span>{defaultMessages.hideOptionsFooterLabel}</span>
                <Switch className='can-x-switch' checked={this.props.config.hides.indexOf('footer') !== -1}
                  onChange={evt => { this.setAppearance(evt.target.checked, 'footer') }} />
              </div>
            </SettingRow>
            <SettingRow>
              {/* <input value='theme' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('theme') !== -1} /> */}
              <div className="appearance">
                <span>{defaultMessages.ignoreThemeLabel}</span>
                <Switch className='can-x-switch' checked={this.props.config.hides.indexOf('theme') !== -1}
                  onChange={evt => { this.setAppearance(evt.target.checked, 'theme') }} />
              </div>
            </SettingRow>
          </SettingSection>

          {/* <SettingSection title="Associated Map">
          <SettingRow>
            Set an external map which will be used for GeoPoint question instead of the built-in map.
          </SettingRow>
          <SettingRow>
            <DataSourceChooser
              types={this.supportedMapTypes}
              onSelect={this.onMapViewSelected}
              selectedDataSourceIds={this.props.useDataSources && this.props.config.dsType === ArcGISDataSourceTypes.MapView && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
              widgetId={this.props.id}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Default Answers">
          <SettingRow>
            Set default answers for survey questions when the survey is opened.
          </SettingRow>
          <SettingRow>
            1. Select a field from a feature layer view:
            <DataSourceChooser
              types={this.supportedLayerTypes}
              onSelect={this.onFeatureLayerViewSelected}
              selectedDataSourceIds={this.props.useDataSources && this.props.config.dsType === ArcGISDataSourceTypes.FeatureLayerView && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
              widgetId={this.props.id}
            />
            {
              this.props.config.dsType === ArcGISDataSourceTypes.FeatureLayerView && this.props.useDataSources && this.props.useDataSources.length > 0 &&
              <FieldChooser
                dataSourceIds={this.props.useDataSources && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
                onSelect={this.onFieldSelected}
                selectedFields={this.props.useDataSources[0].fields}
              />
            }
          </SettingRow>
          <div style={
            (this.state.surveyQuestionFields.length > 0) ? { 'display': 'block' } : { 'display': 'none' }
          }>
            <SettingRow>
              2. Select a Survey Question:
            </SettingRow>
            <SettingRow>
              <select onChange={this.onSurveyQuestionFieldChanged} disabled={this.state.surveyQuestionFields.length === 0} value={(selectedSurveyQuestionField) ? selectedSurveyQuestionField : 'null'} style={{
                width: '100%',
                padding: '5px'
              }}>
                <option value="null">Please select</option>
                {
                  (this.state.surveyQuestionFields.length > 0) ?
                    this.state.surveyQuestionFields.map((field) => {
                      return <option value={field.name}>{field.label}</option>
                    })
                    : ''
                }
              </select>
            </SettingRow>
          </div>
        </SettingSection> */}
        </div>

        {/* confirm reset survey section */}
        <div className='survey123__section' style={
          (this.state.mode.indexOf('confirmResetSurvey') !== -1) ?
            { display: 'block' }
            : { display: 'none' }
        }>
          <SettingSection title={this.nls('resetSurveyLabel')}>
            <SettingRow>
              {defaultMessages.resetSurveyTip}
            </SettingRow>
            {defaultMessages.confirmResetSurveyTip}
            <SettingRow>

            </SettingRow>

            <SettingRow>
              <Button color='primary' onClick={() => this.resetSurvey()}>{defaultMessages.yes}</Button>
              <Button onClick={() => this.showSettingPage()}>{defaultMessages.no}</Button>
            </SettingRow>

          </SettingSection>
        </div>

        <ReactModal
          isOpen={this.state.modalIsOpen}
          className='w-100 h-100'
          style={{
            overlay: {
              zIndex: 10000
            },
            content: {
              padding: '0px',
              zIndex: 100000,
              overflow: 'hidden'
            }
          }}
        >
          <div style={{
            width: '100%',
            height: '80px',
            padding: '23px 60px 23px 30px',
            color: '#ffffff',
            backgroundColor: '#000000'
          }}>
            <p style={{
              fontSize: '24px',
              marginBottom: 0,
              lineHeight: '33px'
            }}>{defaultMessages.editSurveyBtn}</p>

            <button color='primary' onClick={this.handleCloseModal} style={{
              position: 'absolute',
              top: '28px',
              right: '30px',
              // fontSize: '30px',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: '0px',
              cursor: 'pointer',
              padding: 0
            }}><Icon size="24" icon={this.closeIcon24} /></button>
          </div>

          <iframe id="survey123-designer" width="100%" style={{
            height: 'calc(100% - 90px)',
            width: '100%',
            border: '0px'
          }}></iframe>
        </ReactModal>
      </div >
    }
  }
