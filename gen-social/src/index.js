import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LoginMain from "./Components/Login/LoginMain"
import AccCreateMain from './Components/Acc-Create/Acc-Create-Main';
import Debug from './Components/Debug/DebugMain'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginMain />} />
      <Route path="/acc-create" element={<AccCreateMain />} />
      <Route path="/debug" element={<Debug />}/>
    </Routes>
  </Router>
);
