require("dotenv").config();

var spotify = new Spotify(keys.spotify);

var request = require(request);

var choice = process.argv[2];

switch(choice){
    case concert-this: 
                    console.log("concert-this")
                    break;
    case spotify-this-song:
                    console.log("spotify this song")
                    break;
    case movie-this:
                    console.log("movie-this")
                    break;
    // case do-what-it-says:
    //                 console.log("do-what-it-says")
    //                 break;
    default:
        console.log("Please use commands concert-this, spotify-this-song, movie-this or do-what-it-says")
        
}