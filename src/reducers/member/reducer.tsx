import { createReducer } from 'typesafe-actions';
import { GET_MEMBER, ADD_MEMBER, SET_MEMBER, DEL_MEMBER } from './actions';
import { MemberAction, MemberState } from './types';

const initialState:MemberState = null;

const member = createReducer<MemberState, MemberAction>(initialState, {
    [GET_MEMBER] : (state, action) => (
        action.payload
    ),
    [ADD_MEMBER] : (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    },
    [SET_MEMBER] : (state, action) => (
        action.payload
    ),
    [DEL_MEMBER] : (state, action) => {
        delete state[action.payload];
        return {
            ...state
        }
    }
});

export default member;