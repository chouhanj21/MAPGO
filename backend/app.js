const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const {Server} = require("socket.io");
const http = require('http')

const userRouter = require('./routes/user');
const hostRouter = require('./routes/host');
const eventRouter = require('./routes/event');
const scheduleRouter = require('./routes/schedule');

const PORT = process.env.PORT;

const app = express();


mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(()=>{
        console.log("db connected successfully");
    })
    .catch((err)=>{
        console.log("db connection failed");
        console.log(err);
    });

//only parses json req body
app.use(express.json());

//cookie parser
app.use(cookieParser());

//CORS related stuff
//cross origin
// let whitelist = ['http://localhost:3000', 'http://localhost:5000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// app.use(cors());

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, content-type, body, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", 'PUT, POST, GET');
    next();
});  

// app.use(cors());
// app.all('*', function(req, res, next) {
//     res.header({"Access-Control-Allow-Origin" : "http://localhost:3000"});
//     res.header( "Access-Control-Allow-Credentials", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//"Access-Control-Allow-Headers",

// const setCustomHeader = (req, res, next) => {
//     // Set the response header
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // res.setHeader('Access-Control-Allow-Credentials', true)
    
//     // Call the next middleware in the chain
//     next();
//   }; 
  
  // Register the middleware for all routes
// app.use(setCustomHeader);


app.use("/api/user", userRouter);
app.use("/api/host", hostRouter);
app.use("/api/event", eventRouter);
app.use("/api/schedule", scheduleRouter);

const server = http.createServer(app);


server.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
});

