const mongoose = require('mongoose');
const { Schema } = mongoose;
const TeammateSchema = new Schema({
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