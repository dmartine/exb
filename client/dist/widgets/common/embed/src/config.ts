import {ImmutableObject} from 'jimu-core';

interface FunctionConfig {
  embedType: EmbedType,
  content: string
}

export enum EmbedType{
  Url = 'url',
  Code = 'code'
}


export interface Config{
  functionConfig: FunctionConfig;
}

export type IMConfig = ImmutableObject<Config>;
