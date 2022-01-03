import { createAction } from 'typesafe-actions';

export const GET_MEMBER = 'portfolio/GET_MEMBER';
export const ADD_MEMBER = 'portfolio/ADD_MEMBER';
export const SET_MEMBER = 'portfolio/SET_MEMBER';
export const DEL_MEMBER = 'portfolio/DEL_MEMBER';

export const getMember = createAction(GET_MEMBER)<any>();
export const addMember = createAction(ADD_MEMBER)<any>();
export const setMember = createAction(SET_MEMBER)<any>();
export const delMember = createAction(DEL_MEMBER)<any>();