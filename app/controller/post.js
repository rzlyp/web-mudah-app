const multer = require('multer');
const user = require('../models/users');
const post = require('../models/post');

function Post(){
	this.getPost = function(req, res, next){
		post.find({}, (err, document) =>{
			if(err)
				console.log(err);

			res.render('artikel/artikel', {user : req.user, post : document});
		});
	}
	this.getAdd = function(req, res, next) {
		res.render('artikel/tambah', {user : req.user});
	}
	this.postAdd = function(req, res, next) {
		var storage = multer.diskStorage({
      		destination : function(req,file,callback){
      			callback(null,'public/img');
      		},
      		filename : function(req,file,callback){
      			console.log(file);
      			callback(null,file.originalname);
      		}
      	});
      	var upload = multer({storage:storage}).single('image');

      	upload(req, res , (err)=>{
      		const tgl = new Date();
      		const data = {
      			title : req.body.title,
      			image : req.file.filename,
      			body : req.body.body,
      			createdAt : tgl
      		};
      		const posting = new post(data);
      		posting.save((err)=>{
      			if(err)
      				console.log(err);

      			res.redirect('/dashboard/artikel');
      		});
		
      	});
	}
}

module.exports = new Post();