import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import Error from './pages/Error';

function Router(){
    return (
        <BrowserRouter>
            <div id="container">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Router;