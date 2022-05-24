import "./settings.css";
import Search from "../../images/SVG/search.svg";

const Settings = ({ data }) => {
    return (
        <div className="setting_screen">
            {data === null ? (
                <h1>Something went wrong!</h1>
            ) : (
                <div className="setting_content">
                    <button className="cta-button">End Room</button>
                    <div className="settings-cols">
                        <div className="settings-col1">
                            <div className="connected_users">
                                <h1>Connected Users</h1>

                                {data.members.map((person) => {
                                    return (
                                        <div
                                            key={person}
                                            className="connected-user sett-section"
                                        >
                                            <p>{person}</p>
                                            <button id={person}>Ban</button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="banned_users">
                                <h1>Banned Users</h1>
                                {data.banned_member.map((person) => {
                                    return (
                                        <div
                                            key={person}
                                            className="banned-user sett-section"
                                        >
                                            <p>{person}</p>
                                            <button id={person}>UnBan</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="settings-col2">
                            <div className="ban-song-form">
                                <h1>Ban a song</h1>
                                <div className="input-song-ban">
                                    <input
                                        type="text"
                                        placeholder="Search a song..."
                                    ></input>
                                    <img src={Search} alt="search-icon"></img>
                                </div>
                            </div>
                            <div className="banned_songs">
                                <h1>Banned Songs</h1>

                                {data.banned_songs.map((song) => {
                                    return (
                                        <div
                                            key={song}
                                            className="banned-song sett-section"
                                        >
                                            <p>{song}</p>
                                            <button id={song}>UnBan</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
