import CPath from "./CPath";
import curvePoint from "./curve";
import { rad } from "../../1-2-3-helpers/utils";
import { MAX_X, MAX_Y } from "./config";

export function drawTangent() {
  const path = new CPath({ shouldApplyLinear: true, color: "green" });
  const { angleCurrent, d } = window.screen2;
  const theta = rad(90) - rad(angleCurrent);
  const [x, y] = curvePoint(d, theta);
  const k = -2 * Math.cos(theta) ** 3 * Math.sin(theta);

  path.line([-MAX_X, y + k * (-MAX_X - x)], [MAX_X, y + k * (MAX_X - x)]);

  return path;
}

export function drawNormal() {
  const path = new CPath({ shouldApplyLinear: true, color: "red" });
  const { angleCurrent, d } = window.screen2;
  if (angleCurrent === 90) {
    path.line([0, MAX_Y], [0, -MAX_Y]);
    return path;
  }

  const theta = rad(90) - rad(angleCurrent);
  const [x, y] = curvePoint(d, theta);
  const k = -2 * Math.cos(theta) ** 3 * Math.sin(theta);

  path.line(
    [-MAX_X, y - (1 / k) * (-MAX_X - x)],
    [MAX_X, y - (1 / k) * (MAX_X - x)]
  );

  return path;
}
