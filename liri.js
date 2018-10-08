// read and set any environment variables with the dotenv package
require("dotenv").config();

// grab request package
var request = require("request");

// grab fs package to handle read/write.
var fs = require("fs");

var programToRun = process.argv[2];

var song = process.argv[3]; // will use with spotify-this-song command

var movie = process.argv[3]; // will use with movie-this command

var artist = process.argv[3]; // will use with concert-this command

var keys = require("./keys")

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

/// If else statements that returns data for valid commands
  // Spotify
if (programToRun === "spotify-this-song") {
  spotifyThisSong(song);

  // OMDB
} else if (programToRun === "movie-this") {
  movieThis(movie)

  // BandsInTown
} else if (programToRun === "concert-this") {
  concertThis(artist)

  // DoWhatItSays
} else if (programToRun === "do-what-it-says") {
  doWhatItSays()

} else {
  console.log("err, did not understand command")
};
/// end of If/Else statement 


/// ## FUNCTIONS ## ///

// function to retrieve song information from the Spotify API //
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
Preview the song here: ${data.tracks.items[0].preview_url}`

    // Store "ace of base" info into variable 
    var aceBase = `

SONG DATA
Artist: ${data.tracks.items[19].artists[0].name}
Song name: ${data.tracks.items[19].name}
Album name: ${data.tracks.items[19].album.name}
Preview the song here: ${data.tracks.items[19].preview_url}`

    // If valid song is input, console log and append to log.txt
    if (song) {
      console.log(songData);
      fs.appendFile("log.txt", songData, function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log("content added to log.txt")
        }
      });

      // If no song is provided then program will default to "The Sign" by Ace of Base.
    } else {
      console.log(aceBase)
      fs.appendFile("log.txt", aceBase, function (err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log("content added to log.txt")
        }
      });
    };

  });
}

function movieThis(movie) {
  if (movie) {
    movie = movie
  } else {
    movie = "Mr. Nobody"
  }
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (error) {
      return console.error(error);
    }

    var movieData = `

MOVIE DATA
Title: ${JSON.parse(body).Title}
Release year: ${JSON.parse(body).Year}
IMDB rating: ${JSON.parse(body).imdbRating}
Rotten Tomatoes score: ${JSON.parse(body).Ratings[1].Value}
Country(ies) where movie was produced: ${JSON.parse(body).Country}
Language: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}`

    // If valid song is input, console log and append to log.txt
    if (movie) {
      console.log(movieData);
      fs.appendFile("log.txt", movieData, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("content added to log.txt")
        }
      });
    }


  });
}

function concertThis(artist) {
  if (artist) {
    artist = artist;
  } else {
    artist = "Drake";
  }
  console.log(artist)
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
    if (error) {
      console.log(error);
    }

    // Store concert data into variable
    var concertData = `

CONCERT DATA
Artist(s): ${JSON.parse(body)[0].lineup}
Venue: ${JSON.parse(body)[0].venue.name}
Venue location: ${JSON.parse(body)[0].venue.city}, ${JSON.parse(body)[0].venue.region}, ${JSON.parse(body)[0].venue.country}
Date of event:  ${JSON.parse(body)[0].datetime}`

    // If valid song is input, console log and append to log.txt
    if (artist) {
      console.log(concertData);
      fs.appendFile("log.txt", concertData, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("content added to log.txt")
        }
      });
    }

  });
}

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