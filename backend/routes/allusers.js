const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const Notes = require('../models/User');
//Route 1 :Get all the users using: GET "/api/admin/allusers". Login required
router.get('/allusers', fetchuser, async (req, res) => {
    //console.log("in back allnotes");

    try {
        const users = await User.find({});

        res.json(users)
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }

})

module.exports = router; 