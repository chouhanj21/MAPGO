import React, { createContext, useReducer } from "react";
import { Routes, Route, Switch } from "react-router-dom";



import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Userhome } from "./components/Userhome";
import Hostlogin from "./components/Hostlogin";
import Hostprofile from "./components/Hostprofile";
import Hostannounce from "./components/Hostannounce";
import HostHome from "./components/HostHome";
import UserEvents from "./components/UserEvents";
import Logout from "./components/Logout";
import Hostlogout from "./components/Hostlogout";
import { Events } from "./components/Events";
import Forgotpass from "./components/Forgotpass";
import Error404 from "./components/Error404";

import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userhome" element={<Userhome />} />

      <Route path="/hostlogin" element={<Hostlogin />} />
      <Route path="/addevents" element={<Hostannounce />} />
      <Route path="/events" element={<Events />} />
      <Route path="/hostprofile" element={<Hostprofile />} />
      <Route path="/userevents" element={<UserEvents />} />
      <Route path="/hosthome" element={<HostHome />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/hostlogout" element={<Hostlogout />} />
      <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="*" element = {<Error404/>} />

    </Routes>
  );  
};



const App = () => {
  const [ state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />

        <Routing />
      </UserContext.Provider>
    </>

  );
};

export default App;
