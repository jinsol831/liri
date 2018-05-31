require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys");
var fs = require("fs");



var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var userInput = process.argv[2];

switch(userInput){
    case 'my-tweets':
    getTweets();
    break;
    case 'spotify-this-song':
    spotifySong(process.argv[3]);
    break;
    case 'movie-this':
    movieThis(process.argv[3]);
    break;
    case 'do-what-it-says':
    doWhatItSays();
    break;
} 



function getTweets () {
    var params = {screen_name: 'jennyjwon',count:20};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {       
        if (!error) {
            for(var i = 0; i < tweets.length; i++) {
                console.log("\n------------------------------------------------------");
                console.log("\n--------------------TWEET TWEET-------------------------\n");
                console.log(tweets[i].text);    
            } 
        }
    });
 
}

function spotifySong (argv) {
    if (argv === undefined) {
        argv = "Skinny Love";
    }

    spotify.search({ type: 'track', query: argv, limit:1 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
        console.log("\n------------------------------------------------------");
        console.log("\n--------------------Spotify---------------------------\n")
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].name)+ "\nSong Name: " + JSON.stringify(data.tracks.items[0].name)
        +"\nPreview Link: " + JSON.stringify(data.tracks.items[0].preview_url)+"\nAlbum: " + JSON.stringify(data.tracks.items[0].album.name)); 
    });
 
}

function movieThis (movie) {
    if (movie === undefined) {
        movie = "Mr. Nobody";
    }

    var movieURL = "http://www.omdbapi.com/?t="+ movie +"&apikey=trilogy";
    request(movieURL, function (error, response, body) {
        var parseBody = JSON.parse(body);
        console.log("\n------------------------------------------------------");
        console.log("\n--------------------MOVIE RESULTS---------------------\n");
        console.log("Title of Movie: " + parseBody.Title + "\nYear Released: " + parseBody.Released + "\nIMBD Rating: " + parseBody.imdbRating
        + "\nRotten Tomatoes Rating: " + parseBody.Ratings[1].Value+ "\nCountry Produced: " + parseBody.Country + "\nLanguage: " + parseBody.Language
        + "\nPlot: " + parseBody.Plot + "\nActors: " + parseBody.Actors);
    });
};


function doWhatItSays () {
    
    fs.readFile("random.txt","utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }  
        var dataArr = data.split(",");   
        
        spotifyThisSong(dataArr[1]);
    });
}

// require("dotenv").config();

// var keys = require('./keys');
// var Twitter = require('twitter');
// var SpotifyWebApi = require('spotify-web-api-node');

// // var spotify = new Spotify(keys.spotify);

// var client = new Twitter(keys.twitter);

// switch(process.argv[2]) {
//     case "my-tweets":
//         getTweet();
//         break;

//     case "spotify-this-song":
//         console.log("spotify-this-song")
//         break;

//     case "movie-this":
//         console.log("movie-this")
//         break;     

//     case "do-what-it-says":
//         console.log("do-what-it-says")
//         break;
    
//     default:
//         console.log("Try again");   
// }

// function getTweet () {
//     client.get('favorites/list', function(error, tweets, response) {
//         if(error) throw error;
//         console.log(tweets);  // The favorites.
//         // console.log(response);  // Raw response object.
//       });
    
// };
    



