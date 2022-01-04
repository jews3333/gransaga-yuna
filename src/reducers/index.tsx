import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import member from './member';
import round from './round';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        'auth',
        'member',
        'round'
    ]
}

const rootReducer = combineReducers({
    auth,
    member,
    round
});

export default persistReducer<any, any>( persistConfig, rootReducer );

export type RootState = ReturnType<typeof rootReducer>;