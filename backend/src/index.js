const HTTP = require("http");
const PORT = process.env.BACKEND_PORT | 8000;
const EXPRESS = require("./server.js");
const SOCKET = require("./socket.js");

const SERVER = HTTP.createServer(EXPRESS);
SOCKET.initialize(SERVER);

SERVER.listen(PORT, () => {
    console.log(`BOOGIE API is succesfully running on ${PORT}`);
});
