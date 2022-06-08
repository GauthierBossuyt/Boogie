const AMP_MULT = 50;

export default function acousticString(p5, freq, midpoint, length) {
  this.freq = freq;
  this.mid = midpoint;
  this.length = length;
  this.amp = 0;
  this.isVibrating = false;
  this.framesSincePluck = 0;

  this.draw = () => {
    p5.stroke(255, 45, 107);
    if (!this.isVibrating) {
      p5.line(this.mid.x + 50, 0, this.mid.x + 50, length);
    } else {
      p5.noFill();
      p5.beginShape();
      for (let x = 0; x < this.length; x++) {
        const arc =
          this.amp *
          Math.sin((6.24 * x) / (this.length / 2)) *
          Math.cos((6.24 * this.freq * this.framesSincePluck) / 60) *
          AMP_MULT;
        p5.vertex(this.mid.x + 50 + arc, this.mid.y - x);
      }
      p5.endShape();
    }
  };

  this.update = () => {
    if (this.isVibrating) {
      this.amp *= 0.95;
      this.framesSincePluck += 1;

      if (this.amp < 0.05) {
        this.isVibrating = false;
        this.amp = 0;
        this.framesSincePluck = 0;
      }
    }
  };

  this.pluck = () => {
    this.isVibrating = true;
    this.amp = 1;
    this.framesSincePluck = 0;
  };
}
