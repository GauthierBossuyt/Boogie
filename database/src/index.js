console.log("Hello world!");
console.log("this is a test");
const { database } = require("./database.js");

async function initialise() {
    await database.initializeTables();
}

initialise();
