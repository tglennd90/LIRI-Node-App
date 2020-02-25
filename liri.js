// DEPENDENCIES
// =====================================

// Read and set environment variables
require("dotenv").config();

// Import the API keys
var keys = require("./keys.js");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the axios npm package.
var axios = require("axios");

// Import the moment npm package.
var moment = require("moment");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// FUNCTIONS
// =====================================

// Function for running a Spotify search
var getMeSpotify = function(songName) {

  if (songName === undefined) {
    songName = "Wham Bam Shang-A-Lang";
  }

  spotify.search({ type: 'track', query: songName, limit: 1 })
  .then(function(response) {
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name);
    console.log(response.tracks.items[0].external_urls.spotify);
    console.log(response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });

};

// Function for concert search
var getConcertList = function(artist) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function(response) {
      for (let i = 0; i < 4; i++) {
        var name = response.data[i].venue.name;
        var location = response.data[i].venue.city + ", " + response.data[i].venue.region;
        var date = response.data[i].datetime;

        var newDate = moment(date).format("MM/DD/YYYY")

        console.log(name);
        console.log(location);
        console.log(newDate);
        console.log("===================");
      }
    })

};

// Function for running a Movie Search
var getMeMovie = function(movieName) {
    
  if (movieName === undefined) {
    movieName = "The Mask";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(urlHit).then(
    function(response) {
      var jsonData = response.data;

      console.log(jsonData.Title)
      console.log(jsonData.Year)
      console.log(jsonData.Ratings[0].Value)
      console.log(jsonData.Ratings[1].Value)
      console.log(jsonData.Country)
      console.log(jsonData.Language)
      console.log(jsonData.Plot)
      console.log(jsonData.Actors)
    }
  );

};

// Function for running a command based on text file
var doWhatItSays = function() {

  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data)

    var dataArr = data.split(",");
    
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });

};

// Function for determining which command is executed
var pick = function(command, commandData) {

    switch(command) {
      case 'spotify-this-song':
        getMeSpotify(commandData);
        break;
      case 'concert-this':
        getConcertList(commandData);
        break;
      case 'movie-this':
        getMeMovie(commandData);
        break;
      case 'do-what-it-says':
        doWhatItSays();
        break;
      default:
        console.log("Woah man, somethin' aint right here");
    }
 
};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));
