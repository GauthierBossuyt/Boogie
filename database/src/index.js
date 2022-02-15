const { database } = require("./database.js");
const SERVER = require("./server.js");
const PORT = process.env.DATABASE_PORT | 8080;

async function initialise() {
    await database.initializeTables();
}

initialise();


SERVER.listen(PORT, () => {
    console.log(`BOOGIE DATABASE API running on ${PORT}`);
});
