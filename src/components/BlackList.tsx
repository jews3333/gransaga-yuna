import React, { useEffect } from 'react';
import useBlack from '../hooks/useBlack';

function BlackList(){

    const { black, onGetBlack } = useBlack();

    useEffect(() => {
        onGetBlack();
    }, []);
    
    return (
        <table id="black-list">
            <caption></caption>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>사유</th>
                    <th>프로필</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(black).length > 0 && 
                    Object.keys(black).map((e,i) => {
                        return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{black[e].id}</td>
                            <td>{black[e].cause}</td>
                            <td>{black[e].profile && <a href={black[e].profile} target="_blank" className="button delete nowrap">프로필</a>}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default BlackList;