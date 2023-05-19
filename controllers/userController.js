const asyncHandler = require('express-async-handler')
const userModel=require('../models/userModel')
const jwt = require("../helpers/generateJwt")
exports.userRegister = asyncHandler(async (req, res) => {
    var existingUser=await userModel.findOne({ email: req.body.email })
    if(existingUser!=null){ return res.send({data:null,message:"User already registered",status:false})}
    await userModel.create(req.body).then((newUser)=>{
        res.status(201).send({
            data:newUser,
            message: "User created successfully",
            status:true
        })

    })
    .catch((err)=>{
        res.send({data:null,message:"Coulnt create user",status:false,error:err.message})
    })


})

exports.userLogin = asyncHandler(async (req, res) => {

    const User = await userModel.findOne({  email: req.body.email });
    if (!User) {
        return res.status(200).json({
            data:null,
            status: false,
             message: "Account not found forward to registration",
        });
    }

    const { error, token } = await jwt.generateJwt(User._id, User._id, User.role)
    if (error) {
        return res.status(500).json({
            error: true,
            message: "Couldn't create access token. Please try again later",
        });
    }
    res.status(200).send({
        data:User,
        token:token,
        message: "User loggedin successfully",
        status:true
    })


})

