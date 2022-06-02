import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import "./dashboard.css";

import Navigation from "../navigation/nav";
import Selection from "./room/selection.js";
import CreateRoom from "./room/forms/createForm.js";
import JoinRoom from "./room/forms/joinForm.js";
import { isMobile } from "react-device-detect";

const spotifyApi = new SpotifyWebApi({
  clientId: "acce0f858d36481e8c57ced906643960",
});

const Dashboard = ({ code, type }) => {
  const accessToken = useAuth(code);
  const [Data, setData] = useState();
  const [Active, setActive] = useState("selection");
  const [Token, setToken] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((data) => {
      setData(data);
    });
    setToken(accessToken);
  }, [accessToken, type]);

  const changeContentState = (e) => {
    setActive(e);
  };

  return (
    <div className="dashboard">
      {Data ? (
        <div>
          <Navigation account={Data.body} func={changeContentState} />
          {isMobile ? (
            <div className="content">
              {Active === "selection" || Active === "joinRoom" ? (
                <div className="content-text">
                  <h1>Start Jamming</h1>
                  <p>Fill in the room code to join a room!</p>
                  <div className="content-input">
                    <JoinRoom
                      func={changeContentState}
                      accessToken={Token}
                      type={type}
                    />
                    <h1>OR</h1>
                    <button
                      className="mb-border-button"
                      onClick={() => {
                        changeContentState("createRoom");
                      }}
                    >
                      Create Room
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <CreateRoom
                    func={changeContentState}
                    accessToken={Token}
                    type={type}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="content">
              {Active === "selection" ? (
                <Selection func={changeContentState} />
              ) : (
                ""
              )}
              {Active === "createRoom" ? (
                <CreateRoom
                  func={changeContentState}
                  accessToken={Token}
                  type={type}
                />
              ) : (
                ""
              )}
              {Active === "joinRoom" ? (
                <JoinRoom
                  func={changeContentState}
                  accessToken={Token}
                  type={type}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
