// eslint-disable-next-line no-undef
const { Vector2 } = THREE;

const bezier3 = (t, p0, p1, p2, p3) =>
  (1 - t) ** 3 * p0 +
  3 * (1 - t) ** 2 * t * p1 +
  3 * (1 - t) * t ** 2 * p2 +
  t ** 3 * p3;

/**
 * @param {number} t position on curve in range [0, 1]
 * @param {Vector2} point0
 * @param {Vector2} point1
 * @param {Vector2} point2
 * @param {Vector2} point3
 *
 * @returns Vector2
 */
export function cubicBezierPoint(t, point0, point1, point2, point3) {
  const x = bezier3(t, point0.x, point1.x, point2.x, point3.x);
  const y = bezier3(t, point0.y, point1.y, point2.y, point3.y);
  return new Vector2(x, y);
}

export const toVector2 = (obj) => new Vector2(obj.x, obj.y);
