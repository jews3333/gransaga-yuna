import { combineReducers } from 'redux';
import auth from './auth';
import member from './member';
import round from './round';

const rootReducer = combineReducers({
    auth,
    member,
    round
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;