import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type MemberAction = ActionType<typeof actions>;

export type MemberState = {
    [id:string] : {
        id : string,
        class : number,
        eval? : string,
        state?: boolean,
        note?: string,
        single?: number,
        party?: number
     }
};