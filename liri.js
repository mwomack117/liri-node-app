require("dotenv").config();

var keys = require("./keys")

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var programToRun = process.argv[2];
var action = process.argv[3];

// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

if (programToRun === "spotify-this-song") {
    spotifyThisSong(action);
} else if (programToRun === "movie-this") {
    movieThis();
} else if (programToRun === "do-what-it-says") {
    doWhatitSays()
} else if (programToRun === "concert-this") {
    concertThis()
} else {
    console.log("err, did not understand command")
};


// function to retrieve song information from the Spotify API //
function spotifyThisSong(song) {
    if (song) {
        var query = song
    }
    else {
        var query = "The Sign"
    }
    spotify.search({ type: 'track', query: query, }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        if (query === song) {

            //      Artist(s) 
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);

            //      * The song's name
            console.log(`Song name: ${data.tracks.items[0].name}`);

            //      * The album that the song is from
            console.log(`Album name: ${data.tracks.items[0].album.name}`);

            //      * A preview link of the song from Spotify
            console.log(`Preview the song here: ${data.tracks.items[0].preview_url}`);

            //    * If no song is provided then your program will default to "The Sign" by Ace of Base.
        } else {
            console.log(`Artist: ${data.tracks.items[19].artists[0].name}`);
            console.log(`Song name: ${data.tracks.items[19].name}`);
            console.log(`Album name: ${data.tracks.items[19].album.name}`);
            console.log(`Preview the song here: ${data.tracks.items[19].preview_url}`);
        }

    });
}




function movieThis() {
    console.log("movie-this");
}

function doWhatitSays() {
    console.log("running program");
}

function concertThis() {
    console.log()
}
