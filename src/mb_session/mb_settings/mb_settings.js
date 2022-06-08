import "./mb_settings.css";
import Search from "../../images/SVG/search.svg";

const Mb_Settings = ({
  data,
  banSong,
  banUser,
  searchSong,
  banSearchData,
  setBanSearchData,
  unbanSong,
  unbanUser,
  endRoom,
  setLeavePopUp,
}) => {
  return (
    <div className="mb_setting_Screen">
      {data === null ? (
        <h1>Something went wrong!</h1>
      ) : (
        <div className="mb_setting_content">
          <div className="mb_settings_container">
            <h1>Connected users</h1>
            <div className="mb_settings_list">
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
          </div>
          {data.banned_members.length > 0 ? (
            <div className="mb_settings_container">
              <h1>Banned users</h1>
              <div className="mb_settings_list">
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
            </div>
          ) : (
            ""
          )}
          <div className="mb_settings_container">
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
                        <img alt={song.name} src={song.album.images[0].url} />
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
            <div className="mb_settings_container">
              <h1>Banned Songs</h1>
              <div className="song-result-list">
                {data.banned_songs.map((song) => {
                  return (
                    <div key={song.id} className="banned-song ban-song-result">
                      <div className="ban-song-img">
                        <img alt={song.name} src={song.album.images[0].url} />
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
          <div className="mb_settings_container">
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
          <div className="mb_settings_container settings-buttons">
            <button
              className="mb-set-end-butt"
              onClick={() => {
                endRoom();
              }}
            >
              End Room
            </button>
            <button
              className="mb-set-leave-butt"
              onClick={() => {
                setLeavePopUp(true);
              }}
            >
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mb_Settings;
