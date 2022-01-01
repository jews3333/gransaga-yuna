import { createReducer } from 'typesafe-actions';
import { GET_AUTH } from './actions';
import { AuthState, AuthAction } from './types';

const initialState:AuthState = false;

const auth = createReducer<AuthState, AuthAction>(initialState, {
    [GET_AUTH] : (state, action) => (
        action.payload
    )
});

export default auth;