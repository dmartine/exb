interface IPromise<T = any>{
  toPromise: () => Promise<T>;
}