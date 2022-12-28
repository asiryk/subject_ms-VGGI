import { Pane } from "tweakpane";
import { initCanvas } from "./utils";
import CabPath from "./CabPath";

const CELL = 10;
const MAX_X = 45;
const MAX_Y = 45;
const MAX_Z = Math.sqrt(MAX_X ** 2 + MAX_Y ** 2);
const WIDTH = 2 * MAX_X;
const HEIGHT = 2 * MAX_Y;
const ABS_WIDTH = WIDTH * CELL;
const ABS_HEIGHT = HEIGHT * CELL;

const PARAMS = {
  angle: -45,
  height: 20,
  width: 20,
  depth: 20,
  roof: 5,
};

const pane = new Pane();

pane
  .addInput(PARAMS, "angle", { min: -45, max: 45 })
  .on("change", (e) => render("angle", e.value));
pane
  .addInput(PARAMS, "height", { min: 0, max: MAX_Y, step: 1 })
  .on("change", (e) => render("height", e.value));
pane
  .addInput(PARAMS, "width", { min: 0, max: MAX_X, step: 1 })
  .on("change", (e) => render("width", e.value));
pane
  .addInput(PARAMS, "depth", { min: 0, max: MAX_Z * 2, step: 1 })
  .on("change", (e) => render("depth", e.value));
pane
  .addInput(PARAMS, "roof", { min: 0, max: MAX_Y, step: 1 })
  .on("change", (e) => render("roof", e.value));

const canvas = initCanvas(ABS_WIDTH, ABS_HEIGHT);
document.getElementById("root").appendChild(canvas);
const ctx = canvas.getContext("2d");

PARAMS.angle = 0;
pane.refresh();

function render(key, value) {
  const { angle, width, height, depth, roof } = { ...PARAMS, [key]: value };

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const axes = new CabPath({
    width: WIDTH,
    height: HEIGHT,
    step: CELL,
    angle,
    color: "blue",
  });

  axes.line([-MAX_X, 0, 0], [MAX_X, 0, 0]);
  axes.line([0, -MAX_Y, 0], [0, MAX_Y, 0]);
  axes.line([0, 0, -MAX_Z * 2], [0, 0, MAX_Z * 2]);

  axes.render(ctx);

  const shape = new CabPath({
    width: WIDTH,
    height: HEIGHT,
    step: CELL,
    angle,
    thickness: 4,
  });
  shape.line([0, 0, 0], [width, 0, 0]);
  shape.line([width, 0, 0], [width, 0, depth]);
  shape.line([width, 0, depth], [0, 0, depth]);
  shape.line([0, 0, depth], [0, 0, 0]);

  shape.line([0, height, 0], [width, height, 0]);
  shape.line([width, height, 0], [width, height, depth]);
  shape.line([width, height, depth], [0, height, depth]);
  shape.line([0, height, depth], [0, height, 0]);

  shape.line([0, 0, 0], [0, height, 0]);
  shape.line([width, 0, 0], [width, height, 0]);
  shape.line([width, 0, depth], [width, height, depth]);
  shape.line([0, 0, depth], [0, height, depth]);

  // region roof

  shape.line([0, height, 0], [width / 2, height + roof, 0]);
  shape.line([width / 2, height + roof, 0], [width, height, 0]);

  shape.line([0, height, depth], [width / 2, height + roof, depth]);
  shape.line([width / 2, height + roof, depth], [width, height, depth]);

  shape.line([width / 2, height + roof, 0], [width / 2, height + roof, depth]);

  // endregion

  shape.render(ctx);
}
