import "./search.css";
import Arrow from "../../images/SVG/black_arrow.svg";

const Search = ({ data, toggleContent, searchResult }) => {
    return (
        <div className="search_screen">
            <div className="search-title-bar">
                <h1>Your Playlists</h1>
                <button
                    onClick={() => {
                        toggleContent("voting");
                    }}
                    className="cta-button"
                >
                    {" "}
                    <img src={Arrow} alt="arrow icon" />
                    Back
                </button>
            </div>
            <div className="assortment">
                {data.map((playlist, i) => {
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
                                    src={
                                        playlist.images[0]
                                            ? playlist.images[0].url
                                            : ""
                                    }
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

export default Search;
