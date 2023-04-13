const Category = require('../models/category_model')
const express = require('express')
const router = express.Router();

router.post('/',async(req,res)=>{
try{
    const {
        name,icon,color,image
    }=req.body;
    const category=await Category.create({
        name,icon,color,image
    });
    res.status(201).json({
        success: true,
        message: 'New Category  Created'
    });
    
    await category.save();
}
catch(err){
    console.log(err);
    res.status(500).json({
        success: false,
        message: err.message
    });
}
})

router.get('/',async(req,res)=> {
    const categoryList= await Category.find()
    if(!categoryList)
    {
        res.status(500).json({
            error:err,
            success:false
        })
    }
    res.send(categoryList)

})

router.get('/:id',async(req,res)=> {
    const category= await Category.findById(req.params.id)
    if(!category)
    {
        res.status(500).json({
            error:err,
            success:false
        })
    }
    res.send(category)

})

router.delete('/:id',async(req,res)=> {
    try{
        const category_id=req.params.id;
        await Category.findByIdAndDelete(category_id);
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

router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    },{new:true})

    if(!category)
    return res.status(400).send("REQUIRED CATGORY CANNOT BE UPDATED")

    res.send(category);
})

module.exports= router;