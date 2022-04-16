import React from "react";
import "./room.css";

function Room() {
    return (
        <div className="room-options">
            <div className="room-join">
                <h1>Join A Room</h1>
                <p>
                    Fill in the room code to join a room. The code can be found
                    within the room at the top of the screen.
                </p>
                <a className="cta-button" href="https://google.com">
                    Join Room
                </a>
            </div>
            <div className="room-create">
                <h1>Create A Room</h1>
                <p>
                    Create a session to jam together in a room. You can invite
                    friends by sharing the room code.
                </p>
                <a className="border-button" href="https://google.com">
                    Create Room
                </a>
            </div>
        </div>
    );
}

export default Room;
