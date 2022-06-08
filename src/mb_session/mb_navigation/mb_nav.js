import { useState } from "react";

import "../../session/session_nav/session_nav.css";
import "./mb_nav.css";
import Boogie_Logo from "../../images/SVG/Logo.svg";
import Search from "../../images/SVG/search.svg";
import Logout from "../../images/SVG/logout.svg";
import Settings from "../../images/SVG/settings.svg";
import Back from "../../images/SVG/back.svg";

const Mb_Nav = ({
  content,
  toggleContent,
  sessionCode,
  searchResult,
  showRoomDetails,
  isHost,
  setLeavePopup,
  getQueueData,
}) => {
  const [touchData, setTouchData] = useState({
    startPoint: { x: 0 },
    endPoint: { x: 0 },
  });

  function determineSwipeDirection() {
    if (touchData.startPoint.x > touchData.endPoint.x) {
      switch (content) {
        case "searching":
          getQueueData();
          toggleContent("queue");
          break;

        case "voting":
          toggleContent("searching");
          break;

        case "result":
          toggleContent("queue");
          break;

        default:
          break;
      }
    } else {
      switch (content) {
        case "searching":
          toggleContent("voting");
          break;

        case "queue":
          toggleContent("searching");
          break;

        case "result":
          toggleContent("voting");
          break;

        default:
          break;
      }
    }
  }

  return (
    <div className="mb-nav">
      <div className="mb-nav-row1">
        <img
          src={Boogie_Logo}
          alt="Boogie Logo"
          onClick={() => {
            toggleContent("voting");
          }}
        />
        <div className="mb-nav-id">
          <p>Room Code</p>
          <p
            onClick={(e) => {
              navigator.clipboard.writeText(e.target.innerText);
            }}
          >
            {sessionCode}
          </p>
        </div>
        <div className="mb-nav-set">
          {isHost ? (
            <img
              src={content === "settings" ? Back : Settings}
              alt="settings Icon"
              onClick={() => {
                showRoomDetails(sessionCode);
                if (content === "settings") {
                  toggleContent("voting");
                } else {
                  toggleContent("settings");
                }
              }}
            />
          ) : (
            <img
              src={Logout}
              alt="Logout Icons"
              onClick={() => {
                setLeavePopup(true);
              }}
            />
          )}
        </div>
      </div>
      {content !== "settings" ? (
        <div className="mb-nav-row2">
          <div className="nav-searchbar">
            <input
              type={"text"}
              placeholder="Search a song..."
              onClick={() => {
                toggleContent("searching");
              }}
              onKeyDown={(e) => {
                searchResult(e, "search", e.target.value);
              }}
            ></input>
            <img className="search_icon" src={Search} alt="Search Icon" />
          </div>
        </div>
      ) : (
        ""
      )}
      {content !== "settings" ? (
        <div
          className="mb-nav-row3"
          onTouchStart={(e) => {
            let object = touchData;
            object.startPoint.x = e.touches[0].clientX;
            setTouchData(object);
          }}
          onTouchEnd={(e) => {
            let object = touchData;
            object.endPoint.x = e.changedTouches[0].clientX;
            setTouchData(object);
            determineSwipeDirection();
          }}
        >
          <p
            className={content === "voting" ? "active" : ""}
            onClick={() => {
              toggleContent("voting");
            }}
          >
            Vote
          </p>
          <p
            className={
              content === "searching" || content === "result" ? "active" : ""
            }
            onClick={() => {
              toggleContent("searching");
            }}
          >
            Search
          </p>
          <p
            className={content === "queue" ? "active" : ""}
            onClick={() => {
              toggleContent("queue");
              getQueueData();
            }}
          >
            Queue
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Mb_Nav;
