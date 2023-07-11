const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


//defining the shape of the document
const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        minlength: 1,
    },    
    iitkemail: {
            type:String,
            required: true
    },
    password: {
        type: String,
        required: true
    },
    schedule: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
    subscribed:[
        {
            type: String
    
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
   
}, {timestamps:true}
);

userSchema.methods.generateAuthToken = async function(){
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


const User = mongoose.model('User', userSchema);
module.exports = User;
