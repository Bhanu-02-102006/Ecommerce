let users=require('../models/usermodel')
const bcrypt = require('bcrypt')
const mail = require('../utils/gmail.js')
const jwt=require('jsonwebtoken')
require('dotenv').config()
let secretkey=process.env.secretkey

exports.register=async(req,res)=>{
    try {
        let {username,email,password,role} = req.body;
        if(!username || !password || !email || !role){
            return res.json({msg:"missing fields"})
        }
        //check user already exists are not
        let existingUser = await users.findOne({
         $or: [
             { username },
             { email }
           ]
        })

       if (existingUser) {
           return res.json({
           msg: "Username or Email already exists"
        })
      }
        let hashPassword = await bcrypt.hash(password,10);
        await users.create({username,password:hashPassword,email,role});

        //generate a json web token
        //payload,secretkey,expiredate

        let payload={username:username,emailaddress:email,role:role}
        let token=await jwt.sign(payload,secretkey,{expiresIn:'1h'})

        await mail(email, username);

        res.json({
        msg: "Registration successful",
        token: token
    });
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.login=async (req,res,next)=>{
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
}