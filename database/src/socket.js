const { Server } = require("socket.io");
const FRONTEND_PORT = 3000;

class Socket {
    constructor() {
        this.io;
    }

    initialize(server) {
        this.io = new Server(server, {
            cors: {
                origin: `http://localhost:${FRONTEND_PORT}`,
            },
        });

        this.io.on("connection", (socket) => {
            console.log(`User: ${socket.id} has connected!`);

            socket.on("disconnect", (e) => {
                console.log(`User: ${socket.id} has disconnected!`);
            });
        });
    }
}

module.exports = new Socket();
