const router = require('express').Router();
const Host = require('../models/hostSchema');
const Event = require('../models/eventSchema');
const User = require('../models/userSchema');
const { authenticateHost } = require('../middleware/authenticate');
const { Error } = require('mongoose');

//OK
//private route, only in development
router.post("/register", async (req,res)=>{
    try{
    //add conditions on input req.body
        const newHost = new Host(req.body)

        const savedHost = await newHost.save();

        res.status(201).json("host registered successfully").end();        

    }catch(err){
        res.status(500).json(err);
    }
})

//OK
let userERR = 0;
router.post('/login', async(req,res)=>{
    try{
        if(!req.body.hostname){
            res.status(400);
            throw ("no valid req body");
        }

        const hostDoc = await Host.findOne({hostname:req.body.hostname});

        if(!hostDoc){
            res.status(400);
            throw "wrong usernamae or password"
        }

        //validate password
        const validPassword = (req.body.hostpassword === hostDoc.hostpassword);

        if(!validPassword){
            res.status(400);
            throw "wrong usernamae or password"
        }

        let token = await hostDoc.generateAuthToken(); 
        // console.log(token);
        res.cookie("MAPGOdevHOST", token,
        {
            expires: new Date(Date.now() + 26000000000),
            httpOnly: true    
        });

        //send response ok
        res.status(200).json("host logged in successfully").end();
    }
    catch(err){
        // console.log(err);
        res.json(err).end();
    }
})

//OK
router.get('/showevents', authenticateHost, async(req,res)=>{
    try{
        const allEvents = await Event.find({host: req.rootHost._id});
         
        // console.log(allEvents);
        res.status(200).json(allEvents).end();
    }
    catch(err){
        res.status(500).json(err).end();
    }
})

//OK
router.post("/createevent", authenticateHost, async (req,res)=>{

    try{

        const myDate1 = new Date(req.body.startTime);
        const istStart = myDate1.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

        const myDate2 = new Date(req.body.endTime);
        const istEnd = myDate2.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const newEvent = new Event({
        eventname: req.body.eventname,
        startTime: istStart,
        endTime: istEnd,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        //
        host: req.rootHost._id,
        hostname: req.rootHost.hostname,
        //
        description: req.body.description
    });

        const savedEvent = await newEvent.save();
        // res.status(200).json(savedEvent);   
        console.log("event created successfully");  
        console.log(req.rootHost.subscribers);
        
        //add savedEvent id to all subscriber's events
        for(let i=0; i< req.rootHost.subscribers.length; i++){
            let userDoc = await User.findOneAndUpdate(
                {username : req.rootHost.subscribers[i]},
                {$addToSet: {schedule: newEvent._id}}
            );  
        }

        console.log("host creationg updated subscribers schedules");

        res.status(200).json("host created event successfully").end();
            

    }catch(err){
        res.status(500).json(err).end();
    }
});

router.get('/private', authenticateHost, (req,res)=>{
    console.log("this is host private");
    res.send(req.rootHost);
});


//OK
router.get('/logout', (req, res)=>{
    console.log("from the host logout page");
    res.clearCookie('MAPGOdevHOST', {path: '/'})
    res.status(200).send("host logged out successfully");
});


module.exports = router;