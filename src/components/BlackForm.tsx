import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useBlack from '../hooks/useBlack';
import { Link, useNavigate } from 'react-router-dom';
import { BlackState } from '../reducers/black';

function BlackForm(){
    const [ data, setData ] = useState<BlackState>({});
    const { onGetAuth } = useAuth();
    const { black, onGetBlack, onSetBlack, onAddBlack, onDelBlack } = useBlack();
    const navigation = useNavigate();

    useEffect(() => {
        onGetBlack();
    }, []);

    useEffect(() => {
        if(Object.keys(black).length > 0){
            setData(black);
        }
    }, [black]);

    const addBlack = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(Object.keys(black).length < 100) onAddBlack("")
        else alert("100명 이상 추가 불가")
    }

    const setBlack = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSetBlack(data)
        .then((message) => {
            alert(message);
            navigation("/admin/black");
        })
        .catch(err => alert("저장을 실패하였습니다."));
    }

    const delBlack = (event:React.MouseEvent<HTMLButtonElement>, id:string) => {
        event.preventDefault();
        let code = window.prompt("관리자 코드를 입력하세요");

        if(code){
            onGetAuth(code)
            .then((result) => {
                if(!result) {
                    alert("코드가 일치하지 않습니다.");
                } else {
                    setData({});
                    onDelBlack(id)
                    .then((message) => {
                        alert(message);
                        onGetBlack();
                    })
                }
            })
        } else {
            alert("코드를 입력하세요.");
        }
    }

    const changeId = (event:React.ChangeEvent<HTMLInputElement>, id:string) => {
        setData(prevState => ({
            ...prevState,
            [id] : {
                ...prevState[id],
                id : event.target.value
            }
        }));
    }

    const changeCause = (event:React.ChangeEvent<HTMLInputElement>, id:string) => {
        setData(prevState => ({
            ...prevState,
            [id] : {
                ...prevState[id],
                cause : event.target.value
            }
        }));
    }

    const changeProfile = (event:React.ChangeEvent<HTMLInputElement>, id:string) => {
        setData(prevState => ({
            ...prevState,
            [id] : {
                ...prevState[id],
                profile : event.target.value
            }
        }));
    }

    return (
        <>
            <table id="black-list">
                <caption></caption>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>사유</th>
                        <th>프로필</th>
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
                                    <input type="text" defaultValue={data[e].cause} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeCause(event, e)}/>
                                </td>
                                <td>
                                    <input type="text" defaultValue={data[e].profile} onChange={(event:React.ChangeEvent<HTMLInputElement>) => changeProfile(event, e)}/>
                                </td>
                                <td>
                                    <button onClick={(event:React.MouseEvent<HTMLButtonElement>) => delBlack(event, e)} className='button delete'>삭제</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <button onClick={addBlack} className='button add'>추가</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className='submit-layout'>
                <button type="submit" onClick={setBlack} className='button submit'>저장</button>
                <button className='button cancel' onClick={() => navigation(-1)}>취소</button>
            </div>
        </>
    )
}

export default BlackForm;