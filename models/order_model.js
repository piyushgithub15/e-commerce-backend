const mongoose =require('mongoose')


const orderSchema= mongoose.Schema({
    orderItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    },
    shippingAddress1 :{
        type:String,
        required:true,
    },
    shippingAddress2 : {
        type:String,
    
    },
    status :{
        type:String,
        required:true,
        default:"Pending"
    },
    totalPrice :{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    }   
});
const Order = mongoose.model('Order',orderSchema);
module.exports ={Order};