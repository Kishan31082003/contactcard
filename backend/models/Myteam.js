const mongoose = require('mongoose');
const { Schema } = mongoose;
const TeammateSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    role:{
        type: String,
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Myteam = mongoose.model('team', TeammateSchema);

module.exports = Myteam;