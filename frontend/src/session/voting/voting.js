import { useEffect, useState } from "react";
import "./voting.css";
import Left from "../../images/SVG/left.svg";

const Voting = ({ data, voted, voteOnSong }) => {
  const [voteData, setVoteData] = useState([]);

  useEffect(() => {
    setVoteData(data);
    console.log(data);
  }, [data]);

  return (
    <div className="voting_screen">
      {voteData.length !== 0 && !voted ? (
        <div key={voteData[0].data.id} className="voting_content">
          <div className="vote-container left-song">
            <div className="vote-container-img">
              <img
                alt="album cover"
                src={voteData[0].data.album.images[0].url}
              />
            </div>
            <div className="vote-container-text">
              <h1>{voteData[0].data.name}</h1>
              <p>{voteData[0].data.artists[0].name}</p>
            </div>
          </div>

          {voteData.length > 1 ? (
            <div className="vote-container center-song">
              <div className="vote-container-img">
                <img
                  alt="album cover"
                  src={voteData[1].data.album.images[0].url}
                />
              </div>
              <div className="vote-container-text">
                <h1>{voteData[1].data.name}</h1>
                <p>{voteData[1].data.artists[0].name}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {voteData.length > 2 ? (
            <div className="vote-container right-song">
              <div className="vote-container-img">
                <img
                  alt="album cover"
                  src={voteData[2].data.album.images[0].url}
                />
              </div>
              <div className="vote-container-text">
                <h1>{voteData[2].data.name}</h1>
                <p>{voteData[2].data.artists[0].name}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="voting_content">
          {[...voteData]
            .sort((a, b) => b.votes - a.votes)
            .map((song, i) => {
              if (i === 1) {
                return (
                  <div key={song.data.id} className="vote-container left-song">
                    <div className="vote-container-img ">
                      <img
                        alt="album cover darkness"
                        src={song.data.album.images[0].url}
                      />
                      <p className="vote-count">{song.votes}</p>
                    </div>
                    <div className="vote-container-text">
                      <h1>{song.data.name}</h1>
                      <p>{song.data.artists[0].name}</p>
                    </div>
                  </div>
                );
              } else if (i === 0) {
                return (
                  <div
                    key={song.data.id}
                    className="vote-container center-song"
                  >
                    <div className="vote-container-img">
                      <img
                        alt="album cover darkness"
                        src={song.data.album.images[0].url}
                      />
                      <p className="vote-count">{song.votes}</p>
                    </div>
                    <div className="vote-container-text">
                      <h1>{song.data.name}</h1>
                      <p>{song.data.artists[0].name}</p>
                    </div>
                  </div>
                );
              } else if (i === 2) {
                return (
                  <div key={song.data.id} className="vote-container right-song">
                    <div className="vote-container-img ">
                      <img
                        alt="album cover darkness"
                        src={song.data.album.images[0].url}
                      />
                      <p className="vote-count">{song.votes}</p>
                    </div>
                    <div className="vote-container-text">
                      <h1>{song.data.name}</h1>
                      <p>{song.data.artists[0].name}</p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      )}
      {voteData.length > 0 && !voted ? (
        <div className="controls-container">
          <div className="controls">
            <img
              src={Left}
              alt={"left-icon"}
              onClick={(e) => {
                e.preventDefault();
                let array = [...voteData];
                let item = array.pop();
                array.unshift(item);
                setVoteData(array);
              }}
            />
            <button
              className="cta-button"
              onClick={(e) => {
                e.preventDefault();
                voteOnSong(voteData[1]);
              }}
            >
              vote
            </button>
            <img
              src={Left}
              alt={"right-icon"}
              onClick={(e) => {
                e.preventDefault();
                let array = [...voteData];
                let item = array.shift();
                array.push(item);
                setVoteData(array);
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Voting;
