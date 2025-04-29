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

// PROMPT: Detect paddle collision to bounce the ball back up.
function collisionDetection() {
    if (ballX + ballRadius > paddleX && ballX - ballRadius < paddleX + paddleWidth && ballY + ballRadius > paddleY) {
        ballSpeedY = -ballSpeedY;
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    drawPaddle();
    drawBall();
    collisionDetection();

    // Ball Movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    // PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
    // Bounce off top/bottom
    if (ballY + ballRadius > canvas.height) {
        // Reset position
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
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