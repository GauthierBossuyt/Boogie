import { useEffect, useRef, useState } from "react";
import Queue from "../../images/SVG/queue.svg";
import "./control.css";

const Control = ({
  accessToken,
  spotifyAPI,
  triggerVoting,
  getQueueData,
  setCurrentSong,
  votingData,
}) => {
  const [data, setData] = useState();
  const [playState, setPlayState] = useState(true);
  const [time, setTime] = useState({ duration: -1, left: 0 });
  const [time_string, setTime_String] = useState(0);
  const [percentage, setPercentage] = useState("");
  const [API, setAPI] = useState();
  const [Animation, setAnimation] = useState(false);
  const Title = useRef();
  const Artists = useRef();

  useEffect(() => {
    if (accessToken && spotifyAPI) {
      spotifyAPI.setAccessToken(accessToken);
      const storeData = async () => {
        await setAPI(spotifyAPI);
        spotifyAPI
          .getMyCurrentPlaybackState()
          .then((data) => {
            if (data.statusCode === 200) {
              data.body.is_playing ? setPlayState(true) : setPlayState(false);

              return data.body;
            }
          })
          .then((data) => {
            setData(data);
            setCurrentSong(data);
            return data;
          })
          .then((data) => {
            if (data !== undefined) {
              if (data.item !== undefined) {
                setTime({
                  duration: data.item.duration_ms,
                  left: data.item.duration_ms - data.progress_ms,
                });
              } else {
                setTime({
                  duration: 0,
                  left: 0,
                });
              }
            } else {
              setTime({ duration: 0, left: 0 });
            }
          });
      };
      storeData();
    }
  }, [accessToken, spotifyAPI]);

  useEffect(() => {
    if (time.left > 0) {
      setTimeout(() => {
        let new_time = time.left - 1000;
        if (new_time > 1) {
          setTime_String(MStoMinAndSec(new_time));
          setPercentage(Math.floor(100 - (time.left / time.duration) * 100));
          setTime({ duration: time.duration, left: new_time });
        } else {
          triggerVoting();
          loadNewSong();
        }
      }, 1000);
    }
  }, [time]);

  async function loadNewSong() {
    await setTime({ duration: 0, left: 0 });

    await API.getMyCurrentPlaybackState()
      .then((data) => {
        if (data.statusCode === 200) {
          if (data.body.is_playing === false) {
            return false;
          } else if (data.body.is_playing === true) {
            setPlayState(true);
            setData(data.body);
            return data.body;
          }
        } else {
          return false;
        }
      })
      .then((data) => {
        if (data === false) {
          setPlayState(false);
        } else {
          setCurrentSong(data);
          setTime({
            duration: data.item.duration_ms,
            left: data.item.duration_ms - data.progress_ms,
          });
        }
      });
  }

  function MStoMinAndSec(time) {
    //https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    var minutes = Math.floor(time / 60000);
    var seconds = Math.floor((time % 60000) / 1000).toFixed(0);
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
      {playState && data ? (
        <div className="control_bar_data">
          <img
            src={data.item.album.images[2].url}
            alt={data.item.name}
            className="song_data_album"
          />

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

          <button
            onClick={() => {
              loadNewSong();
            }}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Control;
