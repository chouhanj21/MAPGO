const router = require('express').Router();
const nodemailer = require('nodemailer');

const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const Event = require('../models/eventSchema');
const UserVerif = require('../models/userVerifSchema');
const {authenticateUser} = require('../middleware/authenticate');
const Host = require('../models/hostSchema');
const PasswordChange = require('../models/passwordSchema');


let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, 
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

router.get('/verify-email/:username/:iitkemail', async(req,res)=>{
    try{
        //req.params username, iitkemail

        //before otp, check if username taken
        const userAlready = await User.findOne({username:req.params.username});

        if(userAlready){
            res.status(401);
            throw "username taken";
        }

        //generate OTP before sending register
        let otp = '';
        for(let i=0; i<=3; i++){
            const randval = Math.round(Math.random()*9);
            otp = otp + randval;
        }
        const verifToken = new UserVerif({
            owner:req.params.username,
            token: otp
        });
        //deleting previous stored otp doc
        await UserVerif.deleteMany({owner:req.params.username});

        await verifToken.save();

        let mailOptions = {
            from: process.env.SMTP_MAIL,
            to: req.params.iitkemail,
            subject: "Verification OTP from mapGo",
            text: `this is the requested otp: ${otp}`
        }

        const mail = await transporter.sendMail(mailOptions);
        res.status(200).json("email with otp sent successfully")
    }
    catch(err){
        res.json(err);
    }
});

//OK
router.post("/register", async (req,res)=>{
    
    //req.body like userSchema
    try{
        if(!req.body.username){
            res.status(401);
            throw "invalid req body"
        }

        const newUser = new User(req.body)

        const alreadyUser = await User.findOne({username: req.body.username})

        if(alreadyUser){
            res.status(400);
            throw "username already taken";
        }
        else {
            //check if given otp is correct or not
            const otpDoc = await UserVerif.findOne({owner: req.body.username});

            if(!otpDoc){
                res.status(401);
                throw "did not generate otp verification token"
            }
            
            if(otpDoc.token === req.body.otp){
                const savedUser = await newUser.save();
                res.status(200).json(savedUser).end(); 
            }
            else{
                res.status(406)
                throw "invalid otp";
            }
        }
    }
    catch(err){
        res.json(err);
    }
})

//OK
router.post('/login', async(req,res)=>{
    try{
        if(!req.body.username){
            res.status(400);
            throw "invalid req body"
        }
        const userDoc = await User.findOne({username:req.body.username});

        if(!userDoc){
            res.status(401);
            throw ("wrong username or password");
        }

        //validate password
        const validPassword = (req.body.password == userDoc.password);

        if(!validPassword){
            res.status(401);
            throw ("wrong username or password");
        }

        //calling userschema method to generate and save token
        let token = await userDoc.generateAuthToken();
        
        //store token in cookie
        res.cookie("MAPGOdevUSER", token,
        {
            expires: new Date(Date.now() + 26000000000),
            httpOnly: true
        }
        );
        
        res.status(200).json("login successful");
    }
    catch(err){
        res.json(err).end();
    }
})

//OK
router.get('/showevents', authenticateUser , async(req,res)=>{
    try{
        const doc = await User.findOne(
            {username:req.rootUser.username}
        );

        if(!doc){
            console.log("no user exists");
            res.status(404).end();
        }

        const allEvents = [];
   
        for(let i=0; i< req.rootUser.schedule.length; i++){
            let eventDoc = await Event.findOne({_id : req.rootUser.schedule[i]});    
            allEvents.push(eventDoc);
        }
        
        res.status(200).send(allEvents).end();
    }
    catch(err){
        // console.log(err);
        res.status(500).json(err);
    }  
});
router.get('/password-verify-email/:username/:iitkemail', async(req,res)=>{
    try{
        //req.params username, iitkemail

        //before otp check if username and iitkemail are registered previously
        const userAlready = await User.findOne({username: req.params.username, iitkemail: req.params.iitkemail});
        if(!userAlready){
            res.status(400);
            throw "such user is not registered"
        }


        //generate OTP before sending register
        let otp = '';
        for(let i=0; i<=3; i++){
            const randval = Math.round(Math.random()*9);
            otp = otp + randval;
        }
        const verifToken = new PasswordChange({
            owner:req.params.username,
            token: otp
        });
        //deleting previous stored otp doc
        await PasswordChange.deleteMany({owner:req.params.username});

        await verifToken.save();

        let mailOptions = {
            from: process.env.SMTP_MAIL,
            to: req.params.iitkemail,
            subject: "Verification OTP from mapGo",
            text: `this is otp for password change: ${otp}`
        }

        const mail = await transporter.sendMail(mailOptions);
        res.status(200).json("email with otp sent successfully")
    }
    catch(err){
        res.status(500).json(err);
    }
});

//OK
router.post('/changepassword', async(req,res)=>{
    try{
        //req.body username, newpassword , otp
        // /password/user1/newUSER1password

        //before creating new password, verify-email is called
        const otpDoc = await PasswordChange.findOne({owner: req.body.username});

        if(!otpDoc){
            res.status(401);
            throw "this username did not create otp"
        }
        
        if(otpDoc.token === req.body.otp){
            //otp was sent earlier and used here to verify
            const doc = await User.findOneAndUpdate(
                {username: req.body.username},
                {password:req.body.newpassword}
                )
            if(!doc){
                res.status(404);
                throw "no user found"
            }

            const otpDocDelete = await PasswordChange.findOneAndDelete({owner: req.body.username});
            res.status(200).json("password updated successfully").end();
        }
        else {
            res.status(406);
            throw "invalid otp"
        }
       
    }
    catch(err){
        res.json(err);
    }
})


//OK
router.put('/subscribe/:hostname', authenticateUser , async(req,res)=>{
    try{
        const userAlready = await User.findOne(
            {username:req.rootUser.username}
        )
        if(userAlready.subscribed.includes(req.params.hostname)){
            res.status(407);
            throw "user already subscribed"
        }

        const user = await User.findOneAndUpdate(
            {username: req.rootUser.username},
            { $addToSet: { subscribed: req.params.hostname }}
        )
        
        if(!user){return res.status(404).end();}
    
        const host = await Host.findOneAndUpdate(
            {hostname: req.params.hostname},
            { $addToSet: { subscribers: req.rootUser.username }}
        )
        if(!host){
            res.status(404);
            throw "no such host exists"
        }

        const hostEvents = await Event.find(
            {hostname:req.params.hostname}
        );
        
        // console.log(hostEvents.length);
        for(let i=0; i< hostEvents.length; i++){

            const user = await User.findOneAndUpdate(
                {username: req.rootUser.username},
                { $addToSet: { schedule: hostEvents[i]._id }}
            );
        }       

        res.status(200).json("successfully subscribed"); 
    }
    catch(err){
        res.json(err);
    }
});
router.put('/unsubscribe/:hostname', authenticateUser , async(req,res)=>{
    try{
        //removing host from user doc
        const userAlready = await User.findOne(
            {username:req.rootUser.username}
        )
        if(userAlready.subscribed.includes(req.params.hostname)){
            // res.status(407);
            const user = await User.findOneAndUpdate(
                {username: req.rootUser.username},
                { $pull: { subscribed: req.params.hostname }}
            )
            if(!user){return res.status(404).end();}

            //removing user from host doc
            const host = await Host.findOneAndUpdate(
                {hostname: req.params.hostname},
                { $pull: { subscribers: req.rootUser.username }}
            )
            if(!host){
                res.status(404);
                throw "no such host exists"
            }

            //removing host events from user schedule
            const hostEvents = await Event.find(
                {hostname:host.hostname}
            );

            for(let i=0; i< hostEvents.length; i++){

                const user = await User.findOneAndUpdate(
                    {username: req.rootUser.username},
                    { $pull : { schedule: hostEvents[i]._id }}
                );
            }


        }

        
        res.status(200).json("successfully unsubscribed"); 
    }
    catch(err){
        res.json(err);
    }
});

//OK
router.get('/showhosts', authenticateUser, async(req,res)=>{
    try{
        const doc = await User.findOne(
        {username: req.rootUser.username}
        );

        if(!doc){
            console.log("no user exists");
            res.status(404).end();
        }
        // console.log("this is subscribed hosts")
        // console.log(doc.subscribed);

        const allHosts = [];

         for(let i=0; i< doc.subscribed.length; i++){

            let hostDoc = await Host.findOne({hostname:doc.subscribed[i]}, '-hostpassword');

            if(!hostDoc){
                continue
            }

            allHosts.push(hostDoc);
         }
        // console.log(allHosts);
        res.status(200).send(allHosts).end();
    }
    catch(err){
        console.log(err);
    }

})

router.get('/allhosts',authenticateUser, async (req,res)=>{
    try{
        const allHosts = await Host.find(
            {},
            {hostpassword:0}
        );

        res.status(200).json(allHosts);
    }
    catch(err){
        res.status(500).json(err).end();
    }
})

//OK
router.get('/logout', (req, res)=>{
    console.log("from the logout page");
    res.clearCookie('MAPGOdevUSER', {path: '/'})
    res.status(200).send("logged out successfully");
});


////////miscellaneous routes

router.get('/private', authenticateUser, (req,res)=>{
    console.log("this is private");
    res.send(req.rootUser);
});


router.get('/test', (req,res)=>{
    console.log("this is res header");
    console.log(req.cookies)
    res.send("done")
})

module.exports = router; 