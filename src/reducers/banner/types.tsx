import { Timestamp } from 'firebase/firestore';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type BannerAction = ActionType<typeof actions>;

export type BannerState = null | {
    txt1?: string,
    txt2?: string,
    rules?: {
        [num:string] : {
            title?: string,
            txt?: string
        }
    }
};