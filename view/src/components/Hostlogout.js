import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../App";

const Hostlogout =()=>{

    const {state,dispatch}= useContext(UserContext);

    const navigate= useNavigate();


    useEffect(()=>{
        fetch('http://localhost:5000/api/host/logout', {
            method: "GET",
            headers: {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            credentials:"include"
        }).then((res) => {
            dispatch({type:"HOST", payload: null})
            navigate("/hostlogin");
            if(res.status !== 200){
                const error=new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
}

export default Hostlogout;