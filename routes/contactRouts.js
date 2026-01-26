const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    updateContact,
    postContact,
    deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).delete(deleteContact).put(updateContact);


module.exports = router;