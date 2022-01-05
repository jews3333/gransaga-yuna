import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Auth(){
    const [ code, setCode ] = useState<string>("");
    const { auth, onGetAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth){
            alert("로그인되었습니다.");
            navigate("/admin");
        }
    },[auth]);

    const onChangeCode = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const onSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(code != "") {
            onGetCode(code);
        } else {
            alert("코드가 누락되었습니다.");
        }
    }

    const onGetCode = async (code:string) => {
        onGetAuth(code)
        .then((result) => {
            if(!result){
                alert("코드가 일치하지 않습니다.");
            }
        });
    }

    return (
        <div id="auth">
            <h2 className="content-title">관리자 로그인</h2>
            <form>
                <input type="text" placeholder="PRIVATE CODE" onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeCode(e)}/>
                <button type="submit" className="button submit" onClick={(e:React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}>로그인</button>
            </form>
        </div>
    )
}

export default Auth;