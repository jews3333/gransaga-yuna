import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type MemberAction = ActionType<typeof actions>;

export type MemberState = any;