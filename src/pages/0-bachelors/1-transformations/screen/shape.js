import { HEIGHT, STEP, WIDTH } from "./config";
import { circlePoint, rad } from "../../1-2-3-helpers/utils";
import TPath from "./TPath";

const Ox = WIDTH / 2;
const Oy = HEIGHT / 2;

const asin = Math.asin;
const sqrt = Math.sqrt;

export default function generateShape(r1, r2, r3, r4) {
  const path = new TPath();

  const R = 2 * r1;
  const y1 = r1 - r3;
  const y2 = r1 - r3 + r2;

  {
    const yTop = (R ** 2 - r2 ** 2 + y2 ** 2) / (2 * y2);

    {
      // 1. The biggest circle
      const yBot = (r1 + sqrt(r1 ** 2 - 2 * (r1 ** 2 - R ** 2))) / 2;
      const angleTop = R > yTop ? asin(yTop / R) : rad(90);
      const angleBot = asin(yBot / R);

      path.arc(Ox, Oy, R * STEP, -angleBot, angleTop, true);
      path.arc(
        Ox,
        Oy,
        R * STEP,
        rad(180) - angleTop,
        rad(180) + angleBot,
        true
      );

      {
        // 45deg lines at the bottom
        path.line(
          [Ox, Oy + r1 * STEP],
          circlePoint(Ox, Oy, R * STEP, -angleBot)
        );
        path.line(
          [Ox, Oy + r1 * STEP],
          circlePoint(Ox, Oy, R * STEP, rad(180) + angleBot)
        );
      }
    }

    {
      // 2. Inner circle
      const yBot = (r3 ** 2 - r2 ** 2 - y1 ** 2 + y2 ** 2) / (2 * (y2 - y1));
      const angleBot = asin((y2 - yBot) / r2);
      const angleTop = r2 > yTop - y2 ? asin((yTop - y2) / r2) : rad(90);

      const y = Oy - y2 * STEP;
      const r = r2 * STEP;

      path.arc(Ox, y, r, -angleBot, angleTop, true);
      path.arc(Ox, y, r, rad(180) - angleTop, rad(180) + angleBot, true);
    }
  }

  {
    // 3. Two circles with lines
    const yT = Oy - y1 * STEP;
    const yB = Oy + y1 * STEP;
    const r = r3 * STEP;
    path.arc(Ox, yT, r, rad(0), rad(180), true);
    path.arc(Ox, yB, r, rad(180), rad(360), true);
    path.line(circlePoint(Ox, yT, r, rad(0)), circlePoint(Ox, yB, r, rad(360)));
    path.line(
      circlePoint(Ox, yT, r, rad(180)),
      circlePoint(Ox, yB, r, rad(180))
    );
  }

  {
    // 4. Two intermediate circles
    path.arc(Ox + r1 * STEP, Oy, r4 * STEP, rad(0), rad(360), true);
    path.arc(Ox - r1 * STEP, Oy, r4 * STEP, rad(0), rad(360), true);
  }

  {
    // 5. Four smallest circles
    path.arc(Ox + r1 * STEP, Oy - r1 * STEP, r3 * STEP, rad(0), rad(360), true);
    path.arc(Ox + r1 * STEP, Oy + r1 * STEP, r3 * STEP, rad(0), rad(360), true);
    path.arc(Ox - r1 * STEP, Oy - r1 * STEP, r3 * STEP, rad(0), rad(360), true);
    path.arc(Ox - r1 * STEP, Oy + r1 * STEP, r3 * STEP, rad(0), rad(360), true);
  }

  path.closePath();
  return path;
}
