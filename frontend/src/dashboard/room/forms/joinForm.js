import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import "./forms.css";

const JoinForm = (func) => {
  const navigate = useNavigate();
  const input1 = React.createRef();
  const input2 = React.createRef();
  const input3 = React.createRef();
  const input4 = React.createRef();

  const [ERROR, setError] = useState("");

  function OnFocus(e) {
    if (e.target.value.length > 0) {
      switch (e.target.nextSibling.id) {
        case "2":
          input2.current.focus();
          break;
        case "3":
          input3.current.focus();
          break;
        case "4":
          input4.current.focus();
          break;
        default:
          break;
      }
    }
  }

  async function onSubmit(value) {
    setError("");
    value = value.toUpperCase();
    let res = await fetch(`http://localhost:8080/rooms?code=${value}`).then(
      (resp) => {
        return resp.json();
      }
    );
    if (res.room) {
      console.log(res.room);
      navigate("/session", {
        state: {
          accessToken: func.accessToken,
          sessionCode: res.room.code,
          service: func.type,
        },
      });
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="join-form">
      <div className="join-form-content">
        <h1>Fill in the room code</h1>
        {ERROR.length > 0 ? <p className="error-message">{ERROR}</p> : ""}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let value = "";
            for (let i = 0; i < 4; i++) {
              value += e.target[i].value;
            }
            onSubmit(value);
          }}
        >
          <div className="input-fields">
            <input
              type="text"
              ref={input1}
              maxLength={1}
              id="1"
              onChange={OnFocus}
            ></input>
            <input
              type="text"
              ref={input2}
              id="2"
              onChange={OnFocus}
              maxLength={1}
            ></input>
            <input
              type="text"
              ref={input3}
              id="3"
              onChange={OnFocus}
              maxLength={1}
            ></input>
            <input type="text" ref={input4} id="4" maxLength={1}></input>
          </div>
          <button
            type="button"
            className="border-button mb-hide"
            onClick={() => {
              func.func("selection");
            }}
          >
            Back
          </button>
          <button className="cta-button submit-button" type="submit">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
