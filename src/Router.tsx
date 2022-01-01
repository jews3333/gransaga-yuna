import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import List from './components/List';

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/list" element={<List/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;