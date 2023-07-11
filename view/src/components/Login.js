import React, { useContext } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { useState} from "react";
import { UserContext } from "../App";

const Login = () => {
  const {state, dispatch}= useContext(UserContext);
  
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  
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
  
  
  const submitForm = async(event) =>{
    try{
      
      console.log("submitting");
      // console.log(user);
      
      const {username, password} = user;
      console.log(username);
      console.log(password);
      
      const res = await fetch(
        'http://localhost:5000/api/user/login',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
            "username": username,
            "password": password
          })
        }
        )
        
        // res.cookie('MAPGOdev', "trialvalue");
        
        if(res.status === 401){
          //wrong username
          window.alert("username or password incorrect");
        }
        
        if(res.status === 200){
          //valid creds successful login
          window.alert("login successful");
          dispatch({type:"USER", payload:"user"})
          navigate("/userhome");
        }
        
        if(res.status === 500){
        //error in server
        window.alert("server side error");
      }

    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <body className="loginbody">
        <div className="container loginbox" style={{width: "60vh"}}>
          <div className="row1" style={{width: "100%"}}>
            <div className="mx-auto">
              <div className="card border-0 shadow rounded-3 my-5 con2">
                <p className="signin">User Login</p>
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
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="password"
                        name="password"
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                      <label className="input" for="floatingPassword">
                        Password
                      </label>
                    </div>

                    <NavLink to="/forgotpass" className="forgotPass">
                      <p>Forgot password ?</p>
                    </NavLink>
                    <hr className="my-4" />
                  </form>
                  <button className="text-uppercase button" onClick={submitForm} type="submit" >
                      Sign in
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Login;
