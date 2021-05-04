import { ImmutableObject } from "seamless-immutable";

export interface Config {
  checkboxStatus: boolean;
}

export type IMConfig = ImmutableObject<Config>;
