import React, { useEffect } from 'react';
import useMember from '../hooks/useMember';
import { FaChessKing, FaChessRook, FaChessPawn } from "react-icons/fa";

function MemberList(){

    const { member, onGetMember } = useMember();

    useEffect(() => {
        onGetMember();
    }, []);

    return (
        <table id="member-list">
            <caption></caption>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>등급</th>
                    <th>평가</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(member).length > 0 && 
                    Object.keys(member).map((e,i) => {
                        return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{member[e].id}</td>
                            <td>{member[e].class == 1 ? <FaChessKing size={20} fill={`#f5d700`}/> : member[e].class == 2 ? <FaChessRook size={20} fill={`#8b8b8b`}/> : <FaChessPawn size={20} fill={`#484848`}/>}</td>
                            <td>{member[e].eval}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default MemberList;