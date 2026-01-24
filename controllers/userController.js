const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const getUsers = asyncHandler(async(req,res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const getUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({message: "User not found"});
    }
        res.status(200).json(user);
});

const registerUser = asyncHandler(async(req, res) => {
    console.log("The request body is: ", req.body);
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists.");
    }
    const user = await User.create({
        userName,
        email,
        password,
    });
    res.status(201).json(user);
});

const updateUser = asyncHandler(async(req,res) => {
    const existingUser = await User.findById(req.params.id);
    if(!existingUser){
        res.status(400).json({message: "Contact not found"});
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
    );
    res.status(201),json(updateUser);
});

const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({message: "User not found"});
    }
    await User.deleteOne();
    res.status(200).json(user);
})

module.exports = {getUser, getUsers, createUser: registerUser, updateUser, deleteUser};

