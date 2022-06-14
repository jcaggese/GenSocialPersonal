import React from "react";
import Login from "./Login"
import LoginHeader from "./LoginHeader"

const LoginMain = () => {
    return (
        <div className="loginDiv">
            <LoginHeader />
            <br></br>
            <Login />
        </div>
    )
};

export default LoginMain;