require("dotenv").config();

var keys = require("./keys.js");

//node packages
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//take out first and second array index
process.argv.shift();
process.argv.shift();

//set array placement of command and song/movie titles
var command = process.argv[0];
var songTitle = JSON.stringify(process.argv[1]);
var movieTitle = process.argv[1];


switch(command) {
	case "my-tweets":
		tweets();
	break;

	case "spotify-this-song":
		if (songTitle) {
			spotifySong(songTitle);
		} else {
			spotifySong("The Sign"); //needs to be Ace of Base artist
		}
	break;

	case "movie-this":
		if (movieTitle) {
			movie(movieTitle)
		} else {
			console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix!");
		}
	break;

	case "do-what-it-says":
		random();
	break;
}


/**** node liri.js my-tweets ****/
function tweets() {

	var params = {
		count:20,
		exclude_replies:true
	}

	client.get('statuses/home_timeline', params, function(error, tweets){
		if(error) throw error;
		
		console.log(tweets);

	});
};


/**** node liri.js spotify-this-song '<song name here>' ****/
//artist(s), song name, preview link, album
//default: 'The Sign' by Ace of Base
function spotifySong(songTitle) {

	spotify.search({ type: 'track', query: songTitle}, function(err, data) {
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
	});

};


/**** node liri.js movie-this '<movie name here>' ****/
// Title, year, IMDB rating, rotten tomatoes rating, country produced, lang, plot, actors
//default: If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix!
function movie(movieTitle) {

	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {
	  	var parse = JSON.parse(body);
	  	var title = parse.Title;
	  	var year = parse.Year;
	  	var actors = parse.Actors;
	  	var plot = parse.Plot;
	  	var lang = parse.Language;
	  	var country = parse.Country;
	  	var imdbRating = parse.imdbRating;
	  	var rating = parse.Ratings[1].Value;
	  	console.log("Title: " + title + "\n" + "Year: " + year + "\n" + "Actors: " + actors + "\n" + "Plot: " + plot + "\n" + "Language: " + lang + "\n" + "Country: " + country + "\n" + "IMDB Rating: " + imdbRating + "\n" + "Rotten Tomatoes Rating: " + JSON.stringify(rating));
	  }
	});
};

function random() {
	fs.readFile("random.txt", "utf8", function(error,data) {
		if(error) {
			return console.log(error);
		}

		var dataArr = data.split(",");
		var data = dataArr[1];
		spotifySong(data);
	});
}