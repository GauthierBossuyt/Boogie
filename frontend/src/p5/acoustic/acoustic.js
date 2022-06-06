import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import acousticString from "./acoustic_string";

const Acoustic = ({ triggerRate }) => {
  const strings = [];
  const width = window.innerWidth - 5;
  const height = window.innerHeight - 5;
  const [newSong, setNewSong] = useState(true);

  useEffect(() => {
    setNewSong(false);
    setTimeout(() => {
      setNewSong(true);
    }, 500);
  }, [triggerRate]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.frameRate(60);
    for (let x = 0; x < Math.floor(width / 100); x++) {
      strings.push(
        new acousticString(p5, 5, p5.createVector(0 + x * 100, height), height)
      );
    }
  };

  const draw = (p5) => {
    p5.background(5, 4, 1);

    strings.forEach((element) => {
      element.update();
      element.draw();
    });

    if (p5.frameCount % triggerRate === 0) {
      triggerPluck();
    }
  };

  const triggerPluck = () => {
    strings.forEach((element) => {
      element.pluck();
    });
  };

  return <div>{newSong ? <Sketch setup={setup} draw={draw} /> : ""}</div>;
};

export default Acoustic;
