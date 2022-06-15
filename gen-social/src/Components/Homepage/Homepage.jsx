import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled(Link)`
color:white;
font-size: 17px;
`;

const homepageh1 = styled.h1`
color:black;
font-size: 17px;
`;

const Homepage = () => {
    return (
        <div className='homepage' style={{display: "flex"}}>
            <div className='account-container'>
                { /* Excluding navbar */}
                <div className='account'>
                    <h1>this is where account picture and info will go</h1>
                </div>
            </div>
            <div className='post-container'>
                <div className='post'>
                    <h1 style={{ color: "white" }}>here is where the posts go</h1>
                </div>
            </div>
        </div>
    )
}

export default Homepage;