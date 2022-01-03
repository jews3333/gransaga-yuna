import { createAction } from 'typesafe-actions';

export const GET_ROUND = 'portfolio/GET_ROUND';
export const GET_ROUND_DETAIL = 'portfolio/GET_ROUND_DETAIL';

export const getRound = createAction(GET_ROUND)<any>();
export const getRoundDetail = createAction(GET_ROUND_DETAIL)<any>();