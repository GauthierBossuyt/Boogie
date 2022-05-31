//PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { database } = require("./database.js");
const spotify = require("./routes/spotify.js");

//GLOBAL VARIABLES
const SERVER = express();
const ROOM_ROUTER = express.Router();
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

ROOM_ROUTER.route("/")

  .get(async (req, res) => {
    console.log(req.query.code);
    if (req.query.code) {
      let result = await database.getRoom(req.query.code);
      if (result.length > 0) {
        res.status(200).send({ room: result[0] });
      } else {
        res.status(404).send({ message: "Room not found!" });
      }
    } else {
      res.status(400).send({
        message: "A code is necessary to join a room!",
      });
    }
  })

  .delete(async (req, res) => {
    if (req.body.code) {
      if (await database.removeRoom(req.body.code)) {
        res.status(200).send({
          message: "Room has been deleted succesfully!",
        });
      } else {
        res.status(404).send({
          message: `A room couldn't be found with this code.`,
        });
      }
    } else {
      res.status(400).send({
        message: "A code is necessary to delete a room!",
      });
    }
  })

  .post(async (req, res) => {
    if (req.body.room) {
      if (
        req.body.room.name &&
        req.body.room.description &&
        req.body.room.service &&
        req.body.room.host
      ) {
        let result = await database.addRoom(req.body.room);
        if (result === false) {
          res.status(404).send({
            ERROR: `The credentials given are incorrect!`,
          });
        } else {
          res.status(200).send({ room: result });
        }
      } else {
        res.status(400).send({
          ERROR: "All credentials to make a room should be given!",
        });
      }
    } else {
      res.status(400).send({ ERROR: "Credentials must be given!" });
    }
  });

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
SERVER.use("/login", LOGIN_ROUTER);
module.exports = SERVER;
