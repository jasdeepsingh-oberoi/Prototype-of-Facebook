var express = require('express')
  , index = require('./routes/index')
  , http = require('http')
 
  , path = require('path');
  var session=require('client-sessions');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/rabbit";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var login = require("./routes/login");


var app = express();

app.configure(function(){

	app.use(session({
			
			cookieName:'session',
			secret:'cmpe273_test_string',
			duration:30*60*1000,
			activeDuration: 5 * 60 * 1000, }));

	


		// all environments
app.set('port', process.env.PORT || 4600);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);

app.post('/signup',login.signup);
app.post('/signin',login.checkLogin);

app.get('/About',index.About);
app.get('/Friends',index.Friends);
app.get('/Add_friend',index.Add_friend);
app.get('/Interests',index.Interests);
app.post('/Add_Interests',index.Add_Interests);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
