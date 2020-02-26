# LIRI-Node-App
Node.js Homework Assignment


1.Clearly state the problem the app is trying to solve (i.e. what is it doing and why).

    This app will allow you to do four things:

        1. "spotify-this-song + <your song>"

            Purpose: This command will use the node-spotify-api to search the Spotify database for your song, and return information to you.
            Extra-Technology: node-spotify-api package.

        2. "concert-this + <your artist>"

            Purpose: This command will search the BandsInTown Database for your artist, and return information to you.
            Extra-Technology: axios, moment.js, Bands In Town Artist Events API.

        3. "movie-this + <your movie>"

            Purpose: This command will use the OMDB-api to search for your movie, and return information to you.
            Extra-Technology: axios, OMDB API.

        4. "do-what-it-says"

            Purpose: This command will read a .txt file, use the information in that file, apply it to the command line, and run the command.
            Extra-Technology: dotenv package.


2.Give start-to-finish instructions on how to run the app

    Run this/these commands in your node terminal:

        node liri.js <a || b || c || d> <your choice>
            *** If d, omit <your choice> ***

            a = spotify-this-song
            b = concert-this
            c = movie-this


3.Include screenshots, gifs or videos of the app functioning

    Video Demonstration: https://drive.google.com/file/d/1MWkuWMWUH6F0sVUi3ToRsK_YifhdBxOD/view

    ![Alt text](/img1.png?raw=true "do-what-it-says")
    ![Alt img](/img2.png?raw=true)
    ![Alt img](/img3.png?raw=true)
    ![Alt img](/img4.png?raw=true)


4.Clearly list the technologies used in the app

    javascript, node.js, moment.js, dotenv, axios, fs, node-spotify-package


5.State your role in the app development

    I am the sole developer for this assignment.