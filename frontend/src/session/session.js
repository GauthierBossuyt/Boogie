import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import "./session.css";

import SessionNav from "./session_nav/session_nav";
import Control from "./control_bar/control";

//CONTENT
import Voting from "./voting/voting";
import Search from "./search/search";
import Result from "./result/result";

const spotifyApi = new SpotifyWebApi({
    clientId: "acce0f858d36481e8c57ced906643960",
});

const Session = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [accessToken, setToken] = useState();
    const [sessionCode, setSessionCode] = useState();
    const [service, setService] = useState();
    const [content, setContent] = useState("voting");
    const [playlists, setPlaylists] = useState([]);
    const [resultData, setResultData] = useState({ type: "", data: "" });
    const [results, setResults] = useState({ tracks: [], type: "", name: "" });
    const [host, setHost] = useState(false);

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

                spotifyApi.setAccessToken(accessToken);
                spotifyApi.getUserPlaylists().then((data) => {
                    //console.log(data);
                    setPlaylists(data.body.items);
                });
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

    function searchResult(e, type, value) {
        if (e.key === "Enter" || e.type === "click") {
            setResultData({ type: type, data: value });
            setContent("result");
        }
    }

    return (
        <div className="session">
            <SessionNav
                toggleContent={setContent}
                sessionCode={sessionCode}
                searchResult={searchResult}
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
                {content === "result" ? <Result results={results} /> : ""}
            </div>
            <Control accessToken={accessToken} spotifyAPI={spotifyApi} />
        </div>
    );
};

export default Session;
