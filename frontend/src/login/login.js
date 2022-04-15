import "./login.css";
import Spotify_icon from "../images/SVG/Spotify.svg";
import Logo from "../images/SVG/Logo.svg";
import Apple_Icon from "../images/SVG/Apple.svg";
import { loginURL } from "./spotify";

function Login() {
    return (
        <div className="Login_page">
            <div className="Login">
                <img className="logo" src={Logo} alt="Boogie Logo"></img>
                <h1>Welcome to Boogie</h1>
                <p>
                    To use Boogie you will need a paid subscription for any of
                    the services below.
                </p>
                <div>
                    <a id="Spotify" href={loginURL}>
                        <img src={Spotify_icon} alt="Spotify icon"></img>
                        <p>Continue using Spotify</p>
                    </a>
                    <a id="Apple" href="https://www.google.com">
                        <img src={Apple_Icon} alt="Spotify icon"></img>
                        <p>Continue using Apple Music</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
