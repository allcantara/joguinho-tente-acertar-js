document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const count = document.querySelector("#count");
  const context = screen.getContext("2d");
  const len = 40;
  let time = 1000;
  let interval = null;
  screen.width = 700;
  screen.height = 500;
  context.lineWidth = 3;
  context.strokeStyle = "#555";

  const pincel = {
    active: false,
    moving: false,
    position: { x: 0, y: 0 },
    beforePosition: null,
  };

  function randomValues() {
    let x = Math.ceil(Math.random() * screen.width - len);
    if (x > screen.width) x = screen.width - len;
    if (x <= 0) x = 1;
    let y = Math.ceil(Math.random() * screen.height - len);
    if (y > screen.height) y = screen.height - len;
    if (y <= 0) y = 1;
    return { x, y };
  }

  function drawLine(line) {
    context.clearRect(0, 0, screen.width, screen.height);
    context.fillRect(line.position.x, line.position.y, len, len);
  }

  screen.onmousedown = (e) => {
    let { clientX: X, clientY: Y } = e;
    let { position } = pincel;

    if (
      X < position.x + len &&
      X > position.x &&
      Y < position.y + len &&
      Y > position.y
    ) {
      time -= 100;
      count.innerHTML = time;
      createPointer(time);
    }
  };

  function createPointer(time) {
    if (interval !== null) clearInterval(interval);

    interval = setInterval(() => {
      let values = randomValues();
      pincel.position.x = values.x;
      pincel.position.y = values.y;
      drawLine(pincel);
    }, time);
  }

  createPointer(time);
});
