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
        const ref = doc(db, "code", code);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            dispatch(getAuth(true));

            return true;
        } else {
            return false;
        }

    }, [dispatch]);

    const onDelAuth = useCallback(async () => {
        let message = "로그아웃되었습니다.";
        dispatch(getAuth(false));

        return message;
    }, [dispatch]);
 

    return {
        auth,
        onGetAuth,
        onDelAuth
    }
}

export default useAuth;