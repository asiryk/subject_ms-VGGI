import Path from "./Path";
import { absolutePoint, requireNonNull } from "./utils";

/**
 * Path that accepts relative coordinates with {x: 0, y: 0} in the center of canvas
 */
export default class RPath extends Path {
  constructor({ thickness = 2, color = "black", width, height, step } = {}) {
    super({ thickness, color });
    requireNonNull(width);
    requireNonNull(height);
    requireNonNull(step);
    this.abs = absolutePoint(width * step, height * step, step);
  }

  moveTo(x, y) {
    [x, y] = this.abs([x, y]);
    super.moveTo(x, y);
  }

  lineTo(x, y) {
    [x, y] = this.abs([x, y]);
    super.lineTo(x, y);
  }
}
