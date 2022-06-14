import React from "react"
import Login from "../src/Components/Login/Login"
import LoginHeader from "./Components/Login/LoginHeader"
import { BrowserRouter } from "react-router-dom";

// THIS FILE IS NOT NEEDED. PLEASE DELETE THIS FILE FROM THE REPOSITORY
// IT IS JUST TAKING UP SPACE LMAO

function App() {
  return (
    <BrowserRouter>
      <LoginHeader />
      <Login />
    </BrowserRouter>
  );
}

export default App;
