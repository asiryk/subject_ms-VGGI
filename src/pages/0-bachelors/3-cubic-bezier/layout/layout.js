import { animate, movePivot, turnOnDebug } from "./index";
import { POINT } from "../screen";

function initLayout() {
  const container = document.createElement("div");

  const inputX = inputNumber("bezier_x", POINT[0]);
  const inputY = inputNumber("bezier_y", POINT[1]);

  container.append(
    h4("Cubic bezier"),
    br(),
    button("Animate", () => animate()),
    br(),
    checkbox("Debug", (e) => turnOnDebug(e)),
    br(),
    div(span("X"), inputX),
    br(),
    div(span("Y"), inputY)
  );

  return { container, inputX: inputX.children[0], inputY: inputY.children[0] };
}

function h4(text) {
  const h4 = document.createElement("h4");
  h4.innerText = text;
  return h4;
}

function button(label, callback) {
  const btnDiv = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-sm btn-primary");
  button.setAttribute("type", "button");
  button.innerText = label;
  button.onclick = callback;
  btnDiv.appendChild(button);

  return btnDiv;
}

function br() {
  return document.createElement("br");
}

function span(text) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.appendChild(span);
  span.innerText = text;

  return div;
}

function checkbox(text, callback) {
  const div = document.createElement("div");
  const check = document.createElement("input");
  const label = document.createElement("label");
  const span = document.createElement("span");
  span.innerText = text;
  span.style.marginLeft = "10px";
  check.setAttribute("type", "checkbox");
  check.onclick = callback;
  label.append(check, span);
  div.append(label);

  div.style.userSelect = "none";

  return div;
}

function div(...children) {
  const div = document.createElement("div");
  div.append(...children);
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "space-between";

  return div;
}

function inputNumber(id, value) {
  const div = document.createElement("div");
  const input = document.createElement("input");
  div.appendChild(input);

  input.value = value;
  input.setAttribute("id", id);
  input.style.textAlign = "center";
  input.style.width = "12ch";
  input.setAttribute("class", "form-select input-sm");
  input.setAttribute("type", "number");
  input.setAttribute("step", "5");

  input.onchange = (e) => movePivot(e);

  return div;
}

export default initLayout;
