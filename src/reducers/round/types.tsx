import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type RoundAction = ActionType<typeof actions>;

export type RoundState = any;