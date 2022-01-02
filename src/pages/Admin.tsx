import React from "react";
import Member from "../components/Member";
import Round from "../components/Round";

function Admin(){
    return (
        <div id="admin">
            <h2 className="content-title">길드원/정령왕의 시련 관리</h2>
            <div className="list">
                <dl>
                    <dt><strong>길드원</strong></dt>
                    <dd>
                        <Member/>
                    </dd>
                </dl>
                <dl>
                    <dt><strong>정령왕의 시련</strong></dt>
                    <dd>
                        <Round/>
                    </dd>
                </dl>
            </div>
        </div>
    )
}

export default Admin;