const { Server } = require("socket.io");
const FRONTEND_PORT = 3000;

class Socket {
    constructor() {
        this.io;
        this.roomData = {};
        this.members = {};
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

                if (this.members[socket.id]) {
                    let roomcode = this.members[socket.id].room;

                    //Remove member from room
                    let index = this.roomData[roomcode].members.indexOf(
                        socket.id
                    );
                    if (index > -1) {
                        this.roomData[roomcode].members.splice(index, 1);
                    }
                    this.io
                        .in(roomcode)
                        .emit("person left", this.roomData[roomcode].members);

                    //Remove room if not users are left
                    if (this.roomData[roomcode].members.length <= 0) {
                        delete this.roomData[roomcode];
                    }

                    //Remove user from user object
                    delete this.members[socket.id];
                }
            });

            this.joinEvents(socket);
            this.statusEvents(socket);
            this.queueEvents(socket);
            this.votingEvents(socket);
        });
    }

    joinEvents(socket) {
        socket.on("join", (room_id) => {
            if (!this.roomData[room_id]) {
                this.roomData[room_id] = {
                    queue: [],
                    members: [],
                    banned_member: [],
                    banned_songs: [],
                    current_song: {},
                    voting: {},
                    host: "",
                };
            }
            socket.join(room_id);
            if (this.roomData[room_id].members.length === 0) {
                this.roomData[room_id].host = socket.id;
            }
            this.roomData[room_id].members.push(socket.id);
            this.members[socket.id] = { room: room_id };
            this.io.in(room_id).emit("person joined", this.roomData[room_id]);
        });
    }

    statusEvents(socket) {
        socket.on("room status", (room_id) => {
            this.io.to(socket.id).emit("room info", this.roomData[room_id]);
        });
    }

    queueEvents(socket) {
        socket.on("add song to queue", (object, room_id) => {
            if (this.roomData[room_id]) {
                if (
                    this.roomData[room_id].queue
                        .map((e) => e.id)
                        .indexOf(object.id) === -1
                ) {
                    this.roomData[room_id].queue.push(object);
                    this.io
                        .in(room_id)
                        .emit("successfully added song to queue", object.id);
                }
            }
        });

        socket.on("get queue", (room_id) => {
            if (this.roomData[room_id]) {
                this.io
                    .to(socket.id)
                    .emit("send queue", this.roomData[room_id].queue);
            }
        });
    }

    votingEvents(socket) {
        socket.on("start voting", (room_id) => {
            if (socket.id === this.roomData[room_id].host) {
                this.io.in(room_id).emit("voting status", false);
                let queueLength = this.roomData[room_id].queue.length;

                switch (queueLength) {
                    case 0:
                        console.log("Voting skipped for now");

                        break;

                    case 1:
                        console.log("add to spotify queue");
                        let song_id = this.roomData[room_id].queue.shift();
                        this.io
                            .to(this.roomData[room_id].host)
                            .emit("add song to queue", song_id);
                        break;

                    case 2:
                        console.log("2 up for voting");

                        break;

                    case queueLength >= 3:
                        console.log("3 up for voting");
                        break;

                    default:
                        break;
                }
                this.io.in(room_id).emit("voting status", true);
            }
        });
    }
}

module.exports = new Socket();
