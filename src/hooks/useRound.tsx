import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getRound, getRoundDetail } from '../reducers/round';

import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init';

function useRound(){
    const round = useSelector((state:RootState) => state.round);
    const dispatch = useDispatch();

    const onGetRound = useCallback(async () => {
        let list = {};

        const qr = query(collection(db, 'round'), orderBy('start'));
        const querySnapshot = await getDocs(qr);

        querySnapshot.forEach((doc) => {
            list = {
                ...list,
                [doc.id] : doc.data()
            }
        });


        dispatch(getRound(list));

    }, [dispatch]);

    const onGetRoundDetail = useCallback(async () => {
        console.log(round);

    }, [dispatch]);

    return {
        round,
        onGetRound,
        onGetRoundDetail
    }
}

export default useRound;
    