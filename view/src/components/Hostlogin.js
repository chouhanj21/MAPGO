import React, {useState,useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const {state, dispatch}= useContext(UserContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    hostname: "",
    hostpassword: "",
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
      const {hostname, hostpassword} = user;
      console.log(hostname);
      console.log(hostpassword);

      const res = await fetch(
        'http://localhost:5000/api/host/login',
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
              "hostname": hostname,
              "hostpassword": hostpassword
          })
        }
    )


      if(res.status === 400){
        //wrong username
        window.alert("host username or password incorrect");
      }

      if(res.status === 200){
        //valid creds successful login
        dispatch({type:"HOST", payload:"host"});
        window.alert("login successful");
        navigate("/hosthome");
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
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="card border-0 shadow rounded-3 my-5 con2">
                <p className="signin">Host Login</p>
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
                        name="hostname"
                        onChange={handleInputs}
                      />
                      <label className="input" for="floatingInput">
                        Hostname
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="password"
                        name="hostpassword"
                        onChange={handleInputs}
                      />
                      <label className="input" for="floatingPassword">
                        Host Password
                      </label>
                    </div>

                    <NavLink to="#" className="forgotPass">
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
