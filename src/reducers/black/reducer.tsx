import { createReducer } from 'typesafe-actions';
import { GET_BLACK, ADD_BLACK, SET_BLACK, DEL_BLACK } from './actions';
import { BlackAction, BlackState } from './types';

const initialState:BlackState = {};

const black = createReducer<BlackState, BlackAction>(initialState, {
    [GET_BLACK] : (state, action) => (
        action.payload
    ),
    [ADD_BLACK] : (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    },
    [SET_BLACK] : (state, action) => (
        action.payload
    ),
    [DEL_BLACK] : (state, action) => {
        delete state[action.payload];
        return {
            ...state
        }
    }
});

export default black;