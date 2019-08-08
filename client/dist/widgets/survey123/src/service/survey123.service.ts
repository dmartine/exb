/**
 * survey123 common params
 */
export interface Survey123CommonParams {
  username?: string;
  token?: string;
  f?: string;
  portalUrl?: string;
}

/**
 * survey123 iframe message
 */
export interface Survey123Message {
  event: string;
  data: any;
}

/**
 * survey123 service
 */
export class Survey123Service {

  /**
   * get survey123 host url
   */
  public getSurvey123HostUrl(): string {
    /**
     * Beijing-R-D-Center/ExperienceBuilder/issues/88
     * we need to check url host to see which survey123 host url we will use
     * wabbuild.esri.com > survey123dec.arcgis.com
     * experiencedev.arcgis.com > survey123dev.arcgis.com
     * experienceqa.arcgis.com > survey123qa.arcgis.com
     * experience.arcgis.com > survey123.arcgis.com
     * default > survey123.arcgis.com
     * 
     */
    let url = 'https://survey123.arcgis.com';

    // dev
    if (window.hostEnv === 'dev') {
      url = 'https://survey123dev.arcgis.com';
    }

    // qa
    if (window.hostEnv === 'qa') {
      url = 'https://survey123qa.arcgis.com';
    }

    return url;
  }

  /**
   * create survey by survey123 rest api
   * @param title 
   * @param tags 
   * @param options 
   */
  public createSurvey(title: string, tags: string[], commonParams: Survey123CommonParams, options?: {
    snippet?: string;
    thumbnailUrl?: string;
  }): Promise<any> {
    // options
    options = Object.assign({
      snippet: ''
    }, options || {});

    return Promise.resolve(true)
      .then(() => {
        if (!title || !tags || !commonParams || !commonParams.token || !commonParams.username) {
          throw new Error('missing title, tags, username or token');
        }
      })
      .then(() => {
        let url = `${this.getSurvey123HostUrl()}/api/survey/create`;
        let params: any = {
          title: title,
          tags: tags.join(','),
          snippet: options.snippet,
          thumbnailUrl: options.thumbnailUrl,
          token: commonParams.token,
          username: commonParams.username,
          portalUrl: commonParams.portalUrl || 'https://www.arcgis.com'
        };

        return fetch(url, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(params)
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          });
      });
  }

  /**
   * query survey
   * @param commonParams 
   * @param options 
   */
  public querySurvey(commonParams: Survey123CommonParams, options?: {
    isShared?: boolean;
    isPublished?: boolean;
  }): Promise<any> {
    // options
    options = Object.assign({
      isShared: false,
      isPublished: true
    }, options || {});

    return Promise.resolve(true)
      .then(() => {
        if (!commonParams || !commonParams.token || !commonParams.username) {
          throw new Error('missing token or username');
        }
      })
      .then(() => {
        let url = `${this.getSurvey123HostUrl()}/api/survey/query`;
        let params: any = {
          isShared: options.isShared,
          isPublished: options.isPublished,
          token: commonParams.token,
          username: commonParams.username,
          portalUrl: commonParams.portalUrl || 'https://www.arcgis.com'
        };

        url = `${url}?${Object.keys(params).map((k) => k + '=' + params[k]).join('&')}`;

        return fetch(url, {
          mode: 'cors',
          method: 'GET'
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          });
      });
  }

  /**
   * get survey123 designer url
   */
  public getSurvey123DesignerUrl(surveyItemId: string, options?: {
    portalUrl?: string
  }): string {
    // options
    options = Object.assign({

    }, options || {});

    let url = `${this.getSurvey123HostUrl()}/surveys/${surveyItemId}/design?embed=exb`;
    if (options.portalUrl && options.portalUrl !== 'https://www.arcgis.com') {
      url += `&portalUrl=${options.portalUrl}`
    }

    return url;
  }

  /**
   * 
   * @param surveyItemId 
   * @param options 
   */
  public getSurvey123WebformUrl(surveyItemId: string, options?: {
    queryParams?: string[];
  }): string {
    // options
    options = Object.assign({
      queryParams: []
    }, options || {});

    const isDebug: boolean = false;

    let url = `${this.getSurvey123HostUrl()}/share/${surveyItemId}`;

    /**
     * debugg only
     */
    if (isDebug) {
      url = `https://calvin.arcgis.com:8443/webclient?appid=${surveyItemId}`;
    }


    if (options.queryParams.length > 0) {
      url += `${(isDebug) ? '&' : '?'}${options.queryParams.join('&')}`;
    }

    return url;
  }

  /**
   * get survey question fields
   * @param surveyItemId 
   * @param commonParams 
   */
  public getSurveyQuestionFields(surveyItemId: string, commonParams: Survey123CommonParams): Promise<Array<{
    name?: string;
    label?: string;
  }>> {
    return Promise.resolve(true)
      .then(() => {
        if (!surveyItemId || !commonParams || !commonParams.token) {
          throw new Error('missing surveyItemId or token');
        }
      })
      .then(() => {
        let url = `${this.getSurvey123HostUrl()}/api/survey/${surveyItemId}/form`;
        let params: any = {
          token: commonParams.token
        };

        url = `${url}?${Object.keys(params).map((k) => k + '=' + params[k]).join('&')}`;

        return fetch(url, {
          mode: 'cors',
          method: 'GET'
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          });
      })
      .then((res: any) => {
        let results = [];

        if (res && res.questions && res.questions.length > 0) {
          res.questions.forEach((q: any) => {
            if (q.fieldName) {
              results.push({
                name: q.fieldName,
                label: q.label
              });
            }
          });
        }

        return results;
      });
  }

}

export const survey123Service = new Survey123Service();