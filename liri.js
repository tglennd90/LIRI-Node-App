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

  if (songName === "") {
    songName = "Wham Bam Shang-A-Lang";
  }

  spotify.search({ type: 'track', query: songName, limit: 1 })
  .then(function(response) {
    console.log("Artist: " + response.tracks.items[0].artists[0].name);
    console.log("Song Title: " + response.tracks.items[0].name);
    console.log("Preview: " + response.tracks.items[0].external_urls.spotify);
    console.log("Album: " + response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log("x");
  });

};

// Function for concert search
var getMyBands = function(artist) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(

    function(response) {

      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }


      console.log("Upcoming concerts for " + artist + ":");
      console.log(" ");

      for (let i = 0; i < 4; i++) {
        var name = jsonData[i].venue.name;
        var location = jsonData[i].venue.city + ", " + jsonData[i].venue.region;
        var date = jsonData[i].datetime;

        var newDate = moment(date).format("MM/DD/YYYY")

        console.log("Venue: " + name);
        console.log("Venue Location: " + location);
        console.log("Event Date: " + newDate);
        console.log("===================");
      }
    }).catch(function(err) {
      console.log("No results found. " + artist);
    });

};

// Function for running a Movie Search
var getMeMovie = function(movieName) {
    
  if (movieName === "") {
    movieName = "The Mask";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(urlHit).then(
    function(response) {
      var jsonData = response.data;

      console.log("Movie Title: " + jsonData.Title)
      console.log("Release Year: " + jsonData.Year)
      console.log("IMDB Rating: " + jsonData.Ratings[0].Value)
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value)
      console.log("Produced in: " + jsonData.Country)
      console.log("Language: " + jsonData.Language)
      console.log("Plot: " + jsonData.Plot)
      console.log("Actors: " + jsonData.Actors)
    }
  ).catch(function(err) {
    console.log("x");
  });

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
        getMyBands(commandData);
        break;
      case 'movie-this':
        getMeMovie(commandData);
        break;
      case 'do-what-it-says':
        doWhatItSays();
        break;
      default:
        console.log("Try again Mr. Anderson.");
    }
 
};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));
