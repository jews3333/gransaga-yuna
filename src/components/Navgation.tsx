import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Navigation(){

    const location = useLocation();
    const [ pathname, setPathname ] = useState<string>('/');

    useEffect(() => {
        setPathname(location.pathname);
    }, [location.pathname]);

    return (
        pathname !== '/' ?
        <div id="navigation">
            <NavLink to="/admin/member" className={({ isActive }) => (isActive ? "active" : "")}>길드원</NavLink>
            <NavLink to="/admin/round" className={({ isActive }) => (isActive ? "active" : "")}>정령왕의 시련</NavLink>
            <NavLink to="/admin/black" className={({ isActive }) => (isActive ? "active" : "")}>블랙리스트</NavLink>
        </div> :
        <></>
    )
}

export default Navigation;