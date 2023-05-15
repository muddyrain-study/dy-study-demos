const container = document.querySelector(".container");

let source;
container.addEventListener("dragstart", (e) => {
  /**
   * DataTransfer.effectAllowed 属性指定拖放操作所允许的一个效果。copy 操作用于指示被拖动的数据将从当前位置复制到放置位置。move 操作用于指定被拖动的数据将被移动。link 操作用于指示将在源和放置位置之间创建某种形式的关系或连接。
   */
  e.dataTransfer.effectAllowed = e.target.dataset.effect;
  source = e.target;
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  //   console.log("dragover", e);
});

function clearDropStyle() {
  document.querySelectorAll(".drop-over").forEach((node) => {
    node.classList.remove("drop-over");
  });
}

function getDropNode(node) {
  while (node) {
    if (node.dataset && node.dataset.drop) {
      return node;
    }
    node = node.parentNode;
  }
}
container.addEventListener("dragenter", (e) => {
  clearDropStyle();
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    dropNode.classList.add("drop-over");
  }
});
container.addEventListener("drop", (e) => {
  const dropNode = getDropNode(e.target);
  if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
    if (dropNode.dataset.drop === "copy") {
      dropNode.innerHTML = "";
      const cloned = source.cloneNode(true);
      cloned.dataset.effect = "move ";
      dropNode.appendChild(cloned);
    } else {
      source.remove();
    }
  }
});
