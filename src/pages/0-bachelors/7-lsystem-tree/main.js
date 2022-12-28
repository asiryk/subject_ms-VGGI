import { Pane } from "tweakpane";
import lSystem from "./LSystem.js";

// region tweakpane
const pane = new Pane();

const PARAMS = {
  steps: 0,
  string: "",
  wave: "",
};

const inputSteps = pane.addInput(PARAMS, "steps", { min: 0, max: 7, step: 1 });
const monitor = pane.addMonitor(PARAMS, "wave", {
  multiline: false,
  lineCount: 5,
});
// endregion

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("root").appendChild(canvas);
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

inputSteps.on("change", (e) => {
  ctx.fillStyle = "#519721";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";

  const frac = new lSystem.LSystem("X", { X: "F[+X]F[-X]+X", F: "FF" });
  PARAMS.wave = frac.generate(parseInt(e.value));
  monitor.refresh();

  const stateHandler = new lSystem.LRunHandler({
    a: 90, // angle
    x: 0, // x
    y: 0, // y
    r: 5, // radius
    raMap: {}, // radius-angle map/cache
    stack: [], // stack for tree
  });
  stateHandler.on("F", function () {
    ctx.beginPath();
    ctx.moveTo(...abs([this.x, this.y]));
    const hash = this.r + "#" + this.a;
    if (typeof this.raMap[hash] == "undefined") {
      this.raMap[hash] = {
        x: Math.round(this.r * Math.cos((this.a * Math.PI) / 180)),
        y: Math.round(this.r * Math.sin((this.a * Math.PI) / 180)),
      };
    }
    this.x += this.raMap[hash].x;
    this.y += this.raMap[hash].y;
    ctx.lineTo(...abs([this.x, this.y]));
    ctx.stroke();
  });
  stateHandler.on("+", function () {
    this.a -= 20;
  });
  stateHandler.on("-", function () {
    this.a += 20;
  });
  stateHandler.on("[", function () {
    this.stack.push({ x: this.x, y: this.y, a: this.a });
  });
  stateHandler.on("]", function () {
    var ls = this.stack.pop();
    this.x = ls.x;
    this.y = ls.y;
    this.a = ls.a;
  });

  frac.run(stateHandler);
});

PARAMS.steps = 5;
pane.refresh();

function abs([x, y]) {
  ctx.canvas.width;
  ctx.canvas.height;
  return [ctx.canvas.width / 2 + x, ctx.canvas.height - y];
}
