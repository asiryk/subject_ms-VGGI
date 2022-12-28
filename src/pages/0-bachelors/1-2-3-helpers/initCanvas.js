export default function initCanvas(width, height, color = "white") {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}
