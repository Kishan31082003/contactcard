const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        
    },
    Mobile: {
        type: String,
        default: "General"
    },
    Address: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Notes= mongoose.model('notes', NotesSchema);
module.exports=Notes;