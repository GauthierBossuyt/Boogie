import React from "react";
import "./selection.css";

function Selection(func) {
  return (
    <div className="room-options">
      <div className="room-join">
        <h1>Join A Room</h1>
        <p>
          Fill in the room code to join a room. The code can be found within the
          room at the top of the screen.
        </p>
        <button
          onClick={() => {
            func.func("joinRoom");
          }}
          className="cta-button"
        >
          Join Room
        </button>
      </div>
      <div className="room-create">
        <h1>Create A Room</h1>
        <p>
          Create a session to jam together in a room. You can invite friends by
          sharing the room code.
        </p>
        <button
          onClick={() => {
            func.func("createRoom");
          }}
          className="border-button"
        >
          Create Room
        </button>
      </div>
    </div>
  );
}

export default Selection;
