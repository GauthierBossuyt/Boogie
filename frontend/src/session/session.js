import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import io from "socket.io-client";
import "./session.css";

import SessionNav from "./session_nav/session_nav";
import Control from "./control_bar/control";

//CONTENT
import Voting from "./voting/voting";
import Search from "./search/search";
import Result from "./result/result";
import Settings from "./settings/settings";
import Queue from "./queue/queue";
import Notification from "./notification/notification";

const spotifyApi = new SpotifyWebApi({
    clientId: "acce0f858d36481e8c57ced906643960",
});

const socket = io("http://localhost:8080", { autoConnect: false });

const Session = () => {
    //Getting data out of url
    const location = useLocation();
    const navigate = useNavigate();

    //Saving data from url
    const [accessToken, setToken] = useState();
    const [sessionCode, setSessionCode] = useState();
    const [service, setService] = useState();

    //Current active Content page
    const [content, setContent] = useState("voting");
    //Storing playlists for search page
    const [playlists, setPlaylists] = useState([]);
    //Storing result data for result page
    const [resultData, setResultData] = useState({ type: "", data: "" });
    const [results, setResults] = useState({ tracks: [], type: "", name: "" });
    //Toggle if the voting is active or not
    const [voting, setVoting] = useState(false);
    //Settings data for settings page
    const [settingsData, setSettingsData] = useState(null);
    //Queue data for queue page
    const [queueData, setQueueData] = useState(null);
    //Notification data for notification
    const [notification_data, setNotificationData] = useState("");

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

                socket.emit("join", sessionCode);

                socket.on("person joined", (data) => {
                    console.log(data);
                    setNotificationData(`Someone has joined the session!`);
                    setQueueData(data.queue);
                });

                socket.on("person left", (data) => {
                    setNotificationData(`Someone has left the session!`);
                    console.log(data);
                });

                socket.on("room info", (data) => {
                    setSettingsData(data);
                });

                socket.on("successfully added song to queue", async (id) => {
                    let song_details = await spotifyApi.getTrack(id);
                    setNotificationData(
                        `${song_details.body.name} has been added to queue`
                    );
                });

                socket.on("send queue", async (data) => {
                    await getSongData(data);
                });

                socket.on("voting status", (boolean) => {
                    setVoting(boolean);
                });

                socket.on("add song to queue", async (data) => {
                    let song_details = await spotifyApi.getTrack(data.id);
                    setNotificationData(
                        `${song_details.body.name} will be played next!`
                    );
                    spotifyApi.addToQueue(data.uri);
                });

                return () => {
                    socket.disconnect();
                };
            }
        }
    }, [sessionCode]);

    function showRoomDetails() {
        socket.emit("room status", sessionCode);
    }

    function searchResult(e, type, value) {
        if (e.key === "Enter" || e.type === "click") {
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

    async function getSongData(array) {
        if (array.length > 0) {
            let IDlist = [];
            array.forEach((element) => {
                IDlist.push(element.id);
            });
            console.log(IDlist);
            await spotifyApi.getTracks(IDlist).then((data) => {
                setQueueData(data.body.tracks);
            });
        } else {
            setQueueData([]);
        }
        setContent("queue");
    }

    function triggerVoting() {
        socket.emit("start voting", sessionCode);
        console.log(voting);
    }

    return (
        <div className="session">
            <SessionNav
                toggleContent={setContent}
                sessionCode={sessionCode}
                searchResult={searchResult}
                showRoomDetails={showRoomDetails}
            />
            <div className="session_content">
                {content === "voting" ? <Voting /> : ""}
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
                {content === "settings" ? <Settings data={settingsData} /> : ""}
                {content === "result" ? (
                    <Result results={results} addToQueue={addToQueue} />
                ) : (
                    ""
                )}
                {content === "queue" ? (
                    <Queue data={queueData} toggleContent={setContent} />
                ) : (
                    ""
                )}
            </div>
            <Control
                accessToken={accessToken}
                spotifyAPI={spotifyApi}
                triggerVoting={triggerVoting}
                getQueueData={getQueueData}
            />

            <Notification message={notification_data} />
        </div>
    );
};

export default Session;
