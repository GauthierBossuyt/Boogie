import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import "./dashboard.css";

import Room from "./room/room.js";
import Navigation from "../navigation/nav";

const spotifyApi = new SpotifyWebApi({
    clientId: "acce0f858d36481e8c57ced906643960",
});

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [Data, setData] = useState();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMe().then((data) => {
            setData(data);
        });
    }, [accessToken]);

    return (
        <div className="dashboard">
            {Data ? (
                <div>
                    <Navigation account={Data.body} />
                    <div className="content">
                        <Room></Room>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Dashboard;
