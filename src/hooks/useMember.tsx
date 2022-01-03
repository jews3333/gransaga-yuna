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

        const qr = query(collection(db, 'member'), orderBy('class', 'asc'));
        const querySnapshot = await getDocs(qr);

        querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=>", doc.data());
            list = {
                ...list,
                [doc.id] : doc.data()
            }
        });

        dispatch(getMember(list));

    }, [dispatch]);

    const onSetMember = useCallback(async (update) => {
        await Object.keys(update).map((e,i) => {
            const ref = doc(db, 'member', e);
            updateDoc(ref, update[e]);
        });
        
        dispatch(setMember(update));

        return "저장 완료";
        
    }, [dispatch]);

    const onAddMember = useCallback(async (id, clss) => {
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
        })
        .catch((err) => {
            alert("추가 실패");
        });
        
        
    }, [dispatch]);

    const onDelMember = useCallback(async (id) => {
        await deleteDoc(doc(db, 'member', id))
        .then(() => {
            dispatch(delMember(id));
        })
        .catch((err) => {
            alert("삭제 실패");
        });
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
    