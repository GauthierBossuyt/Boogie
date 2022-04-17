import React, { useState } from "react";
import Boogie_Logo from "../images/SVG/Logo.svg";
import Spotify from "../images/SVG/Spotify_white.svg";
import Arrow from "../images/SVG/arrow.svg";
import "./nav.css";

const Navigation = ({ account, func }) => {
    const [navState, setNavState] = useState(false);
    return (
        <nav>
            <img
                onClick={() => {
                    func("selection");
                }}
                className="nav_logo"
                src={Boogie_Logo}
                alt="Boogie Logo"
            />
            <div
                className="nav_dropdown"
                onMouseEnter={() => {
                    setNavState(!navState);
                }}
                onMouseLeave={() => {
                    setNavState(!navState);
                }}
            >
                <div className="nav_topbar">
                    <img
                        className="nav_service"
                        src={Spotify}
                        alt="Spotify Logo"
                    />
                    <h2>{account.display_name}</h2>
                    <img className="nav_arrow" src={Arrow} alt="arrow icon" />
                </div>
                {navState ? (
                    <div className="nav_botbar">
                        <a href="/">Disconnect</a>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </nav>
    );
};

export default Navigation;
