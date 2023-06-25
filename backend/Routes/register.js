const express = require('express');
const { UserModel } = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const Register = express.Router();

Register.post("/register" , async(req,res)=>{
 const {name , email , password , age } = req.body;
 try {
  const existingEmail = await UserModel.find({email});
  if(existingEmail.length > 0){
    res.status(400).json({message : "Email already exists"});
  }

  bcrypt.hash(password,5, async function(err,hash){
      if(!err){
        const newUser = new UserModel({name, email, password:hash, age});
        await newUser.save();
      }else{
        res.status(400).json({message:err.message});
      }
  })
  res.status(201).json({message : "User registered successfully"});
 } catch (error) {
  res.status(500).json({message : error.message});
 }
 
})

module.exports = {
    Register
}