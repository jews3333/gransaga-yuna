import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Admin from './pages/Admin';
import List from './pages/List';
import Form from './pages/Form';
import Detail from './pages/Detail';
import Error from './pages/Error';

import useAuth from './hooks/useAuth';
import Navigation from './components/Navgation';

function Router(){

    const { auth } = useAuth();

    return (
        <BrowserRouter>
            <Header/>
            <div id="container">
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    {
                        auth && <>
                            <Route path="/admin" element={<Admin/>}/>
                            <Route path="/admin/:path" element={<List/>}/>
                            <Route path="/admin/:path/form" element={<Form/>}/>
                            <Route path="/admin/:path/form/:id" element={<Form/>}/>
                            <Route path="/admin/:path/detail/:id" element={<Detail/>}/>
                        </>
                    }
                    <Route path="/*" element={<Error/>}/>
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Router;