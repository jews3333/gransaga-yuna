import React from "react";
import { useParams } from 'react-router-dom';

import MemberForm from '../components/MemberForm';
import RoundForm from "../components/RoundForm";
import BlackForm from "../components/BlackForm";

function Form(){
    const { path } = useParams();
    return (
        <div id="form">
            <h2 className="content-title">{path == 'member' ? "길드원 관리" : path == 'round' ? "정령왕의 시련 관리" : path == 'black' && "블랙리스트 관리"}</h2>
            <div className="list">
                {path == 'member' ? <MemberForm/> : path == 'round' ? <RoundForm/> : path == 'black' && <BlackForm/>}
            </div>
        </div>
    )
}

export default Form;