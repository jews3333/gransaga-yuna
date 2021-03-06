import React, { useState, useEffect, forwardRef } from 'react';
import useRound from '../hooks/useRound';
import useMember from '../hooks/useMember';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { FormatDate } from '../modules';
import { RoundState } from '../reducers/round';
import { MemberState } from '../reducers/member';

type DataType = {
    target? : number,
    start? : Timestamp,
    end? : Timestamp,
    result? : number,
    member? : MemberState
}

function RoundForm(){
    const navigation = useNavigate();

    const [ data, setData ] = useState<DataType>({});
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+6));
    const [ target, setTarget ] = useState<number>(0);
    const [ result, setResult ] = useState<number>(0);
    const [ memberState, setMemberState ] = useState<MemberState>({});

    const { round, onGetRound, onSetRoundDetail } = useRound();
    const { member, onGetMember } = useMember();

    const { path, id } = useParams();

    useEffect(() => {
        if(Object.keys(round).length == 0) onGetRound();
        if(Object.keys(member).length == 0) onGetMember();
    }, []);

    useEffect(() => {
        setData({
            target: target,
            start: Timestamp.fromDate(startDate),
            end: Timestamp.fromDate(endDate),
            result: result,
            member: memberState
        });
    }, [startDate, endDate, target, result, memberState]);

    useEffect(() => {
        if(!id && Object.keys(member).length > 0){
            let memberList = member;

            Object.keys(memberList).map((e,i) => {
                memberList = {
                    ...memberList,
                    [e] : {
                        ...memberList[e],
                        state: false,
                        note: "",
                        single: 0,
                        party: 0
                    }
                }
            });

            setMemberState(memberList);
        }
    }, [member]);

    useEffect(() => {
        if(Object.keys(round).length > 0){
            if(id){
                let memberList = {};
                let sortList = [];

                sortList = Object.entries(round[id].member);

                sortList.sort((a:any, b:any) => {
                    return a[1].id < b[1].id ? -1 : a[1].id > b[1].id ? 1 : 0;
                });

                sortList.sort((a:any, b:any) => {
                    return a[1].class - b[1].class;
                });

                memberList = Object.fromEntries(sortList);

                setStartDate(new Date(FormatDate(round[id].start)));
                setEndDate(new Date(FormatDate(round[id].end)));
                setTarget(Number(round[id].target));
                setResult(Number(round[id].result));
                setMemberState(memberList);
            }
        }
    }, [round]);

    const setRoundDetail = (event:React.MouseEvent<HTMLButtonElement>, data:DataType) => {
        event.preventDefault();

        if(!target){
            alert("???????????? ??????????????????.");
            return;
        }

        if(!startDate){
            alert("???????????? ??????????????????.");
            return;
        }

        if(!endDate){
            alert("???????????? ??????????????????.");
            return;
        }

        if(window.confirm("?????????????????????????")){
            onSetRoundDetail(data, id)
            .then((message) => {
                alert(message);
                navigation("/admin/round");
            });
        }
    }

    const changeStartDate = (event:React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(new Date(event.target.value));
    }

    const changeEndDate = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(new Date(event.target.value));
    }

    const changeTarget = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setTarget(Number(event.target.value));
    }

    const changeState = (event:React.ChangeEvent<HTMLInputElement>, mber:string) => {
        setMemberState(prevState => ({
            ...prevState,
            [mber]: {
                ...prevState[mber],
                state: event.target.checked
            }
        }));
    }

    const changeNote = (event:React.ChangeEvent<HTMLInputElement>, mber:string) => {
        setMemberState(prevState => ({
            ...prevState,
            [mber]: {
                ...prevState[mber],
                note: event.target.value
            }
        }));
    }

    const changeSingle = (event:React.ChangeEvent<HTMLInputElement>, mber:string) => {
        // if(Number(event.target.value) <= Number(event.target.max)){
            setMemberState(prevState => ({
                ...prevState,
                [mber]: {
                    ...prevState[mber],
                    single: event.target.checked ? Number(event.target.value) : 0,
                    state: (Number(event.target.value) === 7 && prevState[mber].party === 3) ? true : false
                }
            }));
        // } else {
        //     alert(`${event.target.max} ?????? ????????? ??????????????????.`);
        // }
    }

    const changeParty = (event:React.ChangeEvent<HTMLInputElement>, mber:string) => {
        // if(Number(event.target.value) <= Number(event.target.max)){
            setMemberState(prevState => ({
                ...prevState,
                [mber]: {
                    ...prevState[mber],
                    party: event.target.checked ? Number(event.target.value) : 0,
                    state: (prevState[mber].single === 7 && Number(event.target.value) === 3) ? true : false
                }
            }));
        // } else {
        //     alert(`${event.target.max} ?????? ????????? ??????????????????.`);
        // }
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
                    <tr>
                        <td>
                            <select value={target} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => changeTarget(event)}>
                                <option value={0}>????????? ??????</option>
                                <option value={1}>?????? ????????? ???</option>
                                <option value={2}>??? ????????? ?????????</option>
                                <option value={3}>??? ????????? ????????????</option>
                                <option value={4}>??? ????????? ????????????</option>
                                <option value={5}>??? ????????? ?????????</option>
                                <option value={6}>?????? ????????? ?????????</option>
                            </select>
                        </td>
                        <td>
                            <input type="date" value={FormatDate(Timestamp.fromDate(startDate))} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeStartDate(event)}/>
                            <span> ~ </span>
                            <input type="date" value={FormatDate(Timestamp.fromDate(endDate))} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeEndDate(event)}/>
                        </td>
                        <td>
                            <input type="number" value={result} onChange={(event:React.ChangeEvent<HTMLInputElement>) => setResult(Number(event.target.value))} />
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={3}>????????????</th>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            {
                                !id ? <p className='point'>????????? ????????? ???????????? ???????????????.</p>
                                : Object.keys(memberState).length > 0 && 
                                <>
                                    <div className='round-member-header'>
                                        <span>??????</span>
                                        <span>??????</span>
                                        <span>??????/?????????</span>
                                        <span>?????????</span>
                                        <span>?????????</span>
                                        <span>??????</span>
                                    </div>
                                    {Object.keys(memberState).map((e,i) => {
                                        return <div key={i} className='round-member-data'>
                                            <span>{i+1}</span>
                                            <span>{memberState[e].id}</span>
                                            <span>
                                                {/* <input type="checkbox" id={`state${i+1}`} defaultChecked={memberState[e].state} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeState(event, e)}/> */}
                                                {/* <label htmlFor={`state${i+1}`}>{memberState[e].state ? "??????" : "?????????"}</label> */}
                                                <span className={`state${memberState[e].state ? '1' : '2'}`}>{memberState[e].state ? "??????" : "?????????"}</span>
                                            </span>
                                            <span>
                                                {/* <input type="number" defaultValue={0} value={memberState[e].single} max={7} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeSingle(event,e)}/> */}
                                                <input type="checkbox" value={7} checked={memberState[e].single === 7 ? true : false} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeSingle(event,e)}/>
                                            </span>
                                            <span>
                                                {/* <input type="number" defaultValue={0} value={memberState[e].party} max={3} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeParty(event,e)}/> */}
                                                <input type="checkbox" value={3} checked={memberState[e].party === 3 ? true : false} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeParty(event,e)}/>
                                            </span>
                                            <span>
                                                <input type="text" value={memberState[e].note} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeNote(event,e)}/>
                                            </span>
                                        </div>
                                    })}
                                </>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='submit-layout'>
                <button type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>) => setRoundDetail(event, data)} className='button submit'>??????</button>
                <button className='button cancel' onClick={() => navigation(-1)}>??????</button>
            </div>
        </>
    )
}

export default RoundForm;