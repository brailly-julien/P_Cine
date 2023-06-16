const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id : { type: String, required: true, unique: true},
	name : { type: String, required: true },
	length: { type: String, required: true},
})
const model = mongoose.model("item", schema);

module.exports.Model = model;
