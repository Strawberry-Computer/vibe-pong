// PROMPT: JS: Use Canvas API to...
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

let paddleX = canvas.width / 2 - 50; // Paddle starts at the horizontal center
const paddleY = canvas.height - 20;
const paddleWidth = 100;
const paddleHeight = 10;
const paddleSpeed = 7;
let leftPressed = false;
let rightPressed = false;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
let ballSpeedX = 2;
let ballSpeedY = 2;

// PROMPT: JS:   - Initialize a score variable starting at 0.
let score = 0;
// PROMPT: Detect paddle collision to bounce the ball back up.
function collisionDetection() {
    if (ballX + ballRadius > paddleX && ballX - ballRadius < paddleX + paddleWidth && ballY + ballRadius > paddleY) {
        ballSpeedY = -ballSpeedY;
        // PROMPT: JS:   - Increment the score when the ball hits the paddle.
        score++;
        // PROMPT: JS:   - Update the score display in the DOM each frame.
        document.getElementById('score').innerText = 'Score: ' + score;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// PROMPT: Add AI Player to Pong
// AI Paddle properties
let aiPaddleX = canvas.width / 2 - 50;
const aiPaddleY = 20; // Position at the top
const aiPaddleWidth = 100;
const aiPaddleHeight = 10;
const aiPaddleSpeed = 3; // Slower speed for AI

function drawAiPaddle() {
    ctx.beginPath();
    ctx.rect(aiPaddleX, aiPaddleY, aiPaddleWidth, aiPaddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function aiMove() {
    const paddleCenter = aiPaddleX + aiPaddleWidth / 2;
    if (ballX > paddleCenter && aiPaddleX < canvas.width - aiPaddleWidth) {
        aiPaddleX += aiPaddleSpeed;
    } else if (ballX < paddleCenter && aiPaddleX > 0) {
        aiPaddleX -= aiPaddleSpeed;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    drawPaddle();
    drawBall();
    collisionDetection();
    drawAiPaddle(); // Draw AI paddle
    aiMove(); // Move AI paddle

    // Ball Movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    // PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
    // Bounce off top/bottom
    if (ballY + ballRadius > canvas.height) {
        // PROMPT: JS:   - Reset the ball to the center (with random x-direction) when it misses the paddle (hits bottom), without resetting the score.
        // Reset position
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = (Math.random() > 0.5 ? 2 : -2);
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Bounce off left/right
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // Paddle Movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
    // PROMPT: JS:   - Update the score display in the DOM each frame.
    document.getElementById('score').innerText = 'Score: ' + score;

    // PROMPT: Use requestAnimationFrame for smooth animation.
    requestAnimationFrame(draw);
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


// PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom, movable left/right with arrow keys.
// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
draw();