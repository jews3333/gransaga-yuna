import React, { useState, useEffect, forwardRef } from 'react';
import useRound from '../hooks/useRound';
import useMember from '../hooks/useMember';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Timestamp } from 'firebase/firestore';
import { FormatDate } from '../modules';

function RoundForm(){
    const navigation = useNavigate();

    const [ data, setData ] = useState<any>(null);
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());
    const [ target, setTarget ] = useState<number>(0);
    const [ memberState, setMemberState ] = useState<any>({});

    const { round, onGetRound, onSetRoundDetail } = useRound();
    const { member, onGetMember } = useMember();

    const { path, id } = useParams();

    useEffect(() => {
        if(!round) onGetRound();
        if(!member) onGetMember();
    }, []);

    useEffect(() => {
        setData({
            start: Timestamp.fromDate(startDate),
            end: Timestamp.fromDate(endDate),
            target: target,
            member: memberState
        });
    }, [startDate, endDate, target, memberState]);

    useEffect(() => {
        if(!id && member){
            
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
        if(round){
            if(id){
                setStartDate(new Date(FormatDate(round[id].start)));
                setEndDate(new Date(FormatDate(round[id].end)));
                setTarget(Number(round[id].target));
                setMemberState(round[id].member);
            }
        }
    }, [round]);

    const setRoundDetail = (event:React.MouseEvent<HTMLButtonElement>, data:any) => {
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

    const changeStartDate = (date:Date) => {
        setStartDate(date);
    }

    const changeEndDate = (date:Date) => {
        setEndDate(date);
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
                            <DatePicker selected={startDate} onChange={(date:Date) => changeStartDate(date)} customInput={<StartDateButton/>} dateFormat="yyyy-MM-dd" />
                            <span> ~ </span>
                            <DatePicker selected={endDate} onChange={(date:Date) => changeEndDate(date)} customInput={<EndDateButton/>} dateFormat="yyyy-MM-dd" />
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>참여현황</th>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {
                                !id ? <p className='point'>참여자 목록은 자동으로 등록됩니다.</p>
                                : memberState && 
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