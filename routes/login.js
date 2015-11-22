/**
 * New node file
 */
var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/rabbit";
var session = require('client-sessions');


exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.param("username"); 
	var password = req.param("password");
	console.log(password +" is the object");
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		
		//from session
		var msg_payload = { "username": username, "password": password };
		console.log("In POST Request = UserName:"+ username+ " Password " +password);
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				throw err;
			}
		
		});
		
	
		
		var coll = mongo.collection('login');

		coll.findOne({username: username, password:password}, function(err,user){
			console.log(user);
			if (username){
			req.session.username= username;
			req.session.password= password;
				
				ejs.renderFile('./views/success_login.ejs', {user: user} ,function(err, result) {
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
	});

	


	};


exports.signup = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.param("username"); 
	var password = req.param("password");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var dob = req.param("dob");
	var gender = req.param("gender");
	
	console.log(password +" is the object");
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.insert({username: username, password:password , firstname:firstname, lastname:lastname ,dob:dob, gender:gender }, function(err, user){
			console.log(user);
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.username = user.username;
				//console.log(req.session.username +" is the session");
				//json_responses = {"statusCode" : 200};
				res.send(" Signup Successful");
				//res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};




//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

