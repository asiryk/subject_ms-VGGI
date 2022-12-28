import TPath from "./TPath";
import { drawAxes, drawGrid } from "../../1-2-3-helpers/gridAbs";

export function getGrid(width, height, cellSize) {
  const path = new TPath({
    thickness: 1,
    color: "#6F91C4",
    shouldApplyLinear: false,
  });
  return drawGrid(width, height, cellSize, path);
}

export function getAxes(width, height) {
  const path = new TPath({
    thickness: 2,
    color: "#6F91C4",
    shouldApplyLinear: false,
  });
  return drawAxes(width, height, path);
}
