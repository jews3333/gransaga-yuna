import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getRound, setRoundDetail, delRoundDetail } from '../reducers/round';

import { collection, query, doc, orderBy, getDocs, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
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

    const onSetRoundDetail = useCallback(async (data, id?) => {
        let message = "";

        if(id) {
            await setDoc(doc(db, 'round', id), data)
            .then(() => {
                message = "저장이 완료되었습니다.";
            })
            .catch((err) => {
                message = "저장을 실패하였습니다.";
            });
        } else {
            await addDoc(collection(db, 'round'), data)
            .then(() => {
                message = "저장이 완료되었습니다.";
            })
            .catch((err) => {
                message = "저장을 실패하였습니다.";
            });
        }

        return message;
    }, [dispatch]);

    const onDelRoundDetail = useCallback(async (id) => {
        let message = "";
        
        await deleteDoc(doc(db, 'round', id))
        .then(() => {
            dispatch(delRoundDetail(id));
            message = "삭제가 완료되었습니다.";
        })
        .catch((err) => {
            message = "삭제를 실패하였습니다.";
        });

        return message;
    }, [dispatch]);

    return {
        round,
        onGetRound,
        onSetRoundDetail,
        onDelRoundDetail
    }
}

export default useRound;
    