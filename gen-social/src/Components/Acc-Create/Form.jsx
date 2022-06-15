import { React, useState } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
//import axios from 'axios'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import bcrypt from 'bcryptjs'

const NavLink = styled(Link)`
color:white;
font-size: 17px;
`;

export default function Form() {
    var pass;

    // States for registration
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking errors and success
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(0);

    // Handling name change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling password change
    const handlePassword = (e) => {
        console.log("password is being changed");
        setPassword(e.target.value)
        setSubmitted(false);
    };

    const hashPassword = async () => {
        const saltRounds = 5;
        const salt = await bcrypt.genSalt(saltRounds);
        pass = await bcrypt.hash(password, salt);
    }

    // Handling submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '') {
        }
        else {
            await hashPassword();
            // Posting the username
            try {
                axios.post("http://localhost:9080/users", {
                    username, email, pass
                }).then((response) => {
                    if (response.status === 200) {
                        setError(0)
                        setSubmitted(true)
                    }
                })
                    .catch(err => {
                        setSubmitted(false)
                        if (err.response.status === 418) {
                            setError(1)
                            console.log("Username has already been taken")
                        }
                        if (err.response.status === 400) {
                            setError(2)
                            console.log("Email has already been used")
                        }
                    })
            }
            catch (err) {
                console.log("Shit fucked")
            }
        }
    };


    // Showing success message
    const successMessage = () => {
        return (
            <div className="success" style={{ display: submitted ? '' : 'none', }}>
                <h1>{username} succesfully registered!</h1>
            </div>
        );
    };

    const errorMessage = () => {
        if (error === 1) {
            return (
                <div className="error" style={{ display: error ? '' : 'none', }}>
                    <h1>Username has already been taken</h1>
                </div>
            );
        }
        if (error === 2) {
            return (
                <div className="error" style={{ display: error ? '' : 'none', }}>
                    <h1>Email has already been registered</h1>
                </div>
            );
        }
    };

    return (
        <div>
            <div>
                <h2>Account Registration</h2>
            </div>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
            <form action="">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <br></br>
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input onChange={handleEmail} value={email} type="text" id="email" className="form-control" placeholder="Please enter your email address here" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <br></br>
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input onChange={handleUsername} value={username} type="text" id="name" className="form-control" placeholder="Please enter your desired username here" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <br></br>
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input onChange={handlePassword} value={password} type="password" id="password" className="form-control" placeholder="Please enter your desired password here" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <br></br>
                            <input type="submit" onClick={handleSubmit} value="Create Account" className="btn btn-primary float-end mb-1" id="submit-btn" />
                            <NavLink to="/" className="link">Already have an account?</NavLink>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
