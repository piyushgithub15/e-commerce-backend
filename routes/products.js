const express = require('express')
const router = express.Router();
const Product = require('../models/products_model');
const Category =require('../models/category_model')


//get all the products
router.get('/',async (req,res)=>{

    const products = await Product.find().populate('category');
    if(!products)
    {
        res.status(500).json({
            
            success :false
        })
    }
    res.send(products);

})


// get a product with particular id
router.get('/:id',async (req,res)=>{ 

    const product = await Product.findById(req.params.id).populate('category');
    if(!product)
    {
        res.status(500).json({
            
            success :false
        })
    }
    res.send(product);

})


//add a new product
router.post('/',async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category)
    return res.status(404).send('INVALID CATEGORY');

    try{
        const {
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            isFeatured,
            dateCreated,
            rating,
            numReviews
        }=req.body;

        
        
        const product=await Product.create({
            name,description,richDescription,image,images,brand,price,category,countInStock,isFeatured,dateCreated,rating,
            numReviews
            
        });
        res.status(201).json({
            success: true,
            message: 'New Product  Created'
        });
        
        await product.save();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }   
})

//update a product
router.put('/:id',async(req,res)=>{

    const category = await Category.findById(req.body.category);
    if(!category)
    return res.status(404).send('INVALID CATEGORY');

    try{
        await Prowduct.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            message: 'Product Updated'
        });
    }
    catch(error){
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
})

//delete a product
router.delete('/:id',async(req,res)=> {
    try{
        const product_id=req.params.id;
        await Product.findByIdAndDelete(product_id);
        res.status(200).json({
            success: true,
            message: 'Category Deleted'
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})

//get a count of products
router.get('/get/count',async(req,res)=>{

    const productCount=await Product.countDocuments((count)=>count)
    if(!productCount)
    {
        res.status(500).json({success:false})
    }
    res.status(200).send(productCount);

})




module.exports=router;