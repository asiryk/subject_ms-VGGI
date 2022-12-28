export function render(ctx, ...paths) {
  paths.forEach((path) => path.render(ctx));
}

export function circlePoint(x0, y0, radius, angle, clockwise = false) {
  const direction = clockwise ? 1 : -1;
  const x = x0 + radius * Math.cos(angle);
  const y = y0 + direction * radius * Math.sin(angle);

  return [x, y];
}

/**
 * Rotate [x, y] around [cx, cy]
 */
export function rotatePoint([x, y], [cx, cy], angle, clockwise = false) {
  angle *= clockwise ? 1 : -1;
  if (angle === 0) return [x, y];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const nx = cos * (x - cx) + sin * (y - cy) + cx;
  const ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

export function rad(deg) {
  return (deg * Math.PI) / 180;
}

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

export const pipe =
  (...fns) =>
  (x) => {
    if (fns.length === 0) return x;
    const fn = fns.shift();
    const res = fn(x);
    if (fns.length === 0) return res;
    return pipe(...fns)(res);
  };

export const partial =
  (fn, x) =>
  (...args) =>
    fn(...args, x);

export const identity = (x) => x;

export function getRelativePoint(Ox, Oy, step) {
  return function ([x, y]) {
    return [(x - Ox) / step, (Oy - y) / step];
  };
}

export function getAbsolutePoint(Ox, Oy, step) {
  return function ([x, y]) {
    return [Ox + x * step, Oy - y * step];
  };
}

const cubicRaw = (t, p0, p1, p2, p3) =>
  (1 - t) ** 3 * p0 +
  3 * (1 - t) ** 2 * t * p1 +
  3 * (1 - t) * t ** 2 * p2 +
  t ** 3 * p3;

function cubicBezierPoint(t, [x0, y0], [x1, y1], [x2, y2], [x3, y3]) {
  const x = cubicRaw(t, x0, x1, x2, x3);
  const y = cubicRaw(t, y0, y1, y2, y3);
  return [x, y];
}

export function bezier(p0, p1, p2, p3) {
  const scale = 100;
  const curvePieces = [];
  for (let i = 0; i < 1 * scale; i++) {
    const from = cubicBezierPoint(i / scale, p0, p1, p2, p3);
    const to = cubicBezierPoint((i + 1) / scale, p0, p1, p2, p3);
    curvePieces.push({ from, to });
  }

  return curvePieces;
}

export function subtractPoints(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

export function addPoints(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

export function dividePoint(point, delimiter) {
  return [point[0] / delimiter, point[1] / delimiter];
}

export function multiplyPoint(point, multiplier) {
  return [point[0] * multiplier, point[1] * multiplier];
}

export function getInterimPoint(pStart, pEnd, curStep, totSteps) {
  const sub = subtractPoints(pEnd, pStart);
  const div = dividePoint(sub, totSteps);
  const mul = multiplyPoint(div, curStep);
  return addPoints(pStart, mul);
}

export function groupBezierPivots(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 4) {
    result.push(arr.slice(i, i + 4));
  }

  return result;
}

function length(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

export function bezierSmoothness(r11, r0, r21) {
  const l1 = length(r11, r0);
  const l2 = length(r21, r0);
  const x = r0[0] - (l1 / l2) * (r21[0] - r0[0]);
  const y = r0[1] - (l1 / l2) * (r21[1] - r0[1]);
  return [x, y];
}
