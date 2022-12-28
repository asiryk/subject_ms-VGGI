import { HEIGHT, STEP, WIDTH } from "./config";
import { getAxes, getGrid } from "./grid";
import { isNumber, render } from "../../1-2-3-helpers/utils";
import initCanvas from "../../1-2-3-helpers/initCanvas";
import generateShape from "./shape";

function initScreen() {
  const canvas = initCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const memo = {
    angle: { last: 0, initial: 0 },
    dx: { last: 0, initial: 0 },
    dy: { last: 0, initial: 0 },
  };

  function handleGlobals({ ...transformations }, shouldMove) {
    for (const transformationName in transformations) {
      const transformation = transformations[transformationName];
      // region apply values from inputs and validate 'em
      for (const prop in transformation) {
        const input = document.getElementById(prop);
        if (isNumber(transformation[prop])) {
          window.screen1[transformationName][prop] = transformation[prop];
        } else if (!isNumber(window.screen1[transformationName][prop])) {
          if (input) input.value = "";
        } else {
          if (input) input.value = window.screen1[transformationName][prop];
        }
      }
      // endregion
    }

    // region handle moving
    if (shouldMove) {
      const linear = window.screen1.linear;
      for (const key in memo) {
        if (linear.angle !== 0 && key !== "angle") continue;

        const input = document.getElementById(key);
        const prop = memo[key];
        if (linear[key] === prop.last) {
          linear[key] += prop.initial;
          prop.last = linear[key];
          if (input) input.value = linear[key];
        } else {
          prop.initial = prop.last = linear[key];
        }
      }
    }
    // endregion
  }

  window.addEventListener("renderScreen1", (event) => {
    clearCanvas();
    const dimensions = event.detail.dimensions;
    const linear = event.detail.linear;
    const projective = event.detail.projective;
    const affine = event.detail.affine;

    const shouldMove = event.detail.shouldMove;

    handleGlobals({ dimensions, linear, projective, affine }, shouldMove);

    let { r1, r2, r3, r4 } = window.screen1.dimensions;

    render(ctx, getGrid(WIDTH, HEIGHT, STEP), getAxes(WIDTH, HEIGHT));
    render(ctx, generateShape(r1, r2, r3, r4));
  });

  window.screen1 = {
    dimensions: {
      r1: 4,
      r2: 3,
      r3: 1,
      r4: 1.5,
    },
    linear: {
      dx: 0,
      dy: 0,
      rotX: 0,
      rotY: 0,
      angle: 0,
      scale: 1,
    },
    projective: {
      a00: 0,
      a01: 0,
      a02: 1000,
      a10: 100000,
      a11: 0,
      a12: 0.01,
      a20: 0,
      a21: 100000,
      a22: 0.01,
    },
    affine: { a: 1, b: 0, c: 0, d: 0, e: 1, f: 0 },
  };

  return canvas;
}

export default initScreen;
