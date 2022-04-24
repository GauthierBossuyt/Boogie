import React from "react";

import "./index.css";

import Dashboard from "./dashboard/dashboard.js";
import Login from "./login/login.js";
import Session from "./session/session.js";
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
                element={
                    code ? (
                        <Dashboard code={code} type={"Spotify"} />
                    ) : (
                        <Login />
                    )
                }
            />
            <Route path="/session" element={<Session />} />
        </Routes>
    </Router>
);
