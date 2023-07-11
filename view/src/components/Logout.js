import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../App";

const Logout =()=>{

    const {state,dispatch}= useContext(UserContext);

    const navigate= useNavigate();


    useEffect(()=>{
        fetch('http://localhost:5000/api/user/logout', {
            method: "GET",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials:"include"
        }).then((res) => {
            dispatch({type:"USER", payload: null})
            navigate("/signin");
            if(res.status !== 200){
                const error=new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
}

export default Logout;