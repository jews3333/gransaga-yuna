import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getBanner, setBanner } from '../reducers/banner';

import { collection, query, doc, orderBy, getDoc, addDoc, setDoc, deleteDoc, where } from 'firebase/firestore';
import { db } from '../firebase/init';

function useBanner(){
    const banner = useSelector((state:RootState) => state.banner);
    const dispatch = useDispatch();

    const onGetBanner = useCallback(async () => {

        const ref = doc(db, 'banner','master');
        const docSnap = await getDoc(ref);

        const data = docSnap.data();

        if(data !== undefined) {
            dispatch(getBanner(data));
        }

    }, [dispatch]);

    const onSetBanner = useCallback(async (data) => {
        let message = "";

        await setDoc(doc(db, 'banner', 'master'), data)
        .then(() => {
            message = "저장이 완료되었습니다.";
            dispatch(setBanner(data));
        })
        .catch((err) => {
            message = "저장을 실패하였습니다.";
        });

        return message;
    }, [dispatch]);

    return {
        banner,
        onGetBanner,
        onSetBanner
    }
}

export default useBanner;
    