export default class Path extends Path2D {
  constructor({ thickness = 2, color = "black" } = {}) {
    super();
    this.thickness = thickness;
    this.color = color;
  }

  line(pointFrom, pointTo) {
    this.moveTo(...pointFrom);
    this.lineTo(...pointTo);
  }

  render(ctx) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
    ctx.stroke(this);
  }
}
