import { createAction } from 'typesafe-actions';

export const GET_ROUND = 'round/GET_ROUND';
export const GET_ROUND_DETAIL = 'round/GET_ROUND_DETAIL';
export const SET_ROUND_DETAIL = 'round/SET_ROUND_DETAIL';
export const DEL_ROUND_DETAIL = 'round/DEL_ROUND_DETAIL';

export const getRound = createAction(GET_ROUND)<any>();
export const getRoundDetail = createAction(GET_ROUND_DETAIL)<any>();
export const setRoundDetail = createAction(SET_ROUND_DETAIL)<any>();
export const delRoundDetail = createAction(DEL_ROUND_DETAIL)<any>();
