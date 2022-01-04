import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import Form from './pages/Form';
import Detail from './pages/Detail';
import Error from './pages/Error';

import useAuth from './hooks/useAuth';

function Router(){
    const { auth } = useAuth();
    return (
        <BrowserRouter>
            <button>종료</button>
            <div id="container">
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