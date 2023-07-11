import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div id="home">
        
      -<h1 id="h">Ready to GO!!</h1>
      <div id="part">
        <ul>
          {
            <li>
              MapGO : map-event application for IITK. It provides detailed maps
              of the IITK campus and surrounding areas, as well as navigation
              and route planning features. Also provide status, update for an
              event which is organised within iitk{" "}
            </li>
          }
          <p></p>
          <li>
            {" "}
            If you are a new user, you can sign up for an account. Use you IITK
            mail id while sign up{" "}
          </li>
          <p></p>
          <li>
            {" "}
            After sign_up you can log in using your IITK credentials, such as
            your username and password
          </li>
          <p> </p>
          <li>
            {" "}
            If you have any problem in sign up or log in{" "}
            <NavLink to="/contact"> Contact_Us</NavLink>
          </li>
              
        </ul>
      </div>
    </div>
  );
};

export default About;
