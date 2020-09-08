
	const express = require('express'),
		  bodyParser = require('body-parser'),
		  mongoose = require('mongoose'),
		  ejs = require('ejs'),
		  app = express();


		  app.set('view engine', 'ejs');
		  app.use(bodyParser.urlencoded({extended:true}));
		  app.use(express.static("public"));

	 mongoose.connect("mongodb://localhost:27017/codecenterDB", {useNewUrlParser:true, useUnifiedTopology:true});


	 const memberSchema = new mongoose.Schema({
	 	fname:String,
	 	lname:String,
	 	sex: String,
	 	state: String,
	 	dept: String
	 });

	 const Member = new mongoose.model('Member', memberSchema);


	 //ROUTES
	 app.get('/', function(req, res){
	 	res.render('home');
	 })

	 app.get('/about', function(req, res){
	 	res.render('about');
	 })

	 app.get('/course', function(req, res){
	 	res.render('course');
	 })

	 app.get('/register', function(req, res){
	 	res.render('registration');
	 })

	 app.post('/register', function(req, res){
	 		//console.log(req.body);
	 		const {fname, lname, sex, state, dept} = req.body;

	 		const newMember = new Member({
	 			fname,
	 			lname,
	 			sex,
	 			state,
	 			dept
	 		})

	 		newMember.save(function(err, result){
	 			if(err) console.log(err);
	 			res.send("Record Successfully Captured");
	 		})
	 })

	 app.get('/members', function(req, res){
	 	Member.find(function(err, result){
	 		if(err){ 
	 			console.log(err);
	 		} else {
	 			res.render('members', {result:result});
	 		}

	 	})
	 })

	 app.listen(3000, function(){
	 	console.log('Server started on port 3000');
	 })