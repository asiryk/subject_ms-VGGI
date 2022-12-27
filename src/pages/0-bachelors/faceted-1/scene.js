const {
  AxesHelper,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
  // eslint-disable-next-line no-undef
} = THREE;

import { cubicBezierPoint } from "./util.js";

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

const getGeometry = (segmentsY = 10, segmentsZ = 10, pivots) => {
  if (!pivots) {
    pivots = [
      new Vector2(0, 0),
      new Vector2(0.8, 0.2),
      new Vector2(0.2, 0.8),
      new Vector2(1, 1),
    ];
  }
  const points = []; // create 2d bezier curve
  for (let t = 0; t < segmentsY; t++) {
    points.push(cubicBezierPoint(t / segmentsY, ...pivots));
  }
  const geometry = new LatheGeometry(points, segmentsZ);
  const material = new MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
  return new Mesh(geometry, material);
};

export const render = (() => {
  const width = window.innerWidth,
    height = window.innerHeight;
  const renderer = getRenderer();
  const camera = getCamera();
  const scene = getScene();

  let geometry = getGeometry();
  scene.add(geometry);
  scene.add(new AxesHelper());

  renderer.setSize(width, height);
  renderer.render(scene, camera);

  return (pivots, segmentsY, segmentsZ) => {
    const width = window.innerWidth,
      height = window.innerHeight;
    if (Array.isArray(pivots)) {
      scene.remove(geometry);
      geometry = getGeometry(segmentsY, segmentsZ, pivots);
      scene.add(geometry);
    }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  };
})();
