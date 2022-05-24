import "./session_nav.css";
import Boogie_Logo from "../../images/SVG/Logo.svg";
import Search from "../../images/SVG/search.svg";
import Logout from "../../images/SVG/logout.svg";
import Settings from "../../images/SVG/settings.svg";

const SessionNav = ({
    sessionCode,
    toggleContent,
    searchResult,
    showRoomDetails,
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
            <div></div>
            <div className="nav-icons">
                <img
                    src={Logout}
                    alt={"Logout-icon"}
                    onClick={() => {
                        toggleContent("logout");
                    }}
                ></img>
                <img
                    src={Settings}
                    alt={"Settings-icon"}
                    onClick={() => {
                        showRoomDetails(sessionCode);
                        toggleContent("settings");
                    }}
                ></img>
            </div>
        </nav>
    );
};

export default SessionNav;
