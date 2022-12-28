import {
  circlePoint,
  getAbsolutePoint,
  getRelativePoint,
  identity,
  pipe,
  rad,
  rotatePoint,
} from "../../1-2-3-helpers/utils";
import { HEIGHT, STEP, WIDTH } from "./config";
import Path from "../../1-2-3-helpers/Path";

const Ox = WIDTH / 2;
const Oy = HEIGHT / 2;

export default class TPath extends Path {
  constructor({
    thickness = 2,
    color = "black",
    shouldApplyLinear = true,
  } = {}) {
    super();
    this.thickness = thickness;
    this.color = color;
    this.shouldApplyLinear = !!shouldApplyLinear;
  }

  moveTo(x, y) {
    const applyLinearOrDoNothing = this.shouldApplyLinear
      ? applyLinear
      : identity;
    super.moveTo(
      ...pipe(applyLinearOrDoNothing, applyProjective, applyAffine)([x, y])
    );
  }

  lineTo(x, y) {
    const applyLinearOrDoNothing = this.shouldApplyLinear
      ? applyLinear
      : identity;
    super.lineTo(
      ...pipe(applyLinearOrDoNothing, applyProjective, applyAffine)([x, y])
    );
  }

  line(pointFrom, pointTo) {
    this.moveTo(...pointFrom);
    this.lineTo(...pointTo);
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    const oneDeg = Math.PI / 180;
    for (let theta = startAngle; theta < endAngle; theta += oneDeg) {
      this.moveTo(...circlePoint(x, y, radius, theta, !anticlockwise));
      this.lineTo(...circlePoint(x, y, radius, theta + oneDeg, !anticlockwise));
    }
  }

  render(ctx) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
    ctx.stroke(this);
  }
}

function applyLinear(point) {
  return pipe(move, rotate, scale)(point);
}

function applyProjective([x, y]) {
  const { a00, a01, a02, a10, a11, a12, a20, a21, a22 } =
    window.screen1.projective;
  [x, y] = getRelativePoint(Ox, Oy, STEP)([x, y]);
  const denominator = a12 * x + a22 * y + a02; // a02 - weight
  const numeratorX = a10 * a12 * x + a20 * a22 * y + a00; // a00 - shift x
  const numeratorY = a11 * a12 * x + a21 * a22 * y + a01; // a11 - shift y
  return getAbsolutePoint(
    Ox,
    Oy,
    STEP
  )([numeratorX / denominator, numeratorY / denominator]);
}

function applyAffine([x, y]) {
  const { a, b, c, d, e, f } = window.screen1.affine;
  [x, y] = getRelativePoint(Ox, Oy, STEP)([x, y]);
  const x1 = a * x + b * y + c;
  const y1 = d * x + e * y + f;
  return getAbsolutePoint(Ox, Oy, STEP)([x1, y1]);
}

function move([x, y]) {
  const { dx, dy } = window.screen1.linear;
  return [x + dx * STEP, y - dy * STEP];
}

function scale([x, y]) {
  let { scale } = window.screen1.linear;
  const [relX, relY] = getRelativePoint(Ox, Oy, STEP)([x, y]);
  return getAbsolutePoint(Ox, Oy, STEP)([relX * scale, relY * scale]);
}

function rotate(point) {
  const { rotX, rotY, angle } = window.screen1.linear;
  return getAbsolutePoint(
    Ox,
    Oy,
    STEP
  )(
    rotatePoint(getRelativePoint(Ox, Oy, STEP)(point), [rotX, rotY], rad(angle))
  );
}
