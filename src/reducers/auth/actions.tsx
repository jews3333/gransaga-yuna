import { createAction } from 'typesafe-actions';

export const GET_AUTH = 'portfolio/GET_AUTH';

export const getAuth = createAction(GET_AUTH)<boolean>();