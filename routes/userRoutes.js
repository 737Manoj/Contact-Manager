const express = require('express');
const { registerUser, getUser, updateUser,deleteUser, getUsers, login } = require('../controllers/userController');
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.get("/current", getUser);
router.get("/all", getUsers)

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;