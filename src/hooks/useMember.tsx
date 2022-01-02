import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { getMember } from '../reducers/member';

import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init';

function useMember(){
    const member = useSelector((state:RootState) => state.member);
    const dispatch = useDispatch();

    const onGetMember = useCallback(async () => {
        let list = {};

        const qr = query(collection(db, 'member'), orderBy('class'));
        const querySnapshot = await getDocs(qr);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            list = {
                ...list,
                [doc.id] : doc.data()
            }
        });

        dispatch(getMember(list));

    }, [dispatch]);

    return {
        member,
        onGetMember
    }
}

export default useMember;
    