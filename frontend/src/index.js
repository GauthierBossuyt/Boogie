import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Dashboard from "./dashboard/dashboard";
import Login from "./login/login.js";

const code = new URLSearchParams(window.location.search).get("code");
const type = new URLSearchParams(window.location.search).get("type");

ReactDOM.render(
    <React.StrictMode>
        {code && type ? <Dashboard code={code} type={type} /> : <Login />}
    </React.StrictMode>,
    document.getElementById("root")
);
