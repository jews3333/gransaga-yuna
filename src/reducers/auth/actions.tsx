import { createAction } from 'typesafe-actions';

export const GET_AUTH = 'auth/GET_AUTH';

export const getAuth = createAction(GET_AUTH)<boolean>();