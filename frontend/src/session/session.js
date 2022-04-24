import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import "./session.css";

import SessionNav from "./session_nav/session_nav";

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
                spotifyApi.getNewReleases().then((data) => {
                    console.log(data);
                });
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [location.state, navigate, accessToken, sessionCode, service]);

    return (
        <div className="session">
            <SessionNav sessionCode={sessionCode} />
            {content === "voting" ? <h1>Voting screen</h1> : ""}
            
        </div>
    );
};

export default Session;
