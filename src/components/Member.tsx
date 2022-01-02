import React, { useEffect } from 'react';
import useMember from '../hooks/useMember';

function Member(){

    const { member, onGetMember } = useMember();

    useEffect(() => {
        onGetMember();
    }, []);

    return (
        <table id="member-list">
            <caption></caption>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>등급</th>
                </tr>
            </thead>
            <tbody>
                {
                    member && 
                    Object.keys(member).map((e,i) => {
                        return <tr key={i}>
                            <td>{member[e].id}</td>
                            <td>{member[e].class == 1 ? "길드마스터" : member[e].class == 2 ? "서브마스터" : "길드멤버"}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default Member;