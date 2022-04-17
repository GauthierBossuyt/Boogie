const { database } = require("./database.js");
const HTTP = require("http");
const EXPRESS = require("./server.js");
const SOCKET = require("./socket.js");
const PORT = process.env.DATABASE_PORT | 8080;

async function initialise() {
    await database.initializeTables();
}

initialise();

const SERVER = HTTP.createServer(EXPRESS);
SOCKET.initialize(SERVER);

SERVER.listen(PORT, () => {
    console.log(`BOOGIE DATABASE API running on ${PORT}`);
});
