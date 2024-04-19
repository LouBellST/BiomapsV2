const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	nom: String,
	mdp: String,
	mail: String,
	admin: Boolean,
	favoris: []
})


const serviceSchema = new mongoose.Schema({
	nom: String,
	lien: String,
	groupe: String
})

const infoSchema = new mongoose.Schema({
	name: String,
	info: String
})


module.exports = { serviceSchema, userSchema, infoSchema }