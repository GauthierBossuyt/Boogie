import "./login.css";
import Lottie from "lottie-react";
import visuals from "../images/animations/visual.json";
import voting from "../images/animations/voting.json";
import settings from "../images/animations/settings.json";
import Logo from "../images/SVG/title.svg";
import Scroll_Down from "../images/SVG/scroll_down.svg";
import { loginURL } from "./spotify";

const interactivity = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.25],
      type: "stop",
      frames: [1],
    },
    {
      visibility: [0.25, 0.6],
      type: "seek",
      frames: [1, 29],
    },
    {
      visibility: [0.6, 1.0],
      type: "stop",
      frames: [29],
    },
  ],
};

const visual_interactivity = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.15],
      type: "stop",
      frames: [1],
    },
    {
      visibility: [0.15, 0.4],
      type: "seek",
      frames: [1, 120],
    },
    {
      visibility: [0.4, 1],
      type: "stop",
      frames: [120],
    },
  ],
};

function Login() {
  return (
    <div className="Login_screen">
      <div className="Login_intro">
        <div className="login_title">
          <img className="logo" src={Logo} alt="Boogie Logo"></img>
          <div className="login_buttons">
            <a href={loginURL}>
              <p>Continue Here</p>
            </a>
            <p>Paid subscription is required!</p>
          </div>
        </div>
        <div className="Login">
          <div
            className="scroll_down"
            onClick={() => {
              window.scrollBy({ top: 650, behavior: "smooth" });
            }}
          >
            <img src={Scroll_Down} />
            <p>Scroll down to learn more.</p>
          </div>
        </div>
      </div>
      <div className="login_explanation">
        <div className="boogie-mission">
          <p>
            Boogie enriches the Spotify experience by giving everyone a voice
            through its voting system, while the audio-reactive visuals enchant
            the atmosphere and the moderation tool keeps it fun.
          </p>
        </div>
        <div className="login-voting">
          <Lottie
            id="voting_animation"
            animationData={voting}
            interactivity={interactivity}
            alt="Animation showing how the voting system works."
          />
          <div className="login-div">
            <h1>
              Your <span>opinion</span> matters
            </h1>
            <p>
              The voting system brings everyone in control. The user can vote
              for the song they believe should follow and pick out tracks others
              can vote for.
            </p>
          </div>
        </div>
        <div className="login-settings">
          <div className="login-div setting-div">
            <h1>
              For <span>Anyone</span> Anywhere
            </h1>
            <p>
              Boogie's moderation tool makes sure the fun never ends and can be
              used in any environment, large or small.
            </p>
          </div>
          <Lottie
            id="setting_animation"
            animationData={settings}
            interactivity={interactivity}
            alt="Animation showing how the voting system works."
          />
        </div>
        <div className="login-visuals">
          <div className="visuals-div">
            <h1>
              <span>Visual</span> Enrichment
            </h1>
            <p>
              Boogie's focus goes beyond just listening to music together. It
              also provides generated audio-reactive visuals to enchant the
              experience even more.
            </p>
          </div>
          <Lottie
            id="setting_animation"
            animationData={visuals}
            interactivity={visual_interactivity}
            alt="Animation showing how the voting system works."
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
