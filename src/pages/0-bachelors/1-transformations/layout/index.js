import image from "./image";
import initLayout1 from "./layout1";
import initLayout2 from "./layout2";
import initLayout3 from "./layout3";

export function triggerRendering(_, shouldMove = false) {
  const r1 = getValue("r1");
  const r2 = getValue("r2");
  const r3 = getValue("r3");
  const r4 = getValue("r4");
  const dx = getValue("dx");
  const dy = getValue("dy");
  const rotX = getValue("rotX");
  const rotY = getValue("rotY");
  const angle = getValue("angle");
  const scale = getValue("scale");
  const a00 = getValue("a00");
  const a01 = getValue("a01");
  const a02 = getValue("a02");
  const a10 = getValue("a10");
  const a11 = getValue("a11");
  const a12 = getValue("a12");
  const a20 = getValue("a20");
  const a21 = getValue("a21");
  const a22 = getValue("a22");
  const a = getValue("a");
  const b = getValue("b");
  const c = getValue("c");
  const d = getValue("d");
  const e = getValue("e");
  const f = getValue("f");

  const event = new CustomEvent("renderScreen1", {
    detail: {
      dimensions: { r1, r2, r3, r4 },
      linear: { dx, dy, rotX, rotY, angle, scale },
      projective: { a00, a01, a02, a10, a11, a12, a20, a21, a22 },
      affine: { a, b, c, d, e, f },
      shouldMove,
    },
  });

  window.dispatchEvent(event);
}

let layout1;
let layout2;
let layout3;

function initLayout() {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.height = "100%";
  container.style.flexDirection = "column";
  layout1 = !layout1 ? initLayout1() : layout1;
  container.append(layout1);

  const div = document.createElement("div");
  const img = document.createElement("img");
  img.style.width = "100%";
  img.setAttribute("src", image);
  div.appendChild(img);
  div.style.marginTop = "auto";
  container.appendChild(div);

  window.addEventListener("layoutLinear", () => {
    container.innerHTML = "";
    layout1 = !layout1 ? initLayout1() : layout1;
    container.append(layout1);
    container.append(div);
  });

  window.addEventListener("layoutProjective", () => {
    container.innerHTML = "";
    layout2 = !layout2 ? initLayout2() : layout2;
    container.append(layout2);
    container.append(div);
  });

  window.addEventListener("layoutAffine", () => {
    container.innerHTML = "";
    layout3 = !layout3 ? initLayout3() : layout3;
    container.append(layout3);
    container.append(div);
  });

  return container;
}

function getValue(id) {
  const input = document.getElementById(id);
  return input ? parseFloat(input.value) : null;
}

export default initLayout;
