const express=require('express');
const Router=express.Router();
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {connectDB, getDb}=require('../db');
const SecretKey=process.env.SECURITY_KEY;

Router.post('/signUp',async (req,res)=>{
try {
    

    const userCollections=getDb('my-data');
    let email=req.body.email;
    let password=req.body.password;
    let passedYear=req.body.passedYear;
    let package=req.body.package;
    let position=req.body.position;
    let department =req.body.department;

    if(!validator.isEmail(email)) return res.status(400).json({error:"Invalid Email"});

    let user=await userCollections.findOne({email:email});
    if(user) return res.status(400).send("User Already Exists !!! Try Logging In");
    let hashedPassword=await bcrypt.hash(password,12);
    let payload={
        email:email,
        password:hashedPassword,
    }
   const token=jwt.sign(payload,process.env.SecretKey,{expiresIn:'1h'});

   await userCollections.insertOne({
    email:email,
    password:hashedPassword,
    passedYear:passedYear,
    package:package,
    position:position,
    department:department
   })

   return res.json({'email':email,'Token':token});

} catch (error) {
    console.log(error);
}
   
})



Router.post('/logIn',async (req,res)=>{
   try {


    let email=req.body.email;
    let password=req.body.password;
    const userCollections=getDb('my-data');
    if(!validator.isEmail(email)) return res.status(400).json({error:"Invalid Email"});

    const user=await userCollections.findOne({email:email});
    if(!user) return res.status(400).send("User not Found !!! ");
    let passwordComapre=user.password;

    let hashedPassword=await bcrypt.hash(password,12);
    const check=await bcrypt.compare(hashedPassword,passwordComapre);
    if(!check) {
        console.log(hashedPassword+"   "+passwordComapre);
        return res.status(401).send("Password is Incoorect !!! ");
    }

    let payload={
        email:email,
        password:hashedPassword
    }
   const token=jwt.sign(payload,process.env.SecretKey,{expiresIn:'1h'});

   return res.json({'Token':token});


    
   } catch (error) {
    console.log(error);
   }
})

module.exports=Router;