//! ================= DECLARATIONS =================
// canvas
let canvas;
let ctx;
const size = 20;
const rows = 20;
const cols = 20;
// snake
let snakeX = size * 5;
let snakeY = size * 5;
let speedX = 0;
let speedY = 0;
// food
let foodX;
let foodY;

let snakeBody = [];
let gameOver = false;

//! ================= INITIATING CANVAS FUNCTION =================
window.onload = function () {
  canvas = document.getElementById("can");
  canvas.width = cols * size;
  canvas.height = rows * size;
  ctx = canvas.getContext("2d");
  // 1st time food is built automatically
  placeFood();
  window.addEventListener("keyup", moveSnake);
  // it wont work unless event listener begins
  setInterval(update, 150);
};

//! ================= MOVE SNAKE FUNCTION =================
// control head with moving keys
function moveSnake(e) {
  // arrow Up works only with speedY !=20 ( means arrow Down is off), so no flipping at same axis.
  if (e.code == "ArrowUp" && speedY != 20) {
    speedX = 0;
    speedY = -20;
  } else if (e.code == "ArrowDown" && speedY != -20) {
    speedX = 0;
    speedY = 20;
  } else if (e.code == "ArrowRight" && speedX != -20) {
    speedX = 20;
    speedY = 0;
  } else if (e.code == "ArrowLeft" && speedX != 20) {
    speedX = -20;
    speedY = 0;
  }
}

//! ================= UPDATE FUNCTION =================
function update() {
  if (gameOver) {
    return;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, size, size);

  //? Collision Action:
  if (snakeX == foodX && snakeY == foodY) {
    // 1- save current x,y to a snakeBody array
    snakeBody.push([foodX, foodY]);
    // 2- create new food
    placeFood();
  }
  // 3- make last body element = to the previous x,y to replace once changing direction,
  // starting with tail, because if we start with head, the second element wont know where to go..
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  // 5- moving first snake body element to last previous position of moved head
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  ctx.fillStyle = "green";
  snakeX += speedX;
  snakeY += speedY;
  ctx.fillRect(snakeX, snakeY, size, size);
  // 4- create new snake body element
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], size, size);
  }

  //? Game Over conditions:
  // 1- touching any border
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    (snakeX > cols * size) | (snakeY > rows * size)
  ) {
    gameOver = true;
    alert("Game Over");
  }
  // 2- head touching its body elements
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

//! ================= PLACE FOOD FUNCTION =================
// placing food randomly
function placeFood() {
  foodX = Math.floor(Math.random() * cols) * size;
  foodY = Math.floor(Math.random() * rows) * size;
}
