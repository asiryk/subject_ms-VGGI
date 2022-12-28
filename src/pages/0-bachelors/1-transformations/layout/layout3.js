import { triggerRendering } from "./index";

function initLayout3() {
  const div = document.createElement("div");

  {
    const nav = document.createElement("nav");
    nav.setAttribute("class", "paginate-container");
    nav.style.textAlign = "start";

    const container = document.createElement("div");
    container.setAttribute("class", "pagination");
    nav.appendChild(container);

    const prev = document.createElement("a");
    prev.innerText = "Projective";
    prev.setAttribute("class", "previous_page");
    prev.onclick = () => window.dispatchEvent(new Event("layoutProjective"));

    const next = document.createElement("a");
    next.innerText = "Linear";
    next.setAttribute("class", "next_page");
    next.setAttribute("rel", "next");
    next.onclick = () => window.dispatchEvent(new Event("layoutLinear"));

    container.append(prev, next);
    div.appendChild(nav);
  }

  {
    const h4 = document.createElement("h4");
    h4.innerText = "Affine Transformations";
    div.appendChild(h4);
  }

  {
    const table = document.createElement("table");

    table.append(
      tr(td(), td(span("x")), td(span("y")), td()),
      tr(td(span("r0(")), td(input("c")), td(input("f")), td(span(")"))),
      tr(td(span("rX(")), td(input("a")), td(input("d")), td(span(")"))),
      tr(td(span("rY(")), td(input("b")), td(input("e")), td(span(")")))
    );

    div.append(table, br(), button(triggerRendering, "Render"));
  }

  return div;
}

function input(htmlId) {
  const input = document.createElement("input");

  input.value = window.screen1.affine[htmlId];
  input.setAttribute("id", htmlId);
  input.setAttribute("class", "form-control input-sm");
  input.setAttribute("placeholder", htmlId);
  input.style.width = "40px";
  input.style.padding = "0";
  input.style.textAlign = "center";

  return input;
}

function tr(...children) {
  const tr = document.createElement("tr");
  tr.append(...children);
  return tr;
}

function td(...children) {
  const td = document.createElement("td");
  td.style.textAlign = "center";
  td.style.verticalAlign = "middle";
  td.append(...children);
  return td;
}

function br() {
  return document.createElement("br");
}

function span(text) {
  const span = document.createElement("span");
  span.innerText = text;
  return span;
}

function button(onClick, label) {
  const btnDiv = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-sm btn-primary");
  button.setAttribute("type", "button");
  button.innerText = label;
  button.onclick = onClick;
  btnDiv.appendChild(button);

  return btnDiv;
}

export default initLayout3;
