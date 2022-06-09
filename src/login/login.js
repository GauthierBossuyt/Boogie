import "./login.css";
import Spotify_icon from "../images/SVG/Spotify.svg";
import Logo from "../images/SVG/Logo.svg";
import Apple_Icon from "../images/SVG/Apple.svg";
import { loginURL } from "./spotify";

function Login() {
  return (
    <div className="Login_page">
      <img className="logo" src={Logo} alt="Boogie Logo"></img>
      <div className="Login">
        <h1>Welcome to Boogie</h1>
        <p>A paid subscription from one of the services below is required.</p>
        <div className="login_buttons">
          <a id="Spotify" href={loginURL}>
            <img src={Spotify_icon} alt="Spotify icon"></img>
            <p>Continue using Spotify</p>
          </a>
          {/* <a id="Apple" href="https://www.google.com">
            <img src={Apple_Icon} alt="Spotify icon"></img>
            <p>Continue using Apple</p>
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
