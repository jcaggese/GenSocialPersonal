import React from "react"
import Login from "../src/Components/Login/Login"
import LoginHeader from "./Components/Login/LoginHeader"
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <LoginHeader />
      <Login />
    </BrowserRouter>
  );
}

export default App;
