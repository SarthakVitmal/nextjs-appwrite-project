import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide a email"]
    },
    password:{
        type:String,
        required: [true,"Please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry : Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;