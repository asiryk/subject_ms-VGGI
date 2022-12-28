import { getRenderer, render } from "./scene.js";
import { initPane } from "./gui.js";

window.document.body.appendChild(getRenderer().domElement);
window.addEventListener("resize", render);

initPane();
