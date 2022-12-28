import CPath from "./CPath";
import curvePoint from "./curve";
import { rad } from "../../1-2-3-helpers/utils";

export default function generateShape(
  angleFrom = 1,
  angleTo = 179,
  diameter = 10
) {
  const path = new CPath({ shouldApplyLinear: true });

  for (let angle = angleFrom; angle < angleTo; angle++) {
    if (angle === 0 || angle === 190) continue;
    path.line(
      curvePoint(diameter, rad(90 - angle)),
      curvePoint(diameter, rad(90 - angle + 1))
    );
  }

  path.closePath();
  return path;
}
