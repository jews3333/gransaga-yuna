import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type BlackAction = ActionType<typeof actions>;

export type BlackState = {
    [id:string] : {
        id : string,
        cause? : string,
        profile? : string
     }
};