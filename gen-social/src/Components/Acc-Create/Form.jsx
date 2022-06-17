import { React, useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom'
//import axios from 'axios'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import bcrypt from 'bcryptjs'

const NavLink = styled(Link)`
color:white;
font-size: 17px;
`;

export default function Form() {
    const history = useNavigate();
    var pass;
    var salt;

    // States for registration
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking errors and success
    const [submitted, setSubmitted] = useState(false);
    const [msg, setMsg] = useState('')

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
        salt = await bcrypt.genSalt(saltRounds);
        console.log("Salt: " + salt);
        pass = await bcrypt.hash(password, salt);
        console.log(pass);
    }

    // Handling submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid()) {
            await hashPassword();
            // Posting the username
            try {
                axios.post("http://localhost:9080/users", {
                    username, email, pass,salt
                }).then((response) => {
                    if (response.status === 200) {
                        setError(0)
                        setSubmitted(true)
                        goToLogin();
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

    function isValid() {
        if (username === '' || email === '' || password === '') {
            setError(3)
            console.log("Empty fields")
            return false
        } else if (!(/\w+@\w+.\w+/).test(email)) {
            setError(4)
            return false
        } else if (password.length<7 || !(/[A-Z]/g).test(password)) {
            setError(5)
            return false
        } else
            return true

    }

    function setError(error) {
        if (error === 1)
            setMsg("Username has already been taken")
        else if (error === 2)
            setMsg("Email has already been registered")
        else if (error === 3)
            setMsg("Please fill out all fields")
        else if (error === 4)
            setMsg("Invalid email (xxx@yyy.zzz)")
        else if (error === 5)
            setMsg("Invalid password (Passwords should be at least 7 letters and contain one capital letter)")
        else if (error === 0)
            setMsg("")
    }

    const goToLogin = async () => {
        await successMessage();
        setTimeout(function(){
            history("/")
        }, 5000)
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
        return (
            <div className="error" style={{ display: msg ? '' : 'none', }}>
                <h1>{msg}</h1>
            </div>
        );
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
