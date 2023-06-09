const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	firstname : { type: String, required: true },
	lastname: { type: String, required: true},
	pseudo : { type: Number, required: true },
    mail: { type: String, required: true},
    soundProfile: { type: String, required: true},
    language: { type: String, required: true},
})
const model = mongoose.model("user", schema);

module.exports.Model = model;
