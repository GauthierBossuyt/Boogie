import "./visual.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Visual_login from "./visual_login/visual-login";
import P5 from "../p5/p5";

const socket = io("http://localhost:80", {
    autoConnect: false,
});

const Visual = () => {
    const [code, setCode] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [songData, setSongData] = useState();
    const [songFeatures, setSongFeatures] = useState();

    useEffect(() => {
        if (code.length > 0 && !socket.connected) {
            socket.connect();
            socket.emit("listener join", code);
        }
        socket.on("new song being played", (data) => {
            setSongData(data);
        });

        socket.on("audio features", (data) => {
            setSongFeatures(data);
        });

        socket.once("force leave", () => {
            socket.disconnect();
            setisLoggedIn(false);
            setCode("");
        });

        return () => {
            socket.off("new song being played");
            socket.off("audio features");
            socket.off("force leave");
            socket.disconnect();
        };
    }, [code]);

    return (
        <div className="visual-screen">
            {isLoggedIn ? (
                <div className="visual-content">
                    <div className="visual-nav">
                        <div className="visual-nav-content">
                            <div className="visual-nav-room-info">
                                <p>Room Code</p>
                                <p>{code}</p>
                            </div>
                        </div>
                    </div>
                    {songFeatures ? (
                        <P5 BPM={songFeatures.tempo} ID={songFeatures.id} />
                    ) : (
                        ""
                    )}
                    {songData ? (
                        <div className="visual-song-info">
                            <img
                                src={songData.item.album.images[0].url}
                                alt={songData.item.album.name}
                            ></img>
                            <div className="visual-song-info-text">
                                <h1>{songData.item.name}</h1>
                                <p>
                                    {songData.item.artists.map((artist, i) => {
                                        return i > 0
                                            ? ", " + artist.name
                                            : artist.name;
                                    })}
                                </p>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <Visual_login setCode={setCode} setisLoggedIn={setisLoggedIn} />
            )}
        </div>
    );
};

export default Visual;
