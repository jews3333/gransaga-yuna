import { Timestamp } from 'firebase/firestore';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type RoundAction = ActionType<typeof actions>;

export type RoundState = {
    [id:string] : {
        target : number,
        start : Timestamp,
        end : Timestamp,
        result: number,
        member: {
            [id:string] : {
                id: string,
                class: number,
                state: boolean,
                note: string
            }
        }
    }
};