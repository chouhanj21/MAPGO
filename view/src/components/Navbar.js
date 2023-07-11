import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../images/logo2.png"

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state === "user") {
      return (
        <>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav meauto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink className="navlink" to="/userhome">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/userevents">
                  EVENTS
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="navlink" to="/logout">
                  LOGOUT
                </NavLink>
              </li>
            </div>
          </div>
        </>
      );
    }
    else if (state === "host") {
      return (
        <>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav meauto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="navlink" to="/hosthome">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/addevents">
                  CREATE EVENT
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="navlink" to="/hostlogout">
                  LOGOUT
                </NavLink>
              </li>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav meauto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="navlink" aria-current="page" to="/signin">
                  LOGIN
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/hostlogin">
                  HOSTLOGIN
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink className="navlink " to="/signup">
                  REGISTER
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="navlink" to="/userevents">
                  UserEvents
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/userhome">
                  Userhome
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/hosthome">
                  HostHome
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/logout">
                  Logout
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlink" to="/hostlogout">
                  Hostlogout
                </NavLink>
              </li>*/}
            </div> 
          </div>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bglight">
      <div className="container-fluid">
        <NavLink to="/">
          <img className="mapgo " src={logo}/>
        </NavLink><div style={{color:"white", fontSize:"4vh"}} >MapGo</div>
        {/* <li class="nav-item dropdown">
          <NavLink class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </NavLink>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink class="dropdown-item" href="#">Logout</NavLink></li>
          </ul>
        </li> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <RenderMenu />

        {/* <li class="nav-item dropdown">
          <NavLink class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </NavLink>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink class="dropdown-item" href="#">Logout</NavLink></li>
          </ul>
        </li> */}
      </div>
    </nav>
  );
};

export default Navbar;
