import { isNumber } from "../../1-2-3-helpers/utils";

function initLayout() {
  const container = document.createElement("div");

  container.append(
    h4("Curve: Witch of Agnesi"),
    br(),
    div(span("D"), inputNumber("d", 0)),
    br(),
    div(
      inputNumber("angleMin", 1, 179),
      span("< φ(deg) <"),
      inputNumber("angleMax", 1, 179)
    ),
    div(span("Current φ(deg)"), inputNumber("angleCurrent", 1, 179)),
    br(),
    div(span("Dx"), inputNumber("dx")),
    div(span("Dy"), inputNumber("dy")),
    br(),
    div(span("Scale"), inputNumber("scale", null, null, 0.1)),
    br()
  );

  return container;
}

function inputNumber(id, min, max, step) {
  const div = document.createElement("div");
  const input = document.createElement("input");
  div.appendChild(input);

  input.value = window.screen2[id];

  input.setAttribute("id", id);
  input.style.textAlign = "center";
  input.style.width = "12ch";
  input.setAttribute("class", "form-select input-sm");
  input.setAttribute("type", "number");
  isNumber(min) && input.setAttribute("min", min);
  isNumber(max) && input.setAttribute("max", max);
  isNumber(step) && input.setAttribute("step", step);

  input.onchange = (e) => {
    const min = parseFloat(e.target.getAttribute("min"));
    const max = parseFloat(e.target.getAttribute("max"));
    let value = parseFloat(e.target.value);

    if (!isNumber(value)) return;
    if (value < min) {
      value = min;
      e.target.value = min.toString();
    } else if (value > max) {
      value = max;
      e.target.value = max.toString();
    }
    window.dispatchEvent(
      new CustomEvent("screen2Render", { detail: { [e.target.id]: value } })
    );
  };

  return div;
}

function span(text) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.appendChild(span);
  span.innerText = text;

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

function br() {
  return document.createElement("br");
}

function h4(text) {
  const h4 = document.createElement("h4");
  h4.innerText = text;
  return h4;
}

export default initLayout;
