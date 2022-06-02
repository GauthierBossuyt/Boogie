import "./mb_result.css";
import Left from "../../images/SVG/left.svg";
import { useEffect, useRef, useState } from "react";

const Mb_Result = ({ results, addToQueue }) => {
  const [active, setActive] = useState({ inc: 0, data: {} });
  const [data, setData] = useState({});
  const [touchData, setTouchData] = useState({
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  });
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
        if (data.tracks[inc]) {
          setActive({ inc: inc, data: data.tracks[inc] });
        }
      } else if (data.type === "playlist") {
        if (data.tracks[inc]) {
          setActive({ inc: inc, data: data.tracks[inc].track });
        }
      }
    }

    if (dir > 0) {
      resultsList.current.scrollLeft += 280;
    } else if (dir < 0) {
      resultsList.current.scrollLeft -= 280;
    }
  }

  function determineSwipeDirection() {
    let x = [touchData.startPoint.x, touchData.endPoint.x];
    let y = [touchData.startPoint.y, touchData.endPoint.y];
    let Xmax = Math.max(...x);
    let Xmin = Math.min(...x);
    let Xdiff = Xmax - Xmin;

    let Ymax = Math.max(...y);
    let Ymin = Math.min(...y);
    let Ydiff = Ymax - Ymin;

    if (Xdiff > Ydiff) {
      if (touchData.startPoint.x > touchData.endPoint.x) {
        changeActiveSong(+1);
      } else {
        changeActiveSong(-1);
      }
    } else if (Ydiff > Xdiff) {
      if (touchData.startPoint.y > touchData.endPoint.y) {
        addToQueue(active.data);
      }
    }
  }

  return (
    <div>
      {data.tracks ? (
        <div
          className="mb_result_screen"
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
            } else if (e.key === " ") {
              setTimeout(() => {
                addToQueue(active.data);
              }, 250);
            }
          }}
        >
          <div
            className="results-list"
            onKeyDown={(e) => {
              e.preventDefault();
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                return;
              }
            }}
            onScroll={(e) => {
              e.preventDefault();
            }}
            onTouchStart={(e) => {
              let object = touchData;
              object.startPoint.x = e.touches[0].clientX;
              object.startPoint.y = e.touches[0].clientY;
              setTouchData(object);
            }}
            onTouchEnd={(e) => {
              let object = touchData;
              object.endPoint.x = e.changedTouches[0].clientX;
              object.endPoint.y = e.changedTouches[0].clientY;
              setTouchData(object);
              determineSwipeDirection();
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
                <div id={i} key={track.id} className="result-item">
                  <img
                    src={track.album.images[1] ? track.album.images[1].url : ""}
                    alt={track.name + " Album Cover"}
                  />
                  <h2>
                    {track.name.length > 25
                      ? track.name.substring(0, 25) + "..."
                      : track.name}
                  </h2>
                  <h3>
                    {track.artists.map((artist, i) => {
                      if (i === track.artists.length - 1) {
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
                  addToQueue(active.data);
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

export default Mb_Result;
