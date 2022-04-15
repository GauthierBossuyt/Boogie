import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Boogie_Logo from "../images/SVG/Logo.svg";
import Spotify from "../images/SVG/Spotify_white.svg";
import Arrow from "../images/SVG/arrow.svg";
import "./dashboard.css";

const spotifyApi = new SpotifyWebApi({
    clientId: "acce0f858d36481e8c57ced906643960",
});

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [Data, setData] = useState();
    const [navState, setNavState] = useState(false);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMe().then((data) => {
            console.log(data);
            if (data.statusCode !== 200) {
                console.error("Error");
            }
            setData(data);
        });
    }, [accessToken]);

    return (
        <div className="dashboard">
            {Data ? (
                <nav>
                    <img
                        className="nav_logo"
                        src={Boogie_Logo}
                        alt="Boogie Logo"
                    />
                    <div
                        className="nav_dropdown"
                        onMouseEnter={() => {
                            setNavState(!navState);
                        }}
                        onMouseLeave={() => {
                            setNavState(!navState);
                        }}
                    >
                        <div className="nav_topbar">
                            <img
                                className="nav_service"
                                src={Spotify}
                                alt="Spotify Logo"
                            />
                            <h2>{Data.body.display_name}</h2>
                            <img
                                className="nav_arrow"
                                src={Arrow}
                                alt="arrow icon"
                            />
                        </div>
                        {navState ? (
                            <div className="nav_botbar">
                                <a href="/">Disconnect</a>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </nav>
            ) : (
                ""
            )}
        </div>
    );
};

export default Dashboard;
