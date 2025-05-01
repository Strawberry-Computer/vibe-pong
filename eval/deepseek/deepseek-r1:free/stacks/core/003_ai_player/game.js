// PROMPT: Make sure that at this point there are 2 paddles
const computerPaddle = new Paddle(
  canvas.width - 20,
  canvas.height / 2 - 50,
  10,
  100,
  5
);

function update(deltaTime) {
  // Existing player paddle update from input
  playerPaddle.update(deltaTime);
  ball.update(deltaTime);

  // PROMPT: Add the computer player which moves the paddle automatically
  const computerCenter = computerPaddle.y + computerPaddle.height / 2;
  const ballCenter = ball.y;
  if (computerCenter < ballCenter - 10) {
    computerPaddle.velocity.y = computerPaddle.speed;
  } else if (computerCenter > ballCenter + 10) {
    computerPaddle.velocity.y = -computerPaddle.speed;
  } else {
    computerPaddle.velocity.y = 0;
  }
  computerPaddle.update(deltaTime);

  // Modified collision detection for both paddles
  if (checkCollision(ball, playerPaddle) || checkCollision(ball, computerPaddle)) {
    ball.velocity.x *= -1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  playerPaddle.draw();
  // PROMPT: Make sure that at this point there are 2 paddles
  computerPaddle.draw();
}