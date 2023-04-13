const mongoose =require('mongoose')


const productSchema= mongoose.Schema({
    name :{
        type:String,
        required : true

    },
    description : {
        type:String,
        required : true

    },
    richDescription:{
        type:String,
        required:true

    },
    image : {
        type:String,
        required : true,
         },
    images : [{
        type:String
    }],
    brand : {
        type:String,
        default:''
    },
    price : {
        type : Number,
        required :true
    },
    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    }, 
    countInStock :{
        type: Number,
        required:true,
        min:0,
        max:455
    },
    isFeatured : {
        type : Boolean,
        default : false
    },
    dateCreated : {
        type :Date,
        default:Date.now
    },
    rating :{
        type:Number
    },
    numReviews :{
        type:Number
    }
});
const Product = mongoose.model('Product',productSchema);
module.exports =Product;