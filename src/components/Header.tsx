import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Header(){
    const { auth, onDelAuth } = useAuth();

    const delAuth = (event:React.MouseEvent<HTMLAnchorElement>) => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            onDelAuth()
            .then((message) => {
                alert(message);
            });
        } else {
            event.preventDefault();
        }
    }

    return (
        <header id="header">
            <div className='inner'>
                <h1><Link to="/admin">그랑사가 길드를 관리해보자~!</Link></h1>
                <div>
                    {auth && <Link to="/" onClick={(evnet:React.MouseEvent<HTMLAnchorElement>) => delAuth(evnet)}>로그아웃</Link>}
                </div>
            </div>
        </header>
    )
}

export default Header;