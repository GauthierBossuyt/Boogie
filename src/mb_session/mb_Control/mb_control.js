import { useEffect, useState } from "react";
import "./mb_control.css";

const Mb_Control = ({
  accessToken,
  spotifyAPI,
  triggerVoting,
  setCurrentSong,
  setNotificationData,
}) => {
  const [data, setData] = useState();
  const [playState, setPlayState] = useState(true);
  const [time, setTime] = useState({ duration: -1, left: 0 });
  const [time_string, setTime_String] = useState(0);
  const [percentage, setPercentage] = useState("");
  const [API, setAPI] = useState();

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
            setNotificationData(`Play a song on Spotify to start the session!`);
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

  return (
    <div className="mb_control_bar">
      {playState && data ? (
        <div className="mb_control_bar_data">
          <img
            src={data.item.album.images[2].url}
            alt={data.item.name}
            className="song_data_album"
          />
          <div className="mb_song_data">
            <div className="mb_song_data_info">
              <div className="mb_song_data_text">
                <h3>{data.item.name}</h3>
                <div className="mb_song_data_artists">
                  <p className="song_data_artist">
                    {data.item.artists[0].name}
                  </p>
                </div>
              </div>
              <div className="mb_song_data_time">
                <p className="progress_time mb_progress_time">{time_string}</p>
              </div>
            </div>
            <div className="control_bar_progress">
              <div className="base_bar"></div>
              <div
                className="progress_bar"
                style={{
                  width: percentage + "%",
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb_control_bar_data">
          <div className="unknown_data_album"></div>
          <div className="unknown_data_refresh">
            <button
              onClick={() => {
                loadNewSong();
              }}
            >
              Start Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mb_Control;
