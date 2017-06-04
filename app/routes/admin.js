var bcrypt = require('bcrypt-nodejs');
var user = require('../models/users');
var posting = require('../models/post');
var post = require('../controller/post');
module.exports = function(app,passport){

	app.get('/api/artikel', function(err, res){
		posting.find({},null, {sort: {createdAt: 'desc'}}, function(err, document){
			if(err)
				console.log(err);

			res.json({
				status_code : 200,
				message : 'success get artikel info',
				data : document
			});
		});
	});
	app.get('/',function(req,res){
		res.render('login.ejs');
	});

	app.post('/login',passport.authenticate('local-login',{
		successRedirect : '/dashboard',
		failureRedirect : '/',
		failureFlash : true
	}));

	
	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	});

	app.get('/haha', (req, res) =>{
		user.find({}, function(err, document){
			res.send(document);
		});
	});

	app.use(isLoggedIn);
	app.get('/dashboard', function(req,res,next) {
		res.render('index', {user : req.user});
	});

	app.get('/dashboard/artikel',post.getAdd);
	app.post('/dashboard/artikel/add',post.postAdd);

	function isLoggedIn(req,res,next){
		if(req.isAuthenticated())
			return next();

		res.redirect('/');
	}
	function isLogged(req,res,next){
		if(req.isAuthenticated())
			res.redirect('/profile');

		return next();
	}


	app.get('*',function(req,res){
		res.send('Jangan nyasar');
	});

};