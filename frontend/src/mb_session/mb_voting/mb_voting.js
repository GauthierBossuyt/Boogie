import "./mb_voting.css";
import { useEffect, useState, useRef } from "react";
import Left from "../../images/SVG/left.svg";

const Mb_Voting = ({ data, voted, voteOnSong }) => {
  const [voteData, setVoteData] = useState([]);
  const [touchData, setTouchData] = useState({
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  });
  const [active, setActive] = useState({ inc: 0, data: {} });
  const voteList = useRef(null);

  useEffect(() => {
    console.log(data);
    let sorted = [...data].sort((a, b) => b.votes - a.votes);
    setVoteData(sorted);
    setActive({ inc: 0, data: sorted[0] });
  }, [data]);

  useEffect(() => {
    if (voteList.current) {
      setTimeout(() => {
        voteList.current.scrollLeft = voteList.current.offsetWidth / 2 + 95;
      }, 100);
    }
  }, []);

  function changeActiveSong(dir) {
    let inc = active.inc + dir;
    switch (active.inc) {
      case 0:
        dir === 1 ? (inc = 2) : (inc = 1);
        break;

      case 1:
        dir === 1 ? (inc = 0) : (inc = 1);
        break;
      case 2:
        dir === 1 ? (inc = 2) : (inc = 0);
      default:
        break;
    }

    setActive({ inc: inc, data: voteData[inc] });

    if (dir > 0) {
      voteList.current.scrollLeft += 290;
    } else if (dir < 0) {
      voteList.current.scrollLeft -= 290;
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
        if (!voted) {
          voteOnSong(active.data);
        }
      }
    }
  }

  return (
    <div className="voting_screen">
      <div className="vote-carousel" ref={voteList}>
        {voteData.length > 0 ? (
          <div
            className="vote-container"
            tabIndex="1"
            onKeyDown={(e) => {
              e.preventDefault();
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
          >
            <div className="vote">
              <div className="vote-img">
                <img src={voteData[1].data.album.images[1].url} />
                <p>{voteData[1].votes}</p>
              </div>
              <div className="vote-text">
                <h1>
                  {voteData[1].data.name.length > 25
                    ? voteData[1].data.name.substring(0, 25) + "..."
                    : voteData[1].data.name}
                </h1>
                <p>{voteData[1].data.artists[0].name}</p>
              </div>
            </div>
            <div className="vote">
              <div className="vote-img">
                <img src={voteData[0].data.album.images[1].url} />
                <p>{voteData[0].votes}</p>
              </div>
              <div className="vote-text">
                <h1>
                  {voteData[0].data.name.length > 25
                    ? voteData[0].data.name.substring(0, 25) + "..."
                    : voteData[0].data.name}
                </h1>
                <p>{voteData[0].data.artists[0].name}</p>
              </div>
            </div>
            {voteData[2] ? (
              <div className="vote">
                <div className="vote-img">
                  <img src={voteData[2].data.album.images[1].url} />
                  <p>{voteData[2].votes}</p>
                </div>
                <div className="vote-text">
                  <h1>
                    {voteData[2].data.name.length > 25
                      ? voteData[2].data.name.substring(0, 25) + "..."
                      : voteData[2].data.name}
                  </h1>
                  <p>{voteData[2].data.artists[0].name}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {voteData.length > 0 && !voted ? (
        <div className="controls-container">
          <div className="controls">
            <img
              src={Left}
              alt={"left-icon"}
              onClick={(e) => {
                changeActiveSong(-1);
              }}
            />
            <button
              className="cta-button"
              onClick={(e) => {
                e.preventDefault();
                voteOnSong(active.data);
              }}
            >
              vote
            </button>
            <img
              src={Left}
              alt={"right-icon"}
              onClick={(e) => {
                changeActiveSong(+1);
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

export default Mb_Voting;
