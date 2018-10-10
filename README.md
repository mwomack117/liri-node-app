# liri-node-app
**LIRI** (*_Language_ Interpretation and Recognition Interface*) will be a command line node app that takes in parameters and gives you back data. 

##### Why is LIRI useful?
  * Let's user easily retrieve information about a movie they like.
  * Let's user search a song title and get back artist and album details.
  * Let's user find out where and when there favorite artist is performing next.
  * And liri can also automatically log all the user's searches to a text file.

## How it works
### liri can take in the following commands:
   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`
  * This will search the Bands in Town Artist Events API and return the following info in terminal window:
  
    * Name of the venue

    * Venue location

    * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`
  * This utilize spotify API and show the following info about the song in your terminal/bash window:

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
3. `node liri.js movie-this '<movie name here>'`

   * This utilize OMDB API and show the following info in your terminal/bash window:

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
   
4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this
     
###### Using `fs` package, in addition to logging data to the terminal window each command will also append the data to the `log.txt` file. File will not be overwritten each time a command is run.

