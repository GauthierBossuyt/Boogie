import "./settings.css";
import Search from "../../images/SVG/search.svg";

const Settings = ({
  data,
  banSong,
  banUser,
  searchSong,
  banSearchData,
  setBanSearchData,
  unbanSong,
  unbanUser,
  endRoom,
}) => {
  return (
    <div className="setting_screen">
      {data === null ? (
        <h1>Something went wrong!</h1>
      ) : (
        <div className="setting_content">
          <div className="settings-buttons">
            <button
              className="cta-button"
              onClick={() => {
                endRoom();
              }}
            >
              End Room
            </button>
            <a href="https://boogie.brussels/visual" target="_blank">
              Activate Visuals
            </a>
          </div>
          <div className="settings-cols">
            <div className="settings-col1">
              <div className="connected_users">
                <h1>Connected Users</h1>

                {data.members.map((person) => {
                  return (
                    <div
                      key={person.socket_id}
                      className="connected-user sett-section"
                    >
                      <p>{person.name}</p>
                      {!person.isHost ? (
                        <button
                          onClick={(e) => {
                            banUser(e.target.id);
                          }}
                          id={person.name}
                        >
                          Ban
                        </button>
                      ) : (
                        <button>Host</button>
                      )}
                    </div>
                  );
                })}
              </div>
              {data.banned_members.length > 0 ? (
                <div className="banned_users">
                  <h1>Banned Users</h1>
                  {data.banned_members.map((person) => {
                    return (
                      <div key={person} className="banned-user sett-section">
                        <p>{person}</p>
                        <button
                          onClick={(e) => {
                            unbanUser(person);
                          }}
                          id={person}
                        >
                          UnBan
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <div className="actions">
                <h1>Actions</h1>
                <div className="actions-list">
                  {data.actions.map((action, i) => {
                    return (
                      <p key={i}>
                        <span>{action.target}</span>
                        {" " + action.message}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="settings-col2">
              <div className="ban-song-form">
                <h1>Ban a song</h1>
                <div className="input-song-ban">
                  <input
                    type="text"
                    placeholder="Search a song..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchSong(e.target.value);
                      }
                    }}
                    onClick={(e) => {
                      setBanSearchData([]);
                    }}
                  ></input>
                  <img src={Search} alt="search-icon"></img>
                </div>
                {banSearchData.length > 0 ? (
                  <div className="song-result-list">
                    {banSearchData.map((song) => {
                      return (
                        <div className="ban-song-result" key={song.id}>
                          <div className="ban-song-img">
                            <img
                              src={song.album.images[0].url}
                              alt={song.name}
                            />
                          </div>
                          <div className="ban-song-info">
                            <p>{song.name}</p>
                            <p>{song.artists[0].name}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              banSong(song);
                            }}
                          >
                            Ban
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {data.banned_songs.length > 0 ? (
                <div className="banned_songs">
                  <h1>Banned Songs</h1>

                  <div className="song-result-list">
                    {data.banned_songs.map((song) => {
                      return (
                        <div
                          key={song.id}
                          className="banned-song ban-song-result"
                        >
                          <div className="ban-song-img">
                            <img
                              src={song.album.images[0].url}
                              alt={song.name}
                            />
                          </div>
                          <div className="ban-song-info">
                            <p>{song.name}</p>
                            <p>{song.artists[0].name}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              unbanSong(song);
                            }}
                          >
                            UnBan
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
