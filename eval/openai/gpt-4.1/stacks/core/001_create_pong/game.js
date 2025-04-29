// PROMPT: JS: Use Canvas API to draw a white paddle (100px wide, 10px high) at the bottom, movable left/right with arrow keys.

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 7;
let rightPressed = false;
let leftPressed = false;

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;

// PROMPT: Use requestAnimationFrame for smooth animation.
function draw() {
    // PROMPT: draw paddle and ball; background reset for each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    // PROMPT: Bounce the ball off the top and side walls
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    if (
        ballY + ballRadius >= paddleY &&
        ballY + ballRadius <= paddleY + paddleHeight &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        ballY = paddleY - ballRadius;
    }
    // PROMPT: reset to center if it hits the bottom (misses paddle).
    else if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
        ballSpeedY = -4;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // PROMPT: Move paddle left/right with arrow keys.
    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(e) {
    // PROMPT: Move paddle left/right with arrow keys.
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