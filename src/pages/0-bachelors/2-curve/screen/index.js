import initCanvas from "../../1-2-3-helpers/initCanvas";
import { ABS_HEIGHT, ABS_WIDTH } from "./config";
import { render } from "../../1-2-3-helpers/utils";
import { getAxes, getGrid } from "./grid";
import generateShape from "./shape";
import { drawNormal, drawTangent } from "./tangentLines";

function initScreen() {
  window.screen2 = {
    d: 10,
    angleMin: 1,
    angleMax: 179,
    angleCurrent: 90,
    dx: 0,
    dy: 0,
    rotation: 0,
    scale: 1,
  };

  const canvas = initCanvas(ABS_WIDTH, ABS_HEIGHT);
  const ctx = canvas.getContext("2d");

  reRender();

  window.addEventListener("screen2Render", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const prop in event.detail) window.screen2[prop] = event.detail[prop];
    reRender();
  });

  function reRender() {
    render(ctx, getGrid(), getAxes(), shape(), drawTangent(), drawNormal());
  }

  return canvas;
}

function shape() {
  return generateShape(
    window.screen2.angleMin,
    window.screen2.angleMax,
    window.screen2.d
  );
}

export default initScreen;
