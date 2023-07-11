import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.css'

const Error404 = () =>{
    return (        
       
        <div id='err404'>

     <div id='part' >
     <div class="company">
    <div class="img">
      <img src="/logo-color.svg" alt="" />
    </div>
    <div class="company-info">
      <span>Are you lost bbg? :/<span class="our"></span></span>
      <p>
        Go back to enjoying mapGo by clicking here <a href='/userhome'><img src='/logo-colog.svg'/></a>
      </p>
    </div>
  </div>
</div>

        </div>
    
    );
}

export default Error404;