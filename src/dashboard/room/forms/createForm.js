import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";

const CreateForm = (func) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(func.accessToken);
  }, [func]);

  function formResultToObject(e) {
    e.preventDefault();
    setError(false);
    let result = { host: func.data.display_name, email: func.data.email };
    for (let i = 0; i < e.target.length - 2; i++) {
      if (e.target[i].type === "checkbox") {
        result[e.target[i].id] = e.target[i].checked;
      } else {
        result[e.target[i].id] = e.target[i].value;
      }
    }
    setLoading(true);
    createRoom(result);
  }

  async function createRoom(data) {
    let result = await fetch("https://boogie-api.herokuapp.com/rooms", {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room: data }),
    }).then((resp) => resp.json());
    if (result.ERROR) {
      setError(result.ERROR);
      setLoading(false);
    } else if (result.room) {
      // window.location = `/session/${result.room.host}/${result.room.code}`;
      navigate("/session", {
        state: {
          accessToken: token,
          sessionCode: result.room.code,
        },
      });
    }
  }

  return (
    <div className="create-form">
      {!loading ? (
        <div className="create-form-content">
          <h1>Create A Room</h1>
          {error.length > 0 ? <p className="error-message">{error}</p> : ""}
          <form
            onSubmit={(e) => {
              formResultToObject(e);
            }}
          >
            <div className="create-form-inputs">
              <label>
                <h3>Name</h3>
                <input
                  id="name"
                  name="room_name"
                  type="text"
                  placeholder="Room name"
                  minLength={4}
                />
              </label>
              <label>
                <h3>Description</h3>
                <textarea
                  id="description"
                  name="room_description"
                  placeholder="Write here the description of your room."
                ></textarea>
              </label>

              <div className="radio-option">
                <div className="radio-option-info">
                  <h2>Party mode</h2>
                  <p>Creates a playlist and aftermovie afterwards.</p>
                </div>
                <div className="radio">
                  <label className="switch">
                    <input type="checkbox" id="party" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              {/* <div className="radio-option">
                <div className="radio-option-info">
                  <h2>Save Data</h2>
                  <p>Save data for statistics tests.</p>
                </div>
                <div className="radio">
                  <label className="switch">
                    <input type="checkbox" id="save_data" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div> */}
            </div>
            <div className="create-form-buttons">
              <button
                type="button"
                className="border-button"
                onClick={() => {
                  func.func("selection");
                }}
              >
                Back
              </button>
              <button className="cta-button submit-button" type="submit">
                Create Room
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-form-loading">
          <h2>Your room is being created</h2>
          <div className="loading-animation">
            <span className="loading-ball" id="loading-ball1">
              {" "}
            </span>
            <span className="loading-ball" id="loading-ball2">
              {" "}
            </span>
            <span className="loading-ball" id="loading-ball3">
              {" "}
            </span>
          </div>
          <button
            className="border-button"
            onClick={() => {
              setLoading(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
