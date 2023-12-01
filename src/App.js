import './App.css';

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import { UserContext } from './components/context';
import NavBar from './components/navbar';
import Home from './components/home'; 
import CreateAccount from './components/createaccount';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';

function App() {
  return (
    <HashRouter>
      <div>
        <NavBar/>
        <UserContext.Provider value={null}>
          <div className="container" style={{padding: "20px"}}>
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="/CreateAccount/" element={<CreateAccount />}></Route>
              <Route path="/signup/" element={<SignUp />}></Route>
              <Route path="/login/" element={<Login />}></Route>
              <Route path="/logout/" element={<Logout />}></Route>
              <Route path="/deposit/" element={<Deposit />}></Route>
              <Route path="/withdraw/" element={<Withdraw />}></Route>
              <Route path="/balance/" element={<Balance />}></Route>
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
      <Outlet />
    </HashRouter>
  );
}


export default App;
