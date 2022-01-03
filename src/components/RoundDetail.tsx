import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRound from '../hooks/useRound';

function RoundDetail(){
    const { id } = useParams();

    const { detail, setDetail } = useEffect<any>();
    const { round, onGetRound } = useRound();

    useEffect(() => {
        if(!round) onGetRound();
    }, []);

    return (
        <table id="round-detail">
            <caption></caption>
            <thead>
                <tr>
                    <th>정령왕</th>
                    <th>기간</th>
                </tr>
            </thead>
            {
                round && <tbody>
                    <tr>
                        <td>{round[id].target}</td>
                        <td>
                            {round[id].start}
                        </td>
                    </tr>
                </tbody>
            }
            
            <tr>
                <th colSpan={2}>참여현황</th>
            </tr>
            <tr>
                <td colSpan={2}></td>
            </tr>
        </table>
    )
}

export default RoundDetail;