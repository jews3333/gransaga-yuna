import React from "react";
import { Link } from 'react-router-dom';
import MemberList from "../components/MemberList";
import RoundList from "../components/RoundList";

function Admin(){
    return (
        <div id="admin">
            <p>길드원과 정령왕, 블랙리스트를 관리해보세요!</p>
            {/* <h2 className="content-title">길드원/정령왕의 시련 관리</h2> */}
            {/* <div className="list">
                <dl>
                    <dt>
                        <strong>길드원</strong><br/>
                        <Link to="./form/member" className="button update">수정</Link>
                    </dt>
                    <dd>
                        <MemberList/>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <strong>정령왕의 시련</strong><br/>
                        <Link to="./form/round" className="button update">등록</Link>
                    </dt>
                    <dd>
                        <RoundList/>
                    </dd>
                </dl>
            </div> */}
        </div>
    )
}

export default Admin;