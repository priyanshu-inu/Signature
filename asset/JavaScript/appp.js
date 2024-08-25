const colorPicker = document.getElementById("colorPicker");
const canvaColor = document.getElementById("canvaColor");
const myCanvas = document.getElementById("myCanvas");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const retrieveBtn = document.getElementById("retrieveBtn");
const fontSize = document.getElementById("fontSize");
const ctx = myCanvas.getContext("2d");

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

myCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

myCanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

myCanvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

canvaColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearBtn.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("canvasContent", myCanvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = myCanvas.toDataURL();
  link.click();
});

retrieveBtn.addEventListener("click", () => {
  let saveCanvas = localStorage.getItem("canvasContent");

  if (saveCanvas) {
    let img = new Image();
    img.src = saveCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
