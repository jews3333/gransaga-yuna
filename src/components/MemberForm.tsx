import React, { useState, useEffect } from 'react';
import useMember from '../hooks/useMember';
import { Link, useNavigate } from 'react-router-dom';

function MemberForm(){
    const [ update, setUpdate ] = useState<any>(null);
    const { member, onGetMember, onSetMember, onAddMember, onDelMember } = useMember();
    const navigation = useNavigate();

    useEffect(() => {
        if(!member) onGetMember();
    }, []);

    useEffect(() => {
        if(member){
            setUpdate(member);
        }
    }, [member]);

    const addMember = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onAddMember("",3);
    }

    const setMember = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSetMember(update)
        .then((result) => {
            alert(result);
            navigation("/admin");
        })
        .catch(err => alert("저장 실패"));
    }

    const delMember = (event:React.MouseEvent<HTMLButtonElement>, id:string) => {
        event.preventDefault();
        if(!window.confirm("정말로 삭제?")){
            return false;
        }
        onDelMember(id);
    }

    const changeId = (event:React.ChangeEvent<HTMLInputElement>, id:string) => {
        update[id].id = event.target.value;
    }

    const changeClass = (event:React.ChangeEvent<HTMLSelectElement>, id:string) => {
        update[id].class = Number(event.target.value);
    }

    return (
        <form>
            <table id="member-list">
                <caption></caption>
                <thead>
                    <tr>
                        <th scope='col'>번호</th>
                        <th scope='col'>이름</th>
                        <th scope='col'>등급</th>
                        <th scope='col'>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        update && 
                        Object.keys(update).map((e,i) => {
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td><input type="test" defaultValue={update[e].id} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeId(event, e)}/></td>
                                <td>
                                    <select defaultValue={update[e].class} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => changeClass(event, e)}>
                                        <option value={1}>길드마스터</option>
                                        <option value={2}>서브마스터</option>
                                        <option value={3}>길드멤버</option>
                                    </select>
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
                        <td colSpan={4}>
                            <button onClick={addMember} className='button add'>추가</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className='submit-layout'>
                <button type="submit" onClick={setMember} className='button submit'>저장</button>
                <Link to="/admin" className='button cancel'>취소</Link>
            </div>
        </form>
    )
}

export default MemberForm;