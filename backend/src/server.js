//PACKAGES
const express = require("express");
const bodyParser = require("body-parser");

//GLOBAL VARIABLES
const SERVER = express();
const SPOTIFY_ROUTER = express.Router();

//FUNCTIONS
SERVER.use(bodyParser.json());
SERVER.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

SPOTIFY_ROUTER.route("/").get(async (req, res) => {
    res.status(200).send();
});

SERVER.get("/", async (req, res) => {
    res.status(200).send({
        name: "BOOGIE API",
        description:
            "Boogie takes being the DJ to the next level. Our multiple-service integration brings everyone in control, and our voting system gives everyone a voice. The unique visuals enhance the experience. Sharing music has never been easier with our user-friendly interface.",
        year: 2022,
        author: "Gauthier Bossuyt",
    });
});

SERVER.use("/spotify", SPOTIFY_ROUTER);

module.exports = SERVER;
