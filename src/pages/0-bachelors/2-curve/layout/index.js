import init from "./layout";

function initLayout() {
  const container = document.createElement("div");

  container.append(init());

  return container;
}

export default initLayout;
