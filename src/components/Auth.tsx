import React, { useState } from "react";

function Auth(){
    const [ code, setCode ] = useState<string>('zzzz');

    return (
        <div id="auth">
            <p>길드 관리자님 어서오세요!</p>
            <input type="text" value="" placeholder="PRIVATE CODE"/>
        </div>
    )
}

export default Auth;