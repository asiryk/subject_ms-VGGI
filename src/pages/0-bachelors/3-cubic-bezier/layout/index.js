import init from "./layout";

function initLayout() {
  const div = document.createElement("div");
  const { container, inputX, inputY } = init();

  div.append(container);

  window.addEventListener("3_bezier_pivot_change", (event) => {
    inputX.value = event.detail.point[0];
    inputY.value = event.detail.point[1];
  });

  return div;
}

export function animate() {
  window.dispatchEvent(new CustomEvent("3_bezier_animate"));
}

export function turnOnDebug(e) {
  window.dispatchEvent(
    new CustomEvent("3_bezier_debug", { detail: { debug: e.target.checked } })
  );
}

export function movePivot(e) {
  const detail = {};
  if (e.target.id === "bezier_x") {
    detail.x = parseFloat(e.target.value);
  } else if (e.target.id === "bezier_y") {
    detail.y = parseFloat(e.target.value);
  } else
    throw new Error(
      `there has to be only two ids and id ${e.target.id} is wrong`
    );
  window.dispatchEvent(new CustomEvent("3_bezier_move_pivot", { detail }));
}

export default initLayout;
