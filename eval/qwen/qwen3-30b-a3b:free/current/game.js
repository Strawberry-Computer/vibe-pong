const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

const computerPaddleWidth = paddleWidth;
const computerPaddleHeight = paddleHeight;
let computerPaddleX = (canvas.width - computerPaddleWidth) / 2;
let computerPaddleY = 0;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = -2;

let rightPressed = false;
let leftPressed = false;

const scoreElement = document.getElementById('score');
let score = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

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

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function update() {
    // Move paddle
    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    // AI for computer paddle
    computerPaddleX = ballX - paddleWidth / 2;
    if (computerPaddleX < 0) computerPaddleX = 0;
    if (computerPaddleX + paddleWidth > canvas.width) computerPaddleX = canvas.width - paddleWidth;

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collision with top wall
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision with left and right walls
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }

    // Collision with player paddle
    if (ballY + ballRadius > canvas.height - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        score += 1;
    }

    // Collision with computer paddle
    if (ballY - ballRadius < computerPaddleY + computerPaddleHeight &&
        ballX > computerPaddleX &&
        ballX < computerPaddleX + computerPaddleWidth) {
        ballSpeedY = -ballSpeedY;
        score += 1;
    }

    // Check if ball missed
    if (ballY + ballRadius > canvas.height) {
        // Reset ball
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 2;
        ballSpeedY = -2;
    }
}

function gameLoop() {
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreElement.textContent = 'Score: ' + score;
    drawPaddle(paddleX, canvas.height - paddleHeight);
    drawPaddle(computerPaddleX, computerPaddleY);
    drawBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();