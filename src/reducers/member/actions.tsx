import { createAction } from 'typesafe-actions';
import { MemberState } from './types';

export const GET_MEMBER = 'member/GET_MEMBER';
export const ADD_MEMBER = 'member/ADD_MEMBER';
export const SET_MEMBER = 'member/SET_MEMBER';
export const DEL_MEMBER = 'member/DEL_MEMBER';

export const getMember = createAction(GET_MEMBER)<MemberState>();
export const addMember = createAction(ADD_MEMBER)<MemberState>();
export const setMember = createAction(SET_MEMBER)<MemberState>();
export const delMember = createAction(DEL_MEMBER)<string>();