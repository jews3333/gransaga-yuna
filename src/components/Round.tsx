import React, { useEffect } from 'react';
import useRound from '../hooks/useRound';
import { FormatDate } from '../modules';
import { Link } from 'react-router-dom';

function Round(){
    const { round, onGetRound } = useRound();

    useEffect(() => {
        onGetRound();
    }, []);

    return (
        <table id="round-list">
            <caption></caption>
            <thead>
                <tr>
                    <th>정령왕</th>
                    <th>시작일</th>
                    <th>종료일</th>
                </tr>
            </thead>
            <tbody>
                {
                    round && 
                    Object.keys(round).map((e,i) => {
                        return <tr key={i}>
                            <td><Link to={`./detail/round/${e}`}>{round[e].target == 1 ? "바람 정령왕 킨" : round[e].target == 2 ? "땅 정령왕 디오네" : round[e].target == 3 ? "물 정령왕 마케이우" : round[e].target == 4 ? "불 정령왕 라카테쉬" : round[e].target == 5 ? "빛 정령왕 제네로" : round[e].target == 5 ? "어둠 정령왕 타나룸" : "???"}</Link></td>
                            <td>{FormatDate(round[e].start)}</td>
                            <td>{FormatDate(round[e].end)}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default Round;