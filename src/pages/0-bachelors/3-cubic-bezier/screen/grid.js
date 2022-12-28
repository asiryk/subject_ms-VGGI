import { drawAxes, drawGrid } from "../../1-2-3-helpers/gridAbs";
import BPath from "./BPath";
import { ABS_HEIGHT, ABS_WIDTH, STEP } from "./config";

export function getGrid() {
  const path = new BPath({ thickness: 1, color: "#6F91C4" });
  return drawGrid(ABS_WIDTH, ABS_HEIGHT, STEP, path);
}

export function getAxes() {
  const path = new BPath({ thickness: 2, color: "#6F91C4" });
  return drawAxes(ABS_WIDTH, ABS_HEIGHT, path);
}
