import Path from "../../1-2-3-helpers/Path";
import { getAbsolutePoint, partial, pipe } from "../../1-2-3-helpers/utils";
import { ABS_HEIGHT, ABS_WIDTH, STEP } from "./config";

const abs = getAbsolutePoint(ABS_WIDTH / 2, ABS_HEIGHT / 2, STEP);
const shiftXorY = ([x, y], shiftX, shiftY) => [
  x + (shiftX ? 0.5 : 0),
  y + (shiftY ? 0.5 : 0),
];

export default class CPath extends Path {
  constructor({
    thickness = 2,
    color = "black",
    shouldApplyLinear = false,
  } = {}) {
    super({ thickness, color });
    this.shouldApplyLinear = shouldApplyLinear;
  }

  moveTo(x, y, { shiftX = false, shiftY = false } = {}) {
    const shift = partial(shiftXorY, shiftY, shiftX);
    const linear = this.shouldApplyLinear ? [move, rotate, scale] : [];
    [x, y] = pipe(...linear, abs, shift)([x, y]);
    super.moveTo(x, y);
  }

  lineTo(x, y, { shiftX = false, shiftY = false } = {}) {
    const shift = partial(shiftXorY, shiftY, shiftX);
    const linear = this.shouldApplyLinear ? [move, rotate, scale] : [];
    [x, y] = pipe(...linear, abs, shift)([x, y]);
    super.lineTo(x, y);
  }
}

function move([x, y]) {
  const { dx, dy } = window.screen2;
  return [x + dx, y + dy];
}

function scale([x, y]) {
  let { scale } = window.screen2;
  return [x * scale, y * scale];
}

function rotate([x, y]) {
  return [x, y];
  /*  const { rotate } = window.screen2;
    return rotatePoint(point, [0, 0], rad(rotate));*/
}
