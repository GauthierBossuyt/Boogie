import React from "react";
import { isMobile } from "react-device-detect";
import "./index.css";

import Dashboard from "./dashboard/dashboard.js";
import Login from "./login/login.js";
import Session from "./session/session.js";
import Mb_Session from "./mb_session/mb_session";
import Visual from "./visuals/visual";
import P5 from "./p5/p5";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

const code = new URLSearchParams(window.location.search).get("code");

root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={code ? <Dashboard code={code} type={"Spotify"} /> : <Login />}
      />
      <Route
        path="/session"
        element={isMobile ? <Mb_Session /> : <Session />}
      />
      <Route path="/visual" element={<Visual />} />
      <Route path="/p5" element={<P5 BPM={120} />} />
    </Routes>
  </Router>
);
