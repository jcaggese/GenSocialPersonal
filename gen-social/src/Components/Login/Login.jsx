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
                        <label for="username" classname="form-label">Username:</label>
                        <input type="text" id="name" class="form-control" placeholder="Please enter your username here" required></input>
                    </div>
                </div>
                <div classname="row">
                    <div classname="col">
                        <br></br>
                        <label for="password" classname="form-label">Password:</label>
                        <input type="password" id="password" class="form-control" placeholder="Please enter your password here" required></input>
                    </div>
                </div>
                <div classname="row">
                    <div class="col">
                        <br></br>
                        <input type="submit" className="btn btn-primary float-end mb-1" id="submit-btn" />
                        <NavLink to="acc-create" classname="link">First Time? Create an account here!</NavLink>
                    </div>
                </div>
            </div>
        </form >
    )
}

export default Login;