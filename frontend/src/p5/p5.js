import "./p5.css";
import React, { useEffect, useRef, useState } from "react";
import Acoustic from "./acoustic/acoustic";
import Moon from "./moon/moon";
import Rings from "./rings/rings";

const P5 = ({ BPM }) => {
  const [songType, setSongType] = useState("");
  const [triggerRate, setTriggerRate] = useState(0);
  const test = useRef(BPM);
  const types = ["acoustic", "moon", "rings"];

  useEffect(() => {
    setTriggerRate(Math.floor(3600 / BPM));
    setSongType("rings");
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        setSongType("acoustic");
        break;
      case 1:
        setSongType("moon");
        break;
      case 2:
        setSongType("rings");
        break;
      default:
        break;
    }
    console.log(BPM);
  }, [BPM]);

  return (
    <div className="p5-screen" ref={test}>
      {songType === "acoustic" && (
        <Acoustic id="acoustic" triggerRate={triggerRate} />
      )}
      {songType === "moon" && <Moon id="Moon" triggerRate={triggerRate} />}
      {songType === "rings" && <Rings triggerRate={triggerRate} />}
    </div>
  );
};

export default P5;
