import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";
import { TrackballRotator } from "../../../lib/trackball-rotator.js";
import { Matrix4, Vector3, Vector4, toRadians } from "@math.gl/core";
import { Program, initCanvas, VertexData } from "../../../lib/webGL";

enum Uniforms {
  ModelViewMatrix = "model_view_matrix",
  ProjectionMatrix = "projection_matrix",
  Color = "color",
}

enum Attributes {
  Vertex = "vertex",
}

function createVertices(): number[] {
  const vertices: number[] = [];
  const h = 1;
  const p = 0.5;

  for (let z = -h; z <= h; z += 0.1) {
    for (let b = 0; b <= 360; b += 5) {
      const x = ((Math.abs(z) - h) ** 2 / (2 * p)) * Math.cos(toRadians(b));
      const y = ((Math.abs(z) - h) ** 2 / (2 * p)) * Math.sin(toRadians(b));
      vertices.push(x, y, z);
    }
  }

  for (let b = 0; b <= 360; b += 20) {
    for (let z = -h; z <= h; z += 0.1) {
      const x = ((Math.abs(z) - h) ** 2 / (2 * p)) * Math.cos(toRadians(b));
      const y = ((Math.abs(z) - h) ** 2 / (2 * p)) * Math.sin(toRadians(b));
      vertices.push(x, y, z);
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

  const ortho = new Matrix4().ortho({
    left: 1,
    right: -1,
    bottom: 1,
    top: -1,
  });

  const modelView = rotator.getViewMatrix();
  const rotateToPointZero = new Matrix4().rotateAxis(
    0.7,
    new Vector3(0, 0, 0) // POV from top
  );
  const translateToPointZero = new Matrix4().translate(new Vector3(0, 0, -10));
  const matAccum0 = rotateToPointZero.multiplyRight(modelView);
  const matAccum1 = translateToPointZero.multiplyRight(matAccum0);

  program.setUniform(Uniforms.ModelViewMatrix, matAccum1);
  program.setUniform(Uniforms.ProjectionMatrix, ortho);
  program.setUniform(Uniforms.Color, new Vector4(1, 1, 0, 1));

  gl.drawArrays(gl.LINE_STRIP, 0, surface.getCount());
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
    const surface = new VertexData(createVertices(), 3);
    program.setAttribute(
      Attributes.Vertex,
      surface.getData(),
      surface.getSize()
    );
    const rotator = new TrackballRotator(canvas, null, 0);
    rotator.setCallback(() => draw(gl, program, surface, rotator));
    draw(gl, program, surface, rotator);

    attachRoot.appendChild(canvas);
  } catch (e) {
    return alert(e);
  }
}
