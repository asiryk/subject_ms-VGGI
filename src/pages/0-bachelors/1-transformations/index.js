import initScreen from "./screen";
import initLayout, { triggerRendering } from "./layout";

let layout;
let screen;

export default function init() {
  screen = !screen ? initScreen() : screen;
  layout = !layout ? initLayout() : layout;
  document.querySelector("#left-pan").appendChild(layout);
  document.querySelector("#content").appendChild(screen);
  triggerRendering();
}
