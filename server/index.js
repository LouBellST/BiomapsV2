const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const { serviceSchema, userSchema, infoSchema } = require('./Schemas.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/biomaps')
.then(() => {
	console.log("CONNECTION OPEN")
})
.catch(err => {
	console.log("ERROR");
	console.log(err)
})

const Service = mongoose.model('Service', serviceSchema);
const User = mongoose.model('User', userSchema);
const Info = mongoose.model('Info', infoSchema);


app.get('/user/:userMail', async (req, res) => {
	const { userMail } = req.params;
	const user = await User.findOne({mail: userMail})
	res.send(user);
})

app.get('/services', async (req, res) => {
	const allServices = await Service.find();
	res.send(allServices)
})


app.get('/infos', async (req, res) => {
	const information = await Info.find();
	res.send(information)
})


app.post('/infos', async (req, res) => {
	const { value } = req.body;
	await Info.findOneAndUpdate({name: "infoName"}, {info: value})
	res.send("new info")
})

app.post('/favoris/:mail/:id', async (req, res) =>{
	const { mail,id } = req.params;
	let newFav = await Service.findOne({_id: id})
	let user = await User.findOne({mail: mail})
	const isIn = user.favoris.some(f => f.nom === newFav.nom);
	if(!isIn){
		await User.findOneAndUpdate({mail: mail}, {$push: {favoris: newFav}})
		res.send("new favorite added");
	}else{
		res.send("new favorite not added");
	}
})

app.post('/favoris/:mail/:id/delete', async (req, res) =>{
	const { mail,id } = req.params;
	let fav = await Service.findOne({_id: id})
	await User.findOneAndUpdate({mail: mail}, {$pull: {favoris: fav}})
	res.send("favorite deleted");
})


app.post('/auth', async (req, res) =>{
	const { username, password } = req.body;
	try{
		let fav = await User.findOne({mail: username, mdp: password})
		if(fav !== null){res.send(true)}
		else{res.send(false)}
	}catch(e){
		res.send(e);
	}
})

app.post('/newService', async (req, res) => {
	const { nom, lien, groupe } = req.body;
	try{
		await Service.create({nom: nom, lien: lien, groupe: groupe});
		res.send("Service créé")
	}catch(e){
		res.send("Une erreur est survenue")
		res.send(e)
	}
})



app.listen(8080, () => {
	console.log('server listening on port 8080');
})