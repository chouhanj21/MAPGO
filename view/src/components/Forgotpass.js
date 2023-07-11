import React from 'react'
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Forgotpass = () => {



    // const {state, dispatch}= useContext(UserContext);
  
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    username: "",
    iitkemail: "",
    password:""
  });
  
  
  const [otp,setOtp]= useState("");

  let key, value;
  const handleInputs = (event) => {
    console.log("key")
    console.log(event.target.name)
    
    console.log("value")
    console.log(event.target.value)
    
    
    key = event.target.name;
    value = event.target.value;
    
    setUser({ ...user, [key]: value }); 
    
  };

  
  const checkEmail = function () {
    let email = user.email;
    let text = email.slice(email.length - 11, email.length);
    if (text === "@iitk.ac.in") {
      return true;
    }
    window.alert("Invalid EmailId! Please fill in username and email id linked to this account.");
    return false;
  };



  const submit = async (event) => {
    try {
      event.preventDefault();

      const { username, email, password} = user;

      if (checkEmail()) {
        const res = await fetch(`http://localhost:5000/api/user/password-verify-email/${username}/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include"
        });
        if (res.status === 400) {
          window.alert("user does not exist");
          console.log("username does not exist");
        } else if (res.status === 200) {
          window.alert("OTP sent");

          
          
        } else if (res.status === 500) {
          console.log("error in searching db");




        } else {
          console.log("unknown err");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };




  
  const submitForm = async (event) => {
    try {
      event.preventDefault();

      const {username,email, password} = user;

        const res = await fetch(`http://localhost:5000/api/user/changepassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          
          credentials:"include",
          body: JSON.stringify({
              "username": username,
              "newpassword": password,
              "otp":otp
          })

        });

        
        if(res.status===401){
          window.alert("did not generate otp");
          console.log("otp not sent");
        }
        
        else if (res.status === 200) {
          window.alert("password changed");
          navigate("/signin");
          
        } else if (res.status === 500) {
          console.log("error in searching db");
        } else {
          console.log("unknown err");
        }
    } catch (err) {
      console.log(err);
    }
  };










  return (
    <>
    <body className="loginbody">
      <div className="container loginbox">
        <div className="row1">
          <div className="mx-auto">
            <div className="card border-0 shadow rounded-3 my-5 con2">
              <p className="signin">Sign In</p>
              <div className="card-body">
                <br />
                <br />
                <form method="POST">
                  <div className="form-floating mb-3">
                    <input
                      type="username"
                      className="form-control"
                      id="floatingInput"
                      placeholder="username"
                      name="username"
                      onChange={handleInputs}
                      autoComplete="off"
                    />
                    <label className="input" for="floatingInput">
                      Username
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="email"
                      name="email"
                      onChange={handleInputs}
                      autoComplete="off"
                    />
                    <label className="input" for="floatingEmail">
                      Email
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="otp"
                        id="floatingOtp"
                        placeholder="otp"
                        value={otp}
                        onChange={e=>setOtp(e.target.value)}
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        OTP
                      </label>
                    </div>
                  <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="floatingPassword"
                        placeholder="password"
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        New Password
                      </label>
                    </div>

                  <hr className="my-4" />
                </form>
                <button className="text-uppercase button" onClick={submit} type="submit" >
                    Send Mail
                  </button>
                <button className="text-uppercase button" onClick={submitForm} type="submit" >
                    Submit
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </>
  )
}

export default Forgotpass
