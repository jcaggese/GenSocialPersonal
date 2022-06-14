import React from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavLink = styled(Link)`
color:white;
font-size: 17px;
&:hover {
    color: red;
}
`;

const Login = () => {
    return (
        <form action="">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <br></br>
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text" id="name" className="form-control" placeholder="Please enter your username here" required></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <br></br>
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" className="form-control" placeholder="Please enter your password here" required></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <br></br>
                        <input type="submit" className="btn btn-primary float-end mb-1" id="submit-btn" />
                        <NavLink to="acc-create" className="link">First Time? Create an account here!</NavLink>
                    </div>
                </div>
                <div className="row">
                <NavLink to="debug" className="link"> DEBUG LINK</NavLink>
                </div>
            </div>
        </form >
    )
}

export default Login;