require("dotenv").config();


//import keys.js file stored in variable
var keys = require("./keys.js");


//node packages
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//pass the config (keys) of Twitter and Spotify apps in keys.js to 'Twitter' and 'Spotify', respectively
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//store all arguments in an array
var nodeArgs = process.argv;

var command = "";

// commands: my-tweets, spotify-this-song, movie-this, do-what-it-says

for (var i = 2; i < nodeArgs.length; i++) {
	command = command + " " + nodeArgs[i];
}

console.log("Command: " + command);


/**** node liri.js my-tweets ****/

if (command.includes("my-tweets")) {

	var params = {
		count:20,
		exclude_replies:true
	}

	client.get('statuses/home_timeline', params, function(error, tweets){
		if(error) throw error;
		
		console.log(tweets);

	});
}




//this switch-case will direct which function gets run
// switch(command) {
// 	case "my-tweets":
// 	tweets();
// 	break;

// 	case "spotify":
// 	spotify();
// 	break;

// 	case "movie":
// 	movie();
// 	break;

// 	case "random":
// 	random();
// 	break;
// }