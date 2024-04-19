const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { moduleSchema, userSchema, infoSchema } = require('./Schemas.js')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/biomaps')
.then(() => {
	console.log("CONNECTION OPEN")
})
.catch(err => {
	console.log("ERROR");
	console.log(err)
})

const Module = mongoose.model('Module', moduleSchema);
const User = mongoose.model('User', userSchema);
const Info = mongoose.model('Info', infoSchema);


app.get('/user/:userMail', async (req, res) => {
	const { userMail } = req.params;
	const user = await User.findOne({mail: userMail})
	res.send(user);
})

app.get('/modules', async (req, res) => {
	const allModules = await Module.find();
	res.send(allModules)
})


app.get('/infos', async (req, res) => {
	const information = await Info.find();
	res.send(information)
})


app.post('/infos/:value', async (req, res) => {
	const { value } = req.params;
	await Info.findOneAndUpdate({name: "infoName"}, {info: value})
	res.send("new info")
})

app.post('/favoris/:id', async (req, res) =>{
	const { id } = req.params;
	let newFav = await Module.findOne({_id: id})
	if(!newFav.favoris){ await Module.updateOne({_id: id}, {favoris: true}) }
	res.send("new favorite added");
})

app.post('/favoris/:id/delete', async (req, res) =>{
	const { id } = req.params;
	let fav = await Module.findOne({_id: id})
	if(fav.favoris){ await Module.updateOne({_id: id}, {favoris: false}) }
	res.send("favorite deleted");
})


app.post('/auth/:username/:password', async (req, res) =>{
	const { username, password } = req.params;
	try{
		let fav = await User.findOne({mail: username, mdp: password})
		if(fav !== null){res.send(true)}
		else{res.send(false)}
	}catch(e){
		res.send(false);
	}
})



app.listen(8080, () => {
	console.log('server listening on port 8080');
})