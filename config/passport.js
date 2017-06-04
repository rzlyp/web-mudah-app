var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var User = require('../app/models/users');

module.exports = function(passport){
	passport.serializeUser(function(user,done){
		done(null,user._id);
	});

	passport.deserializeUser(function(id, done) {
        User.findById({"_id" : id}, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-login',new LocalStrategy({
    	usernameField : 'username',
    	passwordField : 'password',
    	passReqToCallback : true
    },
    function(req,username,password,done){
    	User.findOne({'username' : username},function(err,user){
           

    		if(err)
    			return done(err)

    		if(!user){
                console.log("hahahhaha");
    			return done(null,false,{message : "Not found"});
            }else{
                const compare = bcrypt.compareSync(password, user.password);
                console.log(compare);
                  if (compare === false) {
                    console.log("salah");
                    return done(null,false,{message : "Password salah"});
                 }

                return done(null,user);
            }

    		
    	});
    }
    ));
};