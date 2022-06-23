const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "https://boogie.brussels/";
const clientID = "acce0f858d36481e8c57ced906643960";

const scopes = [
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",

  "playlist-read-collaborative",
  "playlist-read-private",

  "user-read-email",
  "user-read-private",
];

export const loginURL = `${authEndpoint}?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}`;
