const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	nom: String,
	mail: String
})


const moduleSchema = new mongoose.Schema({
	nom: String,
	lien: String,
	groupe: String,
	favoris: Boolean
})

const infoSchema = new mongoose.Schema({
	name: String,
	info: String
})


module.exports = { moduleSchema, userSchema, infoSchema }