import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled(Link)`
color:black;
border-radius: 10px;
font-size: 17px;
font-family: Georgia, serif;
font-weight: bold;
`;

const HomepageNavbar = () => {
    return (
        <div className="navbar">
            <div className="row">
                <div className='col'>
                    <NavLink className="btn btn-nav" to="/home">
                        Home
                    </NavLink>
                </div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'>
                    <NavLink className="btn btn-nav" to="/friends">
                        Friends
                    </NavLink>
                </div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'>
                    <NavLink className="btn btn-nav" to="/settings">
                        Settings
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default HomepageNavbar;