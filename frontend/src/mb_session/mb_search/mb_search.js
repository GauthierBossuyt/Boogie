import "./mb_search.css";

const Mb_Search = ({ data, toggleContent, searchResult }) => {
  return (
    <div className="mb_search_screen">
      <div className="mb_assortment">
        {data.map((playlist) => {
          return (
            <div
              className="playlist-tile"
              onClick={(e) => {
                searchResult(e, "playlist", playlist);
              }}
              key={playlist.id}
            >
              <div className="playlist-tile-image">
                <img
                  src={playlist.images[0] ? playlist.images[0].url : ""}
                  alt={playlist.id}
                  id={playlist.id}
                ></img>
              </div>
              <div className="playlist-tile-info">
                <h2>{playlist.name}</h2>
                <h3>by {playlist.owner.display_name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mb_Search;
