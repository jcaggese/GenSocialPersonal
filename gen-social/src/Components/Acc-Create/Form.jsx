import React from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavLink = styled(Link)`
color:white;
font-size: 17px;
`;

export default function Form() {
    return (
        <form action="">
            <div className="container">
                <div class="row">
                    <div class="col">
                        <br></br>
                        <label for="email" className="form-label">Email Address:</label>
                        <input type="email" id="email" className="form-control" placeholder="Please enter your email address here" required />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <br></br>
                        <label for="username" className="form-label">Username:</label>
                        <input type="text" id="name" class="form-control" placeholder="Please enter your desired username here" required />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <br></br>
                        <label for="password" className="form-label">Password:</label>
                        <input type="password" id="password" className="form-control" placeholder="Please enter your desired password here" required />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <br></br>
                        <input type="submit" value="Create Account" className="btn btn-primary float-end mb-1" id="submit-btn" />
                        <NavLink to="/" classname="link">Already have an account?</NavLink>
                    </div>
                </div>
            </div>
        </form>
    )
}