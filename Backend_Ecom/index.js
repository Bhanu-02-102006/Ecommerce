const express = require('express')
const cors = require('cors')
let limiter=require('./middlewares/ratelimit')
const connection = require('./config/db')
/*const products = require('./models/productModel')
const users = require('./models/userModel')
const bcrypt = require('bcrypt')
const mail = require('./utils/gmail.js')
const jwt=require('jsonwebtoken')
const {ratelimit}=require('express-rate-limit')*/
require('dotenv').config()
let productroutes=require('./routes/productroute')
let authroutes=require('./routes/authroute')
const app = express();
const port = process.env.PORT


//middlewares
app.use(cors());
app.use(limiter)
app.use(express.json())

app.use('/products',productroutes)
app.use('/auth',authroutes)

/*
app.get('/',(req,res)=>{
    res.json('Mummyyyyy')
})

app.get('/products',async(request,response)=>{
    try {
        let allProducts = await products.find();
        response.status(200).json(allProducts);
    } catch (error) {
        response.json(error.message);
    }
})

app.post('/products',async(request,response)=>{
    try {
        await products.create(request.body);
        response.status(201).json({msg:"Products saved"});
    } catch (error) {
        response.json(error.message);
    }
})

app.post('/bulkproducts',async(request,response)=>{
    try {
        await products.insertMany(request.body)
        response.status(201).json({msg:"All Products saved"});

    } catch (error) {
        response.json(error.message);
    }
})

app.put('/products/:id',async(request,response)=>{
    try {
        let prodcutId = request.params.id;
        await products.findByIdAndUpdate(prodcutId,request.body);
        response.json({msg:"products are updated"})
    } catch (error) {
        response.json(error.message);
    }
})

app.delete('/products/:id',async(request,response)=>{
    try {
        let productId = request.params.id;
        await products.findByIdAndDelete(productId);
        response.json({msg:"product is deleted"})
    } catch (error) {
        response.json(error.message);
    }
})


//registration 
app.post('/register',async(req,res)=>{
    try {
        let {username,email,password,role} = req.body;
        if(!username || !password || !email || !role){
            return res.json({msg:"missing fields"})
        }
        //check user already exists are not
        let checkUser = await users.findOne({username:username})
        if(checkUser){
            return res.json({msg:"username already exits"})
        }
        let hashPassword = await bcrypt.hash(password,5);
        await users.create({username,password:hashPassword,email,role});

        //generate a json web token
        //payload,secretkey,expiredate

        let payload={username:username,emailaddress:email,role:role}
        let token=await jwt.sign(payload,secretkey,{expiresIn:'1hr'})

        res.json({msg:"Registration successful",token:token});
        await mail(email,username);
    } catch (error) {
        console.log(error.message);
        
    }
})

//mail 

//login workflow
app.post('/login',async (req,res,next)=>{
    try{
        const {username,password}=req.body
        if(!username || !password) return res.json({"msg":"missingfields"})
        let checkuser=await users.findOne({username})
        if(!checkuser) return res.json({"msg":"user not found"})

        let ishashverified=await bcrypt.compare(password,checkuser.password)
        if(!ishashverified) return res.json({"msg":"username or password is wrong"})

        //verify the token first
        let token=req.headers.authorization.split(' ')[1]
        if(!token) return res.json({msg:"Hii"})
        let isvalid=await jwt.verify(token,secretkey)
        if(!isvalid) return res.json({"msg":"invalid token"})
            res.json({msg:"login Successfull"})
    }catch(error){
        next(error.message)
    }
})*/
app.listen(port,()=>{
    console.log(`Listening to port:${port}`);
    connection();
})