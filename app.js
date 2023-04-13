const express = require("express");
const morgan = require('morgan');
const app = express();
const mongoose=require('mongoose');
const bodyParser =require('body-parser');
//const authJwt = require('./helper/auth_middleware');
require('dotenv/config');

const database="mongodb://localhost:27017/ecommerce";
const port = 3000;
const api = process.env.API_URL


//routes
const productsRouter = require('./routes/products');
const userRouter = require('./routes/users')
const categoryRouter = require('./routes/categories');
const orderRouter = require('./routes/orders')



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))
//app.use(authJwt)


//routers
app.use(`${api}/products`,productsRouter)
app.use(`${api}/orders`,orderRouter)
app.use(`${api}/users`,userRouter)
app.use(`${api}/categories`,categoryRouter);







mongoose.set('strictQuery',false);
mongoose.connect(process.env.CONNECTION_STRING,{
   
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>  {
    console.log("CONNECTION IS SUCCESSFUL");
}).catch((err) => {
    console.log(err);
})

app.listen(port,()=> {
    
    console.log('Server is running http://localhost:3000');
})