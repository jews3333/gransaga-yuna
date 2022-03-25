import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useMember from '../hooks/useMember';
import { Link, useNavigate } from 'react-router-dom';
import { MemberState } from '../reducers/member';

function MemberForm(){
    const [ data, setData ] = useState<MemberState>({});
    const { onGetAuth } = useAuth();
    const { member, onGetMember, onSetMember, onAddMember, onDelMember } = useMember();
    const navigation = useNavigate();

    useEffect(() => {
        onGetMember();
    }, []);

    useEffect(() => {
        if(Object.keys(member).length > 0){
            setData(member);
        }
    }, [member]);

    const addMember = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(Object.keys(member).length < 30) onAddMember("",3)
        else alert("30명 이상 추가 불가")
    }

    const setMember = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSetMember(data)
        .then((message) => {
            alert(message);
            navigation("/admin/member");
        })
        .catch(err => alert("저장을 실패하였습니다."));
    }

    const delMember = (event:React.MouseEvent<HTMLButtonElement>, id:string) => {
        event.preventDefault();
        let code = window.prompt("관리자 코드를 입력하세요");

        if(code){
            onGetAuth(code)
            .then((result) => {
                if(!result) {
                    alert("코드가 일치하지 않습니다.");
                } else {
                    setData({});
                    onDelMember(id)
                    .then((message) => {
                        alert(message);
                        onGetMember();
                    })
                }
            })
        } else {
            alert("코드를 입력하세요.");
        }
    }

    const changeId = (event:React.ChangeEvent<HTMLInputElement>, id:string) => {
        setData({
            ...data,
            [id] : {
                ...data[id],
                id : event.target.value
            }
        });
    }

    const changeClass = (event:React.ChangeEvent<HTMLSelectElement>, id:string) => {
        setData({
            ...data,
            [id] : {
                ...data[id],
                class : Number(event.target.value)
            }
        });
    }

    const changeEval = (event:React.ChangeEvent<HTMLInputElement>, id:string) => {
        setData({
            ...data,
            [id] : {
                ...data[id],
                eval : event.target.value
            }
        });
    }

    return (
        <>
            <table id="member-list">
                <caption></caption>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>등급</th>
                        <th>평가</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(data).length > 0 && 
                        Object.keys(data).map((e,i) => {
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td>
                                    <input type="text" defaultValue={data[e].id} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeId(event, e)}/>
                                    </td>
                                <td>
                                    <select defaultValue={data[e].class} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => changeClass(event, e)}>
                                        <option value={1}>길드마스터</option>
                                        <option value={2}>서브마스터</option>
                                        <option value={3}>길드멤버</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" defaultValue={data[e].eval} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeEval(event, e)}/>
                                </td>
                                <td>
                                    <button onClick={(event:React.MouseEvent<HTMLButtonElement>) => delMember(event, e)} className='button delete'>삭제</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <button onClick={addMember} className='button add'>추가</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className='submit-layout'>
                <button type="submit" onClick={setMember} className='button submit'>저장</button>
                <button className='button cancel' onClick={() => navigation(-1)}>취소</button>
            </div>
        </>
    )
}

export default MemberForm;