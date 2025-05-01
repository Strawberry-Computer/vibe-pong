// PROMPT: Use `<canvas width="800" height="400" id="pongCanvas">`
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
const paddleWidth = 10;
const paddleHeight = 100;
let paddleY = (canvas.height - paddleHeight) / 2;
const paddleX = 10; // Position paddle slightly from the left edge
let paddleSpeed = 0;
const paddleMaxSpeed = 5;

// PROMPT: Draw a white ball (10px radius) starting at canvas center
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

// PROMPT: moving diagonally with constant speed.
let ballSpeedX = 4;
let ballSpeedY = 4;

// PROMPT: movable up/down with arrow keys.
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        paddleSpeed = -paddleMaxSpeed;
    } else if (e.key === 'ArrowDown') {
        paddleSpeed = paddleMaxSpeed;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        paddleSpeed = 0;
    }
}

function movePaddle() {
    paddleY += paddleSpeed;

    // Keep paddle within canvas bounds
    if (paddleY < 0) {
        paddleY = 0;
    } else if (paddleY + paddleHeight > canvas.height) {
        paddleY = canvas.height - paddleHeight;
    }
}

// PROMPT: reset to center if it hits the bottom (misses paddle).
// Based on standard Pong interpretation and other prompts, reset occurs if ball passes the left edge (paddle side)
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    // Reverse direction or randomize slightly after reset
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 4; // Keep speed constant but vary vertical direction
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // PROMPT: Bounce the ball off the top and side walls;
    // Bounce off top wall
    if (ballY - ballRadius < 0) {
        ballY = ballRadius; // Prevent sticking
        ballSpeedY = -ballSpeedY;
    }
    // Bounce off bottom wall (Contradicts reset prompt, but aligned with standard Pong top/bottom bounce)
    if (ballY + ballRadius > canvas.height) {
       ballY = canvas.height - ballRadius; // Prevent sticking
       ballSpeedY = -ballSpeedY;
    }
     // Bounce off right "side" wall
     if (ballX + ballRadius > canvas.width) {
        ballX = canvas.width - ballRadius; // Prevent sticking
        ballSpeedX = -ballSpeedX;
    }

    // PROMPT: reset to center if it hits the bottom (misses paddle).
    // Reset if ball hits the left wall (paddle side miss interpreted from context)
    if (ballX - ballRadius < 0) {
        resetBall();
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    // Collision with left paddle
    if (ballX - ballRadius < paddleX + paddleWidth && // Ball's left edge touches paddle's right edge
        ballX - ballRadius > paddleX && // Ball hasn't completely passed the paddle
        ballY > paddleY &&                 // Ball is below paddle top
        ballY < paddleY + paddleHeight) {  // Ball is above paddle bottom
            ballX = paddleX + paddleWidth + ballRadius; // Move ball slightly out of paddle
            ballSpeedX = -ballSpeedX; // Bounce horizontally

            // Optional: Adjust vertical speed based on hit location on paddle
            let deltaY = ballY - (paddleY + paddleHeight / 2);
            ballSpeedY = deltaY * 0.2; // Example adjustment factor
    }
}

function drawPaddle() {
    // PROMPT: Draw a white paddle (10px wide, 100px high)
    context.fillStyle = 'white';
    context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    // PROMPT: Draw a white ball (10px radius)
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fill();
}

function draw() {
    // Clear canvas
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
}

function gameLoop() {
    movePaddle();
    moveBall();
    draw();

    // PROMPT: Use requestAnimationFrame for smooth animation.
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();