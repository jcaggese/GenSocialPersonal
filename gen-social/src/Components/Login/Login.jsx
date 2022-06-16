import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs'
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

    var isReal = false;

    const authen = async (e) => {
        var hashedPassword;
        var passwordsMatch;
        var findUser = username
        axios.post(`http://localhost:9080/users/`, {
            username: findUser
        }).then((res) => {
            console.log(res.data);
            console.log("Username: " + res.data.username);
            console.log("Email: " + res.data.email);
            console.log("Password: " + res.data.password);
            console.log("Salt: " + res.data.salt);
            hashedPassword = bcrypt.hashSync(password, res.data.salt)
            getFriends();
            localStorage.setItem("loggedEmail", res.data.email)
            console.log("res.data.password: " + "$" + res.data.password);
            console.log("password:" + password);
            console.log(hashedPassword);

            passwordsMatch = hashedPassword === "$" + res.data.password
            // Username and Password is correct
            if (passwordsMatch) {
                isReal = true;
                console.log("Passwords match!");
                console.log(isReal)
                setLoading(true)
            }
            // Password is incorrect
            else {
                setError(5)
                console.log("Passwords don't match");
            }
        }).catch(err => {
            // Username is incorrect
            if (err.response.status === 404) {
                setError(4);
                console.log("User not found")
            }
        });
    }

    const getFriends = () => {
        var temp = []
        axios.post("http://localhost:9080/users/", {
            username: localStorage.getItem("loggedUser")
        }).then((res) => {
            var friendsList;
            // Stores the user_ids in a list
            if (res.data.friends !== null) {
                friendsList = res.data.friends.split(",");
            }

            axios.get("http://localhost:9080/users")
                .then(res => {
                    var i = 0;
                    console.log(res.data);
                    res.data.forEach(data => {
                        console.log("this is data.id: " + data.id);
                        friendsList.forEach(friend => {
                            if (data.id === parseInt(friend)) {
                                temp[i] = data.username
                                i++
                            }
                            console.log("this is temp: " + temp);
                        });
                    });
                    if (temp[0] === undefined) {
                        temp.splice(0, 1)
                    }
                    console.log("this is temp outside: " + temp);
                    localStorage.setItem("friends", temp)
                    console.log(localStorage.getItem("friends"));
                })
        });
    }

    const goToHome = async () => {
        setTimeout(function () {
            history("/home")
        }, 5000)
    }

    const handleSubmit = async (e) => {
        console.log(err);
        e.preventDefault();
        if (username !== '' && password !== '') {
            setError(-1)
            setHasLoggedIn(true)
            localStorage.setItem("loggedUser", username)
            console.log("Logged User: " + localStorage.getItem("loggedUser"));
            authen();
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
        // If Username is incorrect
        if (err === 4) {
            return (
                <div className="error" style={{ display: err ? '' : 'none' }}>
                    <h1 style={{ color: "red" }}>Username is incorrect</h1>
                </div>
            );
        }
        // If Password is incorrect
        if (err === 5) {
            return (
                <div className="error" style={{ display: err ? '' : 'none' }}>
                    <h1 style={{ color: "red" }}>Password is incorrect</h1>
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
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave" onEnded={displayLoading()}></div>
                </div>
            </div>

        )
    }
}

export default Login;