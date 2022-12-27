const {
  AxesHelper,
  CubicBezierCurve3,
  PerspectiveCamera,
  QuadraticBezierCurve3,
  Scene,
  Vector3,
  WebGLRenderer,
  // eslint-disable-next-line no-undef
} = THREE;
import { createLine } from "./util.js";

export const getRenderer = (() => {
  const renderer = new WebGLRenderer({ antialias: true });
  return () => renderer;
})();

export const getCamera = (() => {
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  camera.position.set(0, 0, 5);
  return () => camera;
})();

export const getScene = (() => {
  const scene = new Scene();
  return () => scene;
})();

const getGeometry = () => {
  // region define pivots
  const start = new Vector3(0, 0, -2);
  const end = new Vector3(0, 0, 2);
  const xzLeftCurve = new CubicBezierCurve3(
    start,
    new Vector3(0.2, 0, 0.8),
    new Vector3(0.8, 0, 0.2),
    end
  );

  const xzRightCurve = new CubicBezierCurve3(
    start,
    new Vector3(-0.8, 0, 0.2),
    new Vector3(-0.2, 0, 0.8),
    end
  );

  const yzCurve = new QuadraticBezierCurve3(start, new Vector3(0, 2, 0), end);
  // endregion

  // region Ox curves
  const oxLines = [];
  const N = 50;
  const xzLeftPoints = xzLeftCurve.getPoints(N);
  const xzRightPoints = xzRightCurve.getPoints(N);
  const yzPoints = yzCurve.getPoints(N);
  const zStep = Math.abs(end.z - start.z) / N;
  for (let i = 0; i < N; i++) {
    const z = start.z + zStep * i;
    const v0 = xzLeftPoints[i];
    const v1 = yzPoints[i];
    const v2 = xzRightPoints[i];
    const curve = new QuadraticBezierCurve3(
      new Vector3(v0.x, v0.y, z),
      new Vector3(v1.x, v1.y, z),
      new Vector3(v2.x, v2.y, z)
    );
    oxLines.push(createLine(curve.getPoints(10), 0x0000ff));
  }
  // endregion

  // region Oz curves
  const ozLines = [];
  const M = 50;
  // endregion

  return [
    ...oxLines,
    ozLines,
    createLine(yzPoints, 0x00ff00),
    createLine(xzLeftPoints, 0xff0000),
    createLine(xzRightPoints, 0xff0000),
  ];
};

export const render = (() => {
  const width = window.innerWidth,
    height = window.innerHeight;
  const renderer = getRenderer();
  const camera = getCamera();
  const scene = getScene();

  getGeometry().forEach((line) => scene.add(line));
  scene.add(new AxesHelper());

  renderer.setSize(width, height);
  renderer.render(scene, camera);

  return () => {
    const width = window.innerWidth,
      height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  };
})();
