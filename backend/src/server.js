//PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//ROUTING FILES
const spotify = require("./spotify");

//GLOBAL VARIABLES
const SERVER = express();
const LOGIN_ROUTER = express.Router();

//FUNCTIONS
SERVER.use(cors());
SERVER.use(bodyParser.json());
SERVER.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

LOGIN_ROUTER.route("/spotify").post(spotify.spotify_login);

SERVER.get("/", (req, res) => {
    res.status(200).send({
        name: "BOOGIE API",
        description:
            "Boogie takes being the DJ to the next level. Our multiple-service integration brings everyone in control, and our voting system gives everyone a voice. The unique visuals enhance the experience. Sharing music has never been easier with our user-friendly interface.",
        year: 2022,
        author: "Gauthier Bossuyt",
    });
});

SERVER.use("/login", LOGIN_ROUTER);

module.exports = SERVER;
