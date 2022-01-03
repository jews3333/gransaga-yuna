import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useRound from '../hooks/useRound';
import { FormatDate } from '../modules';

function RoundDetail(){
    const { id } = useParams();

    const [ detail, setDetail ] = useState<any>();
    const { round, onGetRound } = useRound();

    useEffect(() => {
        if(!round)  onGetRound();
    }, []);

    useEffect(() => {
        if(id != undefined && round) setDetail(round[id]);
    }, [round, id]);

    return (
        <>
            <table id="round-detail">
                <caption></caption>
                <thead>
                    <tr>
                        <th>정령왕</th>
                        <th>기간</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        detail && <>
                            {
                                Object.keys(round).map((e,i) => {
                                    if(e == id) {
                                        return <tr key={i}>
                                            <td>{round[e].target == 1 ? "바람 정령왕 킨" : round[e].target == 2 ? "땅 정령왕 디오네" : round[e].target == 3 ? "물 정령왕 마케이우" : round[e].target == 4 ? "불 정령왕 라카테쉬" : round[e].target == 5 ? "빛 정령왕 제네로" : round[e].target == 6 ? "어둠 정령왕 타나룸" : "???"}</td>
                                            <td>
                                                {FormatDate(round[e].start)}
                                                <span> ~ </span>
                                                {FormatDate(round[e].end)}
                                            </td>
                                        </tr>
                                    }
                                })
                            }
                        </>
                        
                    }
                    <tr>
                        <th colSpan={2}>참여현황</th>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
            <div className='submit-layout'>
                <Link to={`/admin/form/round/${id}`} className='button submit'>수정</Link>
            </div>
        </>
    )
}

export default RoundDetail;