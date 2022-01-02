import { createAction } from 'typesafe-actions';

export const GET_MEMBER = 'portfolio/GET_MEMBER';

export const getMember = createAction(GET_MEMBER)<any>();