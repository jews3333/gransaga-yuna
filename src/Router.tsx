import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import Form from './pages/Form';
import Detail from './pages/Detail';
import Error from './pages/Error';

import useAuth from './hooks/useAuth';

function Router(){

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
        <BrowserRouter>
            <div id="container">
            {auth && <Link to="/" onClick={(evnet:React.MouseEvent<HTMLAnchorElement>) => delAuth(evnet)} className='sign-out'>로그아웃</Link>}
            <Routes>
                <Route path="/" element={<Main/>}/>
                {
                    auth && <>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/form/:path" element={<Form/>}/>
                        <Route path="/admin/form/:path/:id" element={<Form/>}/>
                        <Route path="/admin/detail/:path/:id" element={<Detail/>}/>
                    </>
                }
                <Route path="/*" element={<Error/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Router;