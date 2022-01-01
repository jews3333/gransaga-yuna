import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import List from './pages/List';
import Error from './pages/Error';

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/list" element={<List/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;