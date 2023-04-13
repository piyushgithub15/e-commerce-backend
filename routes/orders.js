const express = require('express')
const router = express.Router();
const Order = require('../models/order_model')
const OrderItem = require('../models/orderItem_model')

//get all orders
router.get('/',async (req,res)=>{

    const orders = await Order.find().populate('orderItem');
    if(!orders)
    {
        res.status(500).json({
            
            success :false
        })
    }
    res.send(orders);

})


//create a order
router.post('/',async (req,res)=>{

    let orderItemsIds = req.body.orderItem.map(async orderItem=>{

        let newOrderItem = new Order({
            quantity:orderItem.quantity,
            product:orderItem.product
        })


    })
    

    try{
        const {
            
            shippingAddress1,
            shippingAddress2,
            status,
            totalPrice,
            user
        } = req.body;
        const orderItem =orderItemsIds;

        
        
        const order=await Order.create({
            orderItem,
            shippingAddress1,
            shippingAddress2,
            status,
            totalPrice,
            user
            
        });
        res.status(201).json({
            success: true,
            message: 'New order  Created'
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

//update a order
router.put('/:id',async(req,res)=>{

    const order = await Order.findById(req.body.category);
    if(!order)
    return res.status(404).send('INVALID CATEGORY');

    try{
        await Order.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            message: 'Order Updated'
        });
    }
    catch(error){
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
})



module.exports= router;