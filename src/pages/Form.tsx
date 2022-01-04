import React from "react";
import { useParams } from 'react-router-dom';

import MemberForm from '../components/MemberForm';
import RoundForm from "../components/RoundForm";

function Form(){
    const { path } = useParams();
    return (
        <div id="form">
            <h2 className="content-title">{path == 'member' ? "길드원 관리" : path == 'round' && "정령왕의 시련 관리"}</h2>
            <div className="list">
                {path == 'member' ? <MemberForm/> : path == 'round' && <RoundForm/>}
            </div>
        </div>
    )
}

export default Form;