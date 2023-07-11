import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useState } from 'react';

const Profile = () =>{
    const navigate = useNavigate();
    const getUserPrivate = async () =>{
        try{
            const res = await fetch(
                'http://localhost:5000/api/user/private',
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
            console.log(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);
            navigate('/signin');
        }
    }
    useEffect(()=>{
        getUserPrivate();
    }, []);

    const [Events, setEvents] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/api/user/showevents', 
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => res.json())
        .then( data=> {setEvents(data);console.log("this is data"); console.log(data); })
        .catch(err=>{console.log(err)});
    }, []);

    console.log("this is events")
    console.log(Events);


    return (
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5">
                        <div class="card h-100">                            
                            {/* <!-- Product details--> */}
                            <div class="card-body p-4">
                                <div class="text-center">
                                    {/* <!-- Product name--> */}
                                    <h5 class="fw-bolder">Fancy Product</h5>
                                    {/* <!-- Product price--> */}
                                    $40.00 - $80.00
                                </div>
                            </div>
                            {/* <!-- Product actions--> */}
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile