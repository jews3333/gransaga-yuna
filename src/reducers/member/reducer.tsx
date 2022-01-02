import { createReducer } from 'typesafe-actions';
import { GET_MEMBER } from './actions';
import { MemberAction, MemberState } from './types';

const initialState:MemberState = null;

const member = createReducer<MemberState, MemberAction>(initialState, {
    [GET_MEMBER] : (state, action) => (
        action.payload
    )
});

export default member;