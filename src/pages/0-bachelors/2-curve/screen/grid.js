import { drawAxes, drawGrid } from "../../1-2-3-helpers/girdRel";
import CPath from "./CPath";
import { MAX_X, MAX_Y } from "./config";

export function getGrid() {
  const path = new CPath({ thickness: 1, color: "#6F91C4" });
  return drawGrid(MAX_X, MAX_Y, path);
}

export function getAxes() {
  const path = new CPath({ thickness: 2, color: "#6F91C4" });
  return drawAxes(MAX_X, MAX_Y, path);
}
