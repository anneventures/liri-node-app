require("dotenv").config();


//import keys.js file stored in variable
var keys = require("./keys.js");


//node packages
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//pass the config (keys) of Twitter and Spotify apps in keys.js to 'Twitter' and 'Spotify', respectively
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


//store all arguments in an array
var nodeArgs = process.argv;

var command = "";

// commands: my-tweets, spotify-this-song, movie-this, do-what-it-says

for (var i = 2; i < nodeArgs.length; i++) {
	command = command + " " + nodeArgs[i];
}

console.log("Command: " + command);


//this switch-case will direct which function gets run
// switch(command) {
// 	case "my-tweets":
// 	tweets();
// 	break;

// 	case "spotify-this-song":
//	if else here...
// 	spotify(song);
// 	break;

// 	case "movie-this":
// 	movie(movieName);
//	if else here...
// 	break;

// 	case "do-what-it-says":
// 	random();
// 	break;
// }


/**** node liri.js my-tweets ****/

//function tweets() {};
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


/**** node liri.js spotify-this-song '<song name here>' ****/
//artist(s), song name, preview link, album
//default: 'The Sign' by Ace of Base

function spotify(song) {

	spotify.search({ type: 'track', query: song}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;  //from spotify npm docs
	    }
	    else{
	    var track = data.tracks.items[0];
	    var song = console.log(track.artists[0].name)
	               console.log(track.name)
	               console.log(track.album.name)
	               console.log(track.preview_url)
	    console.log(song);
	    };
	}); //end spotify search

}; //end spotify function


/**** node liri.js movie-this '<movie name here>' ****/
// Title, year, IMDB rating, rotten tomatoes rating, country produced, lang, plot, actors
//default: If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix!

function movie(movieName) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    console.log("Release Year: " + JSON.parse(body).Year);
	    //Title, Year, Actors, Plot, Language, Country, Ratings.imdbRating, Ratings.1
	  }
	});
}; //end movie function