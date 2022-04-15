import { createReducer } from 'typesafe-actions';
import { GET_BANNER, SET_BANNER } from './actions';
import { BannerAction, BannerState } from './types';

const initialState:BannerState = null;

const banner = createReducer<BannerState, BannerAction>(initialState, {
    [GET_BANNER] : (state, action) => (
        action.payload
    ),
    [SET_BANNER] : (state, action) => (
        action.payload
    )
});

export default banner;