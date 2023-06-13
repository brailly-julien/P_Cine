const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name : { type: String, required: true },
	type: { type: String, required: true},
})
const model = mongoose.model("item", schema);

module.exports.Model = model;
