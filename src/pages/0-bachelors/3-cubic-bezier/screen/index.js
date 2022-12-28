// noinspection CommaExpressionJS

import initCanvas from "../../1-2-3-helpers/initCanvas";
import { ABS_HEIGHT, ABS_WIDTH } from "./config";
import {
  bezier,
  bezierSmoothness,
  getInterimPoint,
  groupBezierPivots,
  render,
} from "../../1-2-3-helpers/utils";
import { getAxes, getGrid } from "./grid";
import BPath from "./BPath";
import { shape1, shape2 } from "./shape";

let DEBUG = false;
export const POINT = [210, 359];

function initScreen() {
  const canvas = initCanvas(ABS_WIDTH, ABS_HEIGHT);
  const ctx = canvas.getContext("2d");
  let currentShape = shape1;
  reRender(currentShape);

  function reRender(shape) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    render(ctx, getGrid(), getAxes(), pathShape(shape), debug(shape));
  }

  let animating = false;

  function animate(shapeFrom, shapeTo) {
    if (animating) return;
    if (shapeFrom.length !== shapeTo.length)
      throw new Error("shapes must have equal amount of pivots");
    animating = true;
    const fps = 120;
    const sec = 2;
    const frames = Math.round(fps * sec);
    currentShape = shapeTo;
    shapeFrom = putPointToShape(shapeFrom).flat();
    shapeTo = shapeTo.flat();

    let i = 0;
    const int = setInterval(() => {
      if (i <= frames) {
        const newShape = groupBezierPivots(
          shapeFrom.map((point, j) =>
            getInterimPoint(point, shapeTo[j], i, frames)
          )
        );
        notifyPivotChange(newShape);
        reRender(newShape);
        i++;
      } else {
        animating = false;
        clearInterval(int);
      }
    }, 1000 / fps);
  }

  window.addEventListener("3_bezier_animate", () =>
    animate(currentShape, currentShape === shape1 ? shape2 : shape1)
  );
  window.addEventListener(
    "3_bezier_debug",
    (event) => ((DEBUG = event.detail.debug), reRender(currentShape))
  );
  window.addEventListener("3_bezier_move_pivot", (event) => {
    if (event.detail.x) POINT[0] = event.detail.x;
    else POINT[1] = event.detail.y;
    reRender(putPointToShape(currentShape));
  });

  return canvas;
}

function pathShape(shape) {
  return new BPath().drawPieces(shape.map((curve) => bezier(...curve)).flat());
}

function debug(shape) {
  const path = new BPath({ thickness: 2, color: "green" });
  if (DEBUG) {
    shape = putPointToShape(shape);
    shape.flat().forEach((point) => {
      path.moveTo(...point);
      path.arc(...point, 1, 0, 2 * Math.PI);
    });
  }
  path.closePath();
  return path;
}

function notifyPivotChange(shape) {
  const point = shape[6][1];
  POINT[0] = point[0];
  POINT[1] = point[1];
  window.dispatchEvent(
    new CustomEvent("3_bezier_pivot_change", { detail: { point } })
  );
}

function putPointToShape(shape) {
  shape = [...shape];
  shape[6][1] = [...POINT];
  return applySmoothness(shape);
}

function applySmoothness(shape) {
  shape = [...shape];
  shape[5][2] = bezierSmoothness(shape[5][2], shape[6][0], POINT);
  return shape;
}

export default initScreen;
