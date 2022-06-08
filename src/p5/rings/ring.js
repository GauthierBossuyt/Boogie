const R = 255;
const G = 45;
const B = 107;

const Width = window.innerWidth - 5;
const Height = window.innerHeight - 5;

export default function Ring(p5, start, triggerRate) {
  this.cx = Width / 2;
  this.cy = Height / 2;
  this.a = 0;
  this.rad = Height / 4;
  this.totalDegrees = 370;
  this.start = start;
  this.direction = "out";

  this.draw = () => {
    p5.angleMode(p5.DEGREES);
    p5.noFill();
    p5.stroke(R, G, B, this.a);
    p5.beginShape();

    for (let i = 0; i <= this.totalDegrees; i++) {
      let noiseFactor = p5.noise(i / 40, this.start / 320);
      let x = this.cx + this.rad * p5.cos(i) * noiseFactor;
      let y = this.cy + this.rad * p5.sin(i) * noiseFactor;
      p5.curveVertex(x, y);
    }

    if (this.direction === "out") {
      if (this.rad > Height - Height / 3.5) {
        this.direction = "in";
      } else {
        this.rad += 0.45;
        this.a += 1;
      }
    } else {
      if (this.rad <= Height / 4) {
        this.rad = Height / 4;
        this.direction = "out";
      } else {
        this.rad -= 0.45;
      }
    }

    p5.endShape(p5.CLOSE);
    this.start += (60 - triggerRate) / 10;
  };
}
