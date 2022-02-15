//PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const { database } = require("./database.js");

//GLOBAL VARIABLES
const SERVER = express();
const ROOM_ROUTER = express.Router();

//FUNCTIONS
SERVER.use(bodyParser.json());
SERVER.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

ROOM_ROUTER.route("/")

    .get(async (req, res) => {
        if (req.body.code) {
            let result = await database.getRoom(req.body.code);
            if (result > 0) {
                res.status(200).send({ room: result[0] });
            } else {
                res.status(404).send({ message: "Room not found!" });
            }
        }
        res.status(400).send({
            message: "A code is necessary to join the room!",
        });
    })

    .delete(async (req, res) => {})

    .post(async (req, res) => {});

SERVER.get("/", async (req, res) => {
    res.status(200).send({
        Name: "BOOGIE DATABASE API",
        Description:
            "Boogie takes being the DJ to the next level. Our multiple-service integration brings everyone in control, and our voting system gives everyone a voice. The unique visuals enhance the experience. Sharing music has never been easier with our user-friendly interface.",
        Year: 2022,
        Author: "Gauthier Bossuyt",
    });
});

SERVER.use("/rooms", ROOM_ROUTER);
module.exports = SERVER;
