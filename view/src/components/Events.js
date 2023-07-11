import React from 'react';
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';





export const Events =()=>{
    const [events,setEvents]=useState([])


    const navigate = useNavigate();

    const getUserPrivate = async () =>{
        try{
            const res = await fetch(
                'http://localhost:5000/api/host/private',
                {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }
            );

            const data = await res.json()

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);
            navigate('/hostlogin');
        }
    }
    useEffect(()=>{
        getUserPrivate();
    }, []);


    let data;

    const getEvent = async () =>{
        try{
            const res = await fetch(
                'http://localhost:5000/api/host/showevents',
                {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }
            );

            data = await res.json()
            setEvents(data);


            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);
            
        }

        
    }
    
    useEffect(()=>{
        getEvent();
    }, []);
    

    
   
    return (
        <div>
        {
             events.map(elem=>{
                 return(
                    <div className="col-md-3"  >
                    <div className=" p-3 text-center rounded box contentbox">
                        <img
                        className="img-responsive rounded-circle dp"
                        src="https://i.imgur.com/uppKNuF.jpg"
                        width="80"
                        />
                        <h5 className="mt-3 name">{elem.eventname}</h5>
                        
                        <i className="fa-solid ">Date:{elem.startTime.slice(0,10)}</i>
                        <br/>
                        <i className="fa-solid ">Time:{elem.startTime.slice(11,16)}</i>
                        <div className="mt-4">
                        
        
                        </div>
                    </div>
                    </div>
                 )
            })
        }
    </div>
       
    )
}
