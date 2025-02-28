const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Myteam = require('../models/Myteam');


router.post('/myteam', fetchuser, async (req, res) => {
    //Error check for input description
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        
        //received in backend finally from frontend->
        // notestate(apna thunderclient)->
        // routes(notes.js)(iske beecche me ->
        // middleware(fetchuser== req me user dalke bheja tha i.e. req.user))
        // (wahi to khul rha h jo apna backend hai) routes(notes.js)->
        //isme humne destructure krke le liya
        console.log(req.body);
        const { id,name, email, role } = req.body;  


        const team = new Myteam({    //ye notes ka obj note h, notes asli me database h
            user: id, name, email, role, Date
        })
        const savedteam = await team.save();
       
        res.json(savedteam);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

//Route 2 :Get all the users using: GET "/api/admin/allusers". Login required
router.get('/showteam', fetchuser, async (req, res) => {
    console.log("in back allnotes");

    try {
        const teams = await Myteam.find({});

        res.json(teams)
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }

})

module.exports = router;


// const addToTeam = async() => { 
        
//     const response = await fetch(`${host}/api/team/addteam`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem('token')
//         },
//         body: JSON.stringify(),
//     });

//     const json=await response.json();
//     console.log(json);
    
//     setTeams(json);
// }
//iske liye route likh rhhe