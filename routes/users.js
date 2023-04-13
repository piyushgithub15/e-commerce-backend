const express = require('express')
const router = express.Router();
const User=require('../models/user_models')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const saltRounds=10;

router.post('/',async (req,res)=>{
    
    

    try{
        const {
            name,
            email,
            password,
            phone,
            isAdmin,
            pincode,
            address
        }=req.body;
       
        const hashedPassword= bcrypt.hashSync(req.body.password,saltRounds);

        
        
        const user=await User.create({
            name,
            email,
            hashedPassword,
            phone,
            isAdmin,
            pincode,
            address
            
        });
        res.status(201).json({
            success: true,
            message: 'New User  Created'
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

router.get('/',async (req,res)=>{

    const users = await User.find().select('-hashedPassword');
    if(!users)
    {
        res.status(500).json({
            
            success :false
        })
    }
    res.send(users);

})

router.get('/:id',async (req,res)=>{

    const user= await User.findById(req.params.id).select('-hashedPassword');
    if(!user)
    {
        res.status(500).json({
            
            success :false
        })
    }
    res.send(user);

})

router.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user)
    return res.status(400).send("USER NOT FOUND");
    const secret =process.env.SECRET_MESSAGE;

    if(user && bcrypt.compareSync(req.body.password,user.hashedPassword))
    {

        const token=jwt.sign(
            {
            userId:user.id
            },secret,
            {expiresIn :'1d'}
        )
    res.status(200).send({user:user.email,token:token})
    }
    else
    res.status(400).send('WRONG PASSWORD')
})



module.exports= router;