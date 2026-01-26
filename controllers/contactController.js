const asyncHandler = require("express-async-handler");
const Contact = require('../model/contactModel');

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
    // res.end();
});

const getContact = asyncHandler(async(req, res) => {
const contact = await Contact.findById(req.params.id);
if(!contact){
    res.status(404).json({message: "Contact not found."});
}
    res.status(200).json(contact);
    // res.end();
});

const postContact = asyncHandler(async(req, res) => {
    console.log("The request body is : ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
    // res.end();
});

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({message: "Contact not found."})
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update contact.");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
    );
    res.status(201).json(updatedContact);
    // res.end();
});

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({message: "Contact not found."})
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update contact.");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
    // res.end();
});

module.exports = {getContacts, getContact,postContact,updateContact, deleteContact};