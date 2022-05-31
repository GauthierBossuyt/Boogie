import { useEffect, useRef, useState } from "react";
import Queue from "../../images/SVG/queue.svg";
import "./control.css";

const ControlMember = ({
  getQueueData,
  currentSongData,
  requestCurrentSong,
  sessionCode,
  votingData,
}) => {
  const [data, setData] = useState();
  const [time, setTime] = useState({ duration: -1, left: 0 });
  const [time_string, setTime_String] = useState(0);
  const [percentage, setPercentage] = useState("");
  const [Animation, setAnimation] = useState(false);
  const Title = useRef();
  const Artists = useRef();

  useEffect(() => {
    if (currentSongData) {
      setTime({ duration: 0, left: 0 });
      setData(currentSongData);
      if (currentSongData.item) {
        setTime({
          duration: currentSongData.item.duration_ms,
          left: currentSongData.item.duration_ms - currentSongData.progress_ms,
        });
      } else {
        setTime({
          duration: 0,
          left: 0,
        });
      }
    }
  }, [currentSongData]);

  useEffect(() => {
    if (sessionCode) {
      requestCurrentSong(sessionCode);
    }
  }, [sessionCode]);

  useEffect(() => {
    if (time.left > 0) {
      setTimeout(() => {
        let new_time = time.left - 1000;
        if (new_time > 1) {
          setTime_String(MStoMinAndSec(new_time));
          setPercentage(Math.floor(100 - (time.left / time.duration) * 100));
          setTime({ duration: time.duration, left: new_time });
        } else {
        }
      }, 1000);
    }
  }, [time]);

  function MStoMinAndSec(time) {
    //https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function scrollElement(ref) {
    setAnimation(true);
    const width = ref.current.clientWidth;
    const scrollWidth = ref.current.scrollWidth;
    ref.current.scrollLeft = 0;
    if (scrollWidth > width) {
      let goRight = true;
      const ID = setInterval(() => {
        if (goRight) {
          ref.current.scrollLeft += 1;
          if (ref.current.scrollLeft >= scrollWidth - width) goRight = false;
        } else if (!goRight) {
          ref.current.scrollLeft -= 1;
          if (ref.current.scrollLeft <= 0) {
            setAnimation(false);
            clearInterval(ID);
          }
        }
      }, 80);
    }
  }

  return (
    <div className="control_bar">
      {data ? (
        <div>
          <div className="control_bar_data">
            <img
              src={data.item.album.images[2].url}
              alt={data.item.name}
              className="song_data_album"
            ></img>
            <div className="song_data_info">
              <h3
                ref={Title}
                onMouseEnter={() => {
                  if (!Animation) scrollElement(Title);
                }}
              >
                {data.item.name}
              </h3>
              <div
                ref={Artists}
                onMouseEnter={() => {
                  if (!Animation) scrollElement(Artists);
                }}
                className="song_data_artists"
              >
                {data.item.artists.map((artist, i) => {
                  return (
                    <p key={artist.id} className="song_data_artist">
                      {i > 0 ? ", " + artist.name : artist.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="control_bar_progress">
              <div className="base_bar"> </div>
              <div
                className="progress_bar"
                style={{
                  width: percentage + "%",
                }}
              ></div>
            </div>
            <p className="progress_time">{time_string}</p>
            <img
              id="queue-icon"
              onClick={() => {
                getQueueData();
              }}
              src={Queue}
              alt="queue-icon"
            />
            <div className="coming-up">
              <h1>Most Votes:</h1>
              {votingData[0] ? (
                <p>
                  {[...votingData]
                    .sort((a, b) => b.votes - a.votes)
                    .map((song, i) => {
                      if (i === 0) {
                        return song.data.name;
                      }
                    })}
                </p>
              ) : (
                <p>Add songs to queue!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="control_bar_data">
          <div className="unknown_data_album"></div>

          <div className="song_data_info">
            <div className="unknown_data_title"></div>
            <div className="unknown_data_artists"></div>
          </div>

          <div className="control_bar_progress">
            <div className="base_bar"> </div>
          </div>

          <p className="progress_time">00:00</p>

          <img
            id="queue-icon"
            onClick={() => {
              getQueueData();
            }}
            src={Queue}
            alt="queue-icon"
          ></img>

          <button>Refresh</button>
        </div>
      )}
    </div>
  );
};

export default ControlMember;
