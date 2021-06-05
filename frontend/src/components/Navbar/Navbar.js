import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" className="navbar__navLink">
                <div className="navbar__child">
                    Meeting Home
                </div>
            </NavLink>
            <NavLink to="/events" className="navbar__navLink">
                <div className="navbar__child">
                    Meetings
                </div>
            </NavLink>
        </div >
    )
}

export default Navbar
