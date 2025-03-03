const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const isadmin = require('../middleware/isadmin');   
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const Myteam = require('../models/Myteam');
//Route 1 :Get all the notes using: GET "/api/admin/allnotes". Login required
router.get('/allnotes', fetchuser,isadmin, async (req, res) => {
    console.log("in back allnotes");

    try {
        const team = await Myteam.find({});  // Get all team members
        const notes = await Notes.find({});  // Get all notes

        const result = [];

        // Iterate through each team member and filter corresponding notes
        for (const obj of team) {
            const userId = obj.user.toString();  
            console.log(userId);
            const userNotes = notes.filter(note => note.user.toString() === userId);  // Compare user ids
            // Add the found notes to the result
            result.push(...userNotes);  // Spread operator to add all the notes in the result array
        }
        console.log(result);
        res.json(result);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }

})

// api/admin/fetchallnotes:id    for vewing only selected candidates contacts by admin
router.get('/fetchallnotes:id', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.params.id });

        res.json(notes)
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }

})



// // [
// //     body('Name', 'Please add minimum 3 character title').isLength({min:3}),
// //     body('Email', 'Please add description atleat 5 characters').isLength({ min: 5 }),
// // ],
// //Route 2 :Add a new note using: POST "/api/notes/addnote". Login required
// router.post('/addnote', fetchuser, async (req, res) => {
//     //Error check for input description
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { Name, Email, Mobile, Address } = req.body;
//         const note = new Notes({
//             Name, Email, Mobile, Address, user: req.user.id
//         })
//         const savednote = await note.save();
       
//         res.json(savednote);
//     }
//     catch (error) {
//         console.log(error.message);
//         return res.status(500).send("Internal Server Error");
//     }
// })

// //Route3
// //Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => { 
//     const { Name, Email, Mobile, Address } = req.body;
//     try {
//         const newNote = {};
//         //create a new note Object
    
//         if (Name) { newNote.Name = Name };
//         if (Email) { newNote.Email = Email };
//         if (Mobile) { newNote.Mobile = Mobile };
//         if (Address) { newNote.Address = Address };
    
//         let note = await Notes.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found"); }
//         if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
    
//         note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
//         res.send({ note });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).send("Internal Server Error");
//     }
// })

// //Route 4
// //Delete a note using: DELETE "/api/notes/delete/:id" Login required
// router.delete('/delete/:id', fetchuser, async (req, res) => {
//     //find note to be delete
//     try {
//         let note = await Notes.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found"); }

//         //checking for user is owner
//         if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }

//         note = await Notes.findByIdAndDelete(req.params.id);
//         res.send({ "Success": "Notes Deleted Successfuly", note: note });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).send("Internal Server Error");
//     }
// })

module.exports = router;