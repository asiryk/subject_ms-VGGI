/**
 * Returns function that accepts point in relative coordinates and transforms it to absolute coordinates.
 */
export function absolutePoint(mWidth, mHeight, step) {
  return function ([x, y]) {
    return [mWidth / 2 + x * step, mHeight / 2 - y * step];
  };
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

export function requireNonNull(value) {
  if ([null, NaN, undefined].includes(value)) {
    throw new Error(`value must be not null, but was: ${value}`);
  }
}

export function initCanvas(width, height, color = "white") {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}

export function rad(deg) {
  return (deg * Math.PI) / 180;
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
