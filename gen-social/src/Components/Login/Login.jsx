import React from "react";
import {Link} from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    return (
        <form action="">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label for="username" classname="form-label">Username:</label>
                        <input type="text" id="name" class="form-control" required></input>
                    </div>
                    <div classname="row">
                        <div classname="col">
                            <label for="password" classname="form-label">Password:</label>
                            <input type="password" id="password" class="form-control" required></input>
                        </div>
                        <div class="col">
                            <input type="submit" className="btn btn-primary float-end mb-1" id="submit-btn" />
                            <Link to="acc-create">First Time? Create an account here!</Link>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default Login;