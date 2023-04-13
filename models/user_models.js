const mongoose =require('mongoose')


const userSchema= mongoose.Schema({

    name :{
        type:String,
        required :true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    hashedPassword : {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    isAdmin : {
        type:Boolean,
        default:false
    },
    pincode : {
        type : Number,
        required:true
    },
    address : {
        type:String,
        required:true
    }
   
});

const User = mongoose.model('User',userSchema);
module.exports =User;
exports.userSchema=userSchema