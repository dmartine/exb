import {DataSource, DataSourceConstructorOptions, DataRecord, SimpleDataRecord, AbstractQueriableDataSource, DataSourceFactory} from 'jimu-core';

export enum DataSourceTypes{
  GitHubRepository = 'GITHUB_REPOSITORY',
}
export default class DataSourceFactoryExtension implements DataSourceFactory{
  createDataSource(options: DataSourceConstructorOptions): DataSource{
    let dsJson = options.dataSourceJson;
    if(dsJson.type === DataSourceTypes.GitHubRepository){
      return new GithubRepositoryDataSource(options);
    }else{
      console.error('Unimplemented data source type.', dsJson.type);
    }
  }
}

export class GithubRepositoryDataSource extends AbstractQueriableDataSource{
  
  doQuery(query: string): Promise<DataRecord[]>{
    return window.fetch(`${this.url}?q=${query}`).then(res => res.json()).then(result => {
      return result.items.map(item => new SimpleDataRecord(item, this));
    });
  }

  doQueryById(id: string): Promise<DataRecord>{
    return Promise.reject('todo: query by id')
  }

  mergeQuery(baseQuery, newQuery){
    return null;
  }

  setJsonData(data: any[]){
    this.records = data.map(d => new SimpleDataRecord(d, this));
  }

  doAdd(record: DataRecord): Promise<DataRecord>{
    //we will not create repository here acturally
    return Promise.resolve(record);
  }
}