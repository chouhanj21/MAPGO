const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

//defining the shape of the document
const hostSchema = new mongoose.Schema(
{
    hostname: {
        type: String,
        required: true
    },    
    iitkemail: {
            type:String,
            required: true
        },
    phone: {
        type: Number,
        required: true
    },
    hostpassword: {
        type: String,
        required: true
    },
    about:{
        type: String
    },
    subscribers: [
        {
            type: String
            //username of user
        }
    ],
    tokens: [
        {
            token: {
                type:String,
                required: true
            }
        }
    ]
   
}, {
    timestamps:true
}
);

hostSchema.methods.generateAuthToken = async function(){
    try{
        //creating token
        let myToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY)

        this.tokens = this.tokens.concat({token:myToken})

        //saves token in db
        await this.save();

        return myToken;
    }
    catch(err){
        console.log(err)
    }
}

const Host = mongoose.model('Host', hostSchema);
module.exports = Host;
