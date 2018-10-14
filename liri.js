

require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var moment = require("moment")


// console.log(keys.spotify)



var choice = process.argv[2];

if(choice == "concert-this"){
    var artist = "";
    for(let i = 3; process.argv[i];i++){
       
        if(i < process.argv.length-1){
        artist += process.argv[i] +"%20"; 
        }
        else{
            artist += process.argv[i];
        }
    }
    myConcert(artist);
}

else if(choice == "spotify-this-song"){
    var userQueryTrack = "";
    
    for(let i = 3; process.argv[i];i++){
        if(i < process.argv.length-1){
        userQueryTrack += process.argv[i] +"%20"; 
        }
        else{
        userQueryTrack += process.argv[i];
        }
    }
    mySpotify(userQueryTrack);
}

else if(choice == "movie-this"){
    var movieName = "";
    if (!process.argv[3]){
        movieName = "Mr. Nobody";
    }else{
    for(let i = 3; process.argv[i];i++){
        movieName+= process.argv[i] + " ";
       
    }
}
myOmdb(movieName);
}
else if(choice == "do-what-it-says"){

    var fs = require("fs");
    fs.readFile("random.txt","utf8",function(error, data){
        if(error){
            return console.log("error");

        }
        dataArr = data.split(",")
        dataArrCmd = dataArr[0];
        dataArrItem= dataArr[1];
        console.log(dataArr);
        console.log(dataArrCmd)
        console.log(dataArrItem);
        if(dataArrCmd == "spotify-this-song"){
            mySpotify(dataArrItem);
        }
        else if (dataArrCmd == "movie-this"){
            myOmdb(dataArrItem);
            console.log("movie-this command used");
        }
        else if (dataArrCmd == "concert-this"){
            myConcert(dataArrItem);

            console.log("concert-this command used")
        }
        

    });

    console.log("do-what-it-says")
}else{    
        console.log("Please use commands concert-this, spotify-this-song, movie-this or do-what-it-says")
}  


//functions below
//my spotify function
function mySpotify(userQueryTrack){
    var Spotify = require("node-spotify-api")
    var spotify = new Spotify(keys.spotify);
   
    spotify.search({type: "track", query: userQueryTrack, limit: 1},function(err, data){
        if(err){
            console.log("an error occured: " + err);
        }
        let artist = data.tracks.items[0].artists[0].name
        console.log("The artist is: "+ artist);
        console.log("The song title is: " +data.tracks.items[0].name)
        console.log(data.tracks.items[0].href)
        console.log(data.tracks.items[0].album.name)
    })
}

// My Concert function
function myConcert(artist){
    let queryUrlBIT = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
    request(queryUrlBIT, function(error, response, body){
        
        if(!error && response.statusCode == 200){
            let dataBIT = JSON.parse(body);            
            
            for(let data in dataBIT){
                let date = dataBIT[data].datetime;
                let momentDate = moment(date);

                console.log("")
                console.log("Venue is: " +dataBIT[data].venue.name);
                if(dataBIT[data].venue.region != ""){
                console.log("Venue Location is: " + dataBIT[data].venue.city+", "+dataBIT[data].venue.region)
            }else{
                console.log("Venue Location is: " + dataBIT[data].venue.city+", "+dataBIT[data].venue.country)
            }
                console.log(momentDate.format("MM/DD/YYYY"));
        }
    }
    })
}


// my Omdb function 
function myOmdb (movieName){
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // var request = require("request");

    request(queryUrl, function(error, response, body){
        if(!error && response.statusCode==200){
            let data = JSON.parse(body);
            // console.log(data)
            // console.log(movieName)
            console.log("Title: " +data.Title);
            console.log("Released: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            if(!data.Ratings[2]){
                console.log("Not rated by Rotten Tomatoes")
            }else{
                console.log("Rotten Tomatoes Rating: " + data.Ratings[2].Value);
            }
            console.log("Country Produced in: " + data.Country);
            console.log("Movie Langauge: " + data.Langauge);
            console.log("The movie Plot is: " + data.Plot);
            console.log("Actors include: " + data.Actors);
        
        }
        else
        {
            console.log("something is not right")
        }
    })    
}