import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.css'

const Home = () =>{
    return (        
       
        <div id='home'>
{/*             
     <h1 id='h' >Ready to GO!!</h1> */}
     <div id='part' >
     <div class="company">
    <div class="img">
      <img src="/logo-color.svg" alt="" />
    </div>
    <div class="company-info">
      <span>CAMPUS<span class="our">FOR EVERYONE</span></span>
      <p style={{padding:"15px"}}>
        <b>MapGo</b> is an events management application integrated with maps API to keep track of time and location of all your upcoming events. Now, you can view all the upcoming activities in a single sight. This is power of the campus in the palm your hand (or screen of your computer if you may). We also have a navigation feature for all those still in the process of getting familiar with the campus.<br></br><br></br>
        New User? Feel free to sign-up using your IITK credentials.<br></br><br></br>
        Old User? You must be familiar with drill already. Login for all the fun.<br></br><br></br>
        Adios Amigos!!!... Keep Exploring 
      </p>
    </div>
  </div>
</div>

        </div>
    
    );
}

export default Home;