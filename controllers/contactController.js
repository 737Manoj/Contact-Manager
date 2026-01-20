const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async(req, res) => {
    res.status(200).json({message : "List of contacts."});
    // res.end();
});

const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({message : `Get contact for ${req.params.id}`});
    // res.end();
});

const postContact = asyncHandler(async(req, res) => {
    console.log("The request body is : ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    res.status(201).json({message : "Create new contact."});
    // res.end();
});

const updateContact = asyncHandler(async(req, res) => {
    res.status(201).json({message : `Update contact for ${req.params.id}`});
    // res.end();
});

const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
    // res.end();
});

module.exports = {getContacts, getContact,postContact,updateContact, deleteContact};