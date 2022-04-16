import React from "react";

import "./index.css";

import Dashboard from "./dashboard/dashboard";
import Login from "./login/login.js";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

const code = new URLSearchParams(window.location.search).get("code");
const type = new URLSearchParams(window.location.search).get("type");

root.render(
    <React.StrictMode>
        {code ? <Dashboard code={code} type={type} /> : <Login />}
    </React.StrictMode>
);
