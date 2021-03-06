import "./mb_info.css";

const Mb_Info = ({ isHost }) => {
  return (
    <div className="mb-info-screen">
      <h1>Instructions</h1>
      <p>
        <span className="text-italics">
          The voting will start once the current song is done playing.
        </span>
        <br />
        If there is currently no song playing you can press refresh once a song
        is playing. A new voting session will only start when more than 2 songs
        are in the queue, if there is only one song it will automatically play
        next. When no songs are in the queue the voting session will be skipped.
      </p>
      {isHost ? (
        <a href="https://boogie.brussels/visual" target="_blank">
          Activate Visuals
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default Mb_Info;
