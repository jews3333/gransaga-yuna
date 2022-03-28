import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getBlack, addBlack, setBlack, delBlack } from '../reducers/black';

import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/init';

function useBlack(){
    const black = useSelector((state:RootState) => state.black);
    const dispatch = useDispatch();

    const onGetBlack = useCallback(async () => {
        let list = {};

        const qr = query(collection(db, 'black'), orderBy('id'));
        const querySnapshot = await getDocs(qr);

        querySnapshot.forEach((doc) => {
            list = {
                ...list,
                [doc.id] : doc.data()
            }
        });

        dispatch(getBlack(list));

    }, [dispatch]);

    const onSetBlack = useCallback(async (update) => {
        let message = "";

        await Object.keys(update).map((e,i) => {
            const ref = doc(db, 'black', e);
            updateDoc(ref, update[e]);
        });
        
        dispatch(setBlack(update));
        message = "저장이 완료되었습니다.";

        return message;
        
    }, [dispatch]);

    const onAddBlack = useCallback(async (id) => {
        let message = "";

        const ref = collection(db, 'black');

        await addDoc(ref,{
            id: id
        })
        .then((data) => {
            dispatch(addBlack({
                [data.id] : {
                    id: id
                }
            }));
            message = "추가가 완료되었습니다.";
        })
        .catch((err) => {
            message = "추가를 실패하였습니다.";
        });
        
        return message;

    }, [dispatch]);

    const onDelBlack = useCallback(async (id) => {
        let message = "";

        await deleteDoc(doc(db, 'black', id))
        .then(() => {
            dispatch(delBlack(id));
            message = "삭제가 완료되었습니다."
        })
        .catch((err) => {
            message = "삭제를 실패하였습니다."
        });

        return message;

    }, [dispatch]);

    return {
        black,
        onGetBlack,
        onSetBlack,
        onAddBlack,
        onDelBlack
    }
}

export default useBlack;
    