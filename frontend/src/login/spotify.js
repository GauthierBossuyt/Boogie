const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/";
const clientID = "acce0f858d36481e8c57ced906643960";

const scopes = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",

    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",

    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",

    "app-remote-control",
    "streaming",

    "user-read-email",
    "user-read-private",

    "user-library-modify",
    "user-library-read",
];

export const loginURL = `${authEndpoint}?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes.join(
    "%20"
)}`;
