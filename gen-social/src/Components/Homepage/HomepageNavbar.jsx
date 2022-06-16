import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LogOutPopUp from "./LogOutPopUp"

const NavLink = styled(Link)`
color:black;
border-radius: 10px;
font-size: 17px;
font-family: Georgia, serif;
font-weight: bold;
`;



const HomepageNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useNavigate();

    const togglePopUp = () => {
        setIsOpen(!isOpen);
    }

    const logOut = (e) => {
        console.log(localStorage.getItem("loggedUser"));
        localStorage.removeItem("loggedUser")
        console.log(localStorage.getItem("loggedUser"));

    }

    const goToHome = async () => {
        logOut();
        history("/")
    }

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
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col'>
                    <button id="log-out" onClick={togglePopUp} style={{ borderRadius: "10px", fontSize: "17px", fontFamily: "Georgia, serif", fontWeight: "bold" }} className='btn btn-nav'>Log Out</button>
                </div>
            </div>
            {isOpen && <LogOutPopUp
                content={<>
                    <b style={{ color: "white", fontSize: "20px" }}>Are you sure you want to logout?</b>
                    <div style={{ marginTop: "50px" }}>
                        <button id='confirmLogout' onClick={goToHome} style={{ width: "100px", height: "50px", backgroundColor: "white" }}>Yes</button>
                        <button id='cancelLogout' onClick={togglePopUp} style={{ width: "100px", height: "50px", marginLeft: "50px", backgroundColor: "white" }}>No</button>
                    </div>
                </>}
                handleClose={togglePopUp}
            />}
        </div>
    );
};

export default HomepageNavbar;