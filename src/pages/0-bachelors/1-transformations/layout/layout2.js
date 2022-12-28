import { triggerRendering } from "./index";

function initLayout2() {
  const div = document.createElement("div");

  {
    const nav = document.createElement("nav");
    nav.setAttribute("class", "paginate-container");
    nav.style.textAlign = "start";

    const container = document.createElement("div");
    container.setAttribute("class", "pagination");
    nav.appendChild(container);

    const prev = document.createElement("a");
    prev.innerText = "Linear";
    prev.setAttribute("class", "previous_page");
    prev.onclick = () => window.dispatchEvent(new Event("layoutLinear"));

    const next = document.createElement("a");
    next.innerText = "Affine";
    next.setAttribute("class", "next_page");
    next.setAttribute("rel", "next");
    next.onclick = () => window.dispatchEvent(new Event("layoutAffine"));

    container.append(prev, next);
    div.appendChild(nav);
  }

  {
    const h4 = document.createElement("h4");
    h4.innerText = "Projective Transformations";
    div.appendChild(h4);
  }

  {
    const table = document.createElement("table");

    table.append(
      tr(td(), td(span("x")), td(span("y")), td(span("W")), td()),
      tr(
        td(span("r0(")),
        td(input("a00")),
        td(input("a01")),
        td(input("a02")),
        td(span(")"))
      ),
      tr(
        td(span("rX(")),
        td(input("a10")),
        td(input("a11")),
        td(input("a12")),
        td(span(")"))
      ),
      tr(
        td(span("rY(")),
        td(input("a20")),
        td(input("a21")),
        td(input("a22")),
        td(span(")"))
      )
    );

    div.append(table, br(), button(triggerRendering, "Render"));
  }

  return div;
}

function input(htmlId) {
  const input = document.createElement("input");

  input.value = window.screen1.projective[htmlId];
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

export default initLayout2;
