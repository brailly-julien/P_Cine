const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id : { type: String, required: true, unique: true},
	id_user : { type: String, required: false},
    id_movie : { type: String, required: false},
	type: { type: String, required: true},
})
const model = mongoose.model("seat", schema);

module.exports.Model = model;
