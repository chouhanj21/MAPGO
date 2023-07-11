import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Hostprofile = () => {
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
            console.log(data);

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


  return (
    <div>
      host profile page
    </div>
  )
}

export default Hostprofile
