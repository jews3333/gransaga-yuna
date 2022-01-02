import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Auth(){
    const [ code, setCode ] = useState<string>("");
    const { auth, onGetAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth){
            alert("로그인 성공");
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
            alert("코드 누락");
        }
    }

    const onGetCode = async (code:string) => {
        onGetAuth(code)
        .then((result) => {
            if(!result){
                alert("유효하지 않은 코드");
            }
        });
    }

    return (
        <div id="auth">
            <p>길드 관리자님 어서오세요!</p>
            <form>
                <input type="text" placeholder="PRIVATE CODE" onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeCode(e)}/>
                <button type="submit" onClick={(e:React.MouseEvent<HTMLButtonElement>) => onSubmit(e)}>Sign</button>
            </form>
        </div>
    )
}

export default Auth;