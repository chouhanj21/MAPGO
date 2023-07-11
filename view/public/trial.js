const axios = require('axios')
// const dotenv = require('react-dotenv').config();

const login = async function() {
    axios({ 
        method: 'POST',
        url: 'api/user/login', 
        proxy: {
            host: process.env.REACT_APP_BACKHOST,
            port: process.env.REACT_APP_BACKPORT,
          },
        data: {
            username: 'user3',
            password: 'USER3'
        }
    })
    .then((res)=>{
        console.log(res);
    }, (error)=>{
        console.log(error);
    })
    

}

const register = async function() {

    try{
        const res = await fetch(
            'http://localhost:5000/api/user/register',
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "username": "user9",
                    "iitkemail": "user9@iitk.ac.in",
                    "password": "USER9"
                })
            }
        )

        console.log(res);
    }
    catch(err){
        console.log("this is error caught")
        console.log(err);
    }
}

// console.log(process.env.REACT_APP_BACKHOST);

const getevents = async function(){
    try{
        let url = "http://localhost:5000/api/user/showevents/"
        const username = "user1";

        url = url.concat(username);
        
        const res = await fetch(
            url,
            {
                method: "GET"
            }
        );

        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}   

const getHostevents = async function(){
    try{
        let url = "http://localhost:5000/api/host/showevents/"
        const username = "host1";

        url = url.concat(username);
        
        const res = await fetch(
            url,
            {
                method: "GET"
            }
        );

        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}   


// login();
register();
// getevents();
// getHostevents();