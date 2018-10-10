// read and set any environment variables with the dotenv package
require("dotenv").config();

var request = require("request"); // grab request package

var fs = require("fs"); // grab fs package to handle read/write.

var moment = require('moment'); // grab moment package 

var programToRun = process.argv[2]; // variable for liri command

var action = process.argv[3]; // what user searches for

var keys = require("./keys") // grab spotify keys

var Spotify = require('node-spotify-api'); // grab node-spotify-api package

var spotify = new Spotify(keys.spotify); // access spotify keys 

var omdb = keys.omdb.id; // access omdb api
var bands = keys.bandsInTown.id; // access bandInTown api

// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


/// If else statements that returns data for valid commands

  // Spotify
if (programToRun === "spotify-this-song") {
  spotifyThisSong(action);

  // OMDB
} else if (programToRun === "movie-this") {
  movieThis(action)

  // BandsInTown
} else if (programToRun === "concert-this") {
  concertThis(action)

  // DoWhatItSays
} else if (programToRun === "do-what-it-says") {
  doWhatItSays()

} else {
  console.log("err, did not understand command")
};

/// end of If/Else statement 


/// ## FUNCTIONS ## ///

// function to retrieve song information from the Spotify API 
function spotifyThisSong(song) {
  if (song) {
    var query = song
  }
  else {
    var query = "The Sign"
  }
  spotify.search({ type: 'track', query: query }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // Store all the song info we want into a variable
    var songData = `
        
SONG DATA
Artist: ${data.tracks.items[0].artists[0].name}
Song name: ${data.tracks.items[0].name}
Album name: ${data.tracks.items[0].album.name}
Preview the song here: ${data.tracks.items[0].preview_url}
*Command used: "spotify-this-song"
`

    // Store "ace of base" info into variable 
    var aceBase = `

SONG DATA
Artist: ${data.tracks.items[19].artists[0].name}
Song name: ${data.tracks.items[19].name}
Album name: ${data.tracks.items[19].album.name}
Preview the song here: ${data.tracks.items[19].preview_url}
*Command used: "spotify-this-song"
`

    // If valid song is input, console log and append to log.txt
    if (song) {
      console.log(songData);
      fs.appendFile("log.txt", songData, function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log("content saved to log.txt")
        }
      });

      // If no song is provided then program will default to "The Sign" by Ace of Base.
    } else {
      console.log(aceBase)
      fs.appendFile("log.txt", aceBase, function (err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log("content saved to log.txt")
        }
      });
    };

  });
}

// Function to retrieve movie data form OMDB API
function movieThis(movie) {
  if (movie) {
    movie = movie
  } else {
    movie = "Mr. Nobody"
  }
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + omdb, function (error, response, body) {
    if (error) {
      return console.error(error);
    }

    // Store movie data into variable
    var movieData = `

MOVIE DATA
Title: ${JSON.parse(body).Title}
Release year: ${JSON.parse(body).Year}
IMDB rating: ${JSON.parse(body).imdbRating}
Rotten Tomatoes score: ${JSON.parse(body).Ratings[1].Value}
Country(ies) where movie was produced: ${JSON.parse(body).Country}
Language: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}
*Command used: "movie-this"
`

    // If valid song is input, console log and append to log.txt
    if (movie) {
      console.log(movieData);
      fs.appendFile("log.txt", movieData, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("content saved to log.txt")
        }
      });
    }


  });
}

// Functions to retrieve data form BANDS IN TOWN API
function concertThis(artist) {
  if (artist) {
    artist = artist;
  } else {
    artist = "Drake";
  }
  console.log(artist)
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bands, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    
    // Store concert data into variable
    var concertData = `
    
CONCERT DATA
Artist(s): ${JSON.parse(body)[0].lineup}
Venue: ${JSON.parse(body)[0].venue.name}
Venue location: ${JSON.parse(body)[0].venue.city}, ${JSON.parse(body)[0].venue.region}, ${JSON.parse(body)[0].venue.country}
Date of event:  ${moment(JSON.parse(body)[0].datetime).format('L')}
*Command used: "concert-this"
`

    // If valid song is input, console log and append to log.txt
    if (artist) {
      console.log(concertData);
      fs.appendFile("log.txt", concertData, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("content saved to log.txt")
        }
      });
    }

  });
}

// Function: do what it says 
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    var array = data.split(",");

    var command = array[0];

    if (command === "spotify-this-song") {
      spotifyThisSong(array[1]);
    } else if (command === "movie-this") {
      movieThis(array[1]);
    } else if (command === "concert-this") {
      concertThis(array[1]);
    } else {
      console.log("Enter valid command")
    }
  })
};