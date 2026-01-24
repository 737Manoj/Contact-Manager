const express = require('express');
const { registerUser, getUser, updateUser,deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", (req,res) =>{
    res.json({message: "Login successfull"});
});

router.post("/current", getUser);

router.route("/:id").put(updateContact),delete(deleteUser);

module.exports = router;