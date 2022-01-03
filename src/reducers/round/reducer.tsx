import { createReducer } from 'typesafe-actions';
import { GET_ROUND, GET_ROUND_DETAIL } from './actions';
import { RoundAction, RoundState } from './types';

const initialState:RoundState = null;

const round = createReducer<RoundState, RoundAction>(initialState, {
    [GET_ROUND] : (state, action) => (
        action.payload
    ),
    [GET_ROUND_DETAIL] : (state, action) => (
        action.payload
    )
});

export default round;