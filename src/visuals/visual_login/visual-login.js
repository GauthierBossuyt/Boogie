import "./visual-login.css";
import { useRef, useState } from "react";

const Visual_login = ({ setCode, setisLoggedIn }) => {
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
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
    let res = await fetch(
      `https://boogie-api.herokuapp.com/rooms?code=${value}`
    ).then((resp) => {
      return resp.json();
    });
    if (res.room) {
      if (res.room.code) {
        setCode(res.room.code);
        setisLoggedIn(true);
      } else {
        setError("Room code not found!");
      }
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="visual-login">
      <div className="visual-login-container">
        <h1>Generate Visuals</h1>
        <h2>Fill in the room code.</h2>
        <p>
          After you fill in your room code visuals will be generated based on
          the current playing song.
        </p>{" "}
        {ERROR.length > 0 ? <p className="error-message">{ERROR}</p> : ""}
        <div className="visual-login-inputs">
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
              className="cta-button visual-sbm-button submit-button"
              type="submit"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Visual_login;
