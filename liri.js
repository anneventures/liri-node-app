require("dotenv").config();

//import keys.js file stored in variable
var keys = require("./keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

 //pass the config (keys) of Twitter and Spotify applications in keys.js to 'Twitter' and 'Spotify', respectively
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


/*node liri.js my-tweets
This will show your last 20 tweets and when they were created at in your terminal/bash window.*/

var params = {
	count:20,
	exclude_replies:true
}

client.get('statuses/home_timeline', params, function(error, tweets, response){
	if(error) throw error;
	
	console.log(tweets);

	//console.log(response);
});

