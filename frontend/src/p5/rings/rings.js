import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import Ring from "./ring";
let ringArray = [];

const Rings = ({ triggerRate }) => {
  const width = window.innerWidth - 5;
  const height = window.innerHeight - 5;
  const [newSong, setNewSong] = useState(true);

  let effectDurationInFrames = triggerRate / 2;

  useEffect(() => {
    setNewSong(false);
    setTimeout(() => {
      setNewSong(true);
    }, 500);
  }, [triggerRate]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.frameRate(60);
    let start = p5.random(1000);
    for (let x = 0; x < 25; x++) {
      ringArray.push(new Ring(p5, start, triggerRate));
      start += 5;
    }
  };

  const draw = (p5) => {
    let boolean;
    p5.frameCount % triggerRate < effectDurationInFrames
      ? (boolean = true)
      : (boolean = false);
    if (boolean) {
      p5.background(5, 4, 1);
      ringArray.forEach((element) => {
        element.draw();
      });
    }
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Rings;
