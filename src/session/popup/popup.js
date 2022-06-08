import "./popup.css";
import { useNavigate } from "react-router-dom";

const Popup = ({ isHost, setLeavePopUp }) => {
  const navigate = useNavigate();

  return (
    <div className="popup">
      <div
        className="popup-container"
        onClick={() => {
          setLeavePopUp(false);
        }}
      >
        <h2>Leaving the room?</h2>
        <p id="popup-text">
          {!isHost
            ? "Are you sure you want to leave the room? You can come back later usingthe code."
            : "Are you sure you want to leave the room? Your admin rights will be transferred to another member. You can end the room in the settings or rejoin using the code."}
        </p>
        <div className="popup-buttons">
          <button
            className="popup-cta"
            onClick={() => {
              navigate("/login");
            }}
          >
            Yes
          </button>
          <button
            className="popup-button"
            onClick={() => {
              setLeavePopUp(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
