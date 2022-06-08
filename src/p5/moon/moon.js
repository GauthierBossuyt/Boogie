import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

// Chris Eaves 2021
// https://twitter.com/Numerus_Artifex
// https://www.instagram.com/numerus_artifex/
// https://openprocessing.org/sketch/1328658

const Moon = ({ triggerRate }) => {
  const [newSong, setNewSong] = useState(true);
  const width = window.innerWidth - 5;
  const height = window.innerHeight - 5;
  let effectDurationInFrames = triggerRate / 2;
  let time = 0;

  useEffect(() => {
    setNewSong(false);

    setTimeout(() => {
      setNewSong(true);
    }, 500);
  }, [triggerRate]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.frameRate(60);
    p5.background(5, 4, 1);
    time = p5.random(666);
  };

  const draw = (p5) => {
    p5.translate(width / 2, height / 2);
    p5.rotate(-1.57);
    p5.background(5, 4, 1);
    p5.stroke(5, 4, 1);
    p5.strokeWeight(1);

    time += 0.025;
    if (p5.frameCount % triggerRate < effectDurationInFrames) {
      time += (60 - triggerRate) / 1000;
    }

    let noiseDensity = 25;
    //Noise steps the lower the smaller the "smoother"
    let noiseScale = 0.008;
    //Height and width of circle
    let rad = width < height ? width / 3 : height / 3;
    //Amount of horizontal lines
    let inc = 3.14 / 120;

    for (let a1 = 0, a2 = 0; a1 < 3.14; a2 -= inc, a1 += inc) {
      let x1 = p5.cos(a2) * rad;
      let y1 = p5.sin(a2) * rad;

      let x2 = p5.cos(a1) * rad;
      let y2 = p5.sin(a1) * rad;

      let lineLength = p5.dist(x1, y1, x2, y2);
      let segments = p5.ceil(lineLength / noiseDensity);

      p5.noFill();
      p5.stroke(255, 45, 107);
      p5.beginShape();

      for (let l = 0; l < segments; l++) {
        let y = p5.lerp(y1, y2, l / segments);
        let n = p5.noise(x1 * noiseScale - time, y * noiseScale + time, -time);
        let o = n * (rad - p5.dist(x1, y, 0, 0));
        o *= 0.65;

        p5.strokeWeight(n * 0.7);
        p5.vertex(x1 + o, y);
      }
      p5.vertex(x1, y2);
      p5.endShape();
    }
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Moon;
