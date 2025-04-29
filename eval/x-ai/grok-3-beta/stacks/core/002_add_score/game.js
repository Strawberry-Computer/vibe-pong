const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
// PROMPT: Use Canvas API to draw elements

const paddleWidth = 100;
const paddleHeight = 10;
const paddleX = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 7;
let paddleDirection = 0;
// PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom, movable left/right

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = -5;
// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed

let score = 0;
// PROMPT: Initialize a score variable starting at 0

function drawPaddle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // PROMPT: Draw a white paddle at the bottom
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    // PROMPT: Draw a white ball
}

function updatePaddle() {
    if (paddleDirection === -1 && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
    if (paddleDirection === 1 && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }
    // PROMPT: Movable left/right with arrow keys
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // PROMPT: Ball moving diagonally with constant speed

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY = -5;
        // PROMPT: Reset the ball to the center (with random x-direction) when it misses the paddle (hits bottom), without resetting the score
    }
    // PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom

    if (ballY + ballRadius > canvas.height - paddleHeight && 
        ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        score++;
        // PROMPT: Increment the score when the ball hits the paddle
    }
    // PROMPT: Detect paddle collision to bounce the ball back up
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    updatePaddle();
    updateBall();
    document.getElementById('score').textContent = `Score: ${score}`;
    // PROMPT: Update the score display in the DOM each frame
    requestAnimationFrame(draw);
    // PROMPT: Use requestAnimationFrame for smooth animation
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        paddleDirection = -1;
    } else if (e.key === 'ArrowRight') {
        paddleDirection = 1;
    }
});
// PROMPT: Movable left/right with arrow keys

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        paddleDirection = 0;
    }
});
// PROMPT: Movable left/right with arrow keys

draw();
// PROMPT: Start the animation loop