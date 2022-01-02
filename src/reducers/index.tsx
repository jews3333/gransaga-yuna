import { combineReducers } from 'redux';
import auth from './auth';
import member from './member';

const rootReducer = combineReducers({
    auth,
    member
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;