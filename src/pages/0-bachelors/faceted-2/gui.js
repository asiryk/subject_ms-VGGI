import { Pane } from "tweakpane";
import { getScene, render } from "./scene.js";

export const initPane = () => {
  const scene = getScene();
  const pane = new Pane({ title: "Controls", expanded: true });

  {
    const posOpts = { min: -5, max: 5, step: 0.1 };
    pane
      .addInput({ position: { x: 0, y: 0, z: 0 } }, "position", {
        x: posOpts,
        y: posOpts,
        z: posOpts,
      })
      .on("change", (ev) => {
        const { x, y, z } = ev.value;
        scene.position.set(x, y, z);
        render();
      });
  }

  {
    const rotationOpts = { step: 0.1 };
    pane
      .addInput({ rotation: { x: 0, y: 0, z: 0 } }, "rotation", {
        x: rotationOpts,
        y: rotationOpts,
        z: rotationOpts,
      })
      .on("change", (ev) => {
        const { x, y, z } = ev.value;
        scene.rotation.set(x, y, z);
        render();
      });
  }
};
