import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavLink = styled(Link)`
color:white;
font-size: 17px;
&:hover {
    color: red;
}
`;

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hasLoggedIn, setHasLoggedIn] = useState(0)
    const [err, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const history = useNavigate();

    const goToHome = async () => {
        setTimeout(function () {
            history("/home")
        }, 5000)
    }

    const handleSubmit = (e) => {
        console.log(err);
        e.preventDefault();
        if (username !== '' && password !== '') {
            setError(-1)
            setHasLoggedIn(true)
            setLoading(true)
        }
        if (username === '' && password === '') {
            setError(1)
        }
        else if (username === '') {
            setError(2)
        }
        else if (password === '') {
            setError(3)
        }
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const displayLoading = async () => {
        await welcomeMessage();
        goToHome();
        
    }

    const welcomeMessage = () => {
        return (
            <div className="success" style={{ display: hasLoggedIn ? '' : 'none', }}>
                <h1>Welcome, {username}</h1>
            </div>
        )
    }

    const errorMessage = () => {
        // Both username and password are empty fields
        if (err === 1) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>Please fill in the fields below </h1>
                </div>
            );
        }
        // ONLY Username is an empty field
        if (err === 2) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>Please enter your username</h1>
                </div>
            );
        }
        // ONLY Password is an empty field
        if (err === 3) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>Please enter your password</h1>
                </div>
            );
        }
    }

    if (!loading) {
        return (
            <div>
                <div className="messages">
                    {errorMessage()}
                </div>
                <form id="login-form" action="">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <br></br>
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input onChange={handleUsername} type="text" id="name" className="form-control" placeholder="Please enter your username here"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <br></br>
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input onChange={handlePassword} type="password" id="password" className="form-control" placeholder="Please enter your password here"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <br></br>
                                <input type="submit" onClick={handleSubmit} className="btn btn-primary float-end mb-1" id="submit-btn" />
                                <NavLink to="acc-create" className="link">First Time? Create an account here!</NavLink>
                            </div>
                        </div>
                        <div className="row">
                            <NavLink to="debug" className="link"> DEBUG LINK</NavLink>
                        </div>
                    </div>
                </form >
            </div>
        )
    }
    else {
        return (
            <div className="loading">
                <div className="message">
                    {welcomeMessage()}
                </div>
                <div className="center">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave" onEnded={displayLoading()}></div>
                </div>
            </div>

        )
    }
}

export default Login;