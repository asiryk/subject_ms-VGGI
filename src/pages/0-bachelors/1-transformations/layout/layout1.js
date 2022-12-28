import { triggerRendering } from "./index";

function initLayout1() {
  const div = document.createElement("div");

  {
    const nav = document.createElement("nav");
    nav.setAttribute("class", "paginate-container");
    nav.style.textAlign = "start";

    const container = document.createElement("div");
    container.setAttribute("class", "pagination");
    nav.appendChild(container);

    const prev = document.createElement("a");
    prev.innerText = "Affine";
    prev.setAttribute("class", "previous_page");
    prev.onclick = () => window.dispatchEvent(new Event("layoutAffine"));

    const next = document.createElement("a");
    next.innerText = "Projective";
    next.setAttribute("class", "next_page");
    next.setAttribute("rel", "next");
    next.onclick = () => window.dispatchEvent(new Event("layoutProjective"));

    container.append(prev, next);
    div.appendChild(nav);
  }

  {
    const h4 = document.createElement("h4");
    h4.innerText = "Linear Transformations";
    div.appendChild(h4);

    div.append(
      createInputRadius(1),
      createInputRadius(2),
      createInputRadius(3),
      createInputRadius(4)
    );
  }

  {
    div.appendChild(document.createElement("br"));
    // region move
    const { container: cDx, input: iDx, label: lDx } = createInputElement("dx");
    const { container: cDy, input: iDy, label: lDy } = createInputElement("dy");

    lDx.innerText = "dX";
    iDx.setAttribute("placeholder", "Move dX");
    iDx.value = window.screen1.linear.dx || "";
    lDy.innerText = "dY";
    iDy.setAttribute("placeholder", "Move dY");
    iDx.value = window.screen1.linear.dy || "";
    // endregion

    // region rotate
    const {
      container: cAngle,
      input: iAngle,
      label: lAngle,
    } = createInputElement("angle");
    const {
      container: cRotX,
      input: iRotX,
      label: lRotX,
    } = createInputElement("rotX");
    const {
      container: cRotY,
      input: iRotY,
      label: lRotY,
    } = createInputElement("rotY");

    lRotX.innerText = "φX";
    iRotX.setAttribute("placeholder", "Rotation pivot, x");
    iRotX.value = window.screen1.linear.rotX || "";

    lRotY.innerText = "φY";
    iRotY.setAttribute("placeholder", "Rotation pivot, y");
    iRotY.value = window.screen1.linear.rotY || "";

    lAngle.innerText = "φ";
    iAngle.setAttribute("placeholder", "Rotate anti-clockwise, deg.");
    iAngle.value = window.screen1.linear.angle || "";
    // endregion

    // region scale
    const {
      container: cScale,
      input: iScale,
      label: lScale,
    } = createInputElement("scale");

    lScale.innerText = "Scale";
    iScale.setAttribute("placeholder", "Scale");
    iScale.value = window.screen1.linear.scale || "";
    // endregion

    div.appendChild(document.createElement("br"));
    div.append(
      cDx,
      cDy,
      cRotX,
      cRotY,
      cAngle,
      cScale,
      createButton((e) => triggerRendering(e, true), "Render")
    );
  }

  return div;
}

function createInputElement(htmlId) {
  const container = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  container.append(label, input);

  container.style.display = "flex";
  container.style.justifyContent = "space-between";

  input.setAttribute("id", htmlId);
  input.setAttribute("class", "form-control input-sm");
  input.style.margin = "2.5px 0";
  label.setAttribute("for", htmlId);

  return { container, input, label };
}

function createInputRadius(id) {
  const { container, input, label } = createInputElement("r" + id);
  input.value = window.screen1.dimensions["r" + id] || "";
  input.setAttribute("placeholder", "Radius " + id);
  label.innerText = "R" + id;

  return container;
}

function createButton(onClick, label) {
  const btnDiv = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-sm btn-primary");
  button.setAttribute("type", "button");
  button.innerText = label;
  button.onclick = onClick;
  btnDiv.appendChild(button);

  return btnDiv;
}

export default initLayout1;
