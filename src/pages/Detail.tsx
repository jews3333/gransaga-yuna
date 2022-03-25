import React from "react";
import { useParams } from 'react-router-dom';

import RoundDetail from "../components/RoundDetail";

function Detail(){
    const { path, id } = useParams();
    return (
        <div id="detail">
            <h2 className="content-title">정령왕의 시련 관리</h2>
            <RoundDetail/>
        </div>
    )
}

export default Detail;