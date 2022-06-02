import { useEffect, useState } from "react";
import "./mb_control.css";

const Mb_ControlMember = ({
  currentSongData,
  requestCurrentSong,
  sessionCode,
}) => {
  const [data, setData] = useState();
  const [time, setTime] = useState({ duration: -1, left: 0 });
  const [time_string, setTime_String] = useState(0);
  const [percentage, setPercentage] = useState("");

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

  return (
    <div className="mb_control_bar">
      {data ? (
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
                  {data.item.artists.map((artist, i) => {
                    return (
                      <p key={artist.id} className="song_data_artist">
                        {i > 0 ? ", " + artist.name : artist.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="mb_song_data_time">
                <p className="progress_time mb_progress_time">{time_string}</p>
              </div>
            </div>
            <div className="control_bar_progress">
              <div
                className="base_bar"
                style={{ width: percentage + "%" }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb_control_bar_data">
          <div className="unknown_data_album"></div>
          <div className="unknown_data_refresh">
            <button>Refresh</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mb_ControlMember;
