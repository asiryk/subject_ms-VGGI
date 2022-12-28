export function drawGrid(maxX, maxY, path) {
  for (let y = -maxY + 1; y < maxY; y++) {
    path.moveTo(maxX, y, { shiftY: true });
    path.lineTo(-maxX, y, { shiftY: true });
  }

  for (let x = -maxX + 1; x < maxX; x++) {
    path.moveTo(x, maxY, { shiftX: true });
    path.lineTo(x, -maxY, { shiftX: true });
  }

  path.closePath();
  return path;
}

export function drawAxes(maxX, maxY, path) {
  path.moveTo(0, -maxY);
  path.lineTo(0, maxY);

  path.moveTo(-maxX, 0);
  path.lineTo(maxX, 0);

  path.closePath();
  return path;
}
