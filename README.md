# liri-node-app
LIRI (Language Interpretation and Recognition Interfaces) will be a command line node app that takes in parameters and gives you back data.

The acceptable commands liri.js takes in are: 
   
   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
   
### What each comman should do

1. `node liri.js concert-this <artist/band name here>`
  * searches Bands In Town Artist Events API and returns: 
    
     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`
  * Searches spotify API and will show the following information about the song in your terminal/bash window
  
  ```
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
   ```
   
     * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    
