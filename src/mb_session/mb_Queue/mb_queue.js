import "./mb_queue.css";

const Mb_Queue = ({ data, nextSongData }) => {
  function MStoMinAndSec(time) {
    //https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="mb-queue-screen">
      {nextSongData.name ? (
        <div className="mb-results mb-playsnext">
          <h1>Recently Added</h1>
          <div key={nextSongData.id} className="queue_result">
            <img alt="Album Cover" src={nextSongData.album.images[0].url}></img>
            <div className="queue-result-info">
              <p>{nextSongData.name}</p>
              <p>
                {nextSongData.artists.map((artist, i) => {
                  let string;
                  if (i === 0) {
                    string = artist.name;
                  } else {
                    string = `, ${artist.name}`;
                  }
                  return string;
                })}
              </p>
            </div>
            <div className="queue-time">
              <p className="queue-time-result">
                {MStoMinAndSec(nextSongData.duration_ms)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <h1>Next up for vote</h1>
      <div className="mb-results">
        {data.length > 0 ? (
          data.map((data, i) => {
            return (
              <div key={data.id} className="queue_result">
                <img alt="Album Cover" src={data.album.images[0].url}></img>
                <div className="queue-result-info">
                  <p>{data.name}</p>
                  <p>
                    {data.artists.map((artist, i) => {
                      let string;
                      if (i === 0) {
                        string = artist.name;
                      } else {
                        string = `, ${artist.name}`;
                      }
                      return string;
                    })}
                  </p>
                </div>
                <div className="queue-time">
                  <p className="queue-time-result">
                    {MStoMinAndSec(data.duration_ms)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>This looks a bit empty. Add some songs!</p>
        )}
      </div>
    </div>
  );
};

export default Mb_Queue;
