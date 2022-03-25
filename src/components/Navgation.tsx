import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(){
    return (
        <div id="navigation">
            <NavLink to="/admin/member" className={({ isActive }) => (isActive ? "active" : "")}>길드원</NavLink>
            <NavLink to="/admin/round" className={({ isActive }) => (isActive ? "active" : "")}>정령왕의 시련</NavLink>
            <NavLink to="/admin/black" className={({ isActive }) => (isActive ? "active" : "")}>블랙리스트</NavLink>
        </div>
    )
}

export default Navigation;