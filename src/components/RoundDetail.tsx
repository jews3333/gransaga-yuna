import { Timestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRound from '../hooks/useRound';
import { FormatDate } from '../modules';

import { RoundState } from '../reducers/round';

type DetailType = {
    target? : number,
    start? : Timestamp,
    end? : Timestamp,
    result? : number,
    member? : {
        [id:string] : {
            id: string,
            class: number,
            state?: boolean,
            note?: string,
            single?: number,
            party?: number
        }
    }
}

function RoundDetail(){
    const { id } = useParams();

    const [ detail, setDetail ] = useState<DetailType>({});
    const { onGetAuth } = useAuth();
    const { round, onGetRound, onDelRoundDetail } = useRound();

    const navigation = useNavigate();

    useEffect(() => {
        if(Object.keys(round).length == 0) onGetRound();
    }, []);

    useEffect(() => {
        if(id != undefined && Object.keys(round).length > 0) {
            setDetail(round[id]);
        }
    }, [round, id]);

    useEffect(() => {
        if(Object.keys(detail).length > 0){
            let memberList = {};
            let sortList = [];

            if(detail.member){
                sortList = Object.entries(detail.member);

                sortList.sort((a:any, b:any) => {
                    return a[1].id < b[1].id ? -1 : a[1].id > b[1].id ? 1 : 0;
                });

                sortList.sort((a:any, b:any) => {
                    return a[1].class - b[1].class;
                });

                memberList = Object.fromEntries(sortList);

                setDetail({
                    ...detail,
                    member : memberList
                });
            }
        }
    }, [detail]);

    const delRoundDetail = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(id){
            let code = window.prompt("????????? ????????? ???????????????");

            if(code){
                onGetAuth(code)
                .then((result) => {
                    if(!result) {
                        alert("????????? ???????????? ????????????.");
                    } else {
                        onDelRoundDetail(id)
                        .then((message) => {
                            alert(message);
                            navigation('/admin');
                        });
                    }
                })
            } else {
                alert("????????? ???????????????.");
            }
        }
    }

    return (
        <>
            <table id="round-detail">
                <caption></caption>
                <thead>
                    <tr>
                        <th>?????????</th>
                        <th>??????</th>
                        <th>??????</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(detail).length > 0 && 
                        <tr>
                            <td>{detail.target == 1 ? "?????? ????????? ???" : detail.target == 2 ? "??? ????????? ?????????" : detail.target == 3 ? "??? ????????? ????????????" : detail.target == 4 ? "??? ????????? ????????????" : detail.target == 5 ? "??? ????????? ?????????" : detail.target == 6 ? "?????? ????????? ?????????" : "???"}</td>
                            <td>
                                {detail.start && FormatDate(detail.start)}
                                <span> ~ </span>
                                {detail.end && FormatDate(detail.end)}
                            </td>
                            <td>{detail.result != 0 ? detail.result : "-"}</td>
                        </tr>
                        
                    }
                    <tr>
                        <th colSpan={3}>????????????</th>
                    </tr>
                    {
                         Object.keys(detail).length > 0 && 
                        <tr>
                            <td colSpan={3}>
                                <div className='round-member-header'>
                                    <span>??????</span>
                                    <span>??????</span>
                                    <span>??????/?????????</span>
                                    <span>?????????</span>
                                    <span>?????????</span>
                                    <span>??????</span>
                                </div>
                                {
                                    detail.member
                                    &&
                                    Object.keys(detail.member).map((m,j) => {
                                        return <div key={j} className='round-member-data'>
                                            {
                                                detail.member &&
                                                <>
                                                    <span>{j+1}</span>
                                                    <span>{detail.member[m].id}</span>
                                                    <span className={`state${detail.member[m].state ? '1' : '2'}`}>{detail.member[m].state ? "??????" : "?????????"}</span>
                                                    <span className={`state${detail.member[m].single ? '1' : '2'}`}>{detail.member[m].single ? '??????' : '?????????'}</span>
                                                    <span className={`state${detail.member[m].party ? '1' : '2'}`}>{detail.member[m].party ? '??????' : '?????????'}</span>
                                                    <span>{detail.member[m].note}</span>
                                                </>
                                            }
                                        </div>
                                    })
                                }
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className='submit-layout'>
                <Link to={`/admin/round/form/${id}`} className='button submit'>??????</Link>
                <button className='button delete' onClick={(event:React.MouseEvent<HTMLButtonElement>) => delRoundDetail(event)}>??????</button>
            </div>
        </>
    )
}

export default RoundDetail;