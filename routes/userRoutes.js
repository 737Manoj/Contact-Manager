const express = require('express');
const { registerUser, getUser, updateUser,deleteUser, getUsers, login } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.get("/current",validateToken, getUser);
router.get("/all", getUsers)

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;