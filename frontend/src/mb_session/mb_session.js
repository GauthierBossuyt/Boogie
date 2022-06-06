import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import io from "socket.io-client";
import "./mb_session.css";

import Nav from "./mb_navigation/mb_nav";
import Control from "./mb_Control/mb_control";
import ControlMember from "./mb_Control/mb_controlMember";
import Notification from "../session/notification/notification";
import Info from "../mb_session/mb_Info/mb_info";
import Search from "./mb_search/mb_search";
import Settings from "./mb_settings/mb_settings";
import Queue from "./mb_Queue/mb_queue";
import Result from "./mb_result/mb_result";
import Voting from "./mb_voting/mb_voting";
import Popup from "../session/popup/popup";

const spotifyApi = new SpotifyWebApi({
  clientId: "acce0f858d36481e8c57ced906643960",
});

const socket = io("http://localhost:8080", { autoConnect: false });

const Mb_Session = () => {
  //Getting data out of url
  const location = useLocation();
  const navigate = useNavigate();

  //Saving data from url
  const [accessToken, setToken] = useState();
  const [sessionCode, setSessionCode] = useState();
  const [service, setService] = useState();
  //User is host
  const [isHost, set_isHost] = useState(false);
  //Current active Content page
  const [content, setContent] = useState("voting");
  //Storing playlists for search page
  const [playlists, setPlaylists] = useState([]);
  //Storing result data for result page
  const [resultData, setResultData] = useState({ type: "", data: "" });
  const [results, setResults] = useState({ tracks: [], type: "", name: "" });
  //Toggle if the voting is active or not
  const [voting, setVoting] = useState(false);
  const [votingData, setVotingData] = useState([]);
  const [userVoted, setUserVoted] = useState(false);
  //Settings data for settings page
  const [settingsData, setSettingsData] = useState(null);
  //Queue data for queue page
  const [queueData, setQueueData] = useState(null);
  //Notification data for notification
  const [notification_data, setNotificationData] = useState("");
  //Current Song data for control
  const [currentSongData, setCurrentSongData] = useState();
  //search data for ban song results
  const [banSearchData, setBanSearchData] = useState([]);
  //Show leave popup
  const [showLeavePopup, setLeavePopUp] = useState(false);

  useEffect(() => {
    if (location.state) {
      if (
        location.state.accessToken &&
        location.state.sessionCode &&
        location.state.service
      ) {
        setToken(location.state.accessToken);
        setSessionCode(location.state.sessionCode);
        setService(location.state.service);
        if (accessToken !== undefined) {
          spotifyApi.setAccessToken(accessToken);
          spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
          });
        }
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [location.state, navigate, accessToken, sessionCode, service]);

  useEffect(() => {
    if (resultData.type === "playlist") {
      spotifyApi.getPlaylist(resultData.data.id).then((data) => {
        setResults({
          tracks: data.body.tracks.items,
          type: "playlist",
          name: data.body.name,
        });
      });
    } else if (resultData.type === "search") {
      spotifyApi
        .search(resultData.data, ["track"], { limit: 20 })
        .then((data) => {
          setResults({
            tracks: data.body.tracks.items,
            type: "search",
            name: resultData.data,
          });
        });
    }
  }, [resultData]);

  useEffect(() => {
    if (sessionCode !== undefined) {
      if (!socket.connected) {
        socket.connect();

        const joinSession = async () => {
          const data = await spotifyApi.getMe();
          socket.emit("join", sessionCode, data.body);
          return data.body;
        };

        joinSession();

        socket.on("activate host mode", () => {
          set_isHost(true);
        });

        socket.on("person joined", (data, name) => {
          setNotificationData(`${name} has joined the room!`);
          setQueueData(data.queue);
          setVotingData(data.voting);
        });

        socket.on("room info", (data) => {
          console.log(data);
          setSettingsData(data);
        });

        socket.on("successfully added song to queue", async (id) => {
          let song_details = await spotifyApi.getTrack(id);
          setNotificationData(
            `${song_details.body.name} has been added to queue`
          );
        });

        socket.on("send queue", async (data) => {
          setQueueData(data);
          setContent("queue");
        });

        socket.on("start voting", (boolean, data) => {
          setVoting(boolean);
          setUserVoted(false);
          if (boolean) {
            setVotingData(data);
            setNotificationData(`A new voting session has started!`);
          } else {
            setVotingData([]);
            setNotificationData(
              `The voting session has been skipped, due to a lack of songs in the queue!`
            );
          }
        });

        socket.on("add song to queue", async (data) => {
          let song_details = await spotifyApi.getTrack(data.id);
          setNotificationData(`${song_details.body.name} will be played next!`);
          spotifyApi.addToQueue(data.uri);
          socket.emit("Successfully added song to queue", sessionCode, data);
        });

        socket.on("display message", (txt) => {
          setNotificationData(txt);
        });

        socket.on("succesfully voted on song", async (data) => {
          setUserVoted(true);
        });

        socket.on("someone voted on a song", async (data) => {
          setVotingData(data.voting);
        });

        socket.on("new song being played", (data) => {
          setCurrentSongData(data);
        });

        socket.on("requested current song data", (data) => {
          console.log(data);
          setCurrentSongData(data);
        });

        socket.on("get current song playing data", async (id) => {
          let data = await spotifyApi.getMyCurrentPlaybackState();
          socket.emit("current song data", sessionCode, data.body, id);
        });

        socket.on("update settings", (data) => {
          setSettingsData(data);
        });

        socket.on("force leave", () => {
          socket.disconnect();
          navigate("/login");
        });

        return () => {
          socket.disconnect();
        };
      }
    }
  }, [sessionCode]);

  useEffect(() => {
    setBanSearchData([]);
  }, [content]);

  function showRoomDetails() {
    socket.emit("room status", sessionCode);
  }

  function searchResult(e, type, value) {
    if (e.key === "Enter" || e.type === "click") {
      console.log(type, value);
      setResultData({ type: type, data: value });
      setContent("result");
    }
  }

  function addToQueue(object) {
    socket.emit("add song to queue", object, sessionCode);
  }

  function getQueueData() {
    socket.emit("get queue", sessionCode);
  }

  function triggerVoting() {
    setVoting(false);
    setUserVoted(false);
    setVotingData([]);
    socket.emit("start voting", sessionCode);
  }

  function voteOnSong(song) {
    socket.emit("vote for song", sessionCode, song);
  }

  async function setCurrentSong(song) {
    if (sessionCode) {
      let audiofeatures = await spotifyApi.getAudioFeaturesForTrack(
        song.item.id
      );
      socket.emit("Set Current Song", sessionCode, song, audiofeatures.body);
    }
  }

  function requestCurrentSong(code) {
    socket.emit("request current song", code);
  }

  function banUser(name) {
    socket.emit("ban user", sessionCode, name);
  }

  function banSong(song) {
    socket.emit("ban song", sessionCode, song);
  }

  function unbanSong(song) {
    socket.emit("unban song", sessionCode, song);
  }

  function unbanUser(user) {
    socket.emit("unban user", sessionCode, user);
  }

  function endRoom() {
    socket.emit("end room", sessionCode);
  }

  async function searchSong(value) {
    if (value.length > 0) {
      let searchResults = await spotifyApi.searchTracks(value);
      setBanSearchData(searchResults.body.tracks.items);
    }
  }

  return (
    <div className="mb-session">
      {showLeavePopup ? (
        <Popup isHost={isHost} setLeavePopUp={setLeavePopUp} />
      ) : (
        ""
      )}
      <Nav
        content={content}
        toggleContent={setContent}
        sessionCode={sessionCode}
        searchResult={searchResult}
        showRoomDetails={showRoomDetails}
        isHost={isHost}
        setLeavePopup={setLeavePopUp}
        getQueueData={getQueueData}
      />

      <div
        className={
          content === "settings" ? "mb_settings_content" : "mb_session_content"
        }
      >
        {content === "voting" && !voting ? <Info /> : ""}
        {content === "searching" ? (
          <Search
            searchResult={searchResult}
            toggleContent={setContent}
            data={playlists}
            setResultData={setResultData}
          />
        ) : (
          ""
        )}
        {content === "settings" ? (
          <Settings
            data={settingsData}
            banSong={banSong}
            banUser={banUser}
            searchSong={searchSong}
            banSearchData={banSearchData}
            setBanSearchData={setBanSearchData}
            unbanSong={unbanSong}
            unbanUser={unbanUser}
            endRoom={endRoom}
            setLeavePopUp={setLeavePopUp}
          />
        ) : (
          ""
        )}
        {content === "queue" ? <Queue data={queueData} /> : ""}
        {content === "result" ? (
          <Result results={results} addToQueue={addToQueue} />
        ) : (
          ""
        )}
        {content === "voting" && voting ? (
          <Voting data={votingData} voted={userVoted} voteOnSong={voteOnSong} />
        ) : (
          ""
        )}
      </div>

      {isHost ? (
        <Control
          accessToken={accessToken}
          spotifyAPI={spotifyApi}
          triggerVoting={triggerVoting}
          setCurrentSong={setCurrentSong}
          votingData={votingData}
        />
      ) : (
        <ControlMember
          currentSongData={currentSongData}
          requestCurrentSong={requestCurrentSong}
          sessionCode={sessionCode}
          votingData={votingData}
        />
      )}

      <Notification message={notification_data} />
    </div>
  );
};

export default Mb_Session;
