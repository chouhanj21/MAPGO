const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Host = require('../models/hostSchema');

const authenticateUser = async(req,res,next)=>{
    try{

        // console.log("inside authenticateuser");
        // console.log("this is cookie");
        // console.log(req.cookies);

        const token = req.cookies.MAPGOdevUSER;
        // console.log('this is token')
        // console.log(token);

        if(!token){
            //no token not logged in
            throw new Error("no token found")
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne(
            {_id: verify._id, "tokens.token": token}
        )
        
        if(!rootUser){
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch(err){
        res.status(401).send("unauthorised access").end();
        console.log(err);
    }
}

const authenticateHost = async(req,res,next)=>{
    try{

        console.log("inside authenticatehost");
        console.log("this is cookie");
        console.log(req.cookies);

        const token = req.cookies.MAPGOdevHOST;
        console.log('this is token')
        console.log(token);

        if(!token){
            //no token not logged in
            throw new Error("no token/cookie found")
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        const rootHost = await Host.findOne(
            {_id: verify._id, "tokens.token": token}
        )
        
        if(!rootHost){
            throw new Error('Host not found');
        }

        req.token = token;
        req.rootHost = rootHost;
        req.userId = rootHost._id;

        next();
    }
    catch(err){
        res.status(401).send("unauthorised access").end();
        console.log(err);
    }
}


module.exports = {authenticateUser, authenticateHost};