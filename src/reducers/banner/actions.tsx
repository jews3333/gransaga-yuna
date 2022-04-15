import { createAction } from 'typesafe-actions';
import { BannerState } from './types';

export const GET_BANNER = 'round/GET_BANNER';
export const SET_BANNER = 'round/SET_BANNER';

export const getBanner = createAction(GET_BANNER)<BannerState | null>();
export const setBanner = createAction(SET_BANNER)<BannerState | null>();
