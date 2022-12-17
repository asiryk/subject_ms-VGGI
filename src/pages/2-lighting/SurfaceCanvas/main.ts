import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";
import { TrackballRotator } from "../../../lib/trackball-rotator.js";
import { Matrix4, Vector3, toRadians } from "@math.gl/core";
import { Program, initCanvas, VertexData } from "../../../lib/webGL";
import { Pane, TpChangeEvent } from "tweakpane";

enum Uniforms {
  ModelViewMatrix = "model_view_matrix",
  ProjectionMatrix = "projection_matrix",
  NormalMatrix = "normal_matrix",
}

enum Attributes {
  Vertices = "vertices",
}

function createVertices(): number[] {
  const vertices: number[] = [];
  const INT_MULT = 10;
  const h = 1;
  const p = 0.5;
  const zStep = 0.1;
  const bStep = 5;

  for (let z1 = -h * INT_MULT; z1 < h * INT_MULT; z1 += zStep * INT_MULT) {
    const z = z1 / INT_MULT;

    for (let b = 0; b <= 360; b += bStep) {
      const x = ((Math.abs(z) - h) ** 2 / (2 * p)) * Math.cos(toRadians(b));
      const y = ((Math.abs(z) - h) ** 2 / (2 * p)) * Math.sin(toRadians(b));
      vertices.push(x, y, z);

      const x1 =
        ((Math.abs(z + zStep) - h) ** 2 / (2 * p)) *
        Math.cos(toRadians(b + bStep));

      const y1 =
        ((Math.abs(z + zStep) - h) ** 2 / (2 * p)) *
        Math.sin(toRadians(b + bStep));
      vertices.push(x1, y1, z + zStep);
    }
  }

  return vertices;
}

function draw(
  gl: WebGLRenderingContext,
  program: Program<Attributes, Uniforms>,
  surface: VertexData,
  rotator: TrackballRotator
) {
  program.use(gl.useProgram.bind(gl));
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // removes black bg

  const projection = new Matrix4().ortho({
    left: 1,
    right: -1,
    bottom: 1,
    top: -1,
  });

  const rotatorView = rotator.getViewMatrix();
  const rotateToPointZero = new Matrix4().rotateAxis(
    0.7,
    new Vector3(0, 0, 0) // POV from top
  );
  const translateToPointZero = new Matrix4().translate(new Vector3(0, 0, -10));
  const matAccum0 = rotateToPointZero.multiplyRight(rotatorView);
  const modelView = translateToPointZero.multiplyRight(matAccum0);

  // create normal matrix from modelView matrix
  const normalMatrix = new Matrix4().copy(modelView).invert().transpose();

  program.setUniform(Uniforms.ModelViewMatrix, modelView);
  program.setUniform(Uniforms.ProjectionMatrix, projection);
  program.setUniform(Uniforms.NormalMatrix, normalMatrix);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, surface.getCount());
}

function initTweakpane() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pane = new Pane() as any;

  const PARAMS = {
    light: { x: 0, y: 0, z: 0 },
  };

  pane.addInput(PARAMS, "light", { step: 0.1 });

  return pane;
}

export function init(attachRoot: HTMLElement) {
  try {
    const size = Math.min(600, window.innerWidth - 50);
    const { gl, canvas } = initCanvas(size, size);
    const program = new Program(
      gl,
      vertex,
      fragment,
      Object.values(Attributes),
      Object.values(Uniforms)
    );
    const vertices = createVertices();
    const surface = new VertexData(vertices, 3);
    program.setAttribute(
      Attributes.Vertices,
      surface.getData(),
      surface.getSize()
    );
    const rotator = new TrackballRotator(canvas, null, 0);
    rotator.setCallback(() => draw(gl, program, surface, rotator));
    draw(gl, program, surface, rotator);

    const pane = initTweakpane();
    pane.on("change", (e: TpChangeEvent) => {
      if (e.presetKey === "light") {
        const { x, y, z } = e.value;
        const position = new Vector3(x, y, z);
        console.log(position);
      }
    });

    attachRoot.appendChild(canvas);
  } catch (e) {
    return alert(e);
  }
}
