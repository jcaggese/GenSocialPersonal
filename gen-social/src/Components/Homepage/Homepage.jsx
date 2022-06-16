import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Posts from './Posts'

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
                    <h1>{localStorage.getItem("loggedUser")}</h1>
                </div>
            </div>
            <Posts />
        </div>
    )
}

export default Homepage;