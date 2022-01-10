import React, { useState, useEffect, forwardRef } from 'react';
import useRound from '../hooks/useRound';
import useMember from '../hooks/useMember';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
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
    const [ endDate, setEndDate ] = useState<Date>(new Date());
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
                        note: ""
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
            alert("정령왕을 선택해주세요.");
            return;
        }

        if(!startDate){
            alert("시작일을 선택해주세요.");
            return;
        }

        if(!endDate){
            alert("종료일을 선택해주세요.");
            return;
        }

        if(window.confirm("저장하시겠습니까?")){
            onSetRoundDetail(data, id)
            .then((message) => {
                alert(message);
                navigation("/admin");
            });
        }
    }

    // const changeStartDate = (date:Date) => {
    //     setStartDate(date);
    // }

    // const changeEndDate = (date:Date) => {
    //     setEndDate(date);
    // }

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
        setMemberState({
            ...memberState,
            [mber]: {
                ...memberState[mber],
                state: event.target.checked
            }
        });
    }

    const changeNote = (event:React.ChangeEvent<HTMLInputElement>, mber:string) => {
        setMemberState({
            ...memberState,
            [mber]: {
                ...memberState[mber],
                note: event.target.value
            }
        })
    }

    const StartDateButton = forwardRef(({ value, onClick }:any, ref:any) => {
        return <button className='custom-datepicker-button' onClick={onClick} ref={ref}>{value}</button>
    });

    const EndDateButton = forwardRef(({ value, onClick }:any, ref:any) => {
        return <button className='custom-datepicker-button' onClick={onClick} ref={ref}>{value}</button>
    });

    return (
        <>
            <table id="round-detail">
                <caption></caption>
                <thead>
                    <tr>
                        <th>정령왕</th>
                        <th>기간</th>
                        <th>순위</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select value={target} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => changeTarget(event)}>
                                <option value={0}>정령왕 선택</option>
                                <option value={1}>바람 정령왕 킨</option>
                                <option value={2}>땅 정령왕 디오네</option>
                                <option value={3}>물 정령왕 마케이우</option>
                                <option value={4}>불 정령왕 라카테쉬</option>
                                <option value={5}>빛 정령왕 제네로</option>
                                <option value={6}>어둠 정령왕 타나룸</option>
                            </select>
                        </td>
                        <td>
                            <input type="date" value={FormatDate(Timestamp.fromDate(startDate))} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeStartDate(event)}/>
                            <span> ~ </span>
                            <input type="date" value={FormatDate(Timestamp.fromDate(endDate))} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeEndDate(event)}/>
                            {/* <DatePicker selected={startDate} onChange={(date:Date) => changeStartDate(date)} customInput={<StartDateButton/>} dateFormat="yyyy-MM-dd" />
                            <span> ~ </span>
                            <DatePicker selected={endDate} onChange={(date:Date) => changeEndDate(date)} customInput={<EndDateButton/>} dateFormat="yyyy-MM-dd" /> */}
                        </td>
                        <td>
                            <input type="number" value={result} onChange={(event:React.ChangeEvent<HTMLInputElement>) => setResult(Number(event.target.value))} />
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={3}>참여현황</th>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            {
                                !id ? <p className='point'>참여자 목록은 자동으로 등록됩니다.</p>
                                : Object.keys(memberState).length > 0 && 
                                <>
                                    <div className='round-member-header'>
                                        <span>번호</span>
                                        <span>이름</span>
                                        <span>참여/미참여</span>
                                        <span>비고</span>
                                    </div>
                                    {Object.keys(memberState).map((e,i) => {
                                        return <div key={i} className='round-member-data'>
                                            <span>{i+1}</span>
                                            <span>{memberState[e].id}</span>
                                            <span>
                                                <input type="checkbox" id={`state${i+1}`} defaultChecked={memberState[e].state} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeState(event, e)}/>
                                                <label htmlFor={`state${i+1}`}>{memberState[e].state ? "참여" : "미참여"}</label>
                                            </span>
                                            <span>
                                                <input type="text" defaultValue={memberState[e].note} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeNote(event,e)}/>
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
                <button type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>) => setRoundDetail(event, data)} className='button submit'>저장</button>
                <Link to="/admin" className='button cancel'>취소</Link>
            </div>
        </>
    )
}

export default RoundForm;