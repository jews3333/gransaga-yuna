import { createAction } from 'typesafe-actions';
import { BlackState } from './types';

export const GET_BLACK = 'black/GET_BLACK';
export const ADD_BLACK = 'black/ADD_BLACK';
export const SET_BLACK = 'black/SET_BLACK';
export const DEL_BLACK = 'black/DEL_BLACK';

export const getBlack = createAction(GET_BLACK)<BlackState>();
export const addBlack = createAction(ADD_BLACK)<BlackState>();
export const setBlack = createAction(SET_BLACK)<BlackState>();
export const delBlack = createAction(DEL_BLACK)<string>();