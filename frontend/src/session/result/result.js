import "./result.css";
import Left from "./svg/left.svg";
import { useEffect, useRef, useState } from "react";

const Result = ({ results, addToQueue }) => {
    const [active, setActive] = useState({ inc: 0, data: {} });
    const [data, setData] = useState({});
    const resultsList = useRef(null);

    useEffect(() => {
        setData(results);
    }, [results]);

    useEffect(() => {
        if (data.tracks) {
            if (data.tracks.length > 0) {
                if (data.type === "playlist") {
                    setActive({ inc: 0, data: data.tracks[0].track });
                } else if (data.type === "search") {
                    setActive({ inc: 0, data: data.tracks[0] });
                }
            }
        }
    }, [data]);

    function changeActiveSong(dir) {
        let inc = active.inc + dir;
        if (inc < data.tracks.length) {
            if (data.type === "search") {
                setActive({ inc: inc, data: data.tracks[inc] });
            } else if (data.type === "playlist") {
                setActive({ inc: inc, data: data.tracks[inc].track });
            }
        }

        if (dir > 0) {
            resultsList.current.scrollLeft += 280;
        } else if (dir < 0) {
            resultsList.current.scrollLeft -= 280;
        }
    }

    return (
        <div>
            {data.tracks ? (
                <div
                    className="result_screen"
                    tabIndex="1"
                    onKeyDown={(e) => {
                        if (e.key === "ArrowRight") {
                            setTimeout(() => {
                                changeActiveSong(1);
                            }, 250);
                        } else if (e.key === "ArrowLeft") {
                            setTimeout(() => {
                                changeActiveSong(-1);
                            }, 250);
                        } else if(e.key === " ") {
                            setTimeout(() => {
                                
                            }, 250);
                        }
                    }}
                >
                    <h1 className="result-data">{data.name}</h1>

                    <div
                        className="results-list"
                        onKeyDown={(e) => {
                            e.preventDefault();
                            if (
                                e.key === "ArrowLeft" ||
                                e.key === "ArrowRight"
                            ) {
                                return;
                            }
                        }}
                        tabIndex="2"
                        ref={resultsList}
                    >
                        {data.tracks.map((info, i) => {
                            let track;
                            if (data.type === "search") {
                                track = info;
                            } else if (data.type === "playlist") {
                                track = info.track;
                            }
                            return (
                                <div
                                    id={i}
                                    key={track.id}
                                    className="result-item"
                                >
                                    <img
                                        src={
                                            track.album.images[1]
                                                ? track.album.images[1].url
                                                : ""
                                        }
                                        alt={track.name + " Album Cover"}
                                    />
                                    <h2>
                                        {track.name.length > 25
                                            ? track.name.substring(0, 25) +
                                              "..."
                                            : track.name}
                                    </h2>
                                    <h3>
                                        {track.artists.map((artist, i) => {
                                            if (
                                                i ===
                                                track.artists.length - 1
                                            ) {
                                                return artist.name + " ";
                                            } else {
                                                return artist.name + ", ";
                                            }
                                        })}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                    <div className="controls-container">
                        <div className="controls">
                            <img
                                src={Left}
                                alt={"left-icon"}
                                onClick={() => {
                                    setTimeout(() => {
                                        changeActiveSong(-1);
                                    }, 250);
                                }}
                            />
                            <button
                                className="cta-button"
                                onClick={() => {
                                    addToQueue({
                                        uri: active.data.uri,
                                        id: active.data.id,
                                    });
                                }}
                            >
                                Add
                            </button>
                            <img
                                src={Left}
                                alt={"right-icon"}
                                onClick={() => {
                                    setTimeout(() => {
                                        changeActiveSong(1);
                                    }, 250);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Oops something went wrong!</h1>
            )}
        </div>
    );
};

export default Result;
