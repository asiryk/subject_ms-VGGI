import { Pane } from "tweakpane";
import { getScene, render } from "./scene.js";
import { toVector2 } from "./util.js";

export const initPane = () => {
  const scene = getScene();
  const pane = new Pane({ title: "Controls" });

  {
    const foldPivots = pane.addFolder({ title: "Pivots", expanded: false });
    const pivotsOpts = { min: -2, max: 2, step: 0.001 };
    const config = { x: pivotsOpts, y: pivotsOpts };
    const values = {
      point0: { x: 0, y: 0 },
      point1: { x: 0.8, y: 0.2 },
      point2: { x: 0.2, y: 0.8 },
      point3: { x: 1, y: 1 },
      segmentsY: 10,
      segmentsZ: 10,
    };

    foldPivots
      .addInput(values, "point0", config)
      .on("change", (ev) =>
        render(
          [
            toVector2(ev.value),
            toVector2(values.point1),
            toVector2(values.point2),
            toVector2(values.point3),
          ],
          values.segmentsY,
          values.segmentsZ
        )
      );

    foldPivots
      .addInput(values, "point1", config)
      .on("change", (ev) =>
        render(
          [
            toVector2(values.point0),
            toVector2(ev.value),
            toVector2(values.point2),
            toVector2(values.point3),
          ],
          values.segmentsY,
          values.segmentsZ
        )
      );

    foldPivots
      .addInput(values, "point2", config)
      .on("change", (ev) =>
        render(
          [
            toVector2(values.point0),
            toVector2(values.point1),
            toVector2(ev.value),
            toVector2(values.point3),
          ],
          values.segmentsY,
          values.segmentsZ
        )
      );

    foldPivots
      .addInput(values, "point3", config)
      .on("change", (ev) =>
        render(
          [
            toVector2(values.point0),
            toVector2(values.point1),
            toVector2(values.point2),
            toVector2(ev.value),
          ],
          values.segmentsY,
          values.segmentsZ
        )
      );

    pane
      .addInput(values, "segmentsY", { min: 2, max: 100, step: 1 })
      .on("change", (ev) =>
        render(
          [
            toVector2(values.point0),
            toVector2(values.point1),
            toVector2(values.point2),
            toVector2(values.point3),
          ],
          ev.value,
          values.segmentsZ
        )
      );

    pane
      .addInput(values, "segmentsZ", { min: 1, max: 100, step: 1 })
      .on("change", (ev) =>
        render(
          [
            toVector2(values.point0),
            toVector2(values.point1),
            toVector2(values.point2),
            toVector2(values.point3),
          ],
          values.segmentsY,
          ev.value
        )
      );
  }

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
