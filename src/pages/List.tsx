import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import MemberList from "../components/MemberList";
import RoundList from "../components/RoundList";
import BlackList from "../components/BlackList";
import BannerList from "../components/BannerList";

function List(){
    const { path } = useParams();
    return (
        <div id="form">
            <h2 className="content-title">{path == 'member' ? "길드원 관리" : path == 'round' ? "정령왕의 시련 관리" : path == 'black' ? "블랙리스트 관리" : path == 'banner' && "홍보배너 관리"}</h2>
            <div className="mb-30 txt-center">
                <Link to={`/admin/${path}/form`} className="button update">{path == 'round' ? '등록' : '수정'}</Link>
            </div>
            <div className="list">
                {path == 'member' ? <MemberList/> : path == 'round' ? <RoundList/> : path == 'black' ? <BlackList/> : path == 'banner' && <BannerList/>}
            </div>
        </div>
    )
}

export default List;