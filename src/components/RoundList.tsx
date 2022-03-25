import React, { useEffect } from 'react';
import useRound from '../hooks/useRound';
import { FormatDate } from '../modules';
import { Link } from 'react-router-dom';
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";

function RoundList(){
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
                    <th>순위</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(round).length > 0 && 
                    Object.keys(round).map((e,i) => {
                        return <tr key={i}>
                            <td><Link to={`/admin/round/detail/${e}`} className={`type${round[e].target}`}>{round[e].target == 1 ? "바람 정령왕 킨" : round[e].target == 2 ? "땅 정령왕 디오네" : round[e].target == 3 ? "물 정령왕 마케이우" : round[e].target == 4 ? "불 정령왕 라카테쉬" : round[e].target == 5 ? "빛 정령왕 제네로" : round[e].target == 6 ? "어둠 정령왕 타나룸" : "??? 정령왕"}</Link></td>
                            <td>{FormatDate(round[e].start)}</td>
                            <td>{FormatDate(round[e].end)}</td>
                            <td>{round[e].result === 0 ? "-" : round[e].result}
                                {
                                    (i < Object.keys(round).length-1) && (round[e].result !== 0)
                                    ? (round[e].result > round[Object.keys(round)[i+1]].result && round[e].result !== round[Object.keys(round)[i+1]].result)
                                    ? <HiArrowSmDown style={{"verticalAlign":"middle"}} fill={'#2d71ca'} />
                                    : <HiArrowSmUp fill={'#f44336'} />
                                    : null
                                }
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default RoundList;