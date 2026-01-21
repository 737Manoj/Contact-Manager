const express = require('express');
const router = express.Router();

router.post("/register", (req, res) => {
    res.json({message: "User registered."});
});

router.post("/login", (req,res) =>{
    res.json({message: "Login successfull"});
});

router.get("/current", (req,res) =>{
    res.json({message: "Current user information."});
});



module.exports = router;