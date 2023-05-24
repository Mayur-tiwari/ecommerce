const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");


// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password
    });

    sendToken(user, 201, res);
})


//Login User

exports.loginUser = catchAsyncErrors(async (req,res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 402));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res);
});

//Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Get User Detail

exports.getUserDetails = catchAsyncErrors(async (req,res) => {
    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User Not Found", 500));
    }

    res.status(200).json({
        success:true,
        user, 
    })
});

// Get All Users -- Admin

exports.getAllUsers = catchAsyncErrors(async (req,res) => {
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
});

//Get single user -- Admin

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
 
    
    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 500));
    }

    res.status(200).json({
        success:true,
        user
    })
} );

// Delete User -- Admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    

    
    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 500));
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message: "User Deleted Successfully"
    })
});

// Update User Password

exports.updatePassword = catchAsyncErrors(async (req,res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect", 401))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("old password is incorrect", 401))
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200, res);
});


//Update User Profile
exports.updateProfile= catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }

    const user  = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true
    })
});




//Update User Role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user  = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 500));
    }

    res.status(200).json({
        success:true
    })
});