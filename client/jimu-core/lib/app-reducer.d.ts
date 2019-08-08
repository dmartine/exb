import * as SeamlessImmutable from 'seamless-immutable';
import { ActionTypes } from './app-actions';
import { State, IMState } from './types/state';
export default function rootReducer(state: IMState, action: ActionTypes): SeamlessImmutable.ImmutableObject<State>;
