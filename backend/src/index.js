const PORT = process.env.BACKEND_PORT | 8000;
const SERVER = require("./server.js");

SERVER.listen(PORT, () => {
    console.log(`BOOGIE API is succesfully running on ${PORT}`);
});
