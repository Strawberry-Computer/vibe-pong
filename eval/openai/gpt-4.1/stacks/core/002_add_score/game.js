// PROMPT: JS: Add scoring to Pong with score variable, increment on paddle hit, update display, don't reset on miss.

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: JS: Add a score variable starting at 0.
let score = 0;
const scoreDiv = document.getElementById('score');

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 7;
let rightPressed = false;
let leftPressed = false;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // PROMPT: Increment the score when the ball hits the paddle.
    if (
        ballY + ballRadius >= paddleY &&
        ballY + ballRadius <= paddleY + paddleHeight &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        ballY = paddleY - ballRadius;
        score += 1;
    }
    // PROMPT: Reset the ball to the center (with random x-direction) when it misses the paddle (hits bottom), without resetting the score.
    else if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
        ballSpeedY = -4;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    // PROMPT: Update the score display in the DOM each frame.
    scoreDiv.textContent = "Score: " + score;

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    }
    if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    }
    if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

draw();