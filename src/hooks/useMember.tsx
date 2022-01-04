import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getMember, addMember, setMember, delMember } from '../reducers/member';

import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/init';

function useMember(){
    const member = useSelector((state:RootState) => state.member);
    const dispatch = useDispatch();

    const onGetMember = useCallback(async () => {
        let list = {};

        const qr = query(collection(db, 'member'), orderBy('class'), orderBy('id'));
        const querySnapshot = await getDocs(qr);

        querySnapshot.forEach((doc) => {
            list = {
                ...list,
                [doc.id] : doc.data()
            }
        });

        dispatch(getMember(list));

    }, [dispatch]);

    const onSetMember = useCallback(async (update) => {
        let message = "";

        await Object.keys(update).map((e,i) => {
            const ref = doc(db, 'member', e);
            updateDoc(ref, update[e]);
        });
        
        dispatch(setMember(update));
        message = "저장이 완료되었습니다.";

        return message;
        
    }, [dispatch]);

    const onAddMember = useCallback(async (id, clss) => {
        let message = "";

        const ref = collection(db, 'member');

        await addDoc(ref,{
            id: id,
            class: clss
        })
        .then((data:any) => {
            dispatch(addMember({
                [data.id] : {
                    id: id,
                    class: clss
                }
            }));
            message = "추가가 완료되었습니다.";
        })
        .catch((err) => {
            message = "추가를 실패하였습니다.";
        });
        
        return message;

    }, [dispatch]);

    const onDelMember = useCallback(async (id) => {
        let message = "";

        await deleteDoc(doc(db, 'member', id))
        .then(() => {
            dispatch(delMember(id));
            message = "삭제가 완료되었습니다."
        })
        .catch((err) => {
            message = "삭제를 실패하였습니다."
        });

        return message;

    }, [dispatch]);

    return {
        member,
        onGetMember,
        onSetMember,
        onAddMember,
        onDelMember
    }
}

export default useMember;
    