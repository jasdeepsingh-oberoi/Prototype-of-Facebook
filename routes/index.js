
/*
 * GET home page.
 */

var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/rabbit";
var session = require('client-sessions');

exports.index = function(req, res){
  res.render('signin', { title: 'Express' });
};

exports.About = function(req, res){
	var username1 = req.session.username; 
	var password2 = req.session.password;
	
	var coll = mongo.collection('login');

	coll.findOne({username: username1, password:password2}, function(err,user){
		console.log(user);
		if (user){
			
			
			ejs.renderFile('./views/About.ejs', {user: user} ,function(err, result) {
		        // render on success
				
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log("An error occurred");
		            console.log(err);
		        }
		    });

		} else {
			
		    
			ejs.renderFile('./views/fail_login.ejs',function(err, result) {
		        // render on failure
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log(err);
		        }
			});
			
		}
	});

};



exports.Friends=function(req,res)
{
	username1=req.session.username;
	password2=req.session.password;
	var coll = mongo.collection('Friend_Details');
	coll.findOne({username: username1, password:password2}, function(err,user){
		console.log(user);
		if (user){
			
			
			ejs.renderFile('./views/Add_friends.ejs', {user: user} ,function(err, result) {
		        // render on success
				
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log("An error occurred");
		            console.log(err);
		        }
		    });

		} else {
			
			// res.render('Add_friends', { title: 'Express' });
			ejs.renderFile('./views/Add_friends.ejs',function(err, result) {
		        // render on failure
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            //res.end('An error occurred');
		        	res.render('Add_friends', { title: 'Express' });
		        	console.log(err);
		        }
			});
			
		}
	});

	

};

exports.Add_friend=function(req,res)
{
	
	var username1=req.param("username3");
	username=req.session.username;
	password=req.session.password;
	
	var coll = mongo.collection('Friend_Details');
	
	coll.insert({username: username, password:password , friend_username:username1 }, function(err, user){
		console.log(user);
		if (user) {
			// This way subsequent requests will know the user is logged in.
			//req.session.username = user.username;
			//console.log(req.session.username +" is the session");
			//json_responses = {"statusCode" : 200};
			console.log("Friend added successfully");
			//res.send(" Signup Successful");
			//res.send(json_responses);

		} else {
			console.log("returned false");
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
		}
	});


};
		
	  //res.render('About', { title: 'Express' });


exports.Interests=function(req,res)
{
	

	  res.render('Interests', { title: 'Express' });


};

exports.Add_Interests=function(req,res)
{
	
	
	//console.log("Interests added successfully");
	var music1=req.param("music");
	var shows1=req.param("shows");
	var sports1=req.param("sports");
	username=req.session.username;
	password=req.session.password;
	
var coll = mongo.collection('Interest_Details');
	
	coll.insert({username: username, password:password , Music:music1,Shows:shows1,Sports:sports1 }, function(err, user){
		console.log(user);
		if (user) {
			// This way subsequent requests will know the user is logged in.
			//req.session.username = user.username;
			//console.log(req.session.username +" is the session");
			//json_responses = {"statusCode" : 200};
			console.log("Interests added successfully");
			//res.send(" Signup Successful");
			//res.send(json_responses);

		} else {
			console.log("returned false");
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
		}
	});
};


