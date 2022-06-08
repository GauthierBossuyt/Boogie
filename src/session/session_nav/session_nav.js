import "./session_nav.css";
import Boogie_Logo from "../../images/SVG/Logo.svg";
import Search from "../../images/SVG/search.svg";
// import Logout from "../../images/SVG/logout.svg";
// import Settings from "../../images/SVG/settings.svg";

const SessionNav = ({
  sessionCode,
  toggleContent,
  searchResult,
  content,
  showRoomDetails,
  isHost,
  setLeavePopup,
  getQueueData,
}) => {
  return (
    <nav className="session_nav">
      <img
        className="nav_logo"
        onClick={() => {
          toggleContent("voting");
        }}
        src={Boogie_Logo}
        alt="Boogie Logo"
      />
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
      <div className="nav-code">
        <p>Room Code</p>
        <h2
          onClick={(e) => {
            navigator.clipboard.writeText(e.target.innerText);
          }}
        >
          {sessionCode}
        </h2>
      </div>
      <div className="nav-icons">
        {/* {isHost ? (
          <img
            src={Settings}
            alt={"Settings-icon"}
            onClick={() => {
              showRoomDetails(sessionCode);
              toggleContent("settings");
            }}
          ></img>
        ) : (
          ""
        )}
        <img
          src={Logout}
          alt={"Logout-icon"}
          onClick={() => {
            setLeavePopup(true);
          }}
        ></img> */}
        <p
          className={content === "voting" && "active_link"}
          onClick={() => {
            toggleContent("voting");
          }}
        >
          Vote
        </p>
        <p
          className={
            content === "searching" || content === "result" ? "active_link" : ""
          }
          onClick={() => {
            toggleContent("searching");
          }}
        >
          Playlists
        </p>
        <p
          className={content === "queue" && "active_link"}
          onClick={() => {
            getQueueData();
          }}
        >
          Queue
        </p>
        {isHost ? (
          <p
            className={content === "settings" && "active_link"}
            onClick={() => {
              showRoomDetails(sessionCode);
              toggleContent("settings");
            }}
          >
            Settings
          </p>
        ) : (
          ""
        )}
        <p
          onClick={() => {
            setLeavePopup(true);
          }}
        >
          Leave
        </p>
      </div>
    </nav>
  );
};

export default SessionNav;
