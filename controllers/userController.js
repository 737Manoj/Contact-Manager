const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = asyncHandler(async(req,res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const getUser = asyncHandler(async(req,res) => {
    res.json(req.user);
});

const registerUser = asyncHandler(async(req, res) => {
    console.log("The request body is: ", req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists.");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    });
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(404);
        throw new Error("User data not valid.");
    }
});

const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email : user.email,
                id: user.id,
            },
        }, process.env.SECRET_KEY,
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password not valid.");
    }
})

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

module.exports = {getUser, getUsers,login, registerUser, updateUser, deleteUser};

