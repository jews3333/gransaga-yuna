import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getAuth } from '../reducers/auth';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/init';

function useAuth(){
    const auth = useSelector((state:RootState) => state.auth);
    const dispatch = useDispatch();

    const onGetAuth = useCallback(async (code:string) => {
        let auth = false;

        const ref = doc(db, "code", code);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            auth = true;
        }
        
        dispatch(getAuth(auth));

        return auth;

    }, [dispatch]);

    const onExistesAuth = useCallback(async (code:string) => {
        dispatch(getAuth(false));

    }, [dispatch]);
 

    return {
        auth,
        onGetAuth,
        onExistesAuth
    }
}

export default useAuth;