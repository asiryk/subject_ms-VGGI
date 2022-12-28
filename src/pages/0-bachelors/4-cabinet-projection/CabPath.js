import RPath from "./RPath";
import { rad } from "./utils";

const cabinet = ([x, y, z], angle) => [
  x + (z * Math.cos(angle)) / 2,
  y + (z * Math.sin(angle)) / 2,
];

/**
 * Path that performs 3d cabinet projection
 * https://en.wikipedia.org/wiki/Oblique_projection#Cabinet_projection
 */
export default class CabPath extends RPath {
  constructor({
    thickness = 2,
    color = "black",
    width,
    height,
    step,
    angle = 0,
  } = {}) {
    super({ thickness, color, width, height, step });
    this.angle = rad(angle);
  }

  lineTo(x, y, z) {
    [x, y] = cabinet([x, y, z], this.angle);
    super.lineTo(x, y);
  }

  moveTo(x, y, z) {
    [x, y] = cabinet([x, y, z], this.angle);
    super.moveTo(x, y);
  }
}
