// PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom, movable left/right with arrow keys.
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 100;
const paddleHeight = 10;
const ballRadius = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
let ballSpeedX = 4;
let ballSpeedY = -4;

// PROMPT: Initialize a score variable starting at 0.
let score = 0;

const paddleSpeed = 8;

// PROMPT: Enhance the Pong game by having the computer player move the paddle automatically.
let computerPaddleX = (canvas.width - paddleWidth) / 2;
const computerPaddleY = paddleHeight;
const computerPaddleSpeed = 4;

// PROMPT: Use requestAnimationFrame for smooth animation.
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// PROMPT: movable left/right with arrow keys.
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// PROMPT: Update the score display in the DOM each frame.
function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function update() {
    // PROMPT: movable left/right with arrow keys.
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    // PROMPT: Enhance the Pong game by having the computer player move the paddle automatically.
    if (computerPaddleX + paddleWidth / 2 < ballX) {
        computerPaddleX += computerPaddleSpeed;
    } else if (computerPaddleX + paddleWidth / 2 > ballX) {
        computerPaddleX -= computerPaddleSpeed;
    }

    // PROMPT: Make sure the computer paddle stays within bounds
    if (computerPaddleX < 0) {
        computerPaddleX = 0;
    } else if (computerPaddleX + paddleWidth > canvas.width) {
        computerPaddleX = canvas.width - paddleWidth;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // PROMPT: Bounce the ball off the side walls
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // PROMPT: Detect computer paddle collision
    if (
        ballY - ballRadius < computerPaddleY + paddleHeight &&
        ballX > computerPaddleX &&
        ballX < computerPaddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    if (
        ballY + ballRadius > canvas.height - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        // PROMPT: Increment the score when the ball hits the paddle.
        score++;
        updateScoreDisplay();
    }

    // PROMPT: Reset the ball to the center (with random x-direction) when it misses the paddle (hits bottom), without resetting the score.
    if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        // PROMPT: with random x-direction
        ballSpeedX = Math.random() > 0.5 ? 4 : -4;
        ballSpeedY = -4;
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PROMPT: Draw a white ball (10px radius)
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // PROMPT: Draw the computer paddle at the top
    ctx.beginPath();
    ctx.rect(computerPaddleX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// PROMPT: Update the score display in the DOM each frame.
updateScoreDisplay();

// Start the game
gameLoop();